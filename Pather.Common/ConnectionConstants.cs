using System.Html;

namespace Pather.Common
{
    public static class ConnectionConstants
    {
        public static bool Production
        {
            get
            {
                dynamic production = ((dynamic)Window.Instance).Production;
                return production;
            }
        }

        public static string MainDomain = "whoscoding.net";

        public static string RedisIP = Production ? "redis." + MainDomain : "127.0.0.1";
        public static string HeadIP = Production ? "http://head." + MainDomain + ":2222/api/" : "http://127.0.0.1:2222/api/";
    }

}