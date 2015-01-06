using System;

namespace Pather.Common.Models.Common.UserActions
{
    [Serializable]
    public class MoveEntityAction : UserAction
    {
        public MoveEntityAction()
        {
            UserActionType = UserActionType.Move;
        }

        public int X;
        public int Y;
    }
}