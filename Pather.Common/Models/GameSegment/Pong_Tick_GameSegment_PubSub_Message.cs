using System;
using Pather.Common.Models.GameSegment.Base;

namespace Pather.Common.Models.GameSegment
{
    [Serializable]
    public class Pong_Tick_GameSegment_PubSub_Message : GameSegment_PubSub_Message
    {
        public Pong_Tick_GameSegment_PubSub_Message()
        {
            Type = GameSegment_PubSub_MessageType.Pong;
        }
    }
}