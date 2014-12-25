using System;
using System.Collections.Generic;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.GameSegment;
using Pather.Common.Models.GameSegment.Base;
using Pather.Common.Models.GameWorld.GameSegment;
using Pather.Common.Models.Tick;
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
        public JsDictionary<string, GameSegmentUser> MySegmentUsers = new JsDictionary<string, GameSegmentUser>();
        public JsDictionary<string, GameSegmentUser> OtherSegmentUsers = new JsDictionary<string, GameSegmentUser>();

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
                case GameSegment_PubSub_MessageType.UserJoin:
                    OnMessageUserJoin((UserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message) message);
                    break;
                case GameSegment_PubSub_MessageType.UserMoved:
                    OnMessageUserMoved((UserMoved_Gateway_GameSegment_PubSub_Message) message);
                    break;
                case GameSegment_PubSub_MessageType.TellUserJoin:
                    OnMessageTellUserJoin((TellUserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message) message);
                    break;
                case GameSegment_PubSub_MessageType.TellUserLeft:
                    OnMessageTellUserLeft((TellUserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message) message);
                    break;

                case GameSegment_PubSub_MessageType.UserLeft:
                    OnMessageUserLeft((UserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message) message);
                    break;
                case GameSegment_PubSub_MessageType.Pong:
                    OnMessagePong((Pong_Tick_GameSegment_PubSub_Message) message);
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        private void OnMessagePong(Pong_Tick_GameSegment_PubSub_Message message)
        {
            ClientTickManager.OnPongReceived();
        }

        private void OnMessageUserLeft(UserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message message)
        {
            var user = MySegmentUsers[message.UserId];

            if (user == null)
            {
                throw new Exception("IDK Who this user is:" + message.UserId);
            }

            MySegmentUsers.Remove(message.UserId);

            ServerLogger.LogInformation("User Left Game Segment", "User count now: ", MySegmentUsers.Count);
            Global.Console.Log(GameSegmentId, "User Left Game Segment", "User count now: ", MySegmentUsers.Count);
            GameSegmentPubSub.PublishToGameWorld(new UserLeft_Response_GameSegment_GameWorld_PubSub_ReqRes_Message()
            {
                MessageId = message.MessageId
            });
        }

        private void OnMessageTellUserLeft(TellUserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message message)
        {
            var luser = OtherSegmentUsers[message.UserId];

            if (luser == null)
            {
                throw new Exception("IDK Who this user is:" + message.UserId);
            }

            OtherSegmentUsers.Remove(message.UserId);

            ServerLogger.LogInformation("User Left Other Game Segment");
            Global.Console.Log(GameSegmentId, "User Left Other Game Segment");
            GameSegmentPubSub.PublishToGameWorld(new TellUserLeft_Response_GameSegment_GameWorld_PubSub_ReqRes_Message()
            {
                MessageId = message.MessageId
            });
        }

        private void OnMessageTellUserJoin(TellUserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message message)
        {
            OtherSegmentUsers[message.UserId] = (new GameSegmentUser()
            {
                UserId = message.UserId,
                GatewayServer = message.GatewayServer,
                X = message.X,
                Y = message.Y,
            });
            ServerLogger.LogInformation("User Joined A Different Game Segment");
            Global.Console.Log(GameSegmentId, "User Joined A Different Game Segment");
            GameSegmentPubSub.PublishToGameWorld(new TellUserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message()
            {
                MessageId = message.MessageId
            });
        }

        private void OnMessageUserJoin(UserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message message)
        {
            MySegmentUsers[message.UserId] = (new GameSegmentUser()
            {
                UserId = message.UserId,
                GatewayServer = message.GatewayServer,
                X = message.X,
                Y = message.Y,
            });
            ServerLogger.LogInformation("User Joined Game Segment", "User count now: ", MySegmentUsers.Count);
            Global.Console.Log(GameSegmentId, "User Joined Game Segment", "User count now: ", MySegmentUsers.Count);
            GameSegmentPubSub.PublishToGameWorld(new UserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message()
            {
                MessageId = message.MessageId
            });
        }

        private void OnMessageUserMoved(UserMoved_Gateway_GameSegment_PubSub_Message message)
        {
            if (!MySegmentUsers.ContainsKey(message.UserId))
            {
                throw new Exception("This aint my user! " + message.UserId);
            }

            var user = MySegmentUsers[message.UserId];

            //todo pathfind here
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