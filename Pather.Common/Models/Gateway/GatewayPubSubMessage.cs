using System;

namespace Pather.Common.Models.Gateway
{
    [Serializable]
    public class GatewayPubSubMessage
    {
        public GatewayPubSubMessageType Type;
    }
    [Serializable]
    public class GatewayPubSubAllMessage
    {
        public GatewayPubSubAllMessageType Type;
    }

    [Serializable]
    public class PongGatewayPubSubMessage : GatewayPubSubMessage
    {
        public PongGatewayPubSubMessage()
        {
            Type = GatewayPubSubMessageType.Pong;
        }
    }
}