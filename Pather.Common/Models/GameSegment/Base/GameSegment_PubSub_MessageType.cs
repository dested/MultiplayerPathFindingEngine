using System.Runtime.CompilerServices;

namespace Pather.Common.Models.GameSegment.Base
{
    [NamedValues]
    public enum GameSegment_PubSub_MessageType
    {
        Pong,
        UserJoin,
        UserLeft
    }
}