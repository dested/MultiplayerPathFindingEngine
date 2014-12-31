using System;
using System.Collections.Generic;
using Pather.Common.Models.Gateway.PubSub.Base;

namespace Pather.Common.Models.Gateway.PubSub
{
    [Serializable]
    public class UserMovedCollection_GameSegment_Gateway_PubSub_Message : Gateway_PubSub_Message
    {
        public UserMovedCollection_GameSegment_Gateway_PubSub_Message()
        {
            Type = Gateway_PubSub_MessageType.UserMovedCollection;
        }

        public int X;
        public int Y;
        public long LockstepTick;
        public string UserThatMovedId;
        public List<string> Users;
    }
}