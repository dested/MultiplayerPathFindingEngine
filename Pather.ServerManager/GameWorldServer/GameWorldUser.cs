using System.Collections.Generic;

namespace Pather.ServerManager.GameWorldServer
{
    public class GameWorldUser
    {
        public string UserId;
        public int X;
        public int Y;
        public string GatewayServer;
        public GameSegment GameSegment;
        public List<GameWorldNeighbor> Neighbors { get; set; }

         

        public GameWorldNeighbor ClosestNeighbor()
        {
            GameWorldNeighbor closestNeighbor = null;
            foreach (var gameWorldNeighbor in Neighbors)
            {
                if (closestNeighbor==null ||gameWorldNeighbor.Distance < closestNeighbor.Distance)
                {
                    closestNeighbor = gameWorldNeighbor;
                }
            }
            return closestNeighbor;
        }
    }
}