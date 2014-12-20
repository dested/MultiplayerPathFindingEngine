using System;
using System.Runtime.CompilerServices;

namespace Pather.Common.Libraries.NodeJS
{
    [Serializable]
    [Imported]
    public class PipeOptions
    {
        public bool? End { get; set; }

        public PipeOptions()
        {
        }

        public PipeOptions(bool? end)
        {
        }
    }
}