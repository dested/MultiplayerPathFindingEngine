using System;
using System.Collections.Generic;

namespace Pather.Servers.GameSegmentServer.Logger
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
        public List<string> Neighbors { get; set; }
    }
}