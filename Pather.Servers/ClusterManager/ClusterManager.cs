using System;
using System.Diagnostics;
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
        public ServerLogger ServerLogger;


        public ClusterManager(IPubSub pubsub, IPushPop pushPop, string clusterManagerId)
        {
            ServerLogger = new ServerLogger("ClusterManager", clusterManagerId);
            ServerLogger.LogInformation("PowerOn", clusterManagerId);
            PushPop = pushPop;
            ClusterManagerId = clusterManagerId;
            this.pubsub = pubsub;

            Q.All(pubsub.Init(ServerLogger), pushPop.Init(ServerLogger)).Then(pubsubsConnected);
        }


        private void pubsubsConnected()
        {
            ClusterManagerPubSub = new ClusterManagerPubSub(pubsub, ClusterManagerId);
            ClusterManagerPubSub.OnMessage += receiveMessage;
            ClusterManagerPubSub.Init();
            ServerLogger.LogInformation("Initialized", ClusterManagerId);

            PushPop.Push(ClusterManagerId, null);
        }


        private void receiveMessage(ClusterManager_PubSub_Message message)
        {
            switch (message.Type)
            {
                case ClusterManager_PubSub_MessageType.CreateGameSegment:
                    CreateGameSegment(((CreateGameSegment_ServerManager_ClusterManager_PubSub_ReqRes_Message)message));
                    break;
                case ClusterManager_PubSub_MessageType.CreateGateway:
                    CreateGateway(((CreateGateway_ServerManager_ClusterManager_PubSub_ReqRes_Message)message));
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        private void CreateGateway(CreateGateway_ServerManager_ClusterManager_PubSub_ReqRes_Message createGatewayMessage)
        {
            ServerLogger.LogInformation("Spawning new gateway");

            PushPop.BlockingPop(createGatewayMessage.GatewayId, Constants.GatewayCreationWait).Then((content) =>
            {
                ClusterManagerPubSub.PublishToServerManager(new CreateGateway_Response_ClusterManager_ServerManager_PubSub_ReqRes_Message()
                {
                    GatewayId = createGatewayMessage.GatewayId,
                    MessageId = createGatewayMessage.MessageId,
                });

                ServerLogger.LogInformation("Gateway Server Created!", createGatewayMessage.GatewayId);

            }).Error(a =>
            {
                ServerLogger.LogError("Gateway Server Creation Failed!");
            });

            var arguments = new[]
            {
                "", "gateway", createGatewayMessage.GatewayId, createGatewayMessage.Port.ToString()
            };
            startApp(arguments, "./outgw.log");
        }

        private int count = 0;

        private void CreateGameSegment(CreateGameSegment_ServerManager_ClusterManager_PubSub_ReqRes_Message createGameSegmentMessage)
        {
            ServerLogger.LogInformation("Spawning new game segment");

            PushPop.BlockingPop(createGameSegmentMessage.GameSegmentId, Constants.GameSegmentCreationWait).Then((content) =>
            {
                ClusterManagerPubSub.PublishToServerManager(new CreateGameSegment_Response_ClusterManager_ServerManager_PubSub_ReqRes_Message()
                {
                    GameSegmentId = createGameSegmentMessage.GameSegmentId,
                    MessageId = createGameSegmentMessage.MessageId,
                });

                ServerLogger.LogInformation("Game Segment Server Created!", createGameSegmentMessage.GameSegmentId);
            }).Error(a =>
            {
                ServerLogger.LogError("Game Segment Server Creation Failed!");
            });


            count++;

            var arguments = new[]
            {
                "", "gamesegment", createGameSegmentMessage.GameSegmentId
            };

            startApp(arguments, "./outgs.log");

        }

        private void startApp(string[] arguments, string logFile)
        {
            ServerLogger.LogInformation("Spawning Application");



            if (Constants.DontSpawnNewApp)
            {
                ServerLogger.LogInformation("Fake start app");
                var serverStarter = new ServerStarter();
                ((dynamic)arguments).splice(0, 0, "");
                serverStarter.Start(ServerStarter.InstantiateLogic, arguments);

            }
            else
            {

                ServerLogger.LogInformation("Real start app");
                var spawn = Global.Require<ChildProcess>("child_process").Spawn;

                var fs = Global.Require<FS>("fs");
                var m = fs.OpenSync(logFile, "a", null);
                var @out = fs.OpenSync(logFile, "a", null);
                var err = fs.OpenSync(logFile, "a", null);


                var str = @"C:\Users\deste_000\AppData\Roaming\npm\node-debug.cmd";
                if (count >= 0)
                    str = "node";


                string appName;
                if (ConnectionConstants.Production)
                {
                    appName = "prod-app.js";

                }
                else
                {
                    appName = "app.js";
                }

                arguments[0] = appName;

                var child = spawn(str, arguments, new
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
}