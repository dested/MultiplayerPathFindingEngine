using System;
using Pather.Common.Models.GameWorld.Base;

namespace Pather.Common.Models.GameWorld
{
    [Serializable]
    public class UserLeft_Gateway_GameWorld_PubSub_Message : GameWorld_PubSub_Message
    {
        public UserLeft_Gateway_GameWorld_PubSub_Message()
        {
            Type = GameWorld_PubSub_MessageType.UserLeft;
        }

        public string UserId;
    }
}