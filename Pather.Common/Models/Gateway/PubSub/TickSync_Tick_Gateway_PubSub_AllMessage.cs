using System;
using Pather.Common.Models.Gateway.PubSub.Base;

namespace Pather.Common.Models.Gateway.PubSub
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
    [Serializable]
    public class Ping_Head_Gateway_PubSub_AllMessage : Gateway_PubSub_AllMessage
    {
        public Ping_Head_Gateway_PubSub_AllMessage()
        {
            Type = Gateway_PubSub_AllMessageType.Ping;
        }
    }
}