using System;
using Pather.Common.Models.Common.Actions.GameWorldAction;

namespace GameLogic.Common
{
    [Serializable]
    public class CustomLogicAction_GameWorldAction : LogicAction_GameWorldAction
    {
        public LogicActionType LogicActionType;
    }
}