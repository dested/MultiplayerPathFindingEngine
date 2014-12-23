using System;
using Pather.Common.Models.GameSegmentCluster;

namespace Pather.Common.Models.GameSegment
{
    [Serializable]
    public class GameSegment_PubSub_ReqRes_Message : GameSegment_PubSub_Message, IPubSub_ReqRes_Message
    {
        public GameSegment_PubSub_ReqRes_Message()
        {
            MessageId = Common.UniqueId();
        }

        public string MessageId { get; set; }
    }
}