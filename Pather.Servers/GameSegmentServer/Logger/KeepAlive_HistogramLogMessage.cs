using System;

namespace Pather.Servers.GameSegmentServer.Logger
{
    [Serializable]
    public class KeepAlive_HistogramLogMessage : HistogramLogMessage
    {
        public KeepAlive_HistogramLogMessage()
        {
            Type=HistogramLogMessageType.KeepAlive;
        }
    }
}