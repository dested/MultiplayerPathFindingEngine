using System;
using Pather.Common.Utils;
using Pather.Server.Libraries.NodeJS;
using Pather.Server.Libraries.Socket.IO;

namespace Pather.Server
{
    public class ServerCommunicator
    {
        public Action<SocketIOConnection> OnNewConnection ;
        public Action<SocketIOConnection> OnDisconnectConnection ;

        public void ListenOnChannel<T>(SocketIOConnection socket, string channel, Action<SocketIOConnection, T> callback)
        {
            socket.On<DataObject<T>>(channel, obj => callback(socket, obj.Data));
        }

        public void SendMessage(SocketIOConnection socket, string channel, object obj)
        {
            socket.Emit(channel, new DataObject<object>(obj));
        }

        public ServerCommunicator()
        {
            var http = Global.Require<Http>("http");

            var app = http.CreateServer((req, res) => res.End());
            var io = SocketIO.Listen(app);
            app.Listen(8991);

            io.Sockets.On("connection", (SocketIOConnection socket) =>
            {
//                Global.Console.Log("new connection");
                OnNewConnection(socket);
                socket.On("disconnect", () =>
                {
                    OnDisconnectConnection(socket);
                });
            });
        }
    }
}