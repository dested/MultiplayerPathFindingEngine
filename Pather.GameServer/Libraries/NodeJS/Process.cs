using System;
using System.Runtime.CompilerServices;

namespace Pather.Server.Libraries.NodeJS
{
    [IgnoreNamespace]
    [Imported()]
    [ScriptName("process")]
    public class Process : EventEmitter
    {
        [ScriptName("stdin")]
        public STDIn STDIn ;
        [ScriptName("stdout")]
        public STDOut STDOut ;
        [ScriptName("stderr")]
        public STDError STDError ;

        [ScriptName("exit")]
        public void Exit() {}
    }
    [IgnoreNamespace]
    [Imported()]
    public class STDIn : EventEmitter
    {
        [ScriptName("resume")]
        public void Resume() {}

        [ScriptName("once")]
        public void Once(string data, Action<string> function) {}
    }
    [IgnoreNamespace]
    [Imported()]
    public class STDOut : EventEmitter
    {
        [ScriptName("write")]
        public void Write(string question) {}
    }
    [IgnoreNamespace]
    [Imported()]
    [ScriptName("STDErr")]
    public class STDError : EventEmitter
    {
        [ScriptName("write")]
        public void Write(string question) {}
    }
}