using System;
using Pather.Common.Models.GameSegmentCluster;

namespace Pather.Common.Models.GameWorld
{
    [Serializable]
    public class CreateGameServerResponseGameWorldPubSubMessage : GameWorldPubSubMessage,IPubSubReqResMessage
    {
        public CreateGameServerResponseGameWorldPubSubMessage()
        {
            Type = GameWorldMessageType.CreateGameServerResponse;
        }

        public string GameSegmentId;
        public string MessageId { get; set; }
    }
}