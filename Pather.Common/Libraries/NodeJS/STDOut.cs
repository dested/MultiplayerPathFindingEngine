using System.Runtime.CompilerServices;

namespace Pather.Common.Libraries.NodeJS
{
    [IgnoreNamespace]
    [Imported]
    public class STDOut : EventEmitter
    {
        public void Write(string question) {}
    }
}