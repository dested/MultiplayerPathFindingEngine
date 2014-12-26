using System;

namespace Pather.Common.Models.Common
{
    [Serializable]
    public class UserMovedMessage
    {
        public string UserId;
        public int X;
        public int Y;
        public long LockstepTick;
    }
}