using System;
using System.Runtime.CompilerServices;
using Pather.Common.Libraries.NodeJS;

namespace Pather.ServerManager.Libraries.MongoDB
{
    [IgnoreNamespace]
    [Imported()]
    public class MongoDB : NodeModule
    {
        [ScriptName("open")]
        public void Open(Action<object, object> action) {}

        [ScriptName("collection")]
        public void Collection(string testInsert, Action<string, MongoCollection> test) {}
    }
}