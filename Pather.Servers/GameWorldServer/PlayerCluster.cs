using System.Collections.Generic;
using Pather.Servers.GameWorldServer.Models;

namespace Pather.Servers.GameWorldServer
{
    public class PlayerCluster
    {
        public PlayerCluster()
        {
            Players = new List<GameWorldUser>();
        }

        public List<GameWorldUser> Players;
        public GameSegment BestGameSegment;
    }
}