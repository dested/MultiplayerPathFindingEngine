using System.Runtime.CompilerServices;

namespace Pather.Common.Models.GameWorld.Base
{
    [NamedValues]
    public enum GameWorld_PubSub_MessageType
    {
        UserJoined,
        CreateGameSegmentResponse,
        UserJoinResponse,
        TickSync,
        UserLeft,
        Pong
    }
}