using System;
using System.Collections.Generic;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.GameSegment;
using Pather.Common.Models.GameSegment.Base;
using Pather.Common.Models.GameWorld;
using Pather.Common.Models.Tick;
using Pather.Common.Utils;
using Pather.Common.Utils.Promises;
using Pather.Servers.Common;
using Pather.Servers.Common.PubSub;
using Pather.Servers.Common.PushPop;
using Pather.Servers.Common.ServerLogging;
using Pather.Servers.Common.SocketManager;

namespace Pather.Servers.GameSegment
{
    public class GameSegmentServer
    {
        private ClientTickManager ClientTickManager;
        private ISocketManager SocketManager;
        private readonly IPubSub Pubsub;
        private readonly IPushPop PushPop;
        private readonly string GameSegmentId;
        public List<GameSegmentUser> Users = new List<GameSegmentUser>();

        public GameSegmentServer(ISocketManager socketManager, IPubSub pubsub, IPushPop pushPop, string gameSegmentId)
        {
            ServerLogger.InitLogger("GameSegment", gameSegmentId);
            SocketManager = socketManager;
            Pubsub = pubsub;
            PushPop = pushPop;
            GameSegmentId = gameSegmentId;
            //            Global.SetInterval(() => { Global.Console.Log("keep alive " + new DateTime().ToString().Substring(17, 24)); }, 10 * 1000);

            //            var game = new ServerGame(socketManager, gameServerName);
            //            game.Init();


            Q.All(pubsub.Init(), pushPop.Init())
                .Then(() =>
                {
                    GameSegmentPubSub = new GameSegmentPubSub(Pubsub, GameSegmentId);
                    GameSegmentPubSub.OnAllMessage += onAllMessage;
                    GameSegmentPubSub.OnMessage += onMessage;
                    GameSegmentPubSub.Init().Then(ready);
                });
        }


        private void ready()
        {
            ClientTickManager = new ClientTickManager();
            ClientTickManager.Init(SendPing, TickManagerReady);
            ClientTickManager.StartPing();
        }

        private void TickManagerReady()
        {
            RegisterGameSegmentWithCluster();
        }

        private void SendPing()
        {
            GameSegmentPubSub.PublishToTickServer(new Ping_Tick_PubSub_Message()
            {
                Origin = PubSubChannels.GameSegment(GameSegmentId),
                OriginType = Ping_Tick_PubSub_Message_OriginType.GameSegment
            });
        }

        private void RegisterGameSegmentWithCluster()
        {
            //register game segment
            PushPop.Push(GameSegmentId, 1);
        }


        private void onMessage(GameSegment_PubSub_Message message)
        {
            switch (message.Type)
            {
                    //todo MAKE THIS CALL INDIVIDUAL METHODS
                case GameSegment_PubSub_MessageType.UserJoin:
                    var userJoinMessage = (UserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message) message;
                    Users.Add(new GameSegmentUser()
                    {
                        UserId = userJoinMessage.UserId,
                        GatewayServer = userJoinMessage.GatewayServer,
                        X = userJoinMessage.X,
                        Y = userJoinMessage.Y,
                    });
                    Global.Console.Log("User Joined Game Segment", GameSegmentId, "User count now: ", Users.Count);
                    GameSegmentPubSub.PublishToGameWorld(new UserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message()
                    {
                        MessageId = userJoinMessage.MessageId
                    });

                    break;
                case GameSegment_PubSub_MessageType.UserLeft:
                    var userLeftMessage = (UserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message) message;
                    var user = Users.First(u => u.UserId == userLeftMessage.UserId);

                    if (user == null)
                    {
                        throw new Exception("IDK Who this user is:" + userLeftMessage.UserId);
                    }

                    Users.Remove(user);

                    Global.Console.Log("User Left Game Segment", GameSegmentId, "User count now: ", Users.Count);
                    GameSegmentPubSub.PublishToGameWorld(new UserLeft_Response_GameSegment_GameWorld_PubSub_ReqRes_Message()
                    {
                        MessageId = userLeftMessage.MessageId
                    });

                    break;
                case GameSegment_PubSub_MessageType.Pong:
                    var pongMessage = (Pong_Tick_GameSegment_PubSub_Message) message;
                    ClientTickManager.OnPongReceived();
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        private void onAllMessage(GameSegment_PubSub_AllMessage message)
        {
            switch (message.Type)
            {
                case GameSegment_PubSub_AllMessageType.TickSync:
                    var tickSyncMessage = (TickSync_GameSegment_PubSub_AllMessage) message;
                    ClientTickManager.SetLockStepTick(tickSyncMessage.LockstepTickNumber);
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        public GameSegmentPubSub GameSegmentPubSub;
    }
}