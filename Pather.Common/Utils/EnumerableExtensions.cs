using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace Pather.Common.Utils
{
    public static class EnumerableExtensions
    {
        public static T2 As<T, T2>(this T t) where T2 : T
        {
            return (T2) t;
        }


        public static JsDictionary<T2, T> ToDictionary<T, T2>(this List<T> items, Func<T, T2> clause)
        {
            var items2 = new JsDictionary<T2, T>();

            foreach (var item in items)
            {
                items2[clause(item)] = item;
            }
            return items2;
        }

        public static int IndexOfFast(this List<int> items, int ind)
        {
            for (var index = 0; index < items.Count; index++)
            {
                var item = items[index];
                if (item == ind) return index;
            }
            return -1;
        }

        [IncludeGenericArguments(false)]
        public static JsDictionary<TKey, List<TItem>> GroupBy<TKey, TItem>(this List<TItem> items, Func<TItem, TKey> callback)
        {
            var kitems = new JsDictionary<TKey, List<TItem>>();
            foreach (var item in items)
            {
                var k = callback(item);
                if (!kitems.ContainsKey(k))
                {
                    kitems[k] = new List<TItem>();
                }
                kitems[k].Add(item);
            }
            return kitems;
        }

        public static int IndexOfFast(this int[] items, int ind)
        {
            for (var index = 0; index < items.Length; index++)
            {
                var item = items[index];
                if (item == ind) return index;
            }
            return -1;
        }

        [IncludeGenericArguments(false)]
        public static T[] Where<T>(this T[] items, Func<T, bool> clause)
        {
            var items2 = new List<T>();

            foreach (var item in items)
            {
                if (clause(item))
                {
                    items2.Add(item);
                }
            }
            return items2.ToArray();
        }

        public static T First<T>(this T[] items, Func<T, bool> clause)
        {
            foreach (var item in items)
            {
                if (clause(item))
                {
                    return item;
                }
            }
            return default(T);
        }

        [IncludeGenericArguments(false)]
        public static bool All<T>(this T[] items, Func<T, bool> clause)
        {
            foreach (var item in items)
            {
                if (!clause(item))
                {
                    return false;
                }
            }
            return true;
        }

        public static T First<T>(this IEnumerable<T> items, Func<T, bool> clause)
        {
            foreach (var item in items)
            {
                if (clause(item))
                {
                    return item;
                }
            }
            return default(T);
        }

        public static T First<T>(this IEnumerable<T> items)
        {
            foreach (var item in items)
            {
                return item;
            }
            return default(T);
        }

        [IncludeGenericArguments(false)]
        public static double Average<T>(this IEnumerable<T> items, Func<T, double> clause)
        {
            double sum = 0;
            var count = 0;

            foreach (var item in items)
            {
                count++;
                sum += clause(item);
            }
            return sum/count;
        }

        [IncludeGenericArguments(false)]
        public static bool All<T>(this List<T> items, Func<T, bool> clause)
        {
            foreach (var item in items)
            {
                if (!clause(item))
                {
                    return false;
                }
            }
            return true;
        }

        [IncludeGenericArguments(false)]
        public static bool Any<T>(this IEnumerable<T> items, Func<T, bool> clause)
        {
            foreach (var item in items)
            {
                if (clause(item))
                {
                    return true;
                }
            }
            return false;
        }

        [IncludeGenericArguments(false)]
        public static bool Any<T>(this T[] items, Func<T, bool> clause)
        {
            foreach (var item in items)
            {
                if (clause(item))
                {
                    return true;
                }
            }
            return false;
        }

        [IncludeGenericArguments(false)]
        public static T[] OrderBy<T>(this T[] items, Func<T, int> clause)
        {
            var j = items.Clone();
            j.Sort((a, b) => clause(a).CompareTo(clause(b)));
            return j;
        }

        [IncludeGenericArguments(false)]
        public static T[] OrderBy<T>(this List<T> items, Func<T, int> clause)
        {
            var j = items.ToArray().Clone();
            j.Sort((a, b) => clause(a).CompareTo(clause(b)));
            return j;
        }

        [IncludeGenericArguments(false)]
        public static T[] OrderBy<T>(this T[] items, Func<T, string> clause)
        {
            var j = items.Clone();
            j.Sort((a, b) => clause(a).CompareTo(clause(b)));
            return j;
        }

        [IncludeGenericArguments(false)]
        public static T[] OrderBy<T>(this List<T> items, Func<T, string> clause)
        {
            var j = items.ToArray().Clone();
            j.Sort((a, b) => clause(a).CompareTo(clause(b)));
            return j;
        }

        [IncludeGenericArguments(false)]
        public static T[] OrderBy<T>(this T[] items, Func<T, double> clause)
        {
            var j = items.Clone();
            j.Sort((a, b) => clause(a).CompareTo(clause(b)));
            return j;
        }

        [IncludeGenericArguments(false)]
        public static T[] OrderBy<T>(this List<T> items, Func<T, double> clause)
        {
            var j = items.ToArray().Clone();
            j.Sort((a, b) => clause(a).CompareTo(clause(b)));
            return j;
        }


        [IncludeGenericArguments(false)]
        public static List<T2> Select<T, T2>(this T[] items, Func<T, T2> clause)
        {
            var items2 = new List<T2>();

            foreach (var item in items)
            {
                items2.Add(clause(item));
            }
            return items2;
        }

        [IncludeGenericArguments(false)]
        public static T Last<T>(this List<T> items)
        {
            return items[items.Count - 1];
        }

        [IncludeGenericArguments(false)]
        public static List<T2> SelectMany<T, T2>(this List<T> items, Func<T, List<T2>> clause)
        {
            var items2 = new List<T2>();

            foreach (var item in items)
            {
                items2.AddRange(clause(item));
            }
            return items2;
        }

        [IncludeGenericArguments(false)]
        public static List<T> Take<T>(this List<T> items, int count)
        {
            var items2 = new List<T>();

            var c = 0;
            foreach (var item in items)
            {
                items2.Add(item);
                c++;
                if (c == count)
                {
                    return items2;
                }
            }
            return items2;
        }


        [IncludeGenericArguments(false)]
        public static T[] Where<T>(this IEnumerable<T> items, Func<T, bool> clause)
        {
            var items2 = new List<T>();

            foreach (var item in items)
            {
                if (clause(item))
                {
                    items2.Add(item);
                }
            }
            return items2.ToArray();
        }

        [IncludeGenericArguments(false)]
        public static List<T> Where<T>(this List<T> items, Func<T, bool> clause)
        {
            var items2 = new List<T>();

            foreach (var item in items)
            {
                if (clause(item))
                {
                    items2.Add(item);
                }
            }
            return items2;
        }

        [IncludeGenericArguments(false)]
        public static List<T2> Select<T, T2>(this List<T> items, Func<T, T2> clause)
        {
            var items2 = new List<T2>();

            foreach (var item in items)
            {
                items2.Add(clause(item));
            }
            return items2;
        }
    }
}