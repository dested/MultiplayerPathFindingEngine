using System;
using System.Collections.Generic;
using Pather.Common;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.ClusterManager;
using Pather.Common.Models.GameWorld.Gateway;
using Pather.Common.Models.Head;
using Pather.Common.Models.Head.Base;
using Pather.Common.Models.ServerManager;
using Pather.Common.Models.ServerManager.Base;
using Pather.Common.Utils;
using Pather.Common.Utils.Promises;
using Pather.Servers.Common.PubSub;
using Pather.Servers.Common.PushPop;
using Pather.Servers.Common.ServerLogging;
using Pather.Servers.Libraries.Socket.IO;
using Pather.Servers.Utils;

namespace Pather.Servers.ServerManager
{
    public class GatewayCluster
    {
        public List<GatewayServer> GatewayServers;

        public GatewayCluster()
        {
            GatewayServers = new List<GatewayServer>();
        }

        public string ClusterManagerId;

        public bool CanCreateNewSegment()
        {
            return GatewayServers.Count < Constants.MaxGatewaysPerCluster;

        }

    }

    public class GatewayServer
    {

    }

    public class GameSegmentCluster
    {
        public List<GameSegment> GameSegments;

        public GameSegmentCluster()
        {
            GameSegments = new List<GameSegment>();
        }

        public string ClusterManagerId;

        public bool CanCreateNewSegment()
        {
            return GameSegments.Count < Constants.MaxGameSegmentsPerCluster;
        }
    }

    public class GameSegment
    {

    }

    public class ServerManager
    {
        public IPushPop PushPop;
        private ServerManagerPubSub serverManagerPubSub;
        private List<GameSegmentCluster> gameSegmentClusters;
        private List<GatewayCluster> gatewayClusters;

        public ServerManager(IPubSub pubSub, IPushPop pushPop)
        {
            PushPop = pushPop;
            gameSegmentClusters = new List<GameSegmentCluster>();
            gatewayClusters = new List<GatewayCluster>();

            Q.All(pubSub.Init(), pushPop.Init()).Then(() => ready(pubSub));
        }

        private void ready(IPubSub pubSub)
        {
            serverManagerPubSub = new ServerManagerPubSub(pubSub);
            serverManagerPubSub.Init();

            serverManagerPubSub.OnMessage += OnMessage;

        }


        private void OnMessage(ServerManager_PubSub_Message message)
        {
            switch (message.Type)
            {
                case ServerManager_PubSub_MessageType.CreateGameSegment:
                    CreateGameSegmentMessage((CreateGameSegment_GameWorld_ServerManager_PubSub_ReqRes_Message) message);
                    break;
                case ServerManager_PubSub_MessageType.CreateGateway:
                    CreateGatewayMessage((CreateGateway_Head_ServerManager_PubSub_ReqRes_Message) message);
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
                    CreateNewGateway(gatewayCluster, message);
                    return;
                }
            }

            CreateNewGatewayCluster(message);
        }



        private void CreateGameSegmentMessage(CreateGameSegment_GameWorld_ServerManager_PubSub_ReqRes_Message message)
        {

            foreach (var gameSegmentCluster in gameSegmentClusters)
            {
                if (gameSegmentCluster.CanCreateNewSegment())
                {
                    CreateNewGameSegment(gameSegmentCluster, message);
                    return;
                }
            }

            CreateNewGameSegmentCluster(message);


        }


        private void CreateNewGateway(GatewayCluster gatewayCluster, CreateGateway_Head_ServerManager_PubSub_ReqRes_Message message)
        {
            serverManagerPubSub.PublishToClusterManagerWithCallback<CreateGateway_Response_ClusterManager_ServerManager_PubSub_ReqRes_Message>(
                gatewayCluster.ClusterManagerId,
                new CreateGateway_ServerManager_ClusterManager_PubSub_ReqRes_Message()
                {
                    GatewayId = Utilities.UniqueId(),
                    Port=NextGatewayPort()
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
            int port = 1800;
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
                    gameSegmentCluster.GameSegments.Add(new GameSegment(){});
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
            string application="clustermanager";
            string applicationId = Utilities.UniqueId();


            Global.Console.Log("Spawning new server");
            var spawn = Global.Require<ChildProcess>("child_process").Spawn;
            var fs = Global.Require<FS>("fs");
            var m = fs.OpenSync("./outcluster.log", "a", null);
            var @out = fs.OpenSync("./outcluster.log", "a", null);
            var err = fs.OpenSync("./outcluster.log", "a", null);

            PushPop.BlockingPop(applicationId, Constants.GameSegmentCreationWait).Then((content) =>
            {

                deferred.Resolve(new ClusterCreation(){ClusterManagerId = applicationId});
                Global.Console.Log("Spawn Success");
            }).Error(a =>
            {
                Global.Console.Log("Spawn Fail");
            });


            string str = @"C:\Users\deste_000\AppData\Roaming\npm\node-debug.cmd";
            str = "node";
            var child = spawn(str, new[]
            {
                "app.js", application, applicationId
            }, new
            {
                stdio = new object[]
                {
                    m, @out, err
                },
                //                detached = true,
            });

            //            child.Unref();






            return deferred.Promise;
        }

    }

    internal class ClusterCreation
    {
        public string ClusterManagerId;
    }
}