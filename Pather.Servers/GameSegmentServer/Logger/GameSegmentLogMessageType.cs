using System.Runtime.CompilerServices;

namespace Pather.Servers.GameSegmentServer.Logger
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