using System;
using System.Collections.Generic;
using Pather.Common.Models.Common.Actions.GameSegmentAction.Base;
using Pather.Servers.Common.SocketManager;

namespace Pather.Servers.GatewayServer
{
    [Serializable]
    internal class GatewayUser
    {
        public ISocket Socket;
        public string UserId;
        public string GameSegmentId;
        public bool BetweenReorgs;
        public List<GameSegmentAction> QueuedMessagesBetweenReorg;

        public GatewayUser()
        {
            QueuedMessagesBetweenReorg = new List<GameSegmentAction>();
        }

        public long ReorgAtLockstep;
    }
}