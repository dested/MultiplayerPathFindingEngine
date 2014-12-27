using System;
using System.Collections.Generic;
using Pather.Common.Libraries.NodeJS;
using Pather.Servers.Common.PubSub;
using Pather.Servers.Common.ServerLogging;
using Pather.Servers.GameSegment.Logger;
using Pather.Servers.Libraries.Socket.IO;
using Pather.Servers.Utils;

namespace Pather.Servers.MonitorServer
{
    public class MonitorServer
    {
        public MonitorServer()
        {
            startMonitorServer();
            startSegmentMonitorServer();
        }

        private static void startSegmentMonitorServer()
        {
            //ExtensionMethods.debugger("");
            var http = Global.Require<Http>("http");

            var app = http.CreateServer((req, res) => res.End());

            var io = SocketIO.Listen(app);
            var port = 9992;

            var currentIP = ServerHelper.GetNetworkIPs()[0];
            Global.Console.Log(currentIP);

            app.Listen(port);
            io.Set("log level", 0);


            var connections = new List<SocketIOConnection>();

            var logListener = new GameSegmentLogListener( (mess) =>
            {
                foreach (var socketIoConnection in connections)
                {
                    socketIoConnection.Emit("message", mess);
                }
            });

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
        private static void startMonitorServer()
        {
            //ExtensionMethods.debugger("");
            var http = Global.Require<Http>("http");

            var app = http.CreateServer((req, res) => res.End());

            var io = SocketIO.Listen(app);
            var port = 9991;

            var currentIP = ServerHelper.GetNetworkIPs()[0];
            Global.Console.Log(currentIP);

            app.Listen(port);
            io.Set("log level", 0);
            string[] serverTypes =
            {
                "GameSegment", "GameSegmentCluster", "GameWorld", "Gateway", "Chat", "Tick", "Auth"
            };
            var connections = new List<SocketIOConnection>();

            new ServerLogListener(serverTypes, (mess) =>
            {
                foreach (var socketIoConnection in connections)
                {
                    socketIoConnection.Emit(mess.ServerType, mess);
                }
            });

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