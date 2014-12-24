using System;

namespace Pather.Common.Models.GameSegmentCluster.Base
{
    [Serializable]
    public abstract class GameSegmentCluster_PubSub_Message
    {
        public GameSegmentCluster_PubSub_MessageType Type;
    }
}