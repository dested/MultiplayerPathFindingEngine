using System.Collections.Generic;
using Pather.Common.Libraries.NodeJS;
using Pather.Servers.Common;
using Pather.Servers.Common.ServerLogger;
using Pather.Servers.Libraries.Socket.IO;
using Pather.Servers.Utils;

namespace Pather.Servers.MonitorServer
{
    public class MonitorServer
    {

        public MonitorServer()
        {
            //ExtensionMethods.debugger("");
            var http = Global.Require<Http>("http");

            var app = http.CreateServer((req, res) => res.End());

            var io = SocketIO.Listen(app);
            var port = 9991;

            string currentIP = ServerHelper.GetNetworkIPs()[0];
            Global.Console.Log(currentIP);

            app.Listen(port);
            io.Set("log level", 0);
            string[] serverTypes = { "GameSegment", "GameSegmentCluster", "GameWorld", "Gateway", "Chat", "Tick", "Auth" };
            List<SocketIOConnection> connections = new List<SocketIOConnection>();

            foreach (var serverType in serverTypes)
            {
                new ServerLogListener(serverType, (mess) =>
                {
                    foreach (var socketIoConnection in connections)
                    {
                        socketIoConnection.Emit(mess.ServerType, mess);
                    }
                });

            }
            io.Sockets.On("connection",
                         (SocketIOConnection socket) =>
                         {
                             Global.Console.Log("User Joined");
                             connections.Add(socket);
                             socket.On("disconnect",
                                       (string data) =>
                                       {
                                           connections.Remove(socket);

                                       });
                         });
        }


    }
}