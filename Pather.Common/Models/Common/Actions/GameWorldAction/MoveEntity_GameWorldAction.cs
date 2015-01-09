using System;
using Pather.Common.Models.Common.Actions.GameWorldAction.Base;

namespace Pather.Common.Models.Common.Actions.GameWorldAction
{
    [Serializable]
    public class MoveEntity_GameWorldAction : Base.GameWorldAction
    {
        public MoveEntity_GameWorldAction()
        {
            GameWorldActionType = GameWorldActionType.MoveEntity;
        }
    }
}