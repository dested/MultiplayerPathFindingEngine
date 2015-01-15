using System;

namespace Pather.Common.Utils
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
                    Console.WriteLine(item);
                    break;
                case LogLevel.Information:
                    Console.WriteLine(item);
                    break;
                case LogLevel.TransportInfo:
                    Console.WriteLine(item);
                    break;
                case LogLevel.DataInfo:
                    Console.WriteLine(item);
                    break;
                case LogLevel.KeepAlive:
                    Console.WriteLine(item);
                    break;
            }
            return item;
        }
    }
}