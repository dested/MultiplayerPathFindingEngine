using System;
using Pather.Common.Models.Common.Actions.ClientActions.Base;

namespace Pather.Common.Models.Common
{
    [Serializable]
    public class InProgressClientAction
    {
        public InProgressClientAction(ClientAction action, long endingLockStepTicking)
        {
            Action = action;
            EndingLockStepTicking = endingLockStepTicking;
        }

        public ClientAction Action;
        public long EndingLockStepTicking;
    }
}