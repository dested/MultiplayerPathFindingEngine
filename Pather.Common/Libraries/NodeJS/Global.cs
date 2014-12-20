using System;
using System.Runtime.CompilerServices;

namespace Pather.Common.Libraries.NodeJS
{
    [IgnoreNamespace]
    [Imported]
    
    public static class Global
    {
        [IntrinsicProperty]
        [ScriptAlias("process")]
        public static Process Process { get; set; }
        [ScriptAlias("global")]
        public static dynamic Scope { get; set; }

        [ScriptAlias("require")]
        public static TModule Require<TModule>(string name)
        {
            return default(TModule);
        }

        [ScriptAlias("console")] 
        [IntrinsicProperty]
        public static Console Console { get; set; }

        [ScriptAlias("require")]
        public static void Require(string name) {}

        [ScriptAlias("setInterval")]
        public static int SetInterval(Action pollGateways, int poll)
        {
            return 0;
        }
        [ScriptAlias("clearTimeout")]
        public static void ClearTimeout(int poll) { }

        [ScriptAlias("setTimeout")]
        public static int SetTimeout(Action pollGateways, int poll) { return 0; }
    }
}