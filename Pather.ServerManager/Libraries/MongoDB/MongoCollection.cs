using System.Runtime.CompilerServices;

namespace Pather.ServerManager.Libraries.MongoDB
{
    [IgnoreNamespace]
    [Imported()]
    public class MongoCollection
    {
        [ScriptName("insert")]
        public void Insert(object gmo) {}
    }
}