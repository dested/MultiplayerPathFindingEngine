using System;
using Pather.Common.Libraries.NodeJS;
using Pather.Servers.Common.ServerLogging;
using Pather.Servers.Libraries.Socket.IO;
using Pather.Servers.Utils;

namespace Pather.Servers.Common.SocketManager
{
    public class SocketIOManager : ISocketManager
    {
        private SocketIOClient io;
        private ServerLogger serverLogger;

        public void Init(int port,ServerLogger serverLogger)
        {
            this.serverLogger = serverLogger;
            try
            {

                var http = Global.Require<Http>("http");

                var app = http.CreateServer((req, res) => res.End());

                io = SocketIO.Listen(app);


                var networkIPs = ServerHelper.GetNetworkIPs();
                var networkIP = networkIPs[0];
                if (networkIP == null)
                {
                    networkIP = "127.0.0.1";
                }
                var currentIP = networkIP + ":" + port;
                URL = string.Format("http://{0}", currentIP);

                serverLogger.LogInformation("Socket Server URL", URL);
                app.Listen(port);
            }
            catch (Exception e)
            {
                serverLogger.LogError("Socket Error", e);
            }
        }

        public void Connections(Action<ISocket> action)
        {
            io.Sockets.On("connection", (SocketIOConnection socket) =>
            {
                action(new SocketIOSocket(socket));
            });
        }

        public string URL { get; private set; }
    }
}