using System;

namespace Pather.Common.Definitions.AStar
{
    [Serializable]
    public class AStarLockstepPath
    {
        public long RemoveAfterLockstep;
        public int X;
        public int Y;

        public AStarLockstepPath(int x, int y)
        {
            X = x;
            Y = y;
        }
    }
}