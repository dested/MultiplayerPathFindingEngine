using System;
using Pather.Common.Models.Gateway.PubSub.Base;

namespace Pather.Common.Models.Gateway.PubSub
{
    [Serializable]
    public class Ping_Head_Gateway_PubSub_AllMessage : Gateway_PubSub_AllMessage
    {
        public Ping_Head_Gateway_PubSub_AllMessage()
        {
            Type = Gateway_PubSub_AllMessageType.Ping;
        }
    }
}