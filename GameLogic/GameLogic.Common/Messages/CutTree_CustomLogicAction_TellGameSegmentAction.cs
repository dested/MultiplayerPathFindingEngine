using System;

namespace GameLogic.Common
{
    [Serializable]

    public class CutTree_CustomLogicAction_TellGameSegmentAction : CustomLogicAction_TellGameSegmentAction 
    {
        public CutTree_CustomLogicAction_TellGameSegmentAction()
        {
            LogicActionType = LogicActionType.CutTree;
        }
        public int TreeX;
        public int TreeY;
    }
}