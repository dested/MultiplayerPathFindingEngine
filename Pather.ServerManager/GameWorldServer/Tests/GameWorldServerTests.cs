﻿using System;
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
        public void UserShouldJoin(Deferred testDeferred)
        {
            var pubSubTest = Mocker.InstantiateInterface<IPubSub>();
            var databaseQueriesTest = Mocker.InstantiateInterface<IDatabaseQueries>();

            var userId = "user id";

            Mocker.OnMethodCall(databaseQueriesTest.GetUserByToken, (Func<string, Promise<DBUser, DatabaseError>>)((userToken) =>
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


            Mocker.OnMethodCall(pubSubTest.Init, (Action<Action<IPubSub>>)(a => a(pubSubTest)));

            Mocker.OnMethodCall(pubSubTest.Subscribe, (Action<string, Action<string>>)((channel, callback) =>
            {
                DeferredAssert.That(testDeferred,channel).Does.Equal(PubSubChannels.GameWorld);
                var userJoinedGameWorldPubSubMessage = new UserJoinedGameWorldPubSubMessage();
                userJoinedGameWorldPubSubMessage.Type=GameWorldMessageType.UserJoined;
                userJoinedGameWorldPubSubMessage.UserToken = "abcd";
                userJoinedGameWorldPubSubMessage.GatewayChannel = "Gateway 1";
                callback(Json.Stringify(userJoinedGameWorldPubSubMessage));
            }));

            Mocker.OnMethodCall(pubSubTest.Publish, (Action<string, GatewayPubSubMessage>)((channel, data) =>
            {
                DeferredAssert.That(testDeferred, ((UserJoinedGatewayPubSubMessage)data).UserId).Does.Equal(userId);
                testDeferred.Resolve();
            }));

            GameWorldServer gws = new GameWorldServer(pubSubTest, databaseQueriesTest);

        }
    }



}