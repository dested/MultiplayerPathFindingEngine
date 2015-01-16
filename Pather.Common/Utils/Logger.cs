using System;
using System.Collections.Generic;
using Pather.Common.Libraries.NodeJS;
using Console = System.Console;

namespace Pather.Common.Utils
{
    public static class Logger
    {
        static Logger()
        {
        }

        public static void Start(string key)
        {
            Global.Console.Log(key + " - " + Utilities.LongDate());
            Log(key, "Start", new object[0], LogLevel.DebugInformation);
        }

        public static string Log(string server, string item, object[] data, LogLevel level)
        {
            server= server.Substring(0, Math.Min(server.Length, 15)).PadRight(15);

            item = server + " " + Utilities.ShortDate() + " - " + item;
            List<object> items = new List<object>();
            items.Add(item);
            items.AddRange(data);
            switch (level)
            {
                case LogLevel.Error:
                    Global.Console.Log("==ERROR==");
                    Global.Console.Log(items);
                    Global.Console.Log("==ERROR==");
                    break;
                case LogLevel.Information:
                    Global.Console.Log(items);
                    break;
                case LogLevel.DebugInformation:
                    //                    Global.Console.Log(items);
                    break;
                case LogLevel.TransportInfo:
                    //                    Global.Console.Log(items);
                    break;
                case LogLevel.DataInfo:
                    //                    Global.Console.Log(items);
                    break;
                case LogLevel.KeepAlive:
                    //                    Global.Console.Log(items);
                    break;
            }
            return item;
        }
    }
}