using System.Serialization;
using Pather.Common;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.GameSegmentCluster;
using Pather.Common.Models.GameWorld;
using Pather.Common.Utils.Promises;
using Pather.Servers.Common.PubSub;
using Pather.Servers.Common.PushPop;

namespace Pather.Servers.GameSegmentCluster
{
    public class GameSegmentCluster
    {
        public IPushPop PushPop { get; set; }
        public string GameSegmentId { get; set; }
        private readonly IPubSub pubsub;

        public GameSegmentCluster(IPubSub pubsub, IPushPop pushPop, string gameSegmentId)
        {
            PushPop = pushPop;
            GameSegmentId = gameSegmentId;
            this.pubsub = pubsub;

            Q.All(pubsub.Init(), pushPop.Init()).Then(pubsubsConnected);
        }

        private void pubsubsConnected()
        {
            pubsub.Subscribe(PubSubChannels.GameSegmentCluster(GameSegmentId), receiveMessage);
        }

        private void receiveMessage(string message)
        {
            var GameSegmentCluster = Json.Parse<GameSegmentClusterPubSubMessage>(message);

            switch (GameSegmentCluster.Type)
            {
                case GameSegmentClusterPubSubMessageType.CreateGameSegment:

                    CreateGameSegment(((CreateGameSegmentGameSegmentClusterPubSubMessage) GameSegmentCluster));

                    break;
            }
        }

        private void CreateGameSegment(CreateGameSegmentGameSegmentClusterPubSubMessage createGameSegment)
        {
            Global.Console.Log("Spawning new game segment");


            var spawn = Global.Require<ChildProcess>("child_process").Spawn;
            var fs = Global.Require<FS>("fs");
            var m = fs.OpenSync("./out.log", "a", null);
            var @out = fs.OpenSync("./out.log", "a", null);
            var err = fs.OpenSync("./out.log", "a", null);


            PushPop.BlockingPop(createGameSegment.GameSegmentId, Constants.GameSegmentCreationWait).Then((content) =>
            {
                pubsub.Publish(PubSubChannels.GameWorld(), new CreateGameSegmentResponseGameWorldPubSubMessage()
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