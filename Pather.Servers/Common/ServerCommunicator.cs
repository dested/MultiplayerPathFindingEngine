using System;
using Pather.Common.Utils;
using Pather.Servers.Common.SocketManager;

namespace Pather.Servers.Common
{
    public class ServerCommunicator
    {
        private readonly ISocketManager socketManager;
        public Action<ISocket> OnNewConnection;
        public Action<ISocket> OnDisconnectConnection;

        public void ListenOnChannel<T>(ISocket socket, string channel, Action<ISocket, T> callback)
        {
            socket.On<DataObject<T>>(channel, obj => callback(socket, obj.Data));
        }

        public void SendMessage(ISocket socket, string channel, object obj)
        {
            socket.Emit(channel, new DataObject<object>(obj));
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
    }
}