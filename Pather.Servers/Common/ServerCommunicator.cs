using System;
using Pather.Common.Models.Gateway.Socket.Base;
using Pather.Common.Utils;
using Pather.Servers.Common.SocketManager;

namespace Pather.Servers.Common
{
    public class ServerCommunicator
    {
        private readonly ISocketManager socketManager;
        public Action<ISocket> OnNewConnection;
        public Action<ISocket> OnDisconnectConnection;

        public void ListenOnChannel<T>(ISocket socket, string channel, Action<ISocket, T> callback) where T : Socket_Message
        {
            socket.On<DataObject<T>>(channel, obj =>
            {
                callback(socket, obj.Data);
            });
        }

        public void OldListenOnChannel<T>(ISocket socket, string channel, Action<ISocket, T> callback)
        {
            socket.On<DataObject<T>>(channel, obj =>
            {
                callback(socket, obj.Data);
            });
        }

        public void SendMessage(ISocket socket, Socket_Message obj)
        {
            socket.Emit("Gateway.Message", new DataObject<Socket_Message>(obj));
        }

        public void OldSendMessage<T>(ISocket socket, string channel, T obj)
        {
            socket.Emit(channel, new DataObject<T>(obj));
        }

        public ServerCommunicator(ISocketManager socketManager, int port)
        {
            this.socketManager = socketManager;

            socketManager.Init(port);

            socketManager.Connections(socket =>
            {
                OnNewConnection(socket);
                socket.Disconnect(() =>
                {
                    if (OnDisconnectConnection != null)
                    {
                        OnDisconnectConnection(socket);
                    }
                });
            });
        }

        public string URL
        {
            get { return socketManager.URL; }
        }
    }
}