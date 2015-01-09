using System.Runtime.CompilerServices;

namespace Pather.Common.Models.Common.Actions.ClientActions.Base
{
    [NamedValues]
    public enum ClientActionType
    {
        Move,
        UpdateNeighbors,
        MoveEntityOnPath
    }
}