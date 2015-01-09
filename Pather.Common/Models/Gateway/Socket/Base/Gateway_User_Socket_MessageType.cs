using System.Runtime.CompilerServices;

namespace Pather.Common.Models.Gateway.Socket.Base
{
    [NamedValues]
    public enum Gateway_User_Socket_MessageType
    {
        ClientAction,
        UserJoined,
        TickSync,
        Pong,
        UpdateNeighbors
    }
}