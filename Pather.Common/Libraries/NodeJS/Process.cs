using System.Runtime.CompilerServices;

namespace Pather.Common.Libraries.NodeJS
{
    [IgnoreNamespace]
    [Imported]
    [ScriptName("process")]
    public class Process : EventEmitter
    {
        [ScriptName("stdin")]
        [IntrinsicProperty]
        public STDIn STDIn { get; set; }
        [ScriptName("stdout")]
        [IntrinsicProperty]
        public STDOut STDOut { get; set; }
        [ScriptName("stderr")]
        [IntrinsicProperty]
        public STDError STDError { get; set; }
        [ScriptName("argv")]
        [IntrinsicProperty]
        public string[] Arguments { get; set; }
        public void Exit() {}
    }
}