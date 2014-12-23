using System;

namespace Pather.Common.Models.GameSegmentCluster
{
    [Serializable]
    public class GameSegmentCluster_PubSub_ReqRes_Message : GameSegmentCluster_PubSub_Message, IPubSub_ReqRes_Message
    {
        public GameSegmentCluster_PubSub_ReqRes_Message()
        {
            MessageId = Common.UniqueId();
        }

        public string MessageId { get; set; }
    }
}