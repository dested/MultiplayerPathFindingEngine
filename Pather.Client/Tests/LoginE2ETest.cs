using System;
using System.Collections.Generic;
using System.Html;
using System.Runtime.CompilerServices;
using Pather.Client.Libraries;
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
        [TestMethod(disable: true)]
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

        [TestMethod()]
        public void Login3AndMove(Deferred defer)
        {
            var id = "salvatore";
            var proposedX = 12;
            var proposedY = 25;
            int move = 0;
            JoinUser(id + 1, (communicator, message) =>
            {
                Global.Console.Log("1", message);
                if (message.UserId == id + 1 && move < 40)
                {
                    move++;
                    Global.SetTimeout(() =>
                    {
                        communicator.SendMessage(new MoveToLocation_User_Gateway_Socket_Message()
                        {
                            X = proposedX + move,
                            Y = proposedY
                        });
                    }, 500);
                }
                if (message.X == proposedX && message.Y == proposedY)
                {
                    //                    defer.Resolve();
                }
                else
                {
                    //                    defer.Reject();
                }

            }).Then(communicator =>
            {
                communicator.SendMessage(new MoveToLocation_User_Gateway_Socket_Message()
                {
                    X = proposedX,
                    Y = proposedY
                });
            });

            JoinUser(id + 2, (communicator, message) =>
            {
                Global.Console.Log("2", message);


            }).Then(communicator =>
            {
                communicator.SendMessage(new MoveToLocation_User_Gateway_Socket_Message()
                {
                    X = proposedX + 1,
                    Y = proposedY
                });
            });

            bool once = true;
            JoinUser(id + 3, (communicator, message) =>
            {
                Global.Console.Log("3", message);
                if (message.UserId == id + 3 && once)
                {
                    once = false;
                    communicator.SendMessage(new MoveToLocation_User_Gateway_Socket_Message()
                    {
                        X = proposedX + 20,
                        Y = proposedY
                    });

                }
            }).Then(communicator =>
            {
                communicator.SendMessage(new MoveToLocation_User_Gateway_Socket_Message()
                {
                    X = proposedX + 1,
                    Y = proposedY
                });
            });
        }


        public static void GetRequest(string url, int port, Action<string> callback)
        {
            //todo stub out properly idiot

            if (Constants.TestServer)
            {
                var http = Global.Require<dynamic>("http");
                var options = new
                {
                    port = port,
                    path = url,
                    method = "get"
                };

                http.request(options, ((Action<dynamic>)((res) =>
                {
                    res.setEncoding("utf8");
                    res.on("data", (Action<string>)((chunk) =>
                    {
                        callback(chunk);
                    }));
                }))).end();
            }
            else
            {
                jQueryObject.Get(url, null, callback);
            }
        }



        private static Promise<ClientCommunicator, UndefinedPromiseError> JoinUser(string userToken, Action<ClientCommunicator, MoveToLocation_Gateway_User_Socket_Message> onMove)
        {
            var deferred = Q.Defer<ClientCommunicator, UndefinedPromiseError>();

            GetRequest("http://localhost:2222/api/", 2222, (url) =>
            {
                Global.Console.Log(url);

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


            });
            return deferred.Promise;
        }
    }
}