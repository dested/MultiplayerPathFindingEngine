using System;

namespace Pather.Common.Models.GameWorld
{
    [Serializable]
    public class TickSyncGameWorldPubSubMessage : GameWorld_PubSub_Message
    {
        public TickSyncGameWorldPubSubMessage(long lockstepTickNumber)
        {
            Type = GameWorld_PubSub_MessageType.TickSync;
            LockstepTickNumber = lockstepTickNumber;
        }

        public long LockstepTickNumber;
    }
}