using System.Collections.Generic;
using Pather.Common.Utils;

namespace Pather.Servers.GameSegmentServer.Models
{
    public class GameSegmentUser
    {
        public string GameSegmentId;
        public string GatewayId;
        public int X;
        public int Y;
        public string UserId;
        public DictionaryList<string,GameSegmentNeighbor> Neighbors;

        public GameSegmentUser()
        {
            Neighbors = new DictionaryList<string, GameSegmentNeighbor>(a=>a.User.UserId);
        }

        public List<GameSegmentNeighbor> OldNeighbors { get; set; }

        public bool MoveTo(int x, int y, long lockstepTick)
        {
            //todo pathfind here

            X = x;
            Y = y;

            return true;
        }
    }
}