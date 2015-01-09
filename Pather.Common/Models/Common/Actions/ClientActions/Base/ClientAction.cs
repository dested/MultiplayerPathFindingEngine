using System;

namespace Pather.Common.Models.Common.Actions.ClientActions.Base
{
    [Serializable]
    public abstract class ClientAction : IAction
    {
        public ClientActionType ClientActionType;
        public long LockstepTick;
        public string EntityId;
    }
}