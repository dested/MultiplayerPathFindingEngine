using System;

namespace Pather.Common.Models.Gateway
{
    [Serializable]
    public class UserJoinedGatewayPubSubMessage : GatewayPubSubMessage
    {
        public string GameServerId;
        public string UserId;
    }
}