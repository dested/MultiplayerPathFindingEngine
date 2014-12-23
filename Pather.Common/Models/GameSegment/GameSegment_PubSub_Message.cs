using System;
using Pather.Common.Models.GameSegmentCluster;

namespace Pather.Common.Models.GameSegment
{
    [Serializable]
    public class GameSegment_PubSub_Message
    {
        public GameSegmentPubSubMessageType Type;
    }
    [Serializable]
    public class GameSegment_PubSub_AllMessage
    {
        public GameSegmentPubSubAllMessageType Type;
    }

    [Serializable]
    public class PongGameSegmentPubSubMessage : GameSegment_PubSub_Message
    {
        public PongGameSegmentPubSubMessage()
        {
            Type = GameSegmentPubSubMessageType.Pong;
        }
    }

    [Serializable]
    public class GameSegment_PubSub_ReqRes_Message : GameSegment_PubSub_Message, IPubSub_ReqRes_Message
    {
        public GameSegment_PubSub_ReqRes_Message()
        {
            MessageId = Common.UniqueId();
        }

        public string MessageId { get; set; }
    }

    [Serializable]
    public class UserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message : GameSegment_PubSub_ReqRes_Message
    {
        public UserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message()
        {
            Type = GameSegmentPubSubMessageType.UserJoin;
        }
        public string UserId;
        public int X;
        public int Y;
        public string GatewayServer;
    }
}