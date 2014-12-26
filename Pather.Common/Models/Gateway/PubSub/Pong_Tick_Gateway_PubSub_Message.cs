using System;
using System.Collections.Generic;
using Pather.Common.Models.Common;
using Pather.Common.Models.Gateway.PubSub.Base;

namespace Pather.Common.Models.Gateway.PubSub
{
    [Serializable]
    public class Pong_Tick_Gateway_PubSub_Message : Gateway_PubSub_Message
    {
        public Pong_Tick_Gateway_PubSub_Message()
        {
            Type = Gateway_PubSub_MessageType.Pong;
        }
    }
    [Serializable]
    public class UserMovedCollection_GameSegment_Gateway_PubSub_Message : Gateway_PubSub_Message
    {
        public UserMovedCollection_GameSegment_Gateway_PubSub_Message()
        {
            Type = Gateway_PubSub_MessageType.UserMovedCollection;
        }

        public List<UserMovedMessage> Items;

    }



}