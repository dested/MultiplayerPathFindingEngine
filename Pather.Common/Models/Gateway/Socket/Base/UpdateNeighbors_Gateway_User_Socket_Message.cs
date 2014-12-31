using System;
using System.Collections.Generic;
using Pather.Common.Models.Common;

namespace Pather.Common.Models.Gateway.Socket.Base
{
    [Serializable]
    public class UpdateNeighbors_Gateway_User_Socket_Message : Gateway_User_Socket_Message
    {
        public UpdateNeighbors_Gateway_User_Socket_Message()
        {
            GatewayUserMessageType = Gateway_User_Socket_MessageType.UpdateNeighbors;
        }

        public List<string> Removed;
        public List<UpdatedNeighbor> Added;
    }
}