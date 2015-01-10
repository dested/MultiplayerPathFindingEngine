using System.Runtime.CompilerServices;

namespace Pather.Common.Models.GameSegment.Base
{
    [NamedValues]
    public enum GameSegment_PubSub_MessageType
    {
        Pong,
        TellUserJoin,
        InitializeGameSegmentResponse,
        TellUserLeft,
        UserJoin,
        UserLeft,
        NewGameSegment,
        ReorganizeGameSegment,
        GameSegmentAction,
        TellGameSegmentAction,
        NeighborGameSegmentAction,
        TransferGameUser,
        TellTransferUser
    }
}