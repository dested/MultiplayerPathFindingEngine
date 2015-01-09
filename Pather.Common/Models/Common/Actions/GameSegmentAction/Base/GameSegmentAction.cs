using System;

namespace Pather.Common.Models.Common.Actions.GameSegmentAction.Base
{
    [Serializable]
    public abstract class GameSegmentAction : IAction
    {
        public GameSegmentActionType GameSegmentActionType;
        public long LockstepTick;
    }
}