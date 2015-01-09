using System;
using Pather.Common.Models.GameSegment;
using Pather.Common.Models.GameSegment.Base;
using Pather.Common.Utils.Promises;
using Pather.Servers.Common.PubSub;
using Pather.Servers.Common.PushPop;
using Pather.Servers.Common.ServerLogging;

namespace Pather.Servers.GameSegmentServer
{
    public class GameSegmentServer
    {
        private readonly IPubSub pubsub;
        private readonly IPushPop pushPop;
        private readonly string GameSegmentId;
        public GameSegmentPubSub GameSegmentPubSub;

        private ServerGameManager gameManager;

        public GameSegmentServer(IPubSub pubsub, IPushPop pushPop, string gameSegmentId)
        {
            //            GameSegmentLogger.InitLogger(gameSegmentId);
            ServerLogger.InitLogger("GameSegment", gameSegmentId);
            this.pubsub = pubsub;
            this.pushPop = pushPop;
            GameSegmentId = gameSegmentId;

            //Global.SetInterval(() => { Global.Console.Log("keep alive " + new DateTime().ToString().Substring(17, 24)); }, 10 * 1000);
            //var game = new ServerGame(socketManager, gameSegmentName);
            //game.Init();

            Q.All(pubsub.Init(), pushPop.Init())
                .Then(() =>
                {
                    GameSegmentPubSub = new GameSegmentPubSub(this.pubsub, GameSegmentId);
                    GameSegmentPubSub.OnAllMessage += onAllMessage;

                    gameManager = new ServerGameManager(GameSegmentId, GameSegmentPubSub);
                    gameManager.RegisterGameSegmentWithCluster += registerGameSegmentWithCluster;
                    gameManager.Init();
                });
        }

        private void registerGameSegmentWithCluster()
        {
            //register game segment
            pushPop.Push(GameSegmentId, 1);
        }


        private void onAllMessage(GameSegment_PubSub_AllMessage message)
        {
            switch (message.Type)
            {
                case GameSegment_PubSub_AllMessageType.TickSync:
                    var tickSyncMessage = (TickSync_GameSegment_PubSub_AllMessage) message;
                    gameManager.SetLockStepTick(tickSyncMessage.LockstepTickNumber);
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }
    }
}