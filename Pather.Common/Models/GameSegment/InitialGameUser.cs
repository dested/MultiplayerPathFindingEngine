using System;

namespace Pather.Common.Models.GameSegment
{
    [Serializable]
    public class InitialGameUser
    {
        public string UserId;
        public double X;
        public double Y;
        public string GatewayId;
        public string GameSegmentId;
    }
}