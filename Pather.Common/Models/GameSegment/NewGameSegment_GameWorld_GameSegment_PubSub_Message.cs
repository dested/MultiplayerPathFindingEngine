using System;
using Pather.Common.Models.GameSegment.Base;

namespace Pather.Common.Models.GameSegment
{
    [Serializable]
    public class NewGameSegment_GameWorld_GameSegment_PubSub_Message : GameSegment_PubSub_Message
    {
        public NewGameSegment_GameWorld_GameSegment_PubSub_Message()
        {
            Type = GameSegment_PubSub_MessageType.NewGameSegment;
        }

        public string GameSegmentId;
    }
}