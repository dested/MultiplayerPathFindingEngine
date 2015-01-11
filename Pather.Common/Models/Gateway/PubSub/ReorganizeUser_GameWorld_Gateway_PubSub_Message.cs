using System;
using Pather.Common.Models.Gateway.PubSub.Base;

namespace Pather.Common.Models.Gateway.PubSub
{
    [Serializable]
    public class ReorganizeUser_GameWorld_Gateway_PubSub_Message : Gateway_PubSub_Message
    {
        public ReorganizeUser_GameWorld_Gateway_PubSub_Message()
        {
            Type = Gateway_PubSub_MessageType.ReorganizeUser;
        }

        public string UserId;
        public string NewGameSegmentId;
        public long SwitchAtLockstepNumber;

    }
}