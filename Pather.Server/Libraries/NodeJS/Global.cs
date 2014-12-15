using System;
using System.Runtime.CompilerServices;

namespace Pather.Server.Libraries.NodeJS
{
    [IgnoreNamespace]
    [Imported()]
    public static class Global
    {
        [IntrinsicProperty]
        [ScriptAlias("process")]
        public static Process Process { get; set; }
        [ScriptAlias("console")]
        [IntrinsicProperty]
        public static Console Console { get; set; }


        [ScriptAlias("require")]
        public static TModule Require<TModule>(string name) where TModule : NodeModule
        {
            return null;
        }

        [ScriptAlias("require")]
        public static void Require(string name) { }

        [ScriptAlias("setInterval")]
        public static void SetInterval(Action pollGateways, int poll) { }

        [ScriptAlias("setTimeout")]
        public static void SetTimeout(Action pollGateways, int poll) { }
    }
    [IgnoreNamespace]
    [Imported()]

    public class Console
    {
        public void Log(object o) { }
        public void Log(object o, object o2) { }
        public void Log(object o, object o2, object o3) { }
        public void Log(object o, object o2, object o3, object o4) { }
        public void Log(object o, object o2, object o3, object o4, object o5) { }
        public void Log(object o, object o2, object o3, object o4, object o5, object o6) { }
        public void Log(Exception log) { }
    }
}