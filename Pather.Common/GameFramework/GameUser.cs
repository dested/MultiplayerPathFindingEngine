using System.Collections.Generic;
using Pather.Common.Definitions.AStar;

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
    }
}