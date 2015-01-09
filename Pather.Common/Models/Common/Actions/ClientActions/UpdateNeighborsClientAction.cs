using System;
using System.Collections.Generic;
using Pather.Common.Models.Common.Actions.ClientActions.Base;

namespace Pather.Common.Models.Common.Actions.ClientActions
{
    [Serializable]
    public class UpdateNeighborsClientAction : ClientAction
    {
        public UpdateNeighborsClientAction()
        {
            ClientActionType = ClientActionType.UpdateNeighbors;
        }

        public List<UpdatedNeighbor> Added;
        public List<string> Removed;
    }
}