using System;
using Pather.Common.Models.GameSegment.Base;

namespace Pather.Common.Models.GameSegment
{
    [Serializable]
    public class UserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message : GameSegment_PubSub_ReqRes_Message
    {
        public UserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message()
        {
            Type = GameSegment_PubSub_MessageType.UserLeft;
        }

        public string UserId;
    }
}