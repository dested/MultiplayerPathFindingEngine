using System;

namespace Pather.Common.Models.GameSegment
{
    [Serializable]
    public class Pong_GameSegment_PubSub_Message : GameSegment_PubSub_Message
    {
        public Pong_GameSegment_PubSub_Message()
        {
            Type = GameSegment_PubSub_MessageType.Pong;
        }
    }
}