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

        public static string RedisIP = Production ? "173.255.211.118" : "127.0.0.1";
        public static string HeadIP = Production ? "http://96.126.103.76:2222/api/" : "http://127.0.0.1:2222/api/";
    }

}