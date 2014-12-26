using System;
using Pather.Common.Models.GameWorld.Base;

namespace Pather.Common.Models.GameWorld.GameSegment
{
    [Serializable]
    public class UserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message : GameWorld_PubSub_ReqRes_Message
    {
        public UserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message()
        {
            Type = GameWorld_PubSub_MessageType.UserJoinResponse;
        }
    }

}