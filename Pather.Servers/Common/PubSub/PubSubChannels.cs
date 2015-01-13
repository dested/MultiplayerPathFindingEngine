namespace Pather.Servers.Common.PubSub
{
    public class PubSubChannels
    {
        private static readonly string tick = "Tick";
        private static readonly string gameWorld = "GameWorld";
        private static readonly string clusterManager = "ClusterManager";
        private static readonly string serverLogger = "ServerLogger";
        private static readonly string gameSegmentLogger = "GameSegmentLogger";
        private static readonly string gameSegment = "GameSegment";
        private static readonly string gateway = "Gateway";
        private static readonly string headServer = "Head";
        private static readonly string serverManager = "ServerManager";
        private static readonly string histogramLogger = "HistogramLogger";


        public static string Tick()
        {
            return tick;
        }

        public static string GameWorld()
        {
            return gameWorld;
        }

        public static string ClusterManager(string clusterManagerId)
        {
            return clusterManager + clusterManagerId;
        }

        public static string ClusterManager()
        {
            return clusterManager;
        }

        public static string GameSegment(string gameSegmentId)
        {
            return gameSegment + gameSegmentId;
        }

        public static string GameSegment()
        {
            return gameSegment;
        }

        public static string Gateway(string gatewayId)
        {
            return gateway + gatewayId;
        }

        public static string Gateway()
        {
            return gateway;
        }

        public static string ServerLogger(string serverType)
        {
            return serverLogger + serverType;
        }


        public static string GameSegmentLogger()
        {
            return gameSegmentLogger;
        }

        public static string Head()
        {
            return headServer;
        }

        public static string ServerManager()
        {
            return serverManager;
        }

        public static string HistogramLogger()
        {
            return histogramLogger;
        }
    }
}