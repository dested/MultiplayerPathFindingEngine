using System;

namespace Pather.Common.Models.Gateway
{
    [Serializable]
    public class TickSyncGatewayPubSubMessage : GatewayPubSubMessage
    {
        public TickSyncGatewayPubSubMessage(long lockstepTickNumber)
        {
            Type = GatewayPubSubMessageType.TickSync;
            LockstepTickNumber = lockstepTickNumber;
        }

        public long LockstepTickNumber;
    }
}