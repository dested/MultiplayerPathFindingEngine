using System;
using Pather.Common.Models.GameWorld.Base;

namespace Pather.Common.Models.GameWorld.Gateway
{
    [Serializable]
    public class CreateGameSegment_Response_ServerManager_GameWorld_PubSub_ReqRes_Message : GameWorld_PubSub_ReqRes_Message
    {
        public CreateGameSegment_Response_ServerManager_GameWorld_PubSub_ReqRes_Message()
        {
            Type = GameWorld_PubSub_MessageType.CreateGameSegment;
            Response = true;
        }

        public string GameSegmentId;
    }
}