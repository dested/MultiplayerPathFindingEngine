using System;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Utils.Promises;

namespace Pather.ServerManager.Database
{
    public class DatabaseQueries : IDatabaseQueries
    {
        public Promise<DBUser, DatabaseError> GetUserByToken(string token)
        {
            var deferred = Q.Defer<DBUser, DatabaseError>();
            Global.SetTimeout(() =>
            {
                deferred.Resolve(new DBUser()
                {
                    UserId = token,
                    Token = token,
                    X = (int) (Math.Random()*500),
                    Y = (int) (Math.Random()*500),
                });
            }, 20);

            return deferred.Promise;
        }
    }
}