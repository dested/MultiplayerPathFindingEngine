using System;

namespace Pather.Common.Models.Common.Actions.GameWorldAction.Base
{
    [Serializable]
    public abstract class GameWorldAction : IAction
    {
        public GameWorldActionType GameWorldActionType;
        public long LockstepTick;
        public string EntityId;
    }
}