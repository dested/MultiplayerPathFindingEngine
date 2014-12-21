using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Pather.Common.Utils.Promises
{
    public static class Q
    {
        public static Deferred<TResolve, TError> Defer<TResolve, TError>()
        {
            return new Deferred<TResolve, TError>();
        }
        public static Deferred<TResolve, object> Defer<TResolve>()
        {
            return new Deferred<TResolve, object>();
        }

        public static Deferred Defer()
        {
            return new Deferred();
        }

        public static Promise<TResolve[], TError> All<TResolve, TError>(params Promise<TResolve, TError>[] promises)
        {
            var deferred = Defer<TResolve[], TError>();
            var count = 0;
            
            List<TResolve> resolves = new List<TResolve>();

            var resolveCallback = (Action<TResolve>)((resolve) =>
            {
                count++;
                resolves.Add(resolve);
                if (count == promises.Length)
                {
                    deferred.Resolve(resolves.ToArray());
                }
            });

            var rejectCallback = (Action<TError>)(deferred.Reject);
            foreach (var promise in promises)
            {
                promise.Then(resolveCallback).Error(rejectCallback);
            }
            return deferred.Promise;
        }



        public static Promise All(params Promise[] promises)
        {
            var deferred = Defer();
            var count = 0;
            var resolveCallback = (Action)(() =>
            {
                count++;
                if (count == promises.Length)
                {
                    deferred.Resolve();
                }
            });

            var rejectCallback = (Action)(deferred.Reject);
            foreach (var promise in promises)
            {
                promise.Then(resolveCallback).Error(rejectCallback);
            }
            return deferred.Promise;
        }
    }
}