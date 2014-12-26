using System;
using System.Collections.Generic;
using Pather.Common.Models.Common;
using Pather.Common.Models.GameSegment.Base;

namespace Pather.Common.Models.GameSegment
{
    [Serializable]
    public class UserMovedCollection_GameSegment_GameSegment_PubSub_Message : GameSegment_PubSub_Message
    {
        public UserMovedCollection_GameSegment_GameSegment_PubSub_Message()
        {
            Type = GameSegment_PubSub_MessageType.UserMovedCollection;
        }

        public List<UserMovedMessage> Items;
    }
}