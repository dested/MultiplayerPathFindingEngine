using System.Runtime.CompilerServices;

namespace Pather.Common.Models.GameWorld
{
    [NamedValues]
    public enum GameWorld_PubSub_MessageType
    {
        UserJoined,
        CreateGameSegmentResponse,
        UserJoinResponse,
        TickSync,
        Pong
    }
}