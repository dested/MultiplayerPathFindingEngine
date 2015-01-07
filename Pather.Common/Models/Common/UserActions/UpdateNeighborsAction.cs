using System;
using System.Collections.Generic;

namespace Pather.Common.Models.Common.UserActions
{
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