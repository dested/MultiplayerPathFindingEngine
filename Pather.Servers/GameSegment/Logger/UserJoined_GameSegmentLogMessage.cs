using System;

namespace Pather.Servers.GameSegment.Logger
{
    [Serializable]
    public class UserJoined_GameSegmentLogMessage : GameSegmentLogMessage
    {
        public UserJoined_GameSegmentLogMessage()
        {
            Type = GameSegmentLogMessageType.UserJoined;
        }

        public string UserId;
        public int X;
        public int Y;
        public bool IsMine;
    }
    [Serializable]
    public class UserLeft_GameSegmentLogMessage : GameSegmentLogMessage
    {
        public UserLeft_GameSegmentLogMessage()
        {
            Type = GameSegmentLogMessageType.UserLeft;
        }

        public string UserId;
        public bool IsMine;
    }
}