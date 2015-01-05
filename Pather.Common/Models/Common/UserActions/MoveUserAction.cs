using System;

namespace Pather.Common.Models.Common.UserActions
{
    [Serializable]
    public class MoveUserAction : UserAction
    {
        public MoveUserAction()
        {
            UserActionType = UserActionType.Move;
        }

        public int X;
        public int Y;
    }
}