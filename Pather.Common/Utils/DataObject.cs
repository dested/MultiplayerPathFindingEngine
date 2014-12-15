using System;

namespace Pather.Common.Utils
{
    [Serializable]
    public class DataObject<T>
    {
        public T Data { get; set; }

        public DataObject(T data)
        {
            Data = data;
        }
    }
}