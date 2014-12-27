using System;

namespace Pather.Servers.GameSegment.Logger
{
    [Serializable]
    public class UserMoved_GameSegmentLogMessage : GameSegmentLogMessage
    {
        public UserMoved_GameSegmentLogMessage()
        {
            Type = GameSegmentLogMessageType.UserMoved;
        }

        public string UserId;
        public int X;
        public int Y;
    }
}