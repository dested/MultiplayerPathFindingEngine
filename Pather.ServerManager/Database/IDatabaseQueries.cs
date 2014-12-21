using Pather.Common.Utils.Promises;

namespace Pather.ServerManager.Database
{
    public interface IDatabaseQueries
    {
        Promise<DBUser, DatabaseError> GetUserByToken(string token);
    }
}