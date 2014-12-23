using Pather.Servers.Common.SocketManager;

namespace Pather.Servers.GatewayServer
{
    internal class GatewayUser
    {
        public ISocket Socket { get; set; }
        public string UserToken { get; set; }
    }
}