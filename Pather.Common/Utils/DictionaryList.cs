using System;
using System.Collections.Generic;

namespace Pather.Common.Utils
{
    public class DictionaryList<TKey, T>
    {

        public JsDictionary<TKey, T> Dictionary = new JsDictionary<TKey, T>();
        public List<T> List = new List<T>();
        public List<TKey> Keys = new List<TKey>();

        private Func<T, TKey> setKeyCallback;
        public DictionaryList(Func<T, TKey> setKeyCallback)
        {
            this.setKeyCallback = setKeyCallback;
        }

        public int Count { get { return List.Count; } }

        public void Add(T t)
        {
            List.Add(t);
            var key = setKeyCallback(t);
            Keys.Add(key);
            Dictionary[key] = t;
        }
        public void Remove(T t)
        {
            List.Remove(t);
            var key = setKeyCallback(t);
            Keys.Add(key);
            Dictionary.Remove(key);
        }

        public T Get(int index)
        {
            return List[index];
        }
        public T Get(TKey key)
        {
            return Dictionary[key];
        }

        public void Clear()
        {
            Keys.Clear();
            Dictionary.Clear();
            List.Clear();

        }

        public bool Contains(TKey key)
        {
            return Dictionary.ContainsKey(key);
        }
        public bool Contains(T item)
        {
            return List.Contains(item);
        }

        public T this[TKey key]
        {
            get { return Dictionary[key]; }
        }
        public T this[int index]
        {
            get { return List[index]; }
        }

        public void UpdateKey(T user)
        {
            throw new NotImplementedException();
        }
    }
}