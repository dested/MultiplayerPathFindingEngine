using System;
using Pather.Common.Models.Common.Actions.GameSegmentAction;
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
}