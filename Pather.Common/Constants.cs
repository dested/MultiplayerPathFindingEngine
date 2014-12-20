using System;
using System.Html;
using System.Linq.Expressions;

namespace Pather.Common
{
    public static class Constants
    {
        static Constants()
        {
            SquareSize = 8;
            NumberOfSquares = 150;
            DrawFps = 60;
            DrawTicks = 1000 / DrawFps;
            GameFps = 10;
            GameTicks = 1000 / GameFps;
            LockstepFps = 2;
            LockstepTicks = 1000 / LockstepFps;
            AnimationSteps = 5;

        }

        public static int AnimationSteps ;
        public static int GameFps ;
        public static int DrawTicks ;
        public static int DrawFps ;
        public static int LockstepTicks ;
        public static int LockstepFps ;
        public static int SquareSize ;
        public static int NumberOfSquares ;
        public static int GameTicks ;

        public static bool TestServer
        {
            get { return ((dynamic)Window.Instance).TestServer; }
        }

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