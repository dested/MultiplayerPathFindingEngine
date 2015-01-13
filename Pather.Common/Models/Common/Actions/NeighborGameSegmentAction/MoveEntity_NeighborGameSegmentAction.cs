using System;
using System.Collections.Generic;
using Pather.Common.Models.Common.Actions.NeighborGameSegmentAction.Base;
using Pather.Common.Utils;

namespace Pather.Common.Models.Common.Actions.NeighborGameSegmentAction
{
    [Serializable]
    public class MoveEntity_NeighborGameSegmentAction : Base.NeighborGameSegmentAction
    {
        public MoveEntity_NeighborGameSegmentAction()
        {
            NeighborGameSegmentActionType = NeighborGameSegmentActionType.MoveEntity;
        }

        public JsDictionary<long, Point> LockstepMovePoints;
    }
    [Serializable]
    public class LogicAction_NeighborGameSegmentAction : Base.NeighborGameSegmentAction
    {
        public LogicAction_NeighborGameSegmentAction()
        {
            NeighborGameSegmentActionType = NeighborGameSegmentActionType.LogicAction;
        }
    }
}