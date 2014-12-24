using System;
using System.Collections.Generic;

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

            var resolves = new List<TResolve>();

            var resolveCallback = (Action<TResolve>) ((resolve) =>
            {
                count++;
                resolves.Add(resolve);
                if (count == promises.Length)
                {
                    deferred.Resolve(resolves.ToArray());
                }
            });

            var rejectCallback = (Action<TError>) (deferred.Reject);
            foreach (var promise in promises)
            {
                promise.Then(resolveCallback).Error(rejectCallback);
            }
            return deferred.Promise;
        }

        public static Promise<TResolve[], TError> AllSequential<TResolve, TError>(params Promise<TResolve, TError>[] promises)
        {
            var deferred = Defer<TResolve[], TError>();
            var count = 0;

            var resolves = new List<TResolve>();
            var rejectCallback = (Action<TError>) (deferred.Reject);
            Action<TResolve> resolveCallback = null;
            resolveCallback = (resolve) =>
            {
                count++;
                resolves.Add(resolve);

                if (count == promises.Length)
                {
                    deferred.Resolve(resolves.ToArray());
                }
                else
                {
                    promises[count].Then(resolveCallback).Error(rejectCallback);
                }
            };


            promises[0].Then(resolveCallback).Error(rejectCallback);
            return deferred.Promise;
        }

        public static Promise AllSequential(params Promise[] promises)
        {
            var deferred = Defer();
            var count = 0;

            var rejectCallback = (Action) (deferred.Reject);
            Action resolveCallback = null;
            resolveCallback = () =>
            {
                count++;

                if (count == promises.Length)
                {
                    deferred.Resolve();
                }
                else
                {
                    promises[count].Then(resolveCallback).Error(rejectCallback);
                }
            };


            promises[0].Then(resolveCallback).Error(rejectCallback);
            return deferred.Promise;
        }


        public static Promise All(params Promise[] promises)
        {
            var deferred = Defer();
            var count = 0;
            var resolveCallback = (Action) (() =>
            {
                count++;
                if (count == promises.Length)
                {
                    deferred.Resolve();
                }
            });

            var rejectCallback = (Action) (deferred.Reject);
            foreach (var promise in promises)
            {
                promise.Then(resolveCallback).Error(rejectCallback);
            }
            return deferred.Promise;
        }

        public static Promise All(List<Promise> promises)
        {
            return All(promises.ToArray());
        }

        public static Promise AllSequential(List<Promise> promises)
        {
            return AllSequential(promises.ToArray());
        }

        public static Promise<TResolve[], TError> All<TResolve, TError>(List<Promise<TResolve, TError>> promises)
        {
            return All(promises.ToArray());
        }

        public static Promise<TResolve[], TError> AllSequential<TResolve, TError>(List<Promise<TResolve, TError>> promises)
        {
            return AllSequential(promises.ToArray());
        }

        public static Promise ResolvedPromise()
        {
            var deferred = Defer();
            deferred.Resolve();
            return deferred.Promise;
        }

        public static Promise<TResolve, TError> ResolvedPromise<TResolve, TError>(TResolve resolve)
        {
            var deferred = Defer<TResolve, TError>();
            deferred.Resolve(resolve);
            return deferred.Promise;
        }

        public static Promise RejectedPromise()
        {
            var deferred = Defer();
            deferred.Resolve();
            return deferred.Promise;
        }

        public static Promise<TResolve, TError> RejectedPromise<TResolve, TError>(TError error)
        {
            var deferred = Defer<TResolve, TError>();
            deferred.Reject(error);
            return deferred.Promise;
        }
    }
}