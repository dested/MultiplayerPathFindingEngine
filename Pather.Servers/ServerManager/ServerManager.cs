using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using Pather.Common;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.ClusterManager;
using Pather.Common.Models.GameWorld.ServerManager;
using Pather.Common.Models.Head;
using Pather.Common.Models.ServerManager;
using Pather.Common.Models.ServerManager.Base;
using Pather.Common.Utils;
using Pather.Common.Utils.Promises;
using Pather.Servers.Common.PubSub;
using Pather.Servers.Common.PushPop;
using Pather.Servers.Common.ServerLogging;
using Pather.Servers.Utils.Linode;

namespace Pather.Servers.ServerManager
{
    public class ServerManager
    {
        public IPushPop PushPop;
        private ServerManagerPubSub serverManagerPubSub;
        private readonly List<GameSegmentCluster> gameSegmentClusters;
        private readonly List<GatewayCluster> gatewayClusters;
        private LinodeBuilder linodeBuilder;
        public ServerLogger ServerLogger;

        public ServerManager(IPubSub pubSub, IPushPop pushPop)
        {
            PushPop = pushPop;
            gameSegmentClusters = new List<GameSegmentCluster>();
            gatewayClusters = new List<GatewayCluster>();
            linodeBuilder = new LinodeBuilder();
            
            ServerLogger = new ServerLogger("ServerManager", "0");


            Q.All(pubSub.Init(ServerLogger), pushPop.Init(ServerLogger), linodeBuilder.Init(ServerLogger)).Then(() => ready(pubSub));
        }


        private void ready(IPubSub pubSub)
        {
            serverManagerPubSub = new ServerManagerPubSub(pubSub,ServerLogger);
            serverManagerPubSub.Init();

            serverManagerPubSub.OnMessage += OnMessage;
        }


