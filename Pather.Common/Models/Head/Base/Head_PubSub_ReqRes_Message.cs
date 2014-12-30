using System;
using Pather.Common.Models.Common;
using Pather.Common.Models.GameWorld.Base;
using Pather.Common.Utils;

namespace Pather.Common.Models.Head.Base
{
    [Serializable]
    public abstract class Head_PubSub_ReqRes_Message : Head_PubSub_Message, IPubSub_ReqRes_Message
    {
        public Head_PubSub_ReqRes_Message()
        {
            MessageId = Utilities.UniqueId();
        }

        public bool Response { get; set; }
        public string MessageId { get; set; }
    }
}