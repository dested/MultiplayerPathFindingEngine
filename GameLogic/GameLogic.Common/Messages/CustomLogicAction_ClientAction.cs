using System;
using Pather.Common.Models.Common.Actions.ClientActions;

namespace GameLogic.Common
{
    [Serializable]
    public class CustomLogicAction_ClientAction : LogicAction_ClientAction
    {

        public LogicActionType LogicActionType;
        public CustomLogicAction_ClientAction()
        {
        }
    }
}