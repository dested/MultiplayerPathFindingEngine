using System.Runtime.CompilerServices;

namespace Pather.Servers.Libraries.Mongo
{
    [IgnoreNamespace]
    [Imported()]
    public class MongoCollection
    {
        [ScriptName("insert")]
        public void Insert(object gmo)
        {
        }
    }
}