using System;
using Pather.Servers.Common.SocketManager;

namespace Pather.Servers.GatewayServer
{
    [Serializable]
    internal class GatewayUser
    {
        public ISocket Socket;
        public string UserId;
        public string GameSegmentId;
    }
}