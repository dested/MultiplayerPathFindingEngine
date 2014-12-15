using System.Runtime.CompilerServices;
using Pather.Server.Libraries.NodeJS;

namespace Pather.Server.Libraries.MongoDB
{
    [IgnoreNamespace]
    [Imported()]
    [ScriptName("mongo")]
    public class MongoModule : NodeModule
    {
        [ScriptName("Connection")] public MongoConnection Connection;
        [ScriptName("Db")] public MongoDB DB;
        [ScriptName("Server")] public MongoServer Server;
    }
}