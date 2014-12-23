using System;
using Pather.Common.Models.GameSegmentCluster;

namespace Pather.Common.Models.GameWorld
{
    [Serializable]
    public class GameWorld_PubSub_ReqRes_Message : GameWorld_PubSub_Message, IPubSub_ReqRes_Message
    {
        public GameWorld_PubSub_ReqRes_Message()
        {
            MessageId = Common.UniqueId();
        }

        public string MessageId { get; set; }
    }
}