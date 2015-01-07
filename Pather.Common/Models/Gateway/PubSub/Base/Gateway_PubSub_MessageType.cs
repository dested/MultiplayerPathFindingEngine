using System.Runtime.CompilerServices;

namespace Pather.Common.Models.Gateway.PubSub.Base
{
    [NamedValues]
    public enum Gateway_PubSub_MessageType
    {
        UserJoined,
        Pong,
        UserActionCollection
    }
}