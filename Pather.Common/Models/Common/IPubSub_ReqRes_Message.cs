using System;

namespace Pather.Common.Models.Common
{
    [Serializable]
    public interface IPubSub_ReqRes_Message
    {
        string MessageId { get; set; }
    }
}