using System;
using System.Linq.Expressions;

namespace Pather.Common
{
    public static class Constants
    {
        static Constants()
        {
            SquareSize = 16;
            NumberOfSquares = 80;
            DrawFps = 60;
            DrawTicks = 1000 / DrawFps;
            GameFps = 10;
            GameTicks = 1000 / GameFps;
            LockstepFps = 2;
            LockstepTicks = 1000 / LockstepFps;
            AnimationSteps = 5;

        }

        public static int AnimationSteps { get; set; }
        public static int GameFps { get; set; }
        public static int DrawTicks { get; set; }
        public static int DrawFps { get; set; }
        public static int LockstepTicks { get; set; }
        public static int LockstepFps { get; set; }
        public static int SquareSize { get; set; }
        public static int NumberOfSquares { get; set; }
        public static int GameTicks { get; set; }

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