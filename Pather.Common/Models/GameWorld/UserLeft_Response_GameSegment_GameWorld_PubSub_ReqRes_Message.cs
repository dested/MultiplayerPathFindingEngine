using System;
using Pather.Common.Models.GameWorld.Base;

namespace Pather.Common.Models.GameWorld
{
    [Serializable]
    public class UserLeft_Response_GameSegment_GameWorld_PubSub_ReqRes_Message : GameWorld_PubSub_ReqRes_Message
    {
        public UserLeft_Response_GameSegment_GameWorld_PubSub_ReqRes_Message()
        {
            Type = GameWorld_PubSub_MessageType.UserLeft;
        }

        public string UserId;
    }
}