        private void OnMessage(ServerManager_PubSub_Message message)
        {
            switch (message.Type)
            {
                case ServerManager_PubSub_MessageType.CreateGameSegment:
                    CreateGameSegmentMessage((CreateGameSegment_GameWorld_ServerManager_PubSub_ReqRes_Message)message);
                    break;
                case ServerManager_PubSub_MessageType.CreateGateway:
                    CreateGatewayMessage((CreateGateway_Head_ServerManager_PubSub_ReqRes_Message)message);
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        private void CreateGatewayMessage(CreateGateway_Head_ServerManager_PubSub_ReqRes_Message message)
        {
            foreach (var gatewayCluster in gatewayClusters)
            {
                if (gatewayCluster.CanCreateNewSegment())
                {
                    ServerLogger.LogDebug("Creating new gateway", message);
                    CreateNewGateway(gatewayCluster, message);
                    return;
                }
            }

            ServerLogger.LogDebug("Creating new gateway Cluster", message);
            CreateNewGatewayCluster(message);
        }


        private void CreateGameSegmentMessage(CreateGameSegment_GameWorld_ServerManager_PubSub_ReqRes_Message message)
        {
            foreach (var gameSegmentCluster in gameSegmentClusters)
            {
                if (gameSegmentCluster.CanCreateNewSegment())
                {
                    ServerLogger.LogDebug("Creating new game segment", message);
                    CreateNewGameSegment(gameSegmentCluster, message);
                    return;
                }
            }

            ServerLogger.LogDebug("Creating new game segment Cluster", message);
            CreateNewGameSegmentCluster(message);
        }


        private void CreateNewGateway(GatewayCluster gatewayCluster, CreateGateway_Head_ServerManager_PubSub_ReqRes_Message message)
        {
            serverManagerPubSub.PublishToClusterManagerWithCallback<CreateGateway_Response_ClusterManager_ServerManager_PubSub_ReqRes_Message>(
                gatewayCluster.ClusterManagerId,
                new CreateGateway_ServerManager_ClusterManager_PubSub_ReqRes_Message()
                {
                    GatewayId = Utilities.UniqueId(),
                    Port = NextGatewayPort()
                }).Then(response =>
                {
                    gatewayCluster.GatewayServers.Add(new GatewayServer());
                    serverManagerPubSub.PublishToHead(new CreateGateway_Response_ServerManager_Head_PubSub_ReqRes_Message()
                    {
                        MessageId = message.MessageId,
                        GatewayId = response.GatewayId
                    });
                });
        }

        private int NextGatewayPort()
        {
            var port = 1800;
            foreach (var gatewayCluster in gatewayClusters)
            {
                foreach (var gatewayServer in gatewayCluster.GatewayServers)
                {
                    port++;
                }
            }
            return port;
        }

        private void CreateNewGameSegment(GameSegmentCluster gameSegmentCluster, CreateGameSegment_GameWorld_ServerManager_PubSub_ReqRes_Message message)
        {
            serverManagerPubSub.PublishToClusterManagerWithCallback<CreateGameSegment_Response_ClusterManager_ServerManager_PubSub_ReqRes_Message>(
                gameSegmentCluster.ClusterManagerId,
                new CreateGameSegment_ServerManager_ClusterManager_PubSub_ReqRes_Message()
                {
                    GameSegmentId = Utilities.UniqueId(),
                }).Then(response =>
                {
                    gameSegmentCluster.GameSegments.Add(new GameSegment()
                    {
                    });
                    serverManagerPubSub.PublishToGameWorld(new CreateGameSegment_Response_ServerManager_GameWorld_PubSub_ReqRes_Message()
                    {
                        MessageId = message.MessageId,
                        GameSegmentId = response.GameSegmentId
                    });
                });
        }

        private void CreateNewGatewayCluster(CreateGateway_Head_ServerManager_PubSub_ReqRes_Message message)
        {
            SpawnNewServer().Then(a =>
            {
                var gatewayCluster = new GatewayCluster();
                gatewayCluster.ClusterManagerId = a.ClusterManagerId;
                gatewayClusters.Add(gatewayCluster);
                CreateNewGateway(gatewayCluster, message);
            });
        }


        private void CreateNewGameSegmentCluster(CreateGameSegment_GameWorld_ServerManager_PubSub_ReqRes_Message message)
        {
            SpawnNewServer().Then(a =>
            {
                var gameSegmentCluster = new GameSegmentCluster();
                gameSegmentCluster.ClusterManagerId = a.ClusterManagerId;
                gameSegmentClusters.Add(gameSegmentCluster);
                CreateNewGameSegment(gameSegmentCluster, message);
            });
        }


        private Promise<ClusterCreation, UndefinedPromiseError> SpawnNewServer()
        {
            var deferred = Q.Defer<ClusterCreation, UndefinedPromiseError>();
            var applicationId = Utilities.UniqueId();



            if (ConnectionConstants.Production)
            {
                linodeBuilder.Create("Cluster-"+applicationId, "Node", LinodeBuilder.SmallPlanId).Then((instance) =>
                {
                    //ssh into the system and start the cluster manager
                    deferred.Resolve(new ClusterCreation()
                    {
                        ClusterManagerId = applicationId
                    });
                    ServerLogger.LogInformation("Spawn Success");
                });
            }
            else
            {


                var application = "clustermanager";
                ServerLogger.LogInformation("Spawning new server");

                PushPop.BlockingPop(applicationId, Constants.GameSegmentCreationWait).Then((content) =>
                {
                    deferred.Resolve(new ClusterCreation()
                    {
                        ClusterManagerId = applicationId
                    });
                    ServerLogger.LogInformation("Spawn Success");
                }).Error(a =>
                {
                    ServerLogger.LogError("Spawn Fail");
                });


                startApp(new[]
                {
                    "", application, applicationId
                }, "./outcluster.log");

            }





            return deferred.Promise;
        }


        private void startApp(string[] arguments, string logFile)
        {
            ServerLogger.LogInformation("start app");



            if (Constants.DontSpawnNewApp)
            {
                ServerLogger.LogInformation("Fake start app");
                var serverStarter = new ServerStarter();
                ((dynamic)arguments).splice(0, 0, "");
                serverStarter.Start(ServerStarter.InstantiateLogic, arguments);

            }
            else
            {

                var spawn = Global.Require<ChildProcess>("child_process").Spawn;

                var fs = Global.Require<FS>("fs");
                var m = fs.OpenSync(logFile, "a", null);
                var @out = fs.OpenSync(logFile, "a", null);
                var err = fs.OpenSync(logFile, "a", null);


                var str = @"C:\Users\deste_000\AppData\Roaming\npm\node-debug.cmd";
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