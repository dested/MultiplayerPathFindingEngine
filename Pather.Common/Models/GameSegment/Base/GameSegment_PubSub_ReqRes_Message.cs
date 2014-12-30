using System;
using Pather.Common.Models.Common;
using Pather.Common.Utils;

namespace Pather.Common.Models.GameSegment.Base
{
    [Serializable]
    public abstract class GameSegment_PubSub_ReqRes_Message : GameSegment_PubSub_Message, IPubSub_ReqRes_Message
    {
        public GameSegment_PubSub_ReqRes_Message()
        {
            MessageId = Utilities.UniqueId();
        }

        public string MessageId { get; set; }
        public bool Response { get; set; }
    }
}