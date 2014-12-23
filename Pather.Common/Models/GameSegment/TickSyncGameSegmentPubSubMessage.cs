using System;

namespace Pather.Common.Models.GameSegment
{
    [Serializable]
    public class TickSyncGameSegmentPubSubMessage : GameSegmentPubSubMessage
    {
        public TickSyncGameSegmentPubSubMessage(long lockstepTickNumber)
        {
            Type = GameSegmentPubSubMessageType.TickSync;
            LockstepTickNumber = lockstepTickNumber;
        }

        public long LockstepTickNumber;
    }
}