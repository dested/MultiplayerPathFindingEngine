using System.Collections.Generic;

namespace Pather.Servers.GameWorldServer
{
    public class PlayerClusterGroup
    {
        public PlayerClusterGroup()
        {
            PlayerClusters = new List<PlayerCluster>();
            NumberOfPlayers = 0;
        }

        public int NumberOfPlayers;
        public List<PlayerCluster> PlayerClusters;
    }
}