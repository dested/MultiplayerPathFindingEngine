using System;

namespace Pather.Common.Models.GameSegmentCluster
{
    [Serializable]
    public interface IPubSub_ReqRes_Message
    {
        string MessageId { get; set; }
    }
}