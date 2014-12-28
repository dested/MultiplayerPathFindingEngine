using System;
using System.Collections.Generic;

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
        public List<string> Neighbors { get; set; }
    }
}