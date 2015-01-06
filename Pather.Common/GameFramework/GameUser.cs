using System.Collections.Generic;
using System.Diagnostics;
using Pather.Common.Definitions.AStar;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Utils;

namespace Pather.Common.GameFramework
{
    public class GameUser : GameEntity
    {

        public GameUser(Game game, string userId)
            : base(game)
        {
            EntityId = userId;
            Path = new List<AStarPath>();
            Speed = 20;
        }

        public double Speed;
        public List<AStarPath> Path;
        public override void Tick()
        {
            base.Tick();
        }

        public override void LockstepTick(long lockstepTickNumber)
        {
            base.LockstepTick(lockstepTickNumber);
        }

        public virtual void RePathFind(int destinationSquareX, int destinationSquareY)
        {
            var graph = game.Board.AStarGraph;

            var start = graph.Grid[SquareX][SquareY];
            var end = graph.Grid[destinationSquareX][destinationSquareY];
            Path = new List<AStarPath>(AStar.Search(graph, start, end));
        }
    }
}