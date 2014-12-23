using System.Serialization;
using Pather.Common;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.GameSegmentCluster;
using Pather.Common.Models.GameWorld;
using Pather.Common.Utils.Promises;
using Pather.Servers.Common.PubSub;
using Pather.Servers.Common.PushPop;
using Pather.Servers.Common.ServerLogger;

namespace Pather.Servers.GameSegmentCluster
{
    public class GameSegmentCluster
    {
        public IPushPop PushPop;
        public GameSegmentClusterPubSub GameSegmentClusterPubSub;
        public string GameSegmentClusterId;
        private readonly IPubSub pubsub;

        public GameSegmentCluster(IPubSub pubsub, IPushPop pushPop, string gameSegmentClusterId)
        {
            ServerLogger.InitLogger("GameSegmentCluster", gameSegmentClusterId);
            PushPop = pushPop;
            GameSegmentClusterId = gameSegmentClusterId;
            this.pubsub = pubsub;

            Q.All(pubsub.Init(), pushPop.Init()).Then(pubsubsConnected);
        }

        private void pubsubsConnected()
        {
            GameSegmentClusterPubSub = new GameSegmentClusterPubSub(pubsub, GameSegmentClusterId);
            GameSegmentClusterPubSub.OnMessage += receiveMessage;
            GameSegmentClusterPubSub.Init();
            
        }


        private void receiveMessage(GameSegmentCluster_PubSub_Message message)
        {

            switch (message.Type)
            {
                case GameSegmentCluster_PubSub_MessageType.CreateGameSegment:

                    CreateGameSegment(((CreateGameSegment_GameSegmentCluster_PubSub_ReqRes_Message)message));

                    break;
            }
        }

        private void CreateGameSegment(CreateGameSegment_GameSegmentCluster_PubSub_ReqRes_Message createGameSegment)
        {
            Global.Console.Log("Spawning new game segment");


            var spawn = Global.Require<ChildProcess>("child_process").Spawn;
            var fs = Global.Require<FS>("fs");
            var m = fs.OpenSync("./out.log", "a", null);
            var @out = fs.OpenSync("./out.log", "a", null);
            var err = fs.OpenSync("./out.log", "a", null);

            PushPop.BlockingPop(createGameSegment.GameSegmentId, Constants.GameSegmentCreationWait).Then((content) =>
            {
                GameSegmentClusterPubSub.PublishToGameWorld(new CreateGameSegment_Response_GameWorld_PubSub_Message()
                {
                    GameSegmentId = createGameSegment.GameSegmentId,
                    MessageId = createGameSegment.MessageId,
                });
                
                Global.Console.Log("Server Created!", createGameSegment.GameSegmentId);
            }).Error(a =>
            {
                Global.Console.Log("Server Creation Failed!");
            });


            var child = spawn("node", new[]
            {
                "app.js", "gs", createGameSegment.GameSegmentId
            }, new
            {
                stdio = new object[]
                {
                    m, @out, err
                },
                //                detached = true,
            });

            //            child.Unref();
        }
    }
}