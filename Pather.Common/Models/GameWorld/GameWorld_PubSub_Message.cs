using System;

namespace Pather.Common.Models.GameWorld
{
    [Serializable]
    public class GameWorld_PubSub_Message
    {
        public GameWorld_PubSub_MessageType Type;
    }
    [Serializable]
    public class PongGameWorldPubSubMessage : GameWorld_PubSub_Message
    {
        public PongGameWorldPubSubMessage()
        {
            Type = GameWorld_PubSub_MessageType.Pong;
        }
    }

}