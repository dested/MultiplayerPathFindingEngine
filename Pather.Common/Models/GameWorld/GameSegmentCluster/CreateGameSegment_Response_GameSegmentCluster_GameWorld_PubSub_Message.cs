using System;
using Pather.Common.Models.GameWorld.Base;

namespace Pather.Common.Models.GameWorld.GameSegmentCluster
{
    [Serializable]
    public class CreateGameSegment_Response_GameSegmentCluster_GameWorld_PubSub_Message : GameWorld_PubSub_ReqRes_Message
    {
        public CreateGameSegment_Response_GameSegmentCluster_GameWorld_PubSub_Message()
        {
            Type = GameWorld_PubSub_MessageType.CreateGameSegmentResponse;
            Response = true;
        }

        public string GameSegmentId;
    }
}