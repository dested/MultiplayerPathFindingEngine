using System;
using Pather.Common.Models.GameSegment.Base;

namespace Pather.Common.Models.GameSegment
{
    [Serializable]
    public class TellUserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message : GameSegment_PubSub_ReqRes_Message
    {
        public TellUserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message()
        {
            Type = GameSegment_PubSub_MessageType.TellUserJoin;
        }

        public string UserId;
        public int X;
        public int Y;
        public string GatewayId;
        public string GameSegmentId;
    }
}