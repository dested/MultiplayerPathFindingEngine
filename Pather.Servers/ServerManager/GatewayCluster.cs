using System.Collections.Generic;
using Pather.Common;

namespace Pather.Servers.ServerManager
{
    public class GatewayCluster
    {
        public List<GatewayServer> GatewayServers;

        public GatewayCluster()
        {
            GatewayServers = new List<GatewayServer>();
        }

        public string ClusterManagerId;

        public bool CanCreateNewSegment()
        {
            return GatewayServers.Count < Constants.MaxGatewaysPerCluster;
        }
    }
}