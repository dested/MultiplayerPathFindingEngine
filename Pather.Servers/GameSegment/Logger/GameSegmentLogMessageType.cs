using System.Runtime.CompilerServices;

namespace Pather.Servers.GameSegment.Logger
{
    [NamedValues]
    public enum GameSegmentLogMessageType
    {
        KeepAlive,
        UserJoined,
        UserMoved,
        UserLeft,
        TellUserMoved
    }
}