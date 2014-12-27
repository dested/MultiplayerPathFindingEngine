using System;

namespace Pather.Servers.GameSegment.Logger
{
    [Serializable]
    public abstract class GameSegmentLogMessage
    {
        public GameSegmentLogMessageType Type;
    }
}