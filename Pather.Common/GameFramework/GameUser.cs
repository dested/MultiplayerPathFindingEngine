using System.Collections.Generic;
using Pather.Common.Definitions.AStar;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.Common.UserActions;
using Pather.Common.Utils;

namespace Pather.Common.GameFramework
{
    public class GameUser : GameEntity
    {
        public GameUser(Game game, string userId)
            : base(game)
        {
            EntityId = userId;
            Path = new List<AStarLockstepPath>();
            Speed = 20;
        }

        public double Speed;
        public List<AStarLockstepPath> Path;

        public override void Tick()
        {
            base.Tick();
        }

        public override void LockstepTick(long lockstepTickNumber)
        {
            base.LockstepTick(lockstepTickNumber);
        }

        public virtual void RePathFind(MoveEntityAction destinationAction)
        {
            var graph = game.Board.AStarGraph;


            var start = graph.Grid[Utilities.ToSquare(X)][Utilities.ToSquare(Y)];
            var end = graph.Grid[Utilities.ToSquare(destinationAction.X)][Utilities.ToSquare(destinationAction.Y)];
            Path.Clear();
            Path.AddRange(AStar.Search(graph, start, end).Select(a => new AStarLockstepPath(a.X, a.Y)));
            Global.Console.Log("Path", Path);
        }


        public void SetPath(List<AStarLockstepPath> path)
        {
            Path.Clear();
            Path.AddRange(path);
            Global.Console.Log("Path", Path);
        }
    }
}