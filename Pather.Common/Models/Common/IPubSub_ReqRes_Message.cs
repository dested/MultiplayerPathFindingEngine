using System;

namespace Pather.Common.Models.Common
{
    [Serializable]
    public interface IPubSub_ReqRes_Message : IPubSub_Message
    {
        string MessageId { get; set; }
        bool Response { get; set; }
    }
}