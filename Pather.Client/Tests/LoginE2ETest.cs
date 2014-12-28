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
            var totalHits = 300;

            for (var i = 0; i < totalHits; i++)
            {
                var i1 = i;
                Global.SetTimeout(() =>
                {
                    var startTime = new DateTime().GetTime();



                    var moveToLocation = new MoveToLocation_User_Gateway_Socket_Message()
                    {
                        X = (int)(Math.Random() * 50),
                        Y = (int)(Math.Random() * 50)
                    };


                    var receivedCount = 0;
                    var userToken = id + "-" + i1;
                    JoinUser(userToken, (communicator, message) =>
                    {

                        if (message.UserId == userToken && message.X == moveToLocation.X && message.Y == moveToLocation.Y)
                        {
                            Window.SetTimeout(() =>
                            {
                                if (++receivedCount == 200)
                                {
                                    Global.SetTimeout(() =>
                                    {
                                        communicator.Disconnect();
                                        done++;

                                        if (done == totalHits)
                                        {
                                            var average = averageTimes.Average(a => a);
                                            Global.Console.Log("Average join time:", average, "ms");
                                            deferred.Resolve();
                                        }



                                    }, (int)(Math.Random() * 4000));

                                }
                                else
                                {
                                    moveToLocation.X = ((moveToLocation.X + (int)(Math.Random() * 4) - 2) + 50) % 50;
                                    moveToLocation.Y = ((moveToLocation.Y + (int)(Math.Random() * 4) - 2) + 50) % 50;
                                    communicator.SendMessage(moveToLocation);

                                    Global.Console.Log("Moving User again " + receivedCount, moveToLocation);

                                }
                            }, (int)(Math.Random() * 1000));
                        }

                    }).Then((communicator) =>
                    {
                        var joinTime = new DateTime().GetTime() - startTime;
                        Global.Console.Log("Join Time", joinTime);
                        averageTimes.Add(joinTime);
                        communicator.SendMessage(moveToLocation);
                    });
                }, (int)(Math.Random() * 15000));
            }
        }


        [TestMethod(disable: true)]
        public void LoginAndMove(Deferred defer)
        {
            var id = Utilities.UniqueId();
            var proposedX = 12;
            var proposedY = 25;
            JoinUser(id, (communicator, message) =>
            {
                if (message.X == proposedX && message.Y == proposedY)
                {
                    defer.Resolve();
                }
                else
                {
                    defer.Reject();
                }

            }).Then(communicator =>
            {
                communicator.SendMessage(new MoveToLocation_User_Gateway_Socket_Message()
                {
                    X = proposedX,
                    Y = proposedY
                });
            });
        }


        private static Promise<ClientCommunicator, UndefinedPromiseError> JoinUser(string userToken, Action<ClientCommunicator, MoveToLocation_Gateway_User_Socket_Message> onMove)
        {
            var deferred = Q.Defer<ClientCommunicator, UndefinedPromiseError>();

            var b = Math.Random();
            int port=1800;
            if (b <= .1)
            {
                port = 1800;
            }
            else if (b <= .2)
            {
                port = 1801;
            }
            else if (b <= .3)
            {
                port = 1802;
            }
            else if (b <= .4)
            {
                port = 1803;
            }
            else if (b <= .5)
            {
                port = 1804;
            }
            else if (b <= .6)
            {
                port = 1805;
            }
            else if (b <= .7)
            {
                port = 1806;
            }
            else if (b <= .8)
            {
                port = 1807;
            }
            else if (b <= .9)
            {
                port = 1808;
            }
            else if (b <= 1)
            {
                port = 1809;
            }
            else
            {
                port = 1800;
            }
/*
            if (b <= .3)
            {
                port = 1800;
            }
            else if (b <= .6)
            {
                port = 1801;
            }
            else if (b <= 1)
            {
                port = 1802;
            }
            */

            var url = "http://127.0.0.1:" + port;
            //            Global.Console.Log("Connecting to", url);
            var clientCommunicator = new ClientCommunicator(url);
            clientCommunicator.ListenForGatewayMessage((message) =>
            {
                switch (message.GatewayUserMessageType)
                {
                    case Gateway_User_Socket_MessageType.Move:
                        onMove(clientCommunicator, (MoveToLocation_Gateway_User_Socket_Message)message);
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