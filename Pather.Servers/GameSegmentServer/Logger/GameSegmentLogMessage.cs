using System;

namespace Pather.Servers.GameSegmentServer.Logger
{
    [Serializable]
    public abstract class GameSegmentLogMessage
    {
        public GameSegmentLogMessageType Type;
    }
}