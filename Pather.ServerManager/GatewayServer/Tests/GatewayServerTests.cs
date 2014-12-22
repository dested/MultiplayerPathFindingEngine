using System;
using System.Diagnostics;
using System.Serialization;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.GameWorld;
using Pather.Common.Models.Gateway;
using Pather.Common.TestFramework;
using Pather.Common.Utils;
using Pather.Common.Utils.Promises;
using Pather.ServerManager.Common;
using Pather.ServerManager.Common.PubSub;
using Pather.ServerManager.Common.SocketManager;
using Pather.ServerManager.Database;

namespace Pather.ServerManager.GatewayServer.Tests
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
            string userToken = "abcdef";

            Action<string, GatewayPubSubMessage> publishData = null;
            Action<UserJoinedGameWorldPubSubMessage> sendMessageToGameWorld = null;


            var socketManager = Mocker.InstantiateInterface<ISocketManager>();
            Mocker.StubMethodCall<int>(socketManager.Init);

            Mocker.StubMethodCall<Action<ISocket>>(socketManager.Connections, (callback) =>
            {
                var socket = Mocker.InstantiateInterface<ISocket>();

                Mocker.StubMethodCall<Action>(socket.Disconnect);
                Mocker.StubMethodCall<string, Action<DataObject<GatewayJoinModel>>>(socket.On, (channel, onCallback) =>
                {
                    if (channel == "Gateway.Join")
                    {
                        Global.SetTimeout(() =>
                        {
                            //user logged in via socketio
                            onCallback(new DataObject<GatewayJoinModel>(new GatewayJoinModel() { UserToken = userToken }));
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


            Mocker.StubMethodCall<string, UserJoinedGameWorldPubSubMessage>(pubSub.Publish, ((channel, data) =>
            {
                if (channel == PubSubChannels.GameWorld)
                {
                    sendMessageToGameWorld(data);
                }
            }));




            string gatewayName = null;
            Mocker.StubMethodCall<string, string>(pubSub.ReceivedMessage, (channel, message) =>
            {
                if (channel == gatewayName)
                {
                    var userJoined = Json.Parse<UserJoinedGatewayPubSubMessage>(message);

                    DeferredAssert.That(testDeferred, userJoined.UserId).Does.Equal(userToken);
                    testDeferred.Resolve();

                }
            });
            var gts = new GatewayServer(pubSub, socketManager);
            gatewayName = gts.GatewayName;














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


            Mocker.StubMethodCall<string, GatewayPubSubMessage>(pubSubTest.Publish, ((channel, data) =>
            {
                DeferredAssert.That(testDeferred, ((UserJoinedGatewayPubSubMessage)data).UserId).Does.Equal(userToken);

                publishData(channel, data);
            }));

            GameWorldServer.GameWorldServer gws = new GameWorldServer.GameWorldServer(pubSubTest, databaseQueriesTest);
        }

       
    }
}