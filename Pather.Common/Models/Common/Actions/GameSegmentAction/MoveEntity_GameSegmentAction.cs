using System;
using Pather.Common.Models.Common.Actions.GameSegmentAction.Base;

namespace Pather.Common.Models.Common.Actions.GameSegmentAction
{
    [Serializable]
    public class MoveEntity_GameSegmentAction : Base.GameSegmentAction
    {
        public MoveEntity_GameSegmentAction()
        {
            GameSegmentActionType = GameSegmentActionType.MoveEntity;
        }

        public double X;
        public double Y;
    }

    [Serializable]
    public class LogicAction_GameSegmentAction : Base.GameSegmentAction
    {
        public LogicAction_GameSegmentAction()
        {
            this.GameSegmentActionType = GameSegmentActionType.LogicAction;
        }
    }

}