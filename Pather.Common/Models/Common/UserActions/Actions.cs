using System;

namespace Pather.Common.Models.Common.UserActions
{

    [Serializable]
    public interface IAction
    {
    }
    [Serializable]
    public abstract class UserAction : IAction
    {
        public UserActionType UserActionType;
        public long LockstepTick;
        public string UserId;
    }
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

    public enum UserActionType
    {
        Move
    }
}