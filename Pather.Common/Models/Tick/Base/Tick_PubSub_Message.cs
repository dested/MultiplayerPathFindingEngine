using System;

namespace Pather.Common.Models.Tick.Base
{
    [Serializable]
    public abstract class Tick_PubSub_Message
    {
        public Tick_PubSub_MessageType Type;
    }
}