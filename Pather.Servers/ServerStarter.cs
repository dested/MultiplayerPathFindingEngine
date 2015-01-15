using System;
using System.Diagnostics;
using System.Globalization;
using Pather.Common;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.TestFramework;
using Pather.Common.Utils;
using Pather.Servers.Common.PubSub;
using Pather.Servers.Common.PushPop;
using Pather.Servers.Common.SocketManager;
using Pather.Servers.Database;
using Pather.Servers.Libraries.Redis;
using Pather.Servers.Utils;
using Pather.Servers.Utils.Linode;

namespace Pather.Servers
{
    public class ServerStarter
    {
        public static  IInstantiateLogic InstantiateLogic;

        public void Start(IInstantiateLogic instantiateLogic, string[] arguments)
        {
            Debug.Break();

            new LinodeBuilder().Init();

            InstantiateLogic = instantiateLogic;
            var arg = arguments[2];

            if (string.IsNullOrEmpty(arg))
            {
                throw new Exception("Server argument not supplied");
            }

            arg = arg.ToLower();
            Global.Console.Log("Server started", arg);

            if (arg == "test")
            {
                string testClass = null;

                if (!string.IsNullOrEmpty(arguments[3]))
                {
                    testClass = arguments[3];
                }

                TestFramework.RunTests(testClass);
                return;
            }


            try
            {
                int num;
                if (!int.TryParse(ConnectionConstants.RedisIP[0].ToString(), out num))
                {
                    var dns = Global.Require<dynamic>("dns");
                    dns.lookup(ConnectionConstants.RedisIP, (Action<string, string>)((err, value) =>
                    {
                        ConnectionConstants.RedisIP = value;
                        ready(arg,arguments);
                    }));
                }
                else
                {
                    ready(arg, arguments);

                }


            }
            catch (Exception exc)
            {
                Global.Console.Log("CRITICAL FAILURE: ", exc);
            }
        }

        private  void ready(string server,string[] arguments)
        {
            switch (server)
            {
                case "all":
                    createTickServer();
                    createMonitorServer();
                    createAuthServer();
                    createServerManager();
                    createGameWorldServer();
                    createHeadServer();
                    break;
                case "gt":
                case "gateway":
                    createGatewayServer(arguments[3], int.Parse(arguments[4]));
                    break;
                case "au":
                case "auth":
                    createAuthServer();
                    break;
                case "m":
                case "monitor":
                    createMonitorServer();
                    break;
                case "h":
                case "head":
                    createHeadServer();
                    break;
                case "cm":
                case "clustermanager":
                    createClusterManagerServer(arguments[3]);
                    break;
                case "gs":
                case "gamesegment":
                    createGameSegmentServer(arguments[3]);
                    break;
                case "sm":
                case "servermanager":
                    createServerManager();
                    break;
                case "gw":
                case "gameworld":
                    createGameWorldServer();
                    break;
                case "t":
                case "tick":
                    createTickServer();
                    break;
                default:
                    Global.Console.Log("Failed to load: ", arguments[2]);
                    break;
            }
        }

        private void createServerManager()
        {
            new ServerManager.ServerManager(new PubSub(), new PushPop());
        }

        private void createTickServer()
        {
            new TickServer.TickServer(new PubSub());
        }

        private void createGameWorldServer()
        {
            new GameWorldServer.GameWorldServer(new PubSub(), new DatabaseQueries(), InstantiateLogic);
        }

        private void createGameSegmentServer(string gameSegmentId)
        {
            new GameSegmentServer.GameSegmentServer(new PubSub(), new PushPop(), gameSegmentId, InstantiateLogic);
        }

        private void createClusterManagerServer(string clusterManagerId)
        {
            new ClusterManager.ClusterManager(new PubSub(), new PushPop(), clusterManagerId);
        }

        private void createHeadServer()
        {
            new HeadServer.HeadServer(new PubSub());
        }

        private void createMonitorServer()
        {
            new MonitorServer.MonitorServer();
        }

        private void createAuthServer()
        {
            new AuthServer.AuthServer();
        }

        private void createGatewayServer(string gatewayId, int port)
        {
            new GatewayServer.GatewayServer(new PubSub(), new PushPop(), new SocketIOManager(), gatewayId, port);
        }
    }
}