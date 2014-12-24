using System;
using Pather.Common.Models.GameSegment.Base;

namespace Pather.Common.Models.GameSegment
{
    [Serializable]
    public class TellUserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message : GameSegment_PubSub_ReqRes_Message
    {
        public TellUserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message()
        {
            Type = GameSegment_PubSub_MessageType.TellUserLeft;
        }

        public string UserId;
    }
}