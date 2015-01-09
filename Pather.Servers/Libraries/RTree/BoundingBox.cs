using System;
using System.Collections.Generic;

namespace Pather.Servers.Libraries.RTree
{
    public class BoundingBox
    {
        public Vector2 Min;
        public Vector2 Max;

        public BoundingBox(Vector2 min, Vector2 max)
        {
            Min = min;
            Max = max;
        }

        public static BoundingBox CreateFromPoints(IEnumerable<Vector2> points)
        {
            if (points == null)
                throw new ArgumentNullException();
            var flag = true;
            var min = new Vector2(double.MaxValue);
            var max = new Vector2(double.MinValue);
            foreach (var vector2 in points)
            {
                min.X = (double) min.X < (double) vector2.X ? min.X : vector2.X;
                min.Y = (double) min.Y < (double) vector2.Y ? min.Y : vector2.Y;
                max.X = (double) max.X > (double) vector2.X ? max.X : vector2.X;
                max.Y = (double) max.Y > (double) vector2.Y ? max.Y : vector2.Y;
                flag = false;
            }
            if (flag)
                throw new ArgumentException();
            else
                return new BoundingBox(min, max);
        }
    }
}