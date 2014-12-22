using System;
using System.Collections.Generic;
using Pather.Common.Libraries.NodeJS;
using Pather.ServerManager.Libraries.Socket.IO;
using Pather.ServerManager.Utils;

namespace Pather.ServerManager.Common.SocketManager
{

    public class SocketIOManager : ISocketManager
    {
        private SocketIOClient io;

        public void Init(int port)
        {

            var http = Global.Require<Http>("http");

            var app = http.CreateServer((req, res) => res.End());

            io = SocketIO.Listen(app);


            List<string> networkIPs = ServerHelper.GetNetworkIPs();
            string currentIP = networkIPs[0] + ":" + port;
            string url;
            url = string.Format("http://{0}", currentIP);

            Global.Console.Log("Server URL", url);
            app.Listen(port);

        }

        public void Connections(Action<ISocket> action)
        {
            io.Sockets.On("connection", (SocketIOConnection socket) =>
            {
                action(new SocketIOSocket(socket));
            });

        }
    }
}