using System;

namespace Pather.Common.Models.GameWorld
{
    [Serializable]
    public class UserJoinedGameWorldPubSubMessage : GameWorldPubSubMessage
    {
        public string GatewayChannel;
        public string UserToken;
    }
}