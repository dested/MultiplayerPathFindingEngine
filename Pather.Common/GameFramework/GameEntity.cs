using System.Runtime.CompilerServices;

namespace Pather.Common.GameFramework
{
    public abstract class GameEntity
    {
        protected Game game;

        public GameEntity(Game game)
        {
            this.game = game;
        }

        public double X;
        public double Y;
        public int SquareX;
        public int SquareY;
        public string EntityId;
        public virtual void Tick()
        {


        }
    }
}