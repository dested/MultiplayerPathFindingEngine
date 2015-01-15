using System;
using System.Collections.Generic;

namespace Pather.Common.Utils.Promises
{
    public class Promise<TResolve, TError>
    {
        private readonly List<Action<TResolve>> resolves = new List<Action<TResolve>>();
        private readonly List<Action<TError>> rejects = new List<Action<TError>>();
        private readonly List<Action> finallys = new List<Action>();

        public Promise()
        {
            resolves = new List<Action<TResolve>>();
            rejects = new List<Action<TError>>();
            finallys = new List<Action>();
        }

        public bool IsResolved;
        public bool IsRejected;

        private TResolve resolvedValue;
        private TError rejectedValue;

        internal void Resolve(TResolve item)
        {
            if (IsResolved || IsRejected)
            {
                throw new Exception("Can only resolve promise once.");
            }

            IsResolved = true;
            resolvedValue = item;
            foreach (var resolve in resolves)
            {
                resolve(item);
            }
            foreach (var @finally in finallys)
            {
                @finally();
            }
        }

        internal void Reject(TError item)
        {
            if (IsResolved || IsRejected)
            {
                throw new Exception("Can only resolve promise once.");
            }

            IsRejected = true;
            rejectedValue = item;

            foreach (var reject in rejects)
            {
                reject(item);
            }

            foreach (var @finally in finallys)
            {
                @finally();
            }
        }

        public Promise<TResolve, TError> Error(Action<TError> error)
        {
            if (IsRejected)
            {
                error(rejectedValue);
            }
            else
            {
                rejects.Add(error);
            }
            return this;
        }

        public Promise<TResolve, TError> Finally(Action @finally)
        {
            if (IsRejected || IsResolved)
            {
                @finally();
            }
            else
            {
                finallys.Add(@finally);
            }
            return this;
        }

        public Promise<TResolve, TError> Then(Action<TResolve> resolve)
        {
            if (IsResolved)
            {
                resolve(resolvedValue);
            }
            else
            {
                resolves.Add(resolve);
            }


            return this;
        }

        public Promise<TNewResolve, TError> Then<TNewResolve>(Func<TResolve, Promise<TNewResolve, TError>> resolvePromise)
        {
            var deferred = Q.Defer<TNewResolve, TError>();
            
            this.Then((resolve) =>
            {
                resolvePromise(resolve).PassThrough(deferred.Promise);
            });
            this.Error(a => deferred.Reject(a));

            return deferred.Promise;
        }


        public Promise<TResolve, TError> PassThrough(Promise<TResolve, TError> passThrough)
        {
            Then(passThrough.Resolve).Error(passThrough.Reject);
            return passThrough;
        }
    }


    public class Promise
    {
        private readonly List<Action> resolves = new List<Action>();
        private readonly List<Action> rejects = new List<Action>();
        private readonly List<Action> finallys = new List<Action>();

        public Promise()
        {
            resolves = new List<Action>();
            rejects = new List<Action>();
            finallys = new List<Action>();
        }

        public bool IsResolved;
        public bool IsRejected;

        protected internal void Resolve()
        {
            if (IsResolved || IsRejected)
            {
                throw new Exception("Can only resolve promise once.");
            }
            IsResolved = true;
            foreach (var resolve in resolves)
            {
                resolve();
            }
            foreach (var @finally in finallys)
            {
                @finally();
            }
        }

        protected internal void Reject()
        {
            if (IsResolved || IsRejected)
            {
                throw new Exception("Can only resolve promise once.");
            }

            IsRejected = true;
            foreach (var reject in rejects)
            {
                reject();
            }

            foreach (var @finally in finallys)
            {
                @finally();
            }
        }

        public Promise Error(Action error)
        {
            if (IsRejected)
            {
                error();
            }
            else
            {
                rejects.Add(error);
            }

            return this;
        }

        public Promise Finally(Action @finally)
        {
            if (IsRejected || IsResolved)
            {
                @finally();
            }
            else
            {
                finallys.Add(@finally);
            }

            return this;
        }

        public Promise Then(Action resolve)
        {
            if (IsResolved)
            {
                resolve();
            }
            else
            {
                resolves.Add(resolve);
            }
            return this;
        }

        public Promise PassThrough(Promise passThrough)
        {
            Then(passThrough.Resolve).Error(passThrough.Reject);
            return passThrough;
        }
    }
}