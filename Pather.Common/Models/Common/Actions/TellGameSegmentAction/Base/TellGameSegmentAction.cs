using System;

namespace Pather.Common.Models.Common.Actions.TellGameSegmentAction.Base
{
    [Serializable]
    public abstract class TellGameSegmentAction : IAction
    {
        public TellGameSegmentActionType TellGameSegmentActionType;
        public long LockstepTick;
        public string EntityId;
    }
}