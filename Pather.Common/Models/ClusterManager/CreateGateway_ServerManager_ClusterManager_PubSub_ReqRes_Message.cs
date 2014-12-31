using System;
using Pather.Common.Models.ClusterManager.Base;

namespace Pather.Common.Models.ClusterManager
{
    [Serializable]
    public class CreateGateway_ServerManager_ClusterManager_PubSub_ReqRes_Message : ClusterManager_PubSub_ReqRes_Message
    {
        public CreateGateway_ServerManager_ClusterManager_PubSub_ReqRes_Message()
        {
            Type = ClusterManager_PubSub_MessageType.CreateGateway;
        }

        public string GatewayId;
        public int Port;
    }
}