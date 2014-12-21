using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using System.Serialization;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.GameWorld;
using Pather.Common.Models.Gateway;
using Pather.Common.TestFramework;
using Pather.Common.Utils.Promises;
using Pather.ServerManager.Common;
using Pather.ServerManager.Database;

namespace Pather.ServerManager.GameWorldServer.Tests
{
    [TestClass]
    public class GameWorldServerTests
    {
        public GameWorldServerTests()
        {
        }

        [TestMethod]
        public void UserShouldJoin(Deferred testDeferred)
        {
            var pubSubTest = Mocker.InstantiateInterface<IPubSub>();
            var databaseQueriesTest = Mocker.InstantiateInterface<IDatabaseQueries>();

            var userId = "user id";

            Mocker.StubMethodCall<string, Promise<DBUser, DatabaseError>>(databaseQueriesTest.GetUserByToken, ((userToken) =>
            {
                var deferred = Q.Defer<DBUser, DatabaseError>();
                deferred.Resolve(new DBUser()
                {
                    Token = userToken,
                    UserId = userId,
                    X = (int)(Math.Random() * 500),
                    Y = (int)(Math.Random() * 500),
                });
                return deferred.Promise;
            }));


            Mocker.StubMethodCall<Action<IPubSub>>(pubSubTest.Init, (a => a(pubSubTest)));

            Mocker.StubMethodCall<string, Action<string>>(pubSubTest.Subscribe, ((channel, callback) =>
            {
                DeferredAssert.That(testDeferred,channel).Does.Equal(PubSubChannels.GameWorld);
                var userJoinedGameWorldPubSubMessage = new UserJoinedGameWorldPubSubMessage();
                userJoinedGameWorldPubSubMessage.Type=GameWorldMessageType.UserJoined;
                userJoinedGameWorldPubSubMessage.UserToken = "abcd";
                userJoinedGameWorldPubSubMessage.GatewayChannel = "Gateway 1";
                callback(Json.Stringify(userJoinedGameWorldPubSubMessage));
            }));

            Mocker.StubMethodCall<string, GatewayPubSubMessage>(pubSubTest.Publish, ((channel, data) =>
            {
                DeferredAssert.That(testDeferred, ((UserJoinedGatewayPubSubMessage)data).UserId).Does.Equal(userId);
                testDeferred.Resolve();
            }));

            GameWorldServer gws = new GameWorldServer(pubSubTest, databaseQueriesTest);

        }
    }



}