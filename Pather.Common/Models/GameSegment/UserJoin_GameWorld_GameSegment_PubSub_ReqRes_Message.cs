using System;

namespace Pather.Common.Models.GameSegment
{
    [Serializable]
    public class UserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message : GameSegment_PubSub_ReqRes_Message
    {
        public UserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message()
        {
            Type = GameSegment_PubSub_MessageType.UserJoin;
        }

        public string UserId;
        public int X;
        public int Y;
        public string GatewayServer;
    }
}