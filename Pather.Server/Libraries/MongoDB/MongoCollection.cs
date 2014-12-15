using System.Runtime.CompilerServices;

namespace Pather.Server.Libraries.MongoDB
{
    [IgnoreNamespace]
    [Imported()]
    public class MongoCollection
    {
        [ScriptName("insert")]
        public void Insert(object gmo) {}
    }
}