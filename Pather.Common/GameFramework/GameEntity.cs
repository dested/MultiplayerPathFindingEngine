using System.Collections.Generic;
using Pather.Common.Utils;

namespace Pather.Common.GameFramework
{
    public abstract class GameEntity
    {
        protected Game game;
        public DictionaryList<string, GameEntityNeighbor> Neighbors;
        public List<GameEntityNeighbor> OldNeighbors { get; set; }

        public GameEntity(Game game)
        {
            Neighbors = new DictionaryList<string, GameEntityNeighbor>(a => a.Entity.EntityId);
            this.game = game;
        }

        public double X;
        public double Y;
        public string EntityId;

        public virtual void Tick()
        {
        }

        public virtual void LockstepTick(long lockstepTickNumber)
        {
        }
    }
}