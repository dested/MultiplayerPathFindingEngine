using System;

namespace Pather.Common.Models.Tick
{
    [Serializable]
    public class PingTickPubSubMessage : TickPubSubMessage
    {
        public PingTickPubSubMessage()
        {
            Type=TickPubSubMessageType.Ping;
        }

        public string Origin;
        public PingTickPubSubMessageOriginType OriginType;
    }

    public enum PingTickPubSubMessageOriginType
    {
        GameSegment,
        GameWorld,
        Gateway
    }
}