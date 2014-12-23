using System;

namespace Pather.Common.Models.GameWorld
{
    [Serializable]
    public class Pong_GameWorld_PubSub_Message : GameWorld_PubSub_Message
    {
        public Pong_GameWorld_PubSub_Message()
        {
            Type = GameWorld_PubSub_MessageType.Pong;
        }
    }
}