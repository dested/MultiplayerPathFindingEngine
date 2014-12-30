using System.Collections.Generic;
using Pather.Common.Libraries.NodeJS;
using Pather.Servers.Common.ServerLogging;
using Pather.Servers.Libraries.Socket.IO;
using Pather.Servers.Utils;

namespace Pather.Servers.ServerManager
{
    public class ServerManager
    {
        public ServerManager()
        {
            //ExtensionMethods.debugger("");
            var http = Global.Require<Http>("http");

            var app = http.CreateServer((req, res) => res.End());


            var currentIP = ServerHelper.GetNetworkIPs()[0];
            Global.Console.Log(currentIP);
 
        }
         
    }
}