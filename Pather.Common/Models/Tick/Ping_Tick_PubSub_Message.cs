using System;
using Pather.Common.Models.Tick.Base;

namespace Pather.Common.Models.Tick
{
    [Serializable]
    public class Ping_Tick_PubSub_Message : Tick_PubSub_Message
    {
        public Ping_Tick_PubSub_Message()
        {
            Type = Tick_PubSub_MessageType.Ping;
        }

        public string Origin;
        public Ping_Tick_PubSub_Message_OriginType OriginType;
    }
}