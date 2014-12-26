using System;
using System.Diagnostics;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.TestFramework;
using Pather.Servers.Common.PubSub;
using Pather.Servers.Common.PushPop;
using Pather.Servers.Common.SocketManager;
using Pather.Servers.Database;
using Pather.Servers.GameSegment;

namespace Pather.Servers
{
    public class ServerManager
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
                        CreateTickServer();
                        CreateMonitorServer();
                        CreateAuthServer();
                        createGatewayServer("DEFAULTGATEWAYID",1800);
                        CreateGameClusterServer("TODO:DEFAULTGAMESEGMENTCLUSTER");
                        CreateGameWorldServer();
                        break;
                    case "gt":
                    case "gateway":
                        createGatewayServer(Global.Process.Arguments[3], int.Parse(Global.Process.Arguments[4]));
                        break;
                    case "au":
                    case "auth":
                        CreateAuthServer();
                        break;
                    case "m":
                    case "monitor":
                        CreateMonitorServer();
                        break;
                    case "gsc":
                    case "gamesegmentcluster":
                        CreateGameClusterServer("TODO:DEFAULTGAMESEGMENTCLUSTER");
                        break;
                    case "gs":
                    case "game":
                        CreateGameSegmentServer(Global.Process.Arguments[3]);
                        break;
                    case "gw":
                    case "gameworld":
                        CreateGameWorldServer();
                        break;
                    case "t":
                    case "tick":
                        CreateTickServer();
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

        private static void CreateTickServer()
        {
            new TickServer.TickServer(new PubSub());
        }

        private static void CreateGameWorldServer()
        {
            new GameWorldServer.GameWorldServer(new PubSub(), new DatabaseQueries());
        }

        private static void CreateGameSegmentServer(string gameSegmentId)
        {
            new GameSegmentServer( new PubSub(), new PushPop(), gameSegmentId);
        }

        private static void CreateGameClusterServer(string gameSegmentClusterId)
        {
            new GameSegmentCluster.GameSegmentCluster(new PubSub(), new PushPop(), gameSegmentClusterId);
        }

        private static void CreateMonitorServer()
        {
            new MonitorServer.MonitorServer();
        }

        private static void CreateAuthServer()
        {
            new AuthServer.AuthServer();
        }

        private static void createGatewayServer(string gatewayId, int port)
        {
            new GatewayServer.GatewayServer(new PubSub(), new SocketIOManager(), gatewayId,port);
        }
    }
}