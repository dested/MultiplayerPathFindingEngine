using System;
using System.Collections.Generic;

namespace Pather.Common.Models.Common
{
    [Serializable]
    public interface IPubSub_ReqRes_Message : IPubSub_Message
    {
        string MessageId { get; set; }
        bool Response { get; set; }

    }
    [Serializable]
    public interface IPubSub_Message
    {
    }

    [Serializable]
    public class PubSub_Message_Collection : IPubSub_Message
    {
        public List<IPubSub_Message> Collection;
    }


}