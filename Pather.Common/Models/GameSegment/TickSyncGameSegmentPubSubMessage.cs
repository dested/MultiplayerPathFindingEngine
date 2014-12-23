using System;

namespace Pather.Common.Models.GameSegment
{
    [Serializable]
    public class TickSyncGameSegmentPubSubAllMessage : GameSegmentPubSubAllMessage
    {
        public TickSyncGameSegmentPubSubAllMessage(long lockstepTickNumber)
        {
            Type = GameSegmentPubSubAllMessageType.TickSync;
            LockstepTickNumber = lockstepTickNumber;
        }

        public long LockstepTickNumber;
    }
}