using System;

namespace Pather.Common.Models.GameSegment
{
    [Serializable]
    public class TickSyncGameSegmentPubSubAllMessage : GameSegment_PubSub_AllMessage
    {
        public TickSyncGameSegmentPubSubAllMessage(long lockstepTickNumber)
        {
            Type = GameSegmentPubSubAllMessageType.TickSync;
            LockstepTickNumber = lockstepTickNumber;
        }

        public long LockstepTickNumber;
    }
}