using System;

namespace Pather.Common.Models.GameSegment
{
    [Serializable]
    public class GameSegmentPubSubMessage
    {
        public GameSegmentPubSubMessageType Type;
    }
    [Serializable]
    public class GameSegmentPubSubAllMessage
    {
        public GameSegmentPubSubAllMessageType Type;
    }

    [Serializable]
    public class PongGameSegmentPubSubMessage : GameSegmentPubSubMessage
    {
        public PongGameSegmentPubSubMessage()
        {
            Type=GameSegmentPubSubMessageType.Pong;
        }
    }
}