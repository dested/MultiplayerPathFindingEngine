using System;

namespace Pather.Common.Models.Gateway
{
    [Serializable]
    public class UserJoinedGatewayPubSubMessage : GatewayPubSubMessage
    {
        public UserJoinedGatewayPubSubMessage()
        {
            Type = GatewayPubSubMessageType.UserJoined;
        }

        public string GameSegmentId;
        public string UserId;
    }
}