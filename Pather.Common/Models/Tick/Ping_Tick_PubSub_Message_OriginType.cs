using System.Runtime.CompilerServices;

namespace Pather.Common.Models.Tick
{
    [NamedValues]
    public enum Ping_Tick_PubSub_Message_OriginType
    {
        GameSegment,
        GameWorld,
        Gateway
    }
}