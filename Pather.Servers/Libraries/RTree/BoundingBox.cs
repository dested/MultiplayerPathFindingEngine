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
            this.Min = min;
            this.Max = max;
        }

        public static BoundingBox CreateFromPoints(IEnumerable<Vector2> points)
        {
            if (points == null)
                throw new ArgumentNullException();
            bool flag = true;
            Vector2 min = new Vector2(float.MaxValue);
            Vector2 max = new Vector2(float.MinValue);
            foreach (Vector2 vector2 in points)
            {
                min.X = (double)min.X < (double)vector2.X ? min.X : vector2.X;
                min.Y = (double)min.Y < (double)vector2.Y ? min.Y : vector2.Y;
                max.X = (double)max.X > (double)vector2.X ? max.X : vector2.X;
                max.Y = (double)max.Y > (double)vector2.Y ? max.Y : vector2.Y;
                flag = false;
            }
            if (flag)
                throw new ArgumentException();
            else
                return new BoundingBox(min, max);
        }

    }
    public class Vector2
    {
        public float X;
        public float Y;

        public Vector2(float x, float y)
        {
            X = x;
            Y = y;
        }
        public Vector2(float value)
        {
            X = value;
            Y = value;
        }
    }

}