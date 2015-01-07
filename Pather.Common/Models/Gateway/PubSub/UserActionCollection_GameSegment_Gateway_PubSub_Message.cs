using System;
using System.Collections.Generic;
using Pather.Common.Models.Common.UserActions;
using Pather.Common.Models.Gateway.PubSub.Base;

namespace Pather.Common.Models.Gateway.PubSub
{
    [Serializable]
    public class UserActionCollection_GameSegment_Gateway_PubSub_Message : Gateway_PubSub_Message
    {
        public UserActionCollection_GameSegment_Gateway_PubSub_Message()
        {
            Type = Gateway_PubSub_MessageType.UserActionCollection;
        }

        public UserAction Action;
        public List<string> Users;
    }
}