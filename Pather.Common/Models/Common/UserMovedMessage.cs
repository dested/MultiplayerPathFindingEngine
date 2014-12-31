using System;

namespace Pather.Common.Models.Common
{
    [Serializable]
    public class UserMovedMessage
    {
        public int X;
        public int Y;
        public long LockstepTick;
        public string UserThatMovedId;
        public string UserId;
    }
    [Serializable]
    public class UpdatedNeighbor
    {
        public string UserId;
        public int X;
        public int Y;
    }

}