using System;
using System.Runtime.CompilerServices;

namespace Pather.Common.Libraries
{
    [IgnoreNamespace]
    [Imported()]
    public static class Global
    { 
        [ScriptAlias("setInterval")]
        public static void SetInterval(Action pollGateways, int poll) { }

        [ScriptAlias("setTimeout")]
        public static void SetTimeout(Action pollGateways, int poll) { }
    }
}