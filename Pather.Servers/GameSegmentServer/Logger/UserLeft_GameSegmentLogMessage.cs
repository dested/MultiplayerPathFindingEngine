using System;

namespace Pather.Servers.GameSegmentServer.Logger
{
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