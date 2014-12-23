using System.Runtime.CompilerServices;
using Pather.Common.Libraries.NodeJS;

namespace Pather.Servers.Libraries.Mongo
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