using System;
using Pather.Common.Models.Common;

namespace Pather.Common.Models.GameSegmentCluster.Base
{
    [Serializable]
    public abstract class GameSegmentCluster_PubSub_ReqRes_Message : GameSegmentCluster_PubSub_Message, IPubSub_ReqRes_Message
    {
        public GameSegmentCluster_PubSub_ReqRes_Message()
        {
            MessageId = Utilities.UniqueId();
        }

        public string MessageId { get; set; }
    }
}