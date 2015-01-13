using System.Runtime.CompilerServices;

namespace Pather.Servers.GameSegmentServer.Logger
{
    [NamedValues]
    public enum HistogramLogMessageType
    {
        KeepAlive,
        LogDistribution
    }
}