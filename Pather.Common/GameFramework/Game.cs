using Pather.Common.Utils;

namespace Pather.Common.GameFramework
{
    public abstract class Game
    {
        public TickManager tickManager;
        public GameBoard Board;
        public DictionaryList<string, GameEntity> ActiveEntities = new DictionaryList<string, GameEntity>(a => a.EntityId);
        public GameUser MyUser;

        public Game(TickManager tickManager)
        {
            this.tickManager = tickManager;
        }


        public virtual void Init(int[][] grid, long lockstepTickNumber, int serverLatency)
        {
            Board = new GameBoard();
            Board.Init(grid);
            tickManager.SetServerLatency(serverLatency);
            tickManager.SetLockStepTick(lockstepTickNumber);
        }


        public void AddEntity(GameEntity entity)
        {
            ActiveEntities.Add(entity);
        }

        public virtual GameUser CreateGameUser(string userId)
        {
            return new GameUser(this, userId);
        }


        public virtual void Tick(long tickNumber)
        {
            foreach (var person in ActiveEntities.List)
            {
                person.Tick();
            }
        }

        public virtual void LockstepTick(long lockstepTickNumber)
        {
            foreach (var entity in ActiveEntities.List)
            {
                entity.LockstepTick(lockstepTickNumber);
            }
        }
    }
}