using System;

namespace Pather.Common.Models.GameSegmentCluster
{
    [Serializable]
    public class CreateGameSegmentGameSegmentClusterPubSubMessage : GameSegmentClusterPubSubMessage, IPubSubReqResMessage
    {
        public CreateGameSegmentGameSegmentClusterPubSubMessage()
        {
            Type = GameSegmentClusterPubSubMessageType.CreateGameSegment;
        }

        public string GameSegmentId;
        public string MessageId { get; set; }
    }
}