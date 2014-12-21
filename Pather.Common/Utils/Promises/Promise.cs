using System;
using System.Collections.Generic;

namespace Pather.Common.Utils.Promises
{
    public class Promise<TResolve, TError>
    {
        private List<Action<TResolve>> resolves = new List<Action<TResolve>>();
        //        private List<Func<TResolve, Promise<TResolve, TError>>> promsiedResolves = new List<Func<TResolve, Promise<TResolve, TError>>>();
        private List<Action<TError>> rejects = new List<Action<TError>>();
        private List<Action> finallys = new List<Action>();

        public Promise()
        {
            //            promsiedResolves = new List<Func<TResolve, Promise<TResolve, TError>>>();
            resolves = new List<Action<TResolve>>();
            rejects = new List<Action<TError>>();
            finallys = new List<Action>();
        }

        private bool isResolved ;
        private bool isRejected ;

        private TResolve resolvedValue ;
        private TError rejectedValue;
        internal void Resolve(TResolve item)
        {
            isResolved = true;
            resolvedValue = item;
            foreach (var resolve in resolves)
            {
                resolve(item);
            }
            /*      foreach (var resolve in promsiedResolves)
                  {
                      resolve(item).
                  }*/
        }
        internal void Reject(TError item)
        {
            isRejected = true;
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

        internal Promise<TResolve, TError> Error(Action<TError> error)
        {
            if (isRejected)
            {
                error(rejectedValue);
            }
            else
            {
                rejects.Add(error);
            }
            return this;
        }
        internal Promise<TResolve, TError> Finally(Action @finally)
        {
            if (isRejected || isResolved)
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
            if (isRejected)
            {
                resolve(resolvedValue);
            }
            else
            {
                resolves.Add(resolve);
            }


            return this;
        }
        /*
                public Promise<TResolve, TError> Then(Func<TResolve,Promise<TResolve, TError>> resolve)
                {
                    promsiedResolves.Add(resolve);
                    return this;
                }
        */
    }



    public class Promise
    {
        private List<Action> resolves = new List<Action>();
        //        private List<Func<Promise>> promsiedResolves = new List<Func<Promise>>();
        private List<Action> rejects = new List<Action>();
        private List<Action> finallys = new List<Action>();

        public Promise()
        {
            //            promsiedResolves = new List<Func<TResolve, Promise<TResolve, TError>>>();
            resolves = new List<Action>();
            rejects = new List<Action>();
            finallys = new List<Action>();
        }

        private bool isResolved  ;
        private bool isRejected  ;

        protected internal void Resolve()
        {
            isResolved = true;
            foreach (var resolve in resolves)
            {
                resolve( );
            }
            /*      foreach (var resolve in promsiedResolves)
                  {
                      resolve(item).
                  }*/
        }
        protected internal void Reject()
        {
            isRejected = true;
            foreach (var reject in rejects)
            {
                reject( );
            }

            foreach (var @finally in finallys)
            {
                @finally();
            }
        }

        public Promise Error(Action error)
        {
            if (isRejected || isResolved)
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
            if (isResolved)
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
            if (isResolved)
            {
                resolve();
            }
            else
            {
                resolves.Add(resolve);
            }
            return this;
        }
        /*
                public Promise Then(Func<Promise> resolve)
                {
                    promsiedResolves.Add(resolve);
                    return this;
                }
        */
    }
}