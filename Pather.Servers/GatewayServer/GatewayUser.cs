using Pather.Servers.Common.SocketManager;

namespace Pather.Servers.GatewayServer
{
    internal class GatewayUser
    {
        public ISocket Socket { get; set; }
        public string UserId { get; set; }
        public string GameSegmentId { get; set; }
    }
}