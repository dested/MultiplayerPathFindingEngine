using System;
using System.Collections.Generic;

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
        public List<string> Neighbors { get; set; }
    }
}