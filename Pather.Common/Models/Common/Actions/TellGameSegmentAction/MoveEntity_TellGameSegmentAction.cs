using System;
using Pather.Common.Models.Common.Actions.TellGameSegmentAction.Base;

namespace Pather.Common.Models.Common.Actions.TellGameSegmentAction
{
    [Serializable]
    public class MoveEntity_TellGameSegmentAction : Base.TellGameSegmentAction
    {
        public MoveEntity_TellGameSegmentAction()
        {
            TellGameSegmentActionType = TellGameSegmentActionType.MoveEntity;
        }

        public double X;
        public double Y;
    }
    [Serializable]
    public class LogicAction_TellGameSegmentAction : Base.TellGameSegmentAction
    {
        public LogicAction_TellGameSegmentAction()
        {
            TellGameSegmentActionType = TellGameSegmentActionType.LogicAction;
        }
    }
}