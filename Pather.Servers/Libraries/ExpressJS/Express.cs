using System;
using System.Runtime.CompilerServices;
using Pather.Common.Libraries.NodeJS;

namespace Pather.Servers.Libraries.ExpressJS
{
    [IgnoreNamespace]
    [Imported]
    public class Express : NodeModule
    {
        public void Get(string url, Action<ExpressRequest, ExpressResponse> callback)
        {
        }

        public void Listen(int port)
        {
        }
        public void Listen(int port,string hostName)
        {
        }

        public void Use(object plugin)
        {
        }
    }
}