namespace Pather.Common.GameFramework
{
    public class GameEntityNeighbor
    {
        public GameEntity Entity;
        public double Distance;

        public GameEntityNeighbor(GameEntity cEntity, double distance)
        {
            Distance = distance;
            Entity = cEntity;
        }
    }
}