using System;

namespace Pather.Servers.GameSegment.Logger
{
    [Serializable]
    public class TellUserMoved_GameSegmentLogMessage : GameSegmentLogMessage
    {
        public TellUserMoved_GameSegmentLogMessage()
        {
            Type = GameSegmentLogMessageType.TellUserMoved;
        }

        public string UserId;
        public int X;
        public int Y;
    }
}