using System;
using System.Runtime.CompilerServices;
using Pather.Common.Models.Common;

namespace Pather.Servers.GameSegmentServer.Logger
{
    [Serializable]
    public class GameSegmentLogMessageContent : IPubSub_Message
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