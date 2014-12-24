using System;
using Pather.Common.Models.GameWorld.Base;

namespace Pather.Common.Models.GameWorld
{
    [Serializable]
    public class UserJoined_Gateway_GameWorld_PubSub_Message : GameWorld_PubSub_Message
    {
        public UserJoined_Gateway_GameWorld_PubSub_Message()
        {
            Type = GameWorld_PubSub_MessageType.UserJoined;
        }

        public string GatewayChannel;
        public string UserToken;
    }
}