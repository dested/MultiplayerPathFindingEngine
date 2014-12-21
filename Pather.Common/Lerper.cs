using System;

namespace Pather.Common
{
    public static class Lerper
    {

        public static double Lerp(double start, double end, double duration)
        {
            return start + (end - start) * duration;
        }
        public static double MoveTowards(double start, double end, double amount)
        {
            if (Math.Abs(start - end) < amount)
                return end;
            if (start < end)
                return start + amount;
            if (start > end)
                return start - amount;
            return start;
        }
    }
}