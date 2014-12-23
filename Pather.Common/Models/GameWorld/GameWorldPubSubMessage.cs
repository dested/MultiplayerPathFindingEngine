using System;

namespace Pather.Common.Models.GameWorld
{
    [Serializable]
    public class GameWorldPubSubMessage
    {
        public GameWorldPubSubMessageType Type;
    }
    [Serializable]
    public class PongGameWorldPubSubMessage : GameWorldPubSubMessage
    {
        public PongGameWorldPubSubMessage()
        {
            Type = GameWorldPubSubMessageType.Pong;
        }
    }

}