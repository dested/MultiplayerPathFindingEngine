using System.Html;

namespace Pather.Common
{
    public static class Constants
    {
        static Constants()
        {
            SquareSize = 8;
            NumberOfSquares = 150;
            DrawFps = 60;
            DrawTicks = 1000/DrawFps;
            GameFps = 10;
            GameTicks = 1000/GameFps;
            LockstepFps = 2;
            LockstepTicks = 1000/LockstepFps;
            AnimationSteps = 5;

            LatencyPingInterval = 6*1000;
            NeighborDistance = 20;
            UsersPerGameSegment = 50;

            GameSegmentCreationWait = 60;
        }

        public static int AnimationSteps;
        public static int GameFps;
        public static int DrawTicks;
        public static int DrawFps;
        public static int LockstepTicks;
        public static int LockstepFps;
        public static int SquareSize;
        public static int NumberOfSquares;
        public static int GameTicks;
        public static int NeighborDistance;


        public static bool TestServer
        {
            get { return ((dynamic) Window.Instance).TestServer; }
        }

        public static int GameSegmentCreationWait;

        public static int LatencyPingInterval;

        public static int UsersPerGameSegment;
    }
}