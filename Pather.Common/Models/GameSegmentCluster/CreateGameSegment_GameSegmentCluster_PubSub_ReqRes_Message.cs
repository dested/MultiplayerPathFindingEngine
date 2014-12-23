using System;

namespace Pather.Common.Models.GameSegmentCluster
{
    [Serializable]
    public class CreateGameSegment_GameSegmentCluster_PubSub_ReqRes_Message : GameSegmentCluster_PubSub_ReqRes_Message
    {
        public CreateGameSegment_GameSegmentCluster_PubSub_ReqRes_Message()
        {
            Type = GameSegmentCluster_PubSub_MessageType.CreateGameSegment;
        }

        public string GameSegmentId;
    }
}