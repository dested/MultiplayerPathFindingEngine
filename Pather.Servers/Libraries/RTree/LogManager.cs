namespace Pather.Servers.Libraries.RTree
{
    internal class LogManager
    {
        public static ILog GetLogger(string fullName)
        {
            return new Log();
        }
    }
}