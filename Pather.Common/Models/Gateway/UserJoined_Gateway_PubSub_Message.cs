using System;

namespace Pather.Common.Models.Gateway
{
    [Serializable]
    public class UserJoined_Gateway_PubSub_Message : Gateway_PubSub_Message
    {
        public UserJoined_Gateway_PubSub_Message()
        {
            Type = Gateway_PubSub_MessageType.UserJoined;
        }

        public string GameSegmentId;
        public string UserId;
    }
}