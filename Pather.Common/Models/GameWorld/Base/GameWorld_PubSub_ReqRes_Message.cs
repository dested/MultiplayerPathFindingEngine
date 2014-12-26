using System;
using Pather.Common.Models.Common;

namespace Pather.Common.Models.GameWorld.Base
{
    [Serializable]
    public abstract class GameWorld_PubSub_ReqRes_Message : GameWorld_PubSub_Message, IPubSub_ReqRes_Message
    {
        public GameWorld_PubSub_ReqRes_Message()
        {
            MessageId = Utilities.UniqueId();
        }

        public bool Response;
        public string MessageId { get; set; }
    }
}