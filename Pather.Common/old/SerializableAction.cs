using System;

namespace Pather.Common.old
{
    [Serializable]
    public class SerializableAction
    {
        public object Data;
        public long LockstepTickNumber;
        public ActionType Type;
    }
}