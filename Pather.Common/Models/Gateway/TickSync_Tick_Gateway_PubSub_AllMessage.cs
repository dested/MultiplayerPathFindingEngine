using System;
using Pather.Common.Models.Gateway.Base;

namespace Pather.Common.Models.Gateway
{
    [Serializable]
    public class TickSync_Tick_Gateway_PubSub_AllMessage : Gateway_PubSub_AllMessage
    {
        public TickSync_Tick_Gateway_PubSub_AllMessage(long lockstepTickNumber)
        {
            Type = Gateway_PubSub_AllMessageType.TickSync;
            LockstepTickNumber = lockstepTickNumber;
        }

        public long LockstepTickNumber;
    }
}