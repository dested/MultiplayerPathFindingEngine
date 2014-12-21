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

            if (Global.Process.Arguments[2].ToLower() == "test")
            {
                TestFramework.RunTests();
                return;
            }


            try
            {
                switch (Global.Process.Arguments[2].ToLower())
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