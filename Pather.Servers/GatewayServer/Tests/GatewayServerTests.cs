﻿using System;
using System.Serialization;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.GameWorld.Gateway;
using Pather.Common.Models.Gateway.PubSub;
using Pather.Common.Models.Gateway.PubSub.Base;
using Pather.Common.Models.Gateway.Socket;
using Pather.Common.Models.Gateway.Socket.Base;
using Pather.Common.TestFramework;
using Pather.Common.Utils;
using Pather.Common.Utils.Promises;
using Pather.Servers.Common.PubSub;
using Pather.Servers.Common.SocketManager;
using Pather.Servers.Database;

namespace Pather.Servers.GatewayServer.Tests
{
    [TestClass]
    public class GatewayServerTests
    {
        public GatewayServerTests()
        {
        }

        [TestMethod]
        public void UserShouldJoinFromGateway(Deferred testDeferred)
        {
            var userToken = "abcdef";

            Action<string, Gateway_PubSub_Message> publishData = null;
            Action<UserJoined_Gateway_GameWorld_PubSub_Message> sendMessageToGameWorld = null;


            var socketManager = Mocker.InstantiateInterface<ISocketManager>();
            Mocker.StubMethodCall<int>(socketManager.Init);

            Mocker.StubMethodCall<Action<ISocket>>(socketManager.Connections, (callback) =>
            {
                var socket = Mocker.InstantiateInterface<ISocket>();

                Mocker.StubMethodCall<Action>(socket.Disconnect);
                Mocker.StubMethodCall<string, Action<DataObject<UserJoined_User_Gateway_Socket_Message>>>(socket.On, (channel, onCallback) =>
                {
                    if (channel == "Gateway.Join")
                    {
                        Global.SetTimeout(() =>
                        {
                            //user logged in via socketio
                            onCallback(new DataObject<UserJoined_User_Gateway_Socket_Message>(new UserJoined_User_Gateway_Socket_Message()
                            {
                                UserToken = userToken
                            }));
                        }, 1);
                    }
                });
                Global.SetTimeout(() =>
                {
                    callback(socket);
                }, 1);
            });


            var pubSub = Mocker.InstantiateInterface<IPubSub>();

            Mocker.StubMethodCall(pubSub.Init, (() => Q.ResolvedPromise()));
            Mocker.StubMethodCall<string, Action<string>>(pubSub.Subscribe, (channel, callback) =>
            {
                publishData += (pchannel, pmessage) =>
                {
                    pubSub.ReceivedMessage(channel, Json.Stringify(pmessage));
                };
            });


            Mocker.StubMethodCall<string, UserJoined_Gateway_GameWorld_PubSub_Message>(pubSub.Publish, ((channel, data) =>
            {
                if (channel == PubSubChannels.GameWorld())
                {
                    sendMessageToGameWorld(data);
                }
            }));


            string gatewayName = null;
            Mocker.StubMethodCall<string, string>(pubSub.ReceivedMessage, (channel, message) =>
            {
                if (channel == gatewayName)
                {
                    var userJoined = Json.Parse<UserJoined_GameWorld_Gateway_PubSub_Message>(message);

                    DeferredAssert.That(testDeferred, userJoined.UserId).Does.Equal(userToken);
                    testDeferred.Resolve();
                }
            });
            var gts = new GatewayServer(pubSub, socketManager, "gatewayServer1", 1800);
            gatewayName = gts.GatewayId;


            var pubSubTest = Mocker.InstantiateInterface<IPubSub>();
            var databaseQueriesTest = Mocker.InstantiateInterface<IDatabaseQueries>();


            Mocker.StubMethodCall<string, Promise<DBUser, DatabaseError>>(databaseQueriesTest.GetUserByToken, ((utoken) =>
            {
                var deferred = Q.Defer<DBUser, DatabaseError>();
                deferred.Resolve(new DBUser()
                {
                    Token = utoken,
                    UserId = userToken,
                    X = 400,
                    Y = 400,
                });
                return deferred.Promise;
            }));


            Mocker.StubMethodCall(pubSub.Init, (() => Q.ResolvedPromise()));

            Mocker.StubMethodCall<string, Action<string>>(pubSubTest.Subscribe, ((channel, callback) =>
            {
                sendMessageToGameWorld += (data) =>
                {
                    callback(Json.Stringify(data));
                };
            }));


            Mocker.StubMethodCall<string, Gateway_PubSub_Message>(pubSubTest.Publish, ((channel, data) =>
            {
                DeferredAssert.That(testDeferred, ((UserJoined_GameWorld_Gateway_PubSub_Message) data).UserId).Does.Equal(userToken);

                publishData(channel, data);
            }));

            var gws = new GameWorldServer.GameWorldServer(pubSubTest, databaseQueriesTest);
        }
    }
}