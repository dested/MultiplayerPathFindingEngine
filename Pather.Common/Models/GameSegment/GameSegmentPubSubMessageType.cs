using System.Runtime.CompilerServices;

namespace Pather.Common.Models.GameSegment
{
    [NamedValues]
    public enum GameSegmentPubSubMessageType
    {
        Pong,
        UserJoin
    }
    [NamedValues]
    public enum GameSegmentPubSubAllMessageType
    {
        TickSync,
    }
}