using System.Collections.Generic;

namespace Pather.Servers.GameSegmentServer.Models
{
    public class GameSegmentUser
    {
        public string GameSegmentId;
        public string GatewayId;
        public int X;
        public int Y;
        public string UserId;
        public List<GameSegmentNeighbor> Neighbors;

        public GameSegmentUser()
        {
            Neighbors = new List<GameSegmentNeighbor>();
        }

        public bool MoveTo(int x, int y, long lockstepTick)
        {
            //todo pathfind here

            X = x;
            Y = y;

            return true;
        }
    }
}