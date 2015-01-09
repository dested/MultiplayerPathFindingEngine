using System;
using Pather.Common.Models.Common.Actions.NeighborGameSegmentAction.Base;

namespace Pather.Common.Models.Common.Actions.NeighborGameSegmentAction
{
    [Serializable]
    public class MoveEntity_NeighborGameSegmentAction : Base.NeighborGameSegmentAction
    {
        public MoveEntity_NeighborGameSegmentAction()
        {
            NeighborGameSegmentActionType = NeighborGameSegmentActionType.MoveEntity;
        }
    }
}