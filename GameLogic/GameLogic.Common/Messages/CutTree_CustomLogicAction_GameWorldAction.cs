using System;

namespace GameLogic.Common
{
    [Serializable]
    public class CutTree_CustomLogicAction_GameWorldAction : CustomLogicAction_GameWorldAction
    {
        public CutTree_CustomLogicAction_GameWorldAction()
        {
            LogicActionType = LogicActionType.CutTree;
        }
        public int TreeX;
        public int TreeY;
    }
}