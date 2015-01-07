using System;
using System.Collections.Generic;
using Pather.Common.Models.Common.UserActions;

namespace Pather.Common.Models.Common
{
    [Serializable]
    public class UpdatedNeighbor
    {
        public string UserId;
        public double X;
        public double Y;
        public List<InProgressAction> InProgressActions;
    }
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