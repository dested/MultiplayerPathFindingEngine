using System;
using Pather.Common.Models.Common.Actions.NeighborGameSegmentAction;

namespace GameLogic.Common
{
    [Serializable]
    public class CustomLogicAction_NeighborGameSegmentAction : LogicAction_NeighborGameSegmentAction
    {
        public LogicActionType LogicActionType;
    }
}