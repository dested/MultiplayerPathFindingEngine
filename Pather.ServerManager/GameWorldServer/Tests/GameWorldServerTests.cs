using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Serialization;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.GameWorld;
using Pather.Common.TestFramework;
using Pather.Common.Utils.Promises;
using Pather.ServerManager.Common;
using Pather.ServerManager.Database;
using Console = System.Console;

namespace Pather.ServerManager.GameWorldServer.Tests
{
    [TestClass]
    public class GameWorldServerTests
    {
        public GameWorldServerTests()
        {
        }

        [TestMethod]
        public void UserShouldJoin()
        {
            var pubSubTest = Mocker.InstantiateInterface<IPubSub>();
            var databaseQueriesTest = Mocker.InstantiateInterface<IDatabaseQueries>();

            Mocker.OnMethodCall(databaseQueriesTest.GetUserByToken, (Func<string, Promise<DBUser, DatabaseError>>)((userToken) =>
            {
                var deferred = Q.Defer<DBUser, DatabaseError>();
                deferred.ResolveInATick(new DBUser()
                {
                    Token = userToken,
                    X = (int)(Math.Random() * 500),
                    Y = (int)(Math.Random() * 500),
                });
                return deferred.Promise;
            }));


            Mocker.OnMethodCall(pubSubTest.Publish, (Action<string, object>)((channel, data) =>
            {

            }));
            
            Mocker.OnMethodCall(pubSubTest.Subscribe, (Action<string, Action<string>>)((channel, callback) =>
            {
                Assert.Equals(channel, PubSubChannels.GameWorld);
                Pather.Common.Common.Debugger();
                var userJoinedGameWorldPubSubMessage = new UserJoinedGameWorldPubSubMessage();
                userJoinedGameWorldPubSubMessage.Type=GameWorldMessageType.UserJoined;
                userJoinedGameWorldPubSubMessage.UserToken = "abcd";
                userJoinedGameWorldPubSubMessage.GatewayChannel = "Gateway 1";
                callback(Json.Stringify(userJoinedGameWorldPubSubMessage));
            }));

            Mocker.OnMethodCall(pubSubTest.Init, (Action<Action<IPubSub>>)(a => a(pubSubTest)));

            GameWorldServer gws = new GameWorldServer(pubSubTest, databaseQueriesTest);

            Assert.That(1).Does.Equal(1);
        }
    }



}