using System;
using Pather.Common.Utils.Histogram;

namespace Pather.Servers.GameSegmentServer.Logger
{
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