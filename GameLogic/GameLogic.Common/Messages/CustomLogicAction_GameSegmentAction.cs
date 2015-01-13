using System;
using Pather.Common.Models.Common.Actions.GameSegmentAction;

namespace GameLogic.Common
{
    [Serializable]
    public class CustomLogicAction_GameSegmentAction : LogicAction_GameSegmentAction
    {
        public LogicActionType LogicActionType;
        public CustomLogicAction_GameSegmentAction()
        {
            //todo blech
            this.GameSegmentActionType = Pather.Common.Models.Common.Actions.GameSegmentAction.Base.GameSegmentActionType.LogicAction;
        }
    }
}