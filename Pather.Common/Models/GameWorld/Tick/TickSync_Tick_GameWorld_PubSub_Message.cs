using System;
using Pather.Common.Models.GameWorld.Base;

namespace Pather.Common.Models.GameWorld.Tick
{
    [Serializable]
    public class TickSync_Tick_GameWorld_PubSub_Message : GameWorld_PubSub_Message
    {
        public TickSync_Tick_GameWorld_PubSub_Message(long lockstepTickNumber)
        {
            Type = GameWorld_PubSub_MessageType.TickSync;
            LockstepTickNumber = lockstepTickNumber;
        }

        public long LockstepTickNumber;
    }
}