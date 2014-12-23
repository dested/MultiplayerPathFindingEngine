using System;

namespace Pather.Servers.Common.SocketManager
{
    public interface ISocketManager
    {
        void Init(int port);
        void Connections(Action<ISocket> action);
    }
}