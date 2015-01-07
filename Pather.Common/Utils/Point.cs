using System;

namespace Pather.Common.Utils
{
    [Serializable]
    public class Point
    {
        public double X;
        public double Y;

        public Point(double x, double y)
        {
            X = x;
            Y = y;
        }
    }
}