using System;

namespace Pather.Servers.GameSegment.Logger
{
    [Serializable]
    public class KeepAlive_GameSegmentLogMessage : GameSegmentLogMessage
    {
        public KeepAlive_GameSegmentLogMessage()
        {
            Type = GameSegmentLogMessageType.KeepAlive;
        }
    }
}