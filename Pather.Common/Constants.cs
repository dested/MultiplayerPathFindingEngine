using System.Html;

namespace Pather.Common
{
    public static class Constants
    {
        static Constants()
        {
            //CLIENT
            SquareSize = 8;
            DrawFps = 60;
            NumberOfSquares = 150;
            DrawTicks = 1000/DrawFps;
            AnimationSteps = 5;

            GameFps = 10;
            GameTicks = 1000/GameFps;
            LockstepFps = 2;
            LockstepTicks = 1000/LockstepFps;

            LatencyPingInterval = 6*1000;
            NeighborDistance = 7;
            UsersPerGameSegment =2;
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
        public static int GameSegmentCreationWait;
        public static int LatencyPingInterval;
        public static int UsersPerGameSegment;


        public static bool TestServer
        {
            get { return ((dynamic)Window.Instance).TestServer; }
        } 
    }
}