using System;

namespace Pather.Servers.HeadServer
{
    public class Gateway
    {
        public string Address;
        public int LiveConnections;
        public DateTime LastPing;
        public string GatewayId;
    }
}