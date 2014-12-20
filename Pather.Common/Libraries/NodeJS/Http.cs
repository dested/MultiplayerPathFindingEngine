using System;
using System.Runtime.CompilerServices;

namespace Pather.Common.Libraries.NodeJS
{
    [IgnoreNamespace]
    [Imported]
    public class Http : NodeModule
    {
        public Http() {}

        public HttpServer CreateServer(Action<HttpRequest, HttpResponse> callback)
        {
            return null;
        }
        public ClientRequest Get(RequestOptions options, Action<ClientResponse> callback) { return null; }
        public ClientRequest Get(string url, Action<ClientResponse> callback) { return null; }

    }
}