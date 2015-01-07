using System;
using System.Runtime.CompilerServices;

namespace Pather.Common.Definitions.AStar
{
    [Imported()]
    public class AStarPath
    {
        public int X;
        public int Y;
    }
    [Serializable]
    public class AStarLockstepPath
    {
        public long RemovedAtLockstep;
        public int X;
        public int Y;

        public AStarLockstepPath(int x, int y)
        {
            X = x;
            Y = y;
        }

    }

}