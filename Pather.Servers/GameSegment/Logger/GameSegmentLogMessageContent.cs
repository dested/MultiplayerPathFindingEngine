using System;
using System.Runtime.CompilerServices;
using Pather.Common.Models.Common;
using Pather.Servers.Common.PubSub;

namespace Pather.Servers.GameSegment.Logger
{
    [Serializable]
    public class GameSegmentLogMessageContent:IPubSub_Message
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