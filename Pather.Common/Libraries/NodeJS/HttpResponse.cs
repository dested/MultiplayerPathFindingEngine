using System.Runtime.CompilerServices;

namespace Pather.Common.Libraries.NodeJS
{
    [IgnoreNamespace]
    [Imported]
    public class HttpResponse
    {
        public void End() {}
        public void WriteHead(int code, object httpResponseHeader) {}
        public void End(string s) {}
    }
}