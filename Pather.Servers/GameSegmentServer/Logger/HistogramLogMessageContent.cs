using System;
using System.Runtime.CompilerServices;
using Pather.Common.Models.Common;

namespace Pather.Servers.GameSegmentServer.Logger
{
    [Serializable]
    public class HistogramLogMessageContent : IPubSub_Message
    {
        public DateTime Time;

        [ObjectLiteral]
        public HistogramLogMessageContent(HistogramLogMessage message, DateTime time)
        {
            Message = message;
            Time = time;
        }

        public HistogramLogMessage Message;
    }
}