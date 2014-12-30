using System;
using Pather.Common.Libraries.NodeJS;
using Pather.Servers.Libraries.Socket.IO;
using Pather.Servers.Utils;

namespace Pather.Servers.Common.SocketManager
{
    public class SocketIOManager : ISocketManager
    {
        private SocketIOClient io;
        private string url;

        public void Init(int port)
        {
            var http = Global.Require<Http>("http");

            var app = http.CreateServer((req, res) => res.End());

            io = SocketIO.Listen(app);


            var networkIPs = ServerHelper.GetNetworkIPs();
            var currentIP = networkIPs[0] + ":" + port;
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

        public string URL { get { return url; } }
    }
}