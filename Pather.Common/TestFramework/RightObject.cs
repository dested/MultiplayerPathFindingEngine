using System;

namespace Pather.Common.TestFramework
{
    public class RightObject
    {
        private readonly ThatObject that;

        public RightObject(ThatObject that)
        {
            this.that = that;
        }

        public void True()
        {
            if (!(bool) that.That)
            {
                fail(string.Format("{0} is not true", that.That));
            }
        }

        public void Equal(object right)
        {
            if (that.That != right)
            {
                fail(string.Format("{0} does not equal {1}", that.That, right));
            }
        }

        public void OfType(Type type)
        {
            if (that.That.GetType() != type)
            {
                fail(string.Format("{0} type is not {1}", that.That.GetType().FullName, type.FullName));
            }
        }


        private void fail(string error)
        {
            throw new AssertException(error);
        }
    }
}