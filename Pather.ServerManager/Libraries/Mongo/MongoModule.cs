using System.Runtime.CompilerServices;
using Pather.Common.Libraries.NodeJS;

namespace Pather.ServerManager.Libraries.Mongo
{
    [IgnoreNamespace]
    [Imported()]
    [ScriptName("mongo")]
    public class MongoModule : NodeModule
    {
        [ScriptName("Connection")]
        public MongoConnection Connection;

        [ScriptName("Db")]
        public MongoDB DB;

        [ScriptName("Server")]
        public MongoServer Server;
    }
}