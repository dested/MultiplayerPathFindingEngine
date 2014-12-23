using System;
using System.Diagnostics;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.TestFramework;
using Pather.Servers.Common.PubSub;
using Pather.Servers.Common.PushPop;
using Pather.Servers.Common.SocketManager;
using Pather.Servers.Database;

namespace Pather.Servers
{
    public class ServerManager
    {
        public static void Main()
        {
            Debugger.Break();
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
                    case "gt":
                    case "gateway":
                        new GatewayServer.GatewayServer(new PubSub(), new SocketIOManager());
                        break;
                    case "au":
                    case "auth":
                        new AuthServer.AuthServer();
                        break;
                    case "gsc":
                    case "GameSegmentCluster":
                        new GameSegmentCluster.GameSegmentCluster(new PubSub(), new PushPop());
                        break;
                    case "gs":
                    case "game":
                        new GameSegment.GameSegment(new SocketIOManager(), new PubSub(), new PushPop(), Global.Process.Arguments[3]);
                        break;
                    case "gw":
                    case "gameworld":
                        new GameWorldServer.GameWorldServer(new PubSub(), new DatabaseQueries());
                        break;
                    case "t":
                    case "tick":
                        new TickServer.TickServer(new PubSub());
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
    }
}