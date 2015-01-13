using System;
using System.Collections.Generic;
using Pather.Common.Models.Common.Actions.GameWorldAction.Base;
using Pather.Common.Utils;

namespace Pather.Common.Models.Common.Actions.GameWorldAction
{
    [Serializable]
    public class MoveEntity_GameWorldAction : Base.GameWorldAction
    {
        public MoveEntity_GameWorldAction()
        {
            GameWorldActionType = GameWorldActionType.MoveEntity;
        }

        public JsDictionary<long, Point> LockstepMovePoints;
    }
    [Serializable]
    public class LogicAction_GameWorldAction : Base.GameWorldAction
    {
        public LogicAction_GameWorldAction()
        {
            GameWorldActionType = GameWorldActionType.LogicAction;
        }

    }
}