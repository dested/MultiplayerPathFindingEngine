using System;

namespace Pather.Common.Models.Common.UserActions
{
    [Serializable]
    public abstract class UserAction : IAction
    {
        public UserActionType UserActionType;
        public long LockstepTick;
        public string UserId;
    }
}