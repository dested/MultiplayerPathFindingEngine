using System;
using System.Runtime.CompilerServices;

namespace Pather.Common.Utils
{
    public static class Utilities
    {
        public static string ShortDate()
        {
            var sb = "";

            var dt = DateTime.Now;
            /*
                        sb += dt.Day;
                        sb += (dt.Month );
                        sb += dt.Year;*/
            sb += dt.Hour + ":";
            sb += dt.Minute + ":";
            sb += dt.Second;
            return sb;
        }

        public static string LongDate()
        {
            var sb = "";

            var dt = DateTime.Now;

            sb += dt.Day + "-";
            sb += dt.Month + "-";
            sb += dt.Year + "-";
            sb += dt.Hour + "-";
            sb += dt.Minute + "-";
            sb += dt.Second;
            return sb;
        }

        public static string UniqueId()
        {
            return Guid.NewGuid().ToString("N");
        }

        public static bool HasField<T>(object message, Func<T, object> predicate)
        {
            var m = predicate(Script.Reinterpret<T>(message));
            return !Script.IsUndefined(m);
        }

        public static int ToSquare(double pos)
        {
            return (int) (pos/Constants.SquareSize);

        }
    }
}