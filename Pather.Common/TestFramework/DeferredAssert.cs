using Pather.Common.Utils.Promises;

namespace Pather.Common.TestFramework
{
    public static class DeferredAssert
    {

        public static ThatObject That(Deferred deferred,object o)
        {
            return new ThatObject(o,deferred);
        }

    }
}