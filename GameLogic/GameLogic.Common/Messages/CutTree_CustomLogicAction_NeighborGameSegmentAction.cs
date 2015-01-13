using System;

namespace GameLogic.Common
{
    [Serializable]

    public class CutTree_CustomLogicAction_NeighborGameSegmentAction : CustomLogicAction_NeighborGameSegmentAction 
    {
        public CutTree_CustomLogicAction_NeighborGameSegmentAction()
        {
            LogicActionType=LogicActionType.CutTree;
        }
        public int TreeX;
        public int TreeY;

    }
}