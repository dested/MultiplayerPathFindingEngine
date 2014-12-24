using System;
using Pather.Common.Models.Gateway.Base;

namespace Pather.Common.Models.Gateway
{
    [Serializable]
    public class Pong_Tick_Gateway_PubSub_Message : Gateway_PubSub_Message
    {
        public Pong_Tick_Gateway_PubSub_Message()
        {
            Type = Gateway_PubSub_MessageType.Pong;
        }
    }
}