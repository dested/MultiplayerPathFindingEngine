using Pather.Common.Utils.Promises;

namespace Pather.Servers.Database
{
    public interface IDatabaseQueries
    {
        Promise<DBUser, DatabaseError> GetUserByToken(string token);
    }
}