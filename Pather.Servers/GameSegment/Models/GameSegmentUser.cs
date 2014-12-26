using System.Collections.Generic;
using Pather.Servers.GameWorldServer.Models;

namespace Pather.Servers.GameSegment.Models
{
    public class GameSegmentUser
    {
        public string GameSegmentId;
        public string GatewayServer;
        public int X;
        public int Y;
        public string UserId;
        public List<GameSegmentNeighbor> Neighbors;

        public bool MoveTo(int x, int y, long lockstepTick)
        {
            //todo pathfind here

            X = x;
            Y = y;

            return true;
        }
    }
}