using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using Pather.Common.Models.Common;
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
    [Serializable]
    public class UpdateNeighbors_GameSegment_Gateway_PubSub_Message : Gateway_PubSub_Message
    {
        public UpdateNeighbors_GameSegment_Gateway_PubSub_Message()
        {
            Type = Gateway_PubSub_MessageType.UpdateNeighbors;
        }

        public List<UpdatedNeighbor> Added;
        public List<string> Removed;
        public string UserId;
    }
}