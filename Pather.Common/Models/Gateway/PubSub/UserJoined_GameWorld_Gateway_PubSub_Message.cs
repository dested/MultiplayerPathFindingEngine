using System;
using Pather.Common.Models.Gateway.PubSub.Base;

namespace Pather.Common.Models.Gateway.PubSub
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
        public double X;
        public double Y;
        public string[][] Grid;
    }
}