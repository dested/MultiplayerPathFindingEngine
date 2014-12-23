using System;

namespace Pather.Common.Models.Gateway
{
    [Serializable]
    public class Pong_Gateway_PubSub_Message : Gateway_PubSub_Message
    {
        public Pong_Gateway_PubSub_Message()
        {
            Type = Gateway_PubSub_MessageType.Pong;
        }
    }
}