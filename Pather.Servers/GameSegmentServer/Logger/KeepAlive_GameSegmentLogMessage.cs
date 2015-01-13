using System;
using Pather.Common.Models.Common;
using Pather.Common.Utils.Histogram;

namespace Pather.Servers.GameSegmentServer.Logger
{
    [Serializable]
    public class KeepAlive_GameSegmentLogMessage : GameSegmentLogMessage
    {
        public KeepAlive_GameSegmentLogMessage()
        {
            Type = GameSegmentLogMessageType.KeepAlive;
        }
    }
    [Serializable]
    public class KeepAlive_HistogramLogMessage : HistogramLogMessage
    {
        public KeepAlive_HistogramLogMessage()
        {
            Type=HistogramLogMessageType.KeepAlive;
        }
    }
    [Serializable]
    public class LogDistribution_HistogramLogMessage : HistogramLogMessage
    {
        public LogDistribution_HistogramLogMessage()
        {
            Type = HistogramLogMessageType.LogDistribution;
        }

        public HistogramDistribution Distribution;
    }
}