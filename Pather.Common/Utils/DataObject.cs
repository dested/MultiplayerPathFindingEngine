using System;

namespace Pather.Common.Utils
{
    [Serializable]
//    [IncludeGenericArguments(false)]
    public class DataObject<T>
    {
        public T Data;

        public DataObject(T data)
        {
            Data = data;
        }
    }
}