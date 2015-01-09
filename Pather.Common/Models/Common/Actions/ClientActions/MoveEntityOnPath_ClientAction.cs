using System;
using System.Collections.Generic;
using Pather.Common.Definitions.AStar;
using Pather.Common.Models.Common.Actions.ClientActions.Base;

namespace Pather.Common.Models.Common.Actions.ClientActions
{
    [Serializable]
    public class MoveEntityOnPath_ClientAction : ClientAction
    {
        public MoveEntityOnPath_ClientAction()
        {
            ClientActionType = ClientActionType.MoveEntityOnPath;
        }

        public List<AStarLockstepPath> Path;
    }
}