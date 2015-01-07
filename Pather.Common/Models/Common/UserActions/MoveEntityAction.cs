using System;
using System.Collections.Generic;
using Pather.Common.Definitions.AStar;
using Pather.Common.Utils;

namespace Pather.Common.Models.Common.UserActions
{
    [Serializable]
    public class MoveEntityAction : UserAction
    {
        public MoveEntityAction()
        {
            UserActionType = UserActionType.Move;
        }

        public double X;
        public double Y;
    }

    [Serializable]
    public class MoveEntityOnPathAction : UserAction
    {
        public MoveEntityOnPathAction()
        {
            UserActionType = UserActionType.MoveEntityOnPath;
        }

        public List<AStarLockstepPath> Path;
    }

    [Serializable]
    public class UpdateNeighborsAction : UserAction
    {
        public UpdateNeighborsAction()
        {
            UserActionType = UserActionType.UpdateNeighbors;
        }
        public List<UpdatedNeighbor> Added;
        public List<string> Removed;
    }
}