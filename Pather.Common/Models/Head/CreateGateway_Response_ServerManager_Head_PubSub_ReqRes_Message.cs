using System;
using Pather.Common.Models.Head.Base;

namespace Pather.Common.Models.Head
{
    [Serializable]
    public class CreateGateway_Response_ServerManager_Head_PubSub_ReqRes_Message : Head_PubSub_ReqRes_Message
    {
        public CreateGateway_Response_ServerManager_Head_PubSub_ReqRes_Message()
        {
            Type = Head_PubSub_MessageType.Ping;
            Response = true;
        }

        public string GatewayId;
    }
}