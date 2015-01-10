using System;
using System.Collections.Generic;

namespace Pather.Common.Utils
{
    public class DictionaryList<TKey, T>
    {
        public JsDictionary<TKey, T> Dictionary = new JsDictionary<TKey, T>();
        public List<T> List = new List<T>();
        public new List<TKey> Keys = new List<TKey>();

        private readonly Func<T, TKey> setKeyCallback;

        public DictionaryList(Func<T, TKey> setKeyCallback)
        {
            this.setKeyCallback = setKeyCallback;
        }
        public DictionaryList(DictionaryList<TKey, T> dl): this(dl.setKeyCallback)
        {
            foreach (var t in dl.List)
            {
                Add(t);
            }
        }

        public int Count
        {
            get { return List.Count; }
        }

        public void Add(T t)
        {
            var key = setKeyCallback(t);

            List.Add(t);
            Keys.Add(key);
            Dictionary[key] = t;
        }

        public void Remove(T t)
        {
            var key = setKeyCallback(t);

            List.Remove(t);
            Keys.Remove(key);
            Dictionary.Remove(key);
        }

        public void Remove(TKey tkey)
        {
            var t = Dictionary[tkey];
            List.Remove(t);
            Keys.Remove(tkey);
            Dictionary.Remove(tkey);
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
    }
}