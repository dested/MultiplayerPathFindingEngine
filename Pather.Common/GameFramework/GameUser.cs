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

        public virtual void RePathFind(double destinationX, double destinationY)
        {
            var graph = game.Board.AStarGraph;


            var start = graph.Grid[Utilities.ToSquare(X)][Utilities.ToSquare(Y)];
            var end = graph.Grid[Utilities.ToSquare(destinationX)][Utilities.ToSquare(destinationY)];
            Path.Clear();
            Path.AddRange(AStar.Search(graph, start, end));
        }
    }
}