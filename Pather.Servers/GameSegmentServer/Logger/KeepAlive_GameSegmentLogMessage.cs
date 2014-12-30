using System;

namespace Pather.Servers.GameSegmentServer.Logger
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