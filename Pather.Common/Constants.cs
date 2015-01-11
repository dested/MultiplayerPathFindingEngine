using System.Html;

namespace Pather.Common
{
    public static class Constants
    {
        static Constants()
        {
            //CLIENT
            SquareSize = 16;
            NumberOfSquares = 150;

            DrawFps = 60;
            DrawTicks = 1000/DrawFps;
            NumberOfAnimationSteps = 5;

            GameFps = 10;
            GameTicks = 1000/GameFps;
            LockstepFps = 2;
            LockstepTicks = 1000/LockstepFps;

            LatencyPingInterval = 6*1000;
            NeighborDistance = 20;
            UsersPerGameSegment = 2;
            GameSegmentCreationWait = 60;
            GatewayCreationWait = 60;


            MaxConnectionsPerGateway = 100;
            GatewayConnectionSpawnThreshold = 40;

            MaxGatewaysPerCluster = 10;
            MaxGameSegmentsPerCluster = 10;

            PingGatewayFromHeadTimeout = 1000;
            SpinUpNewGatewayCheck = 4000;

            BuildNeighborsTimeout = 200;

            ReorganizeGameWorldInterval = 1000;
            TestReorganizeGameWorldInterval = 60*1000;

            NumberOfReorganizedPlayersPerSession = 10;
            GameSegmentReorgSwitchOffset = 2;

            ClusterGroupViewRadius = NeighborDistance*10;
        }

        public static int NumberOfAnimationSteps;
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
        public static int GatewayCreationWait;
        public static int LatencyPingInterval;
        public static int UsersPerGameSegment;
        public static int MaxConnectionsPerGateway;
        public static int GatewayConnectionSpawnThreshold;
        public static int MaxGatewaysPerCluster;
        public static int MaxGameSegmentsPerCluster;
        public static int BuildNeighborsTimeout;
        public static int ReorganizeGameWorldInterval;
        public static int GameSegmentReorgSwitchOffset;


        public static bool TestServer
        {
            get { return ((dynamic) Window.Instance).TestServer; }
        }

        public static bool NoDraw
        {
            get { return ((dynamic) Window.Instance).NoDraw; }
        }

        public static int ClusterGroupViewRadius;

        public static int TestReorganizeGameWorldInterval;


        public static int NumberOfReorganizedPlayersPerSession;


        public static int SpinUpNewGatewayCheck;

        public static int PingGatewayFromHeadTimeout;
    }
}