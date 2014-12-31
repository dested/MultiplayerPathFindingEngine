using System;
using Pather.Common.Models.ServerManager.Base;

namespace Pather.Common.Models.ServerManager
{
    [Serializable]
    public class CreateGateway_Response_ClusterManager_ServerManager_PubSub_ReqRes_Message : ServerManager_PubSub_ReqRes_Message
    {
        public CreateGateway_Response_ClusterManager_ServerManager_PubSub_ReqRes_Message()
        {
            Type = ServerManager_PubSub_MessageType.CreateGateway;
            Response = true;
        }

        public string GatewayId;
    }
}