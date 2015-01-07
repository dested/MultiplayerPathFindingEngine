using System;
using Pather.Common.Models.Common.UserActions;

namespace Pather.Common.Models.Common
{
    [Serializable]
    public class InProgressAction
    {
        public InProgressAction(UserAction action, long endingLockStepTicking)
        {
            Action = action;
            EndingLockStepTicking = endingLockStepTicking;
        }

        public UserAction Action;
        public long EndingLockStepTicking;
    }
}