using System;
using Pather.Common.Models.GameSegmentCluster;

namespace Pather.Common.Models.GameWorld
{
    [Serializable]
    public class CreateGameSegmentResponseGameWorldPubSubMessage : GameWorldPubSubMessage, IPubSubReqResMessage
    {
        public CreateGameSegmentResponseGameWorldPubSubMessage()
        {
            Type = GameWorldPubSubMessageType.CreateGameSegmentResponse;
        }

        public string GameSegmentId;
        public string MessageId { get; set; }
    }
}