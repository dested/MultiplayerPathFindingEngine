using System;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Utils.Promises;

namespace Pather.Servers.Database
{
    public class DatabaseQueries : IDatabaseQueries
    {
        public Promise<DBUser, DatabaseError> GetUserByToken(string token)
        {
            //todo IMPLEMENT DATABASE FOOL
            var deferred = Q.Defer<DBUser, DatabaseError>();
            Global.SetTimeout(() =>
            {
                var dbUser = new DBUser()
                {
                    UserId = token,
                    Token = token,
                    X = (int) (Math.Random()*500),
                    Y = (int) (Math.Random()*500),
                };
                dbUser.X = 12;
                dbUser.Y = 24;
                deferred.Resolve(dbUser);
            }, 20);

            return deferred.Promise;
        }
    }
}