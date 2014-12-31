using System;

namespace Pather.Common.Models.Gateway.Socket.Base
{
    [Serializable]
    public class TickSync_Gateway_User_Socket_Message : Gateway_User_Socket_Message
    {
        public TickSync_Gateway_User_Socket_Message()
        {
            GatewayUserMessageType = Gateway_User_Socket_MessageType.TickSync;
        }

        public long LockstepTickNumber;
    }
}