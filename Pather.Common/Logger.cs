using System;

namespace Pather.Common
{
    public static class Logger
    {
        static Logger()
        {
        }

        public static void Start(string key)
        {
            Console.WriteLine(key + " - " + Utilities.LongDate());
            Log("Start: " + key, LogLevel.Information);
        }

        public static string Log(string item, LogLevel level)
        {
            item = string.Format("{0} - {1}", Utilities.ShortDate(), item);
            switch (level)
            {
                case LogLevel.Error:
                    Console.WriteLine(item);
                    break;
                case LogLevel.DebugInformation:
                    break;
                case LogLevel.Information:
                    break;
                case LogLevel.TransportInfo:
                    break;
                case LogLevel.DataInfo:
                    break;
                case LogLevel.KeepAlive:

                    return item;
            }
            return item;
        }
    }
}