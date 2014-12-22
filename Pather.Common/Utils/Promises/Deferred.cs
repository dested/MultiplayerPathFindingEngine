using Pather.Common.Libraries.NodeJS;

namespace Pather.Common.Utils.Promises
{
    public class Deferred<TResolve, TError>
    {
        public Deferred()
        {
            Promise = new Promise<TResolve, TError>();
        }

        public void Resolve(TResolve item)
        {
            Promise.Resolve(item);
        }

        public void Reject(TError item)
        {
            Promise.Reject(item);
        }

        public Promise<TResolve, TError> Promise;

        public Promise<TResolve, TError> PassPromiseThrough(Promise<TResolve, TError> passThrough)
        {
            passThrough.Then((resolve) => Promise.Resolve(resolve)).Error((reject) => Promise.Reject(reject));
            return Promise;
        }
    }

    public class Deferred 
    {
        public Deferred()
        {
            Promise = new Promise ();
        }


        public void Resolve()
        {
            Promise.Resolve( );
        }
        public void Reject()
        {
            Promise.Reject();
        }

        public Promise  Promise;

        public void ResolveInATick()
        {
            //todo basically a testmethod
            Global.SetTimeout(() => Promise.Resolve(), 0);
        }

        public Promise PassThrough(Promise passThrough)
        {
            return passThrough.Then(Promise.Resolve).Error(Promise.Reject);
        }
    }

}