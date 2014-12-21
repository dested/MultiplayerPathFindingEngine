using System;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.Gateway;
using Pather.ServerManager.Libraries.Socket.IO;
using Pather.ServerManager.Utils;

namespace Pather.ServerManager.GatewayServer
{
    public class GatewayServer
    {
        public GatewayServer()
        {
            var gatewayName = "Gateway " + Guid.NewGuid();

            var http = Global.Require<Http>("http");

            var app = http.CreateServer((req, res) => res.End());

            var io = SocketIO.Listen(app);
            
            var port = 1800 + Math.Truncate((Math.Random() * 4000d));
            port = 1800;
            
            string currentIP = ServerHelper.GetNetworkIPs()[0] + ":" + port;
            string url;
                url = string.Format("http://{0}", currentIP);
            
            Global.Console.Log("Server URL", url);
            app.Listen(port);

            io.Sockets.On("connection",(SocketIOConnection socket) =>
                          {
                              socket.On("Gateway.Message",
                                        (GatewayMessageModel data) =>
                                        {
                                            Global.Console.Log("Socket message ", data);

                                        });

                              socket.On("Gateway.Join",
                                        (GatewayJoinModel data) =>
                                        {
                                        });
                              socket.On("disconnect",
                                        (string data) =>
                                        {
                                        });
                          });

        }

         
    }

}