using System;

namespace Pather.Common.Models.GameSegment
{
    [Serializable]
    public class UserJoinGameUser
    {
        public string UserId;
        public int X;
        public int Y;
        public string GatewayId;
    }
}