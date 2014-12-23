namespace Pather.Servers.Common.PubSub
{
    public class PubSubChannels
    {
        private static string tick = "Tick";
        private static string gameWorld = "GameWorld";
        private static string gameSegmentCluster = "GameSegmentCluster";
        private static string gameSegment = "GameSegment";
        private static string gateway = "Gateway";


        public static string Tick()
        {
            return tick;
        }

        public static string GameWorld()
        {
            return gameWorld;
        }

        public static string GameSegmentCluster(string gameSegmentClusterId)
        {
            return gameSegmentCluster + gameSegmentClusterId;
        }

        public static string GameSegmentCluster()
        {
            return gameSegmentCluster;
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
    }
}