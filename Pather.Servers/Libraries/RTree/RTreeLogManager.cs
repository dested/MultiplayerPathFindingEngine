namespace Pather.Servers.Libraries.RTree
{
    internal class RTreeLogManager
    {
        public static ILog GetLogger(string fullName)
        {
            return new Log();
        }
    }
}