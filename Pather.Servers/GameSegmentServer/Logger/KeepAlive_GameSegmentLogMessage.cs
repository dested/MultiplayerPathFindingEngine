using System;
using Pather.Common.Models.Common;

namespace Pather.Servers.GameSegmentServer.Logger
{
    [Serializable]
    public class KeepAlive_GameSegmentLogMessage : GameSegmentLogMessage
    {
        public KeepAlive_GameSegmentLogMessage()
        {
            Type = GameSegmentLogMessageType.KeepAlive;
        }
    }
}