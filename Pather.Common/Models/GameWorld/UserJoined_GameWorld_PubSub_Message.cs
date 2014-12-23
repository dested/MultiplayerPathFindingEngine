using System;

namespace Pather.Common.Models.GameWorld
{
    [Serializable]
    public class UserJoined_GameWorld_PubSub_Message : GameWorld_PubSub_Message
    {
        public string GatewayChannel;
        public string UserToken;
    }
}