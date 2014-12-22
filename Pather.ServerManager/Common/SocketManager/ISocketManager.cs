using System;

namespace Pather.ServerManager.Common.SocketManager
{
    public interface ISocketManager
    {
        void Init(int port);
        void Connections(Action<ISocket> action);
    }
}