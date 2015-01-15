using System;
using Pather.Servers.Common.ServerLogging;

namespace Pather.Servers.Common.SocketManager
{
    public interface ISocketManager
    {
        void Init(int port, ServerLogger serverLogger);
        void Connections(Action<ISocket> action);
        string URL { get; }
    }
}