using System;

namespace Pather.Common.Models.GameWorld
{
    [Serializable]
    public class TickSyncGameWorldPubSubMessage : GameWorldPubSubMessage
    {
        public TickSyncGameWorldPubSubMessage(long lockstepTickNumber)
        {
            Type = GameWorldPubSubMessageType.TickSync;
            LockstepTickNumber = lockstepTickNumber;
        }

        public long LockstepTickNumber;
    }
}