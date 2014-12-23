using System;

namespace Pather.Common.Models.GameWorld
{
    [Serializable]
    public class UserJoinedGameWorldPubSubMessage : GameWorld_PubSub_Message
    {
        public string GatewayChannel;
        public string UserToken;
    }
}