using System.Serialization;

namespace Pather.Common.TestFramework
{
    public static class Assert
    {
        public static ThatObject That(object o)
        {
            return new ThatObject(o);
        }
    }
}