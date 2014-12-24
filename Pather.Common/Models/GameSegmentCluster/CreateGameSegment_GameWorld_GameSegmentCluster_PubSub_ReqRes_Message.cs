using System;
using Pather.Common.Models.GameSegmentCluster.Base;

namespace Pather.Common.Models.GameSegmentCluster
{
    [Serializable]
    public class CreateGameSegment_GameWorld_GameSegmentCluster_PubSub_ReqRes_Message : GameSegmentCluster_PubSub_ReqRes_Message
    {
        public CreateGameSegment_GameWorld_GameSegmentCluster_PubSub_ReqRes_Message()
        {
            Type = GameSegmentCluster_PubSub_MessageType.CreateGameSegment;
        }

        public string GameSegmentId;
    }
}