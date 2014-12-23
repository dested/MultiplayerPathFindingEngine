using System;
using System.Collections.Generic;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.GameSegment;
using Pather.Common.Models.GameWorld;
using Pather.Common.Models.Tick;
using Pather.Common.Utils.Promises;
using Pather.Servers.Common;
using Pather.Servers.Common.PubSub;
using Pather.Servers.Common.PushPop;
using Pather.Servers.Common.SocketManager;
using Pather.Servers.GameSegment.Old;

namespace Pather.Servers.GameSegment
{
        public class GameSegmentUser
    {
        public string GatewayServer;
        public int X;
        public int Y;
        public string UserId;
    }

    public class GameSegment
    {
        private ClientTickManager ClientTickManager;
        private ISocketManager SocketManager;
        private IPubSub Pubsub;
        private IPushPop PushPop;
        private string GameSegmentId;
        private List<GameSegmentUser> users = new List<GameSegmentUser>();

        public GameSegment(ISocketManager socketManager, IPubSub pubsub, IPushPop pushPop, string gameSegmentId)
        {
            SocketManager = socketManager;
            Pubsub = pubsub;
            PushPop = pushPop;
            GameSegmentId = gameSegmentId;
            //            Global.SetInterval(() => { Global.Console.Log("keep alive " + new DateTime().ToString().Substring(17, 24)); }, 10 * 1000);

            //            var game = new ServerGame(socketManager, gameServerName);
            //            game.Init();



            Q.All(pubsub.Init(),pushPop.Init())
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
            ClientTickManager.Init(SendPing,TickManagerReady);
            ClientTickManager.StartPing();
        }

        private void TickManagerReady()
        {
            RegisterGameSegmentWithCluster();
        }

        private void SendPing()
        {
            GameSegmentPubSub.PublishToTickServer(new PingTickPubSubMessage() { Origin = PubSubChannels.GameSegment(GameSegmentId), OriginType = PingTickPubSubMessageOriginType.GameSegment });
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
                case GameSegmentPubSubMessageType.UserJoin:
                    var userJoinMessage = (UserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message)message;
                    users.Add(new GameSegmentUser()
                    {
                        UserId = userJoinMessage.UserId,
                        GatewayServer = userJoinMessage.GatewayServer,
                        X = userJoinMessage.X,
                        Y = userJoinMessage.Y,
                    });
                    Global.Console.Log("User Joined Game Segment",GameSegmentId,"User count now: ",users.Count);
                    GameSegmentPubSub.PublishToGameWorld(new UserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message()
                    {
                        MessageId=userJoinMessage.MessageId
                    });

                    break;
                case GameSegmentPubSubMessageType.Pong:
                    var pongMessage = (PongGameSegmentPubSubMessage)message;
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
                case GameSegmentPubSubAllMessageType.TickSync:
                    var tickSyncMessage = (TickSyncGameSegmentPubSubAllMessage)message;
                    ClientTickManager.SetLockStepTick(tickSyncMessage.LockstepTickNumber);
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        public GameSegmentPubSub GameSegmentPubSub;
    }
}