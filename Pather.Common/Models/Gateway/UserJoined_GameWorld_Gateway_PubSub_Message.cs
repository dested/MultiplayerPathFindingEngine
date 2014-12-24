using System;
using Pather.Common.Models.Gateway.Base;

namespace Pather.Common.Models.Gateway
{
    [Serializable]
    public class UserJoined_GameWorld_Gateway_PubSub_Message : Gateway_PubSub_Message
    {
        public UserJoined_GameWorld_Gateway_PubSub_Message()
        {
            Type = Gateway_PubSub_MessageType.UserJoined;
        }

        public string GameSegmentId;
        public string UserId;
    }
}