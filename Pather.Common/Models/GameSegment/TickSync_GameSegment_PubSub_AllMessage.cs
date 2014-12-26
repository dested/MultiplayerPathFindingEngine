using System;
using Pather.Common.Models.GameSegment.Base;

namespace Pather.Common.Models.GameSegment
{
    [Serializable]
    public class TickSync_GameSegment_PubSub_AllMessage : GameSegment_PubSub_AllMessage
    {
        public TickSync_GameSegment_PubSub_AllMessage(long lockstepTickNumber)
        {
            Type = GameSegment_PubSub_AllMessageType.TickSync;
            LockstepTickNumber = lockstepTickNumber;
        }

        public long LockstepTickNumber;
    }
}