using System;
using Pather.Common.Models.GameSegmentCluster;

namespace Pather.Common.Models.GameWorld
{

    [Serializable]
    public class GameWorld_PubSub_ReqRes_Message : GameWorld_PubSub_Message, IPubSub_ReqRes_Message
    {
        public GameWorld_PubSub_ReqRes_Message()
        {
            Type = GameWorld_PubSub_MessageType.CreateGameSegmentResponse;
            MessageId = Common.UniqueId();
        }

        public string MessageId { get; set; }
    }
    [Serializable]
    public class CreateGameSegment_Response_GameWorld_PubSub_Message : GameWorld_PubSub_ReqRes_Message
    {
        public CreateGameSegment_Response_GameWorld_PubSub_Message()
        {
            Type = GameWorld_PubSub_MessageType.CreateGameSegmentResponse;
        }

        public string GameSegmentId;
    }
    [Serializable]
    public class UserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message : GameWorld_PubSub_ReqRes_Message
    {
        public UserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message()
        {
            Type = GameWorld_PubSub_MessageType.CreateGameSegmentResponse;
        }
    }
    
}