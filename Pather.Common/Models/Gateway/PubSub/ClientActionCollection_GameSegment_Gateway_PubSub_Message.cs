using System;
using System.Collections.Generic;
using Pather.Common.Models.Common.Actions.ClientActions.Base;
using Pather.Common.Models.Gateway.PubSub.Base;

namespace Pather.Common.Models.Gateway.PubSub
{
    [Serializable]
    public class ClientActionCollection_GameSegment_Gateway_PubSub_Message : Gateway_PubSub_Message
    {
        public ClientActionCollection_GameSegment_Gateway_PubSub_Message()
        {
            Type = Gateway_PubSub_MessageType.ClientActionCollection;
        }

        public ClientAction ClientAction;
        public List<string> Users;
    }
}