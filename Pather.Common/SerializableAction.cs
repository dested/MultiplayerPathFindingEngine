using System;

namespace Pather.Common
{
    [Serializable]
    public class SerializableAction
    {
        public object Data;
        public long LockstepTickNumber;
        public ActionType Type;
    }
}