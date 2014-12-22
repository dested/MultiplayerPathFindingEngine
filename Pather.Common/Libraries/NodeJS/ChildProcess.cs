using System;
using System.Runtime.CompilerServices;

namespace Pather.Common.Libraries.NodeJS
{
    [IgnoreNamespace]
    [Imported]
    public class ChildProcess : NodeModule
    {
        [IntrinsicProperty]
        public Func<string, Process> Exec { get; set; }

        [IntrinsicProperty]
        public Func<string, string[], object, Process> Spawn { get; set; }
    }
}