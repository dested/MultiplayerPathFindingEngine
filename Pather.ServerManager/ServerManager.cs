using System;
using Pather.Common.Libraries.NodeJS;

namespace Pather.ServerManager
{
    public class ServerManager
    {
        public static void Main()
        {
            try
            {
                switch (Global.Process.Arguments[2].ToLower())
                {
                    case "gt":
                    case "gateway":
                        new GatewayServer.GatewayServer();
                        break;
                    case "g":
                    case "game":
                        new GameServer.GameServer();
                        break;
                    case "gw":
                    case "gameworld":
                        new GameWorldServer.GameWorldServer();
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