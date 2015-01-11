using System;
using Pather.Common.Models.GameSegment.Base;

namespace Pather.Common.Models.GameSegment
{
    [Serializable]
    public class ReorganizeUser_GameWorld_GameSegment_PubSub_Message : GameSegment_PubSub_Message
    {
        public ReorganizeUser_GameWorld_GameSegment_PubSub_Message()
        {
            Type = GameSegment_PubSub_MessageType.ReorganizeGameSegment;
        }

        public string NewGameSegmentId;
        public string UserId;
        public long SwitchAtLockstepNumber;
    }
}