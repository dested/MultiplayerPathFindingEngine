using System;

namespace Pather.Servers.GameSegmentServer.Logger
{
    [Serializable]
    public abstract class HistogramLogMessage
    {
        public HistogramLogMessageType Type;
    }
}