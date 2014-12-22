using System;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Utils;
using Pather.ServerManager.Libraries.Socket.IO;

namespace Pather.ServerManager.Common.SocketManager
{
    public class SocketIOSocket : ISocket
    {
        public SocketIOConnection Socket { get; set; }

        public SocketIOSocket(SocketIOConnection socket)
        {
            Socket = socket;
        }

        public void On<T>(string channel, Action<T> callback)
        {
            Socket.On(channel, callback);
        }

        public void Disconnect(Action callback)
        {
            Socket.On("disconnect", () =>
            {
                Global.Console.Log("Disconnectesion");
                callback();
            });

        }

        public void Emit<T>(string channel, DataObject<T> dataObject)
        {
            Socket.Emit(channel,dataObject);
        }
    }
}