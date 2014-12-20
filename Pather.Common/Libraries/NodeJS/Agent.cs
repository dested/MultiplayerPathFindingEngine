using System.Runtime.CompilerServices;

namespace Pather.Common.Libraries.NodeJS
{
    [Imported]
    [ModuleName("http")]
    [IgnoreNamespace]
    public class Agent
    {
        private Agent() { }

        public int MaxSockets { get; set; }
    }
}