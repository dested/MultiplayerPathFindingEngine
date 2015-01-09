using System;

namespace Pather.Common.Models.Common.Actions.NeighborGameSegmentAction.Base
{
    [Serializable]
    public abstract class NeighborGameSegmentAction : IAction
    {
        public NeighborGameSegmentActionType NeighborGameSegmentActionType;
        public long LockstepTick;
        public string EntityId;
    }
}