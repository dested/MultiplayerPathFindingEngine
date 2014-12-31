namespace Pather.Servers.Libraries.RTree
{
    internal interface ILog
    {
        void Error(string p0);
        void Info(string s);
        void Warn(string p0);
        void Debug(string s);
        bool IsDebugEnabled { get; set; }
    }
}