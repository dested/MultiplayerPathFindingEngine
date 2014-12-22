using System;

namespace Pather.Common.Models.GameSegmentCluster
{
    [Serializable]
    public class CreateGameServerGameSegmentClusterPubSubMessage : GameSegmentClusterPubSubMessage, IPubSubReqResMessage
    {
        public CreateGameServerGameSegmentClusterPubSubMessage()
        {
            Type = GameSegmentClusterMessageType.CreateGameSegment;
        }

        public string GameSegmentId;
        public string MessageId { get; set; }
    }
}