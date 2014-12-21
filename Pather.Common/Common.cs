using System;
using System.Runtime.CompilerServices;

namespace Pather.Common
{
    public static class Common
    {
        public static string ShortDate()
        {
            string sb = "";

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
            string sb = "";

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

            return Guid.NewGuid().ToString();
        }

        [InlineCode("debugger")]
        public static void Debugger()
        {
            

        }
    }
}