using System.Runtime.CompilerServices;

namespace Pather.Common.Models.Gateway
{
    [NamedValues]
    public enum GatewayPubSubMessageType
    {
        UserJoined,
        Pong
    }
    [NamedValues]
    public enum GatewayPubSubAllMessageType
    {
        TickSync
    }
}