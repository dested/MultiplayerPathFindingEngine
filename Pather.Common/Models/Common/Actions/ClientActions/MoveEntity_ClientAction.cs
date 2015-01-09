using System;
using Pather.Common.Models.Common.Actions.ClientActions.Base;

namespace Pather.Common.Models.Common.Actions.ClientActions
{
    [Serializable]
    public class MoveEntity_ClientAction : ClientAction
    {
        public MoveEntity_ClientAction()
        {
            ClientActionType = ClientActionType.Move;
        }

        public double X;
        public double Y;
    }
}