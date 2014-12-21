using Pather.Common.Utils.Promises;

namespace Pather.Common.TestFramework
{
    public static class Assert
    {
        public static ThatObject That(object o)
        {
            return new ThatObject(o);
        }
    }
    public static class DeferredAssert
    {

        public static ThatObject That(Deferred deferred,object o)
        {
            return new ThatObject(o,deferred);
        }
    }
    

    public class ThatObject
    {
        internal readonly object That;
        internal readonly Deferred Deferred;

        public ThatObject(object that, Deferred deferred=null)
        {
            this.That = that;
            this.Deferred = deferred;
        }
        public RightObject Is { get { return new RightObject(this); } }
        public RightObject Does { get { return new RightObject(this); } }
    }

    public class RightObject
    {
        private readonly ThatObject that;

        public RightObject(ThatObject that)
        {
            this.that = that;
        }

        public void True()
        {
            if (!(bool)that.That)
            {
                fail();
            }
        }

        public void Equal(object right)
        {
            if (that.That != right)
            {
                fail();
            }
        }

        private void fail()
        {
            if (that.Deferred != null)
            {
                that.Deferred.Reject();
            }
            else
            {
                throw new AssertException();
            }
        }

    }
}