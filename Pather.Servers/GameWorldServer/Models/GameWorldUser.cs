using System.Collections.Generic;

namespace Pather.Servers.GameWorldServer.Models
{
    public class GameWorldUser
    {
        public string UserId;
        public int X;
        public int Y;
        public string GatewayId;
        public GameSegment GameSegment;
        public List<GameWorldNeighbor> Neighbors { get; set; }


        public GameWorldNeighbor ClosestNeighbor()
        {
            GameWorldNeighbor closestNeighbor = null;
            foreach (var gameWorldNeighbor in Neighbors)
            {
                if (closestNeighbor == null || gameWorldNeighbor.Distance < closestNeighbor.Distance)
                {
                    closestNeighbor = gameWorldNeighbor;
                }
            }
            return closestNeighbor;
        }
    }
}