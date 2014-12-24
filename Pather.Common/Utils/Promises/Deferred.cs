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
    }

    public class Deferred
    {
        public Deferred()
        {
            Promise = new Promise();
        }


        public void Resolve()
        {
            Promise.Resolve();
        }

        public void Reject()
        {
            Promise.Reject();
        }

        public Promise Promise;

        public void ResolveInATick()
        {
            //todo basically a testmethod
            Global.SetTimeout(() => Promise.Resolve(), 0);
        }
    }
}