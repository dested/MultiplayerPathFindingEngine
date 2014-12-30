using System;

namespace Pather.Servers.HeadServer.Models
{
    public class Gateway
    {
        public string Address;
        public int LiveConnections;
        public DateTime LastPing;
        public string GatewayId;
    }
}