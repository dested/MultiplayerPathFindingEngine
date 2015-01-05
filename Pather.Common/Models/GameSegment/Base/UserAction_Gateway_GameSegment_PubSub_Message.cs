using System;
using System.Runtime.CompilerServices;
using Pather.Common.Models.Common.UserActions;

namespace Pather.Common.Models.GameSegment.Base
{
    [Serializable]
    public class UserAction_Gateway_GameSegment_PubSub_Message : GameSegment_PubSub_Message
    {
        public UserAction_Gateway_GameSegment_PubSub_Message()
        {
            Type = GameSegment_PubSub_MessageType.UserAction;
        }
        public string UserId;
        public UserAction Action;
    }

/*
    public enum GameSegmentActionType
    {
    }
*/
}