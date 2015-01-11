using Pather.Common.Libraries.NodeJS;

namespace Pather.Servers.Libraries.RTree
{
    internal class Log : ILog
    {
        public Log()
        {
            IsDebugEnabled = false;
        }

        public void Error(string s)
        {
//            Global.Console.Log("RTree Error", s);
        }

        public void Info(string s)
        {
//            Global.Console.Log("RTree Info", s);
        }

        public void Warn(string s)
        {
//            Global.Console.Log("RTree Warn", s);
        }

        public void Debug(string s)
        {
//            Global.Console.Log("RTree Debug",s);
        }

        public bool IsDebugEnabled { get; set; }
    }
}