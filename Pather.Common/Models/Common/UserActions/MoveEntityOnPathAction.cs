using System;
using System.Collections.Generic;
using Pather.Common.Definitions.AStar;

namespace Pather.Common.Models.Common.UserActions
{
    [Serializable]
    public class MoveEntityOnPathAction : UserAction
    {
        public MoveEntityOnPathAction()
        {
            UserActionType = UserActionType.MoveEntityOnPath;
        }

        public List<AStarLockstepPath> Path;
    }
}