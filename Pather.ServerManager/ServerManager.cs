using System;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.TestFramework;
using Pather.ServerManager.Common;
using Pather.ServerManager.Database;

namespace Pather.ServerManager
{
    public class ServerManager
    {
        public static void Main()
        {
            string arg = Global.Process.Arguments[2];


            if (string.IsNullOrEmpty(arg))
            {
                throw new Exception("Server argument not supplied");
            }

            arg = arg.ToLower();

            if (arg == "test")
            {
                TestFramework.RunTests();
                return;
            }


            try
            {
                switch (arg)
                {
                    case "gt":
                    case "gateway":
                        new GatewayServer.GatewayServer(new PubSub());
                        break;
                    case "au":
                    case "auth":
                        new AuthServer.AuthServer();
                        break;
                    case "g":
                    case "game":
                        new GameServer.GameServer();
                        break;
                    case "gw":
                    case "gameworld":
                        new GameWorldServer.GameWorldServer(new PubSub(), new DatabaseQueries());
                        break;
                    case "t":
                    case "tick":
                        new TickServer.TickServer();
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