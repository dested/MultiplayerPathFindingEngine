using System;
using Pather.Common.Models.GameWorld.Base;

namespace Pather.Common.Models.GameWorld.GameSegment
{
    [Serializable]
    public class InitializeGameSegment_GameSegment_GameWorld_PubSub_ReqRes_Message : GameWorld_PubSub_ReqRes_Message
    {
        public InitializeGameSegment_GameSegment_GameWorld_PubSub_ReqRes_Message()
        {
            Type = GameWorld_PubSub_MessageType.InitializeGameSegment;
            Response = false;
        }

        public string OriginGameSegment;
    }
}