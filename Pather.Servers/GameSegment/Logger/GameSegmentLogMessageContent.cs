using System;
using System.Runtime.CompilerServices;

namespace Pather.Servers.GameSegment.Logger
{
    [Serializable]
    public class GameSegmentLogMessageContent
    {

        public DateTime Time;
        public string GameSegmentId;

        [ObjectLiteral]
        public GameSegmentLogMessageContent(string gameSegmentId, GameSegmentLogMessage message, DateTime time)
        {
            GameSegmentId = gameSegmentId;
            Message = message;
            Time = time;
        }

        public GameSegmentLogMessage Message;
    }
}