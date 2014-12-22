using Pather.ServerManager.Common.SocketManager;

namespace Pather.ServerManager.GatewayServer
{
    internal class GatewayUser
    {
        public ISocket Socket { get; set; }
        public string UserToken { get; set; }
    }
}