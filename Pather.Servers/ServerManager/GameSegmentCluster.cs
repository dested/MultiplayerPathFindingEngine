using System.Collections.Generic;
using Pather.Common;

namespace Pather.Servers.ServerManager
{
    public class GameSegmentCluster
    {
        public List<GameSegment> GameSegments;

        public GameSegmentCluster()
        {
            GameSegments = new List<GameSegment>();
        }

        public string ClusterManagerId;

        public bool CanCreateNewSegment()
        {
            return GameSegments.Count < Constants.MaxGameSegmentsPerCluster;
        }
    }
}