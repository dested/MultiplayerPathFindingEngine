using System;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.TestFramework;
using Pather.Servers.Common.PubSub;
using Pather.Servers.Common.PushPop;
using Pather.Servers.Common.SocketManager;
using Pather.Servers.Database;

namespace Pather.Servers
{
    public class ServerStarter
    {
        public static void Main()
        {
            var arg = Global.Process.Arguments[2];

            if (string.IsNullOrEmpty(arg))
            {
                throw new Exception("Server argument not supplied");
            }

            arg = arg.ToLower();
            Global.Console.Log("Server started", arg);

            if (arg == "test")
            {
                string testClass = null;

                if (!string.IsNullOrEmpty(Global.Process.Arguments[3]))
                {
                    testClass = Global.Process.Arguments[3];
                }

                TestFramework.RunTests(testClass);
                return;
            }


            try
            {
                switch (arg)
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
                        createGatewayServer(Global.Process.Arguments[3], int.Parse(Global.Process.Arguments[4]));
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
                        createClusterManagerServer(Global.Process.Arguments[3]);
                        break;
                    case "gs":
                    case "gamesegment":
                        createGameSegmentServer(Global.Process.Arguments[3]);
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
                        Global.Console.Log("Failed to load: ", Global.Process.Arguments[2]);
                        break;
                }
            }
            catch (Exception exc)
            {
                Global.Console.Log("CRITICAL FAILURE: ", exc);
            }
        }

        private static void createServerManager()
        {
            new ServerManager.ServerManager(new PubSub(), new PushPop());
        }

        private static void createTickServer()
        {
            new TickServer.TickServer(new PubSub());
        }

        private static void createGameWorldServer()
        {
            new GameWorldServer.GameWorldServer(new PubSub(), new DatabaseQueries());
        }

        private static void createGameSegmentServer(string gameSegmentId)
        {
            new GameSegmentServer.GameSegmentServer(new PubSub(), new PushPop(), gameSegmentId);
        }

        private static void createClusterManagerServer(string clusterManagerId)
        {
            new ClusterManager.ClusterManager(new PubSub(), new PushPop(), clusterManagerId);
        }

        private static void createHeadServer()
        {
            new HeadServer.HeadServer(new PubSub());
        }

        private static void createMonitorServer()
        {
            new MonitorServer.MonitorServer();
        }

        private static void createAuthServer()
        {
            new AuthServer.AuthServer();
        }

        private static void createGatewayServer(string gatewayId, int port)
        {
            new GatewayServer.GatewayServer(new PubSub(), new PushPop(), new SocketIOManager(), gatewayId, port);
        }
    }
}