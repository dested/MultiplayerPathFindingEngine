using Pather.Common.Utils.Promises;

namespace Pather.Common.TestFramework
{
    public class ThatObject
    {
        internal readonly object That;
        internal readonly Deferred Deferred;

        public ThatObject(object that, Deferred deferred = null)
        {
            That = that;
            Deferred = deferred;
        }

        public RightObject Is
        {
            get { return new RightObject(this); }
        }

        public RightObject Does
        {
            get { return new RightObject(this); }
        }
    }
}