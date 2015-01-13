using System;
using Pather.Common.Models.Common.Actions.TellGameSegmentAction;

namespace GameLogic.Common
{
    [Serializable]
    public class CustomLogicAction_TellGameSegmentAction : LogicAction_TellGameSegmentAction
    {
        public LogicActionType LogicActionType;
    }
}