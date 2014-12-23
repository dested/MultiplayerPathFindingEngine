using System.Runtime.CompilerServices;

namespace Pather.Common.Models.GameWorld
{
    [NamedValues]
    public enum GameWorldPubSubMessageType
    {
        UserJoined,
        CreateGameSegmentResponse,
        TickSync,
        Pong
    }
}