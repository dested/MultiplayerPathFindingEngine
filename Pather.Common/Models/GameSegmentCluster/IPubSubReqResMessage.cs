using System;

namespace Pather.Common.Models.GameSegmentCluster
{
    [Serializable]
    public interface IPubSubReqResMessage
    {
        string MessageId { get; set; }
    }
}