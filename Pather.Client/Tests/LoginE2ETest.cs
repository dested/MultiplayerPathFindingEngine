using System;
using System.Collections.Generic;
using System.Html;
using Pather.Client.Utils;
using Pather.Common;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.Gateway.Socket.Base;
using Pather.Common.TestFramework;
using Pather.Common.Utils;
using Pather.Common.Utils.Promises;

namespace Pather.Client.Tests
{
    [TestClass()]
    public class LoginE2ETest
    {
        [TestMethod()]
        public void SlamWWithUsers(Deferred deferred)
        {
            var users = new List<Promise<ClientCommunicator, UndefinedPromiseError>>();


            var averageTimes = new List<long>();
            var id = Utilities.UniqueId();
            var done = 0;
            var totalHits = 10;
            var receivedCount = 0;
            var communicators = new List<ClientCommunicator>();

            for (var i = 0; i < totalHits; i++)
            {
                var i1 = i;
                Global.SetTimeout(() =>
                {
                    var startTime = new DateTime().GetTime();

                    var userToken = id + "-" + i1;
                    JoinUser(userToken).Then((communicator) =>
                    {
                        communicators.Add(communicator);
                        var joinTime = new DateTime().GetTime() - startTime;
                        Global.Console.Log("Join Time", joinTime);
                        averageTimes.Add(joinTime);


                        var moveToLocation = new MoveToLocation_User_Gateway_Socket_Message()
                        {
                            X = (int) (Math.Random()*50),
                            Y = (int) (Math.Random()*50)
                        };


                        communicator.ListenForGatewayMessage((message) =>
                        {
                            switch (message.GatewayUserMessageType)
                            {
                                case Gateway_User_Socket_MessageType.Move:
                                    var moveToMessage = (MoveToLocation_Gateway_User_Socket_Message) message;
                                    if (moveToMessage.UserId == userToken &&
                                        moveToMessage.X == moveToLocation.X &&
                                        moveToMessage.Y == moveToLocation.Y)
                                    {
                                        Window.SetTimeout(() =>
                                        {
                                            moveToLocation.X = (int) (Math.Random()*50);
                                            moveToLocation.Y = (int) (Math.Random()*50);
                                            communicator.SendMessage(moveToLocation);
                                        }, (int) (Math.Random()*1000));

                                        Global.Console.Log("Moving User again", moveToLocation);
                                        if (++receivedCount == totalHits*60)
                                        {
                                            foreach (var clientCommunicator in communicators)
                                            {
                                                var communicator1 = clientCommunicator;
                                                Global.SetTimeout(() =>
                                                {
                                                    communicator1.Disconnect();
                                                    done++;
                                                    if (done == totalHits)
                                                    {
                                                        var average = averageTimes.Average(a => a);
                                                        Global.Console.Log("Average join time:", average, "ms");
                                                        deferred.Resolve();
                                                    }
                                                }, (int) (Math.Random()*2000));
                                            }
                                        }
                                    }
                                    break;
                            }
                        });
                        communicator.SendMessage(moveToLocation);
                    });
                }, (int) (Math.Random()*15000));
            }
        }


        [TestMethod(disable: true)]
        public void LoginAndMove(Deferred defer)
        {
            var id = Utilities.UniqueId();
            var proposedX = 12;
            var proposedY = 25;
            JoinUser(id).Then(communicator =>
            {
                communicator.ListenForGatewayMessage((message) =>
                {
                    switch (message.GatewayUserMessageType)
                    {
                        case Gateway_User_Socket_MessageType.Move:
                            var moveToMessage = (MoveToLocation_Gateway_User_Socket_Message) message;
                            if (moveToMessage.X == proposedX && moveToMessage.Y == proposedY)
                            {
                                defer.Resolve();
                            }
                            else
                            {
                                defer.Reject();
                            }
                            break;
                    }
                });
                communicator.SendMessage(new MoveToLocation_User_Gateway_Socket_Message()
                {
                    X = proposedX,
                    Y = proposedY
                });
            });
        }


        private static Promise<ClientCommunicator, UndefinedPromiseError> JoinUser(string userToken)
        {
            var deferred = Q.Defer<ClientCommunicator, UndefinedPromiseError>();

            var b = Math.Random();
            int port;
            if (b <= .3)
            {
                port = 1800;
            }
            else if (b <= .6)
            {
                port = 1801;
            }
            else
            {
                port = 1802;
            }
            var url = "http://127.0.0.1:" + port;
            //            Global.Console.Log("Connecting to", url);
            var clientCommunicator = new ClientCommunicator(url);
            clientCommunicator.ListenForGatewayMessage((message) =>
            {
                switch (message.GatewayUserMessageType)
                {
                    case Gateway_User_Socket_MessageType.Move:

                        break;
                    case Gateway_User_Socket_MessageType.UserJoined:
                        deferred.Resolve(clientCommunicator);
                        break;
                    default:
                        throw new ArgumentOutOfRangeException();
                }
            });

            clientCommunicator.SendMessage(new UserJoined_User_Gateway_Socket_Message()
            {
                UserToken = userToken
            });

            return deferred.Promise;
        }
    }
}