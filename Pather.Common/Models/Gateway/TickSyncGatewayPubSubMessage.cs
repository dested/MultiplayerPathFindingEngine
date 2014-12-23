using System;

namespace Pather.Common.Models.Gateway
{
    [Serializable]
    public class TickSyncGatewayPubSubAllMessage : GatewayPubSubAllMessage
    {
        public TickSyncGatewayPubSubAllMessage(long lockstepTickNumber)
        {
            Type = GatewayPubSubAllMessageType.TickSync;
            LockstepTickNumber = lockstepTickNumber;
        }

        public long LockstepTickNumber;
    }
}