using System;
using Pather.Common.Models.GameSegment;
using Pather.Common.Models.Tick;
using Pather.Common.Utils.Promises;
using Pather.Servers.Common;
using Pather.Servers.Common.PubSub;
using Pather.Servers.Common.PushPop;
using Pather.Servers.Common.SocketManager;

namespace Pather.Servers.GameSegment
{
    public class GameSegment
    {
        private ClientTickManager ClientTickManager;
        private ISocketManager SocketManager;
        private IPubSub Pubsub;
        private IPushPop PushPop;
        private string GameSegmentId;

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
                    GameSegmentPubSub.Init().Then(ready);
                });
        }

        private void ready()
        {
            GameSegmentPubSub.OnAllMessage += onAllMessage;
            GameSegmentPubSub.OnMessage += onMessage;

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
            GameSegmentPubSub.PublishToTickServer(new PingTickPubSubMessage() { Origin = PubSubChannels.GameSegment + GameSegmentId, OriginType = PingTickPubSubMessageOriginType.GameSegment });
        }

        private void RegisterGameSegmentWithCluster()
        {
            //register game segment
            PushPop.Push(GameSegmentId, 1);
        }


        private void onMessage(GameSegmentPubSubMessage message)
        {
            switch (message.Type)
            {
                case GameSegmentPubSubMessageType.Pong:
                    var pongMessage = (PongGameSegmentPubSubMessage)message;
                    ClientTickManager.OnPongReceived();
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }

        }

        private void onAllMessage(GameSegmentPubSubAllMessage message)
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