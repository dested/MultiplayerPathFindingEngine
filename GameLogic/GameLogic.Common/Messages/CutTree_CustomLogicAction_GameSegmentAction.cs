using System;

namespace GameLogic.Common
{
    [Serializable]

    public class CutTree_CustomLogicAction_GameSegmentAction : CustomLogicAction_GameSegmentAction
    {
        public CutTree_CustomLogicAction_GameSegmentAction()
        {
            LogicActionType = LogicActionType.CutTree;
        }

        public int TreeX;
        public int TreeY;
    }
}