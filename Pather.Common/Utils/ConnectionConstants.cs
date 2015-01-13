using System.Html;
using Pather.Common.Libraries.NodeJS;

namespace Pather.Common.Utils
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

        public static string RedisIP = Production ? "redis.whoscoding.net" : "127.0.0.1";
        public static string HeadIP = Production ? "http://head.whoscoding.net:2222/api/" : "http://127.0.0.1:2222/api/";
    }

}