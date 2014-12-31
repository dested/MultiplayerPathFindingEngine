using System;
using Pather.Common;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.ClusterManager;
using Pather.Common.Models.ClusterManager.Base;
using Pather.Common.Models.ServerManager;
using Pather.Common.Utils.Promises;
using Pather.Servers.Common.PubSub;
using Pather.Servers.Common.PushPop;
using Pather.Servers.Common.ServerLogging;

namespace Pather.Servers.ClusterManager
{
    public class ClusterManager
    {
        public IPushPop PushPop;
        public ClusterManagerPubSub ClusterManagerPubSub;
        public string ClusterManagerId;
        private readonly IPubSub pubsub;

        public ClusterManager(IPubSub pubsub, IPushPop pushPop, string clusterManagerId)
        {
            ServerLogger.InitLogger("ClusterManager", clusterManagerId);
            PushPop = pushPop;
            ClusterManagerId = clusterManagerId;
            this.pubsub = pubsub;

            Q.All(pubsub.Init(), pushPop.Init()).Then(pubsubsConnected);
        }

        private void pubsubsConnected()
        {
            ClusterManagerPubSub = new ClusterManagerPubSub(pubsub, ClusterManagerId);
            ClusterManagerPubSub.OnMessage += receiveMessage;
            ClusterManagerPubSub.Init();

            PushPop.Push(ClusterManagerId, null);
        }


        private void receiveMessage(ClusterManager_PubSub_Message message)
        {
            switch (message.Type)
            {
                case ClusterManager_PubSub_MessageType.CreateGameSegment:
                    CreateGameSegment(((CreateGameSegment_ServerManager_ClusterManager_PubSub_ReqRes_Message) message));
                    break;
                case ClusterManager_PubSub_MessageType.CreateGateway:
                    CreateGateway(((CreateGateway_ServerManager_ClusterManager_PubSub_ReqRes_Message) message));
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        private void CreateGateway(CreateGateway_ServerManager_ClusterManager_PubSub_ReqRes_Message createGatewayMessage)
        {
            Global.Console.Log("Spawning new gateway");
            var spawn = Global.Require<ChildProcess>("child_process").Spawn;
            var fs = Global.Require<FS>("fs");
            var m = fs.OpenSync("./outgw.log", "a", null);
            var @out = fs.OpenSync("./outgw.log", "a", null);
            var err = fs.OpenSync("./outgw.log", "a", null);

            PushPop.BlockingPop(createGatewayMessage.GatewayId, Constants.GatewayCreationWait).Then((content) =>
            {
                ClusterManagerPubSub.PublishToServerManager(new CreateGateway_Response_ClusterManager_ServerManager_PubSub_ReqRes_Message()
                {
                    GatewayId = createGatewayMessage.GatewayId,
                    MessageId = createGatewayMessage.MessageId,
                });

                Global.Console.Log("Gateway Server Created!", createGatewayMessage.GatewayId);
            }).Error(a =>
            {
                Global.Console.Log("Gateway Server Creation Failed!");
            });


            var str = @"C:\Users\deste_000\AppData\Roaming\npm\node-debug.cmd";
            str = "node";
            var child = spawn(str, new[]
            {
                "app.js", "gateway", createGatewayMessage.GatewayId, createGatewayMessage.Port.ToString()
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


        private void CreateGameSegment(CreateGameSegment_ServerManager_ClusterManager_PubSub_ReqRes_Message createGameSegmentMessage)
        {
            Global.Console.Log("Spawning new game segment");
            var spawn = Global.Require<ChildProcess>("child_process").Spawn;
            var fs = Global.Require<FS>("fs");
            var m = fs.OpenSync("./outgs.log", "a", null);
            var @out = fs.OpenSync("./outgs.log", "a", null);
            var err = fs.OpenSync("./outgs.log", "a", null);

            PushPop.BlockingPop(createGameSegmentMessage.GameSegmentId, Constants.GameSegmentCreationWait).Then((content) =>
            {
                ClusterManagerPubSub.PublishToServerManager(new CreateGameSegment_Response_ClusterManager_ServerManager_PubSub_ReqRes_Message()
                {
                    GameSegmentId = createGameSegmentMessage.GameSegmentId,
                    MessageId = createGameSegmentMessage.MessageId,
                });

                Global.Console.Log("Game Segment Server Created!", createGameSegmentMessage.GameSegmentId);
            }).Error(a =>
            {
                Global.Console.Log("Game Segment Server Creation Failed!");
            });


            var str = @"C:\Users\deste_000\AppData\Roaming\npm\node-debug.cmd";
            str = "node";
            var child = spawn(str, new[]
            {
                "app.js", "gamesegment", createGameSegmentMessage.GameSegmentId
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