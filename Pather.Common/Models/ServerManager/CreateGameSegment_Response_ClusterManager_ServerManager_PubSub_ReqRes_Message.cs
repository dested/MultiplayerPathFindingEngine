using System;
using Pather.Common.Models.ServerManager.Base;

namespace Pather.Common.Models.ServerManager
{
    [Serializable]
    public class CreateGameSegment_Response_ClusterManager_ServerManager_PubSub_ReqRes_Message : ServerManager_PubSub_ReqRes_Message
    {
        public CreateGameSegment_Response_ClusterManager_ServerManager_PubSub_ReqRes_Message()
        {
            Type = ServerManager_PubSub_MessageType.CreateGameSegment;
            Response = true;
        }

        public string GameSegmentId;
    }
}