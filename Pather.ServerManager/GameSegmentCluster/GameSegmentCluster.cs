using System;
using System.Diagnostics;
using System.Serialization;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.GameSegmentCluster;
using Pather.Common.Models.GameWorld;
using Pather.Common.Utils.Promises;
using Pather.ServerManager.Common;
using Pather.ServerManager.Common.PubSub;
using Pather.ServerManager.Common.PushPop;
using Pather.ServerManager.Libraries.Redis;

namespace Pather.ServerManager.GameSegmentCluster
{
    public class GameSegmentCluster
    {
        public IPushPop PushPop { get; set; }
        private readonly IPubSub pubsub;

        public GameSegmentCluster(IPubSub pubsub, IPushPop pushPop)
        {
            
            PushPop = pushPop;
            this.pubsub = pubsub;

            Q.All(pubsub.Init(), pushPop.Init()).Then(pubsubsConnected);
        }

        private void pubsubsConnected()
        {
            pubsub.Subscribe(PubSubChannels.GameSegmentCluster + 1, receiveMessage);
        }

        private void receiveMessage(string message)
        {

            var GameSegmentCluster = Json.Parse<GameSegmentClusterPubSubMessage>(message);

            switch (GameSegmentCluster.Type)
            {
                case GameSegmentClusterMessageType.CreateGameSegment:

                    CreateGameSegment(((CreateGameServerGameSegmentClusterPubSubMessage)GameSegmentCluster));

                    break;
            }

        }

        private void CreateGameSegment(CreateGameServerGameSegmentClusterPubSubMessage createGameServer)
        {
 Global.Console.Log("Spawning new game segment");


            var spawn = Global.Require<ChildProcess>("child_process").Spawn;
            var fs = Global.Require<FS>("fs");
            var m = fs.OpenSync("./out.log", "a", null);
            var @out = fs.OpenSync("./out.log", "a", null);
            var err = fs.OpenSync("./out.log", "a", null);




            PushPop.BlockingPop(createGameServer.GameSegmentId, 10).Then((content) =>
            {
                pubsub.Publish(PubSubChannels.GameWorld, new CreateGameServerResponseGameWorldPubSubMessage()
                {
                    GameSegmentId = createGameServer.GameSegmentId,
                    MessageId = createGameServer.MessageId,
                });
                Global.Console.Log("Server Created!", createGameServer.GameSegmentId);
            }).Error(a =>
            {
                Global.Console.Log("Server Creation Failed!");
                
            });



            var child = spawn("node", new[] { "app.js", "gs", createGameServer.GameSegmentId }, new
            {
                stdio = new object[] { m, @out, err },
//                detached = true,
            });

//            child.Unref();

        }
    }

}