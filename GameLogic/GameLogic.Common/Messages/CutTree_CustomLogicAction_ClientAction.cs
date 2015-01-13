using System;

namespace GameLogic.Common
{
    [Serializable]

    public class CutTree_CustomLogicAction_ClientAction : CustomLogicAction_ClientAction 
    {
        public CutTree_CustomLogicAction_ClientAction()
        {
            LogicActionType=LogicActionType.CutTree;
        }

        public int TreeX;
        public int TreeY ;
    }
}