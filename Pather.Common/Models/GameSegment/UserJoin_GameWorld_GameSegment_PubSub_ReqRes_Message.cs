using System;
using System.Collections.Generic;
using Pather.Common.Models.GameSegment.Base;

namespace Pather.Common.Models.GameSegment
{
    [Serializable]
    public class UserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message : GameSegment_PubSub_ReqRes_Message
    {
        public UserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message()
        {
            Type = GameSegment_PubSub_MessageType.UserJoin;
        }

        public List<UserJoinGameUser> Collection;
    }
    [Serializable]
    public class UserJoinGameUser
    {
        public string UserId;
        public int X;
        public int Y;
        public string GatewayId;
    }
}