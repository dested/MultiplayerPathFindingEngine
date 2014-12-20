using System;
using Pather.Common.Libraries;
using Pather.Common.Libraries.NodeJS;

namespace Pather.Server
{
    public class ServerManager
    {
        public static void Main()
        {
            try
            {
                switch (Global.Process.Arguments[2].ToLower())
                {
                    case "gw":
                    case "gateway":
                        new GatewayServer.GatewayServer();
                        break;
                    case "g":
                    case "game":
                        new GameServer.GameServer();
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