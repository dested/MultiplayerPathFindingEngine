using System;
using System.Collections.Generic;

namespace Pather.Common.Models.Common
{
    [Serializable]
    public class PubSub_Message_Collection : IPubSub_Message
    {
        public List<IPubSub_Message> MessageCollection;
    }
}