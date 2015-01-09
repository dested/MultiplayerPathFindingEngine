namespace Pather.Common.GameFramework
{
    public class GameUser : GameEntity
    {
        public GameUser(Game game, string userId)
            : base(game)
        {
            EntityId = userId;
            Speed = 20;
        }

        public double Speed;

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