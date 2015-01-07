using System;

namespace Pather.Common.Utils
{
    [Serializable]
    public class IntPoint
    {
        public int X;
        public int Y;

        public IntPoint(int x, int y)
        {
            X = x;
            Y = y;
        }
    }
}