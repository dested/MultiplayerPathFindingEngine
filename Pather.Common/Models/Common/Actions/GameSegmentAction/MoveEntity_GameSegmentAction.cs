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
}