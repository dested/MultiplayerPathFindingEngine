using System;

namespace Pather.Common.Models.GameWorld
{
    [Serializable]
    public class TickSync_GameWorld_PubSub_Message : GameWorld_PubSub_Message
    {
        public TickSync_GameWorld_PubSub_Message(long lockstepTickNumber)
        {
            Type = GameWorld_PubSub_MessageType.TickSync;
            LockstepTickNumber = lockstepTickNumber;
        }

        public long LockstepTickNumber;
    }
}