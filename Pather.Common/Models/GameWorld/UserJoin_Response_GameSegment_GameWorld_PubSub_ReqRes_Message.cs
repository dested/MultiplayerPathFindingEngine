using System;
using Pather.Common.Models.GameWorld.Base;

namespace Pather.Common.Models.GameWorld
{
    [Serializable]
    public class UserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message : GameWorld_PubSub_ReqRes_Message
    {
        public UserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message()
        {
            Type = GameWorld_PubSub_MessageType.UserJoinResponse;
        }
    }
    [Serializable]
    public class TellUserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message : GameWorld_PubSub_ReqRes_Message
    {
        public TellUserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message()
        {
            Type = GameWorld_PubSub_MessageType.TellUserJoinResponse;
        }
    }
    [Serializable]
    public class TellUserLeft_Response_GameSegment_GameWorld_PubSub_ReqRes_Message : GameWorld_PubSub_ReqRes_Message
    {
        public TellUserLeft_Response_GameSegment_GameWorld_PubSub_ReqRes_Message()
        {
            Type = GameWorld_PubSub_MessageType.TellUserJoinResponse;
        }
    }
}