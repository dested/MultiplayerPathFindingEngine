using System;
using System.Collections.Generic;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.Gateway;
using Pather.ServerManager.Common;
using Pather.ServerManager.Libraries.Socket.IO;
using Pather.ServerManager.Utils;

namespace Pather.ServerManager.GatewayServer
{
    public class GatewayServer
    {
        private SocketIOClient io;
        private string gatewayName;

        public GatewayServer(IPubSub pubsub)
        {
            gatewayName = "Gateway " + Guid.NewGuid();
            Global.Console.Log(gatewayName);
            var http = Global.Require<Http>("http");

            var app = http.CreateServer((req, res) => res.End());

            io = SocketIO.Listen(app);
            
            var port = 1800 + Math.Truncate((Math.Random() * 4000d));
            port = 1800;

            List<string> networkIPs = ServerHelper.GetNetworkIPs();
            string currentIP = networkIPs[0] + ":" + port;
            string url;
                url = string.Format("http://{0}", currentIP);
            
            Global.Console.Log("Server URL", url);
            app.Listen(port);



            pubsub.Init(pubsubReady);


        }

        private void pubsubReady(IPubSub pubsub)
        {
            Global.Console.Log("pubsub ready");

            pubsub.Subscribe(gatewayName,gatewayMessage);

            io.Sockets.On("connection",(SocketIOConnection socket) =>
                          {
                              socket.On("Gateway.Message",
                                        (GatewaySocketMessageModel data) =>
                                        {
                                            Global.Console.Log("Socket message ", data);
                                        });

                              socket.On("Gateway.Join",
                                        (GatewayJoinModel data) =>
                                        {
                                            var f=data.UserName;
                                        });
                              socket.On("disconnect",
                                        (string data) =>
                                        {
                                        });
                          });
        }

        private void gatewayMessage(string message)
        {
            Global.Console.Log("message:",message);
        }
    }
}