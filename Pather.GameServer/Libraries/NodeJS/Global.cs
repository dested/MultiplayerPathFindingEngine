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

        [IntrinsicProperty]
        [ScriptAlias("console")]
        public static Pather.Common.Libraries.Console Console { get; set; }
        

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
}