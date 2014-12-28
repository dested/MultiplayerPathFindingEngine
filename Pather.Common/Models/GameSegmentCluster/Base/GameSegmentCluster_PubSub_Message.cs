using System;
using Pather.Common.Models.Common;

namespace Pather.Common.Models.GameSegmentCluster.Base
{
    [Serializable]
    public abstract class GameSegmentCluster_PubSub_Message : IPubSub_Message
    {
        public GameSegmentCluster_PubSub_MessageType Type;
    }
}