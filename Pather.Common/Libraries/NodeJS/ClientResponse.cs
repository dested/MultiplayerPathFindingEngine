using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace Pather.Common.Libraries.NodeJS
{
    [Imported]
    [ModuleName("http")]
    [IgnoreNamespace]
    public class ClientResponse : ReadableStream
    {
        private ClientResponse() { }

        [IntrinsicProperty]
        public int StatusCode { get; private set; }

        [IntrinsicProperty]
        public string HttpVersion { get; private set; }

        [IntrinsicProperty]
        public JsDictionary<string, string> Headers { get; private set; }

        [IntrinsicProperty]
        public JsDictionary<string, string> Trailers { get; private set; }
    }
}