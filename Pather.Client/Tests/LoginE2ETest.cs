using System;
using System.Collections.Generic;
using System.Html;
using Pather.Common;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.TestFramework;
using Pather.Common.Utils;
using Pather.Common.Utils.Promises;

namespace Pather.Client.Tests
{
    [TestClass()]
    public class LoginE2ETest
    {
        [TestMethod(disable: true)]
        public void Connect4(Deferred deferred)
        {
            ((dynamic)Window.Instance).NoDraw = true;

            List<ClientGameView> clients = new List<ClientGameView>();

            List<Point> points = new List<Point>()
            {
                new Point(600, 600),
                new Point(100, 100),
                new Point(650, 650),
                new Point(50, 50),
            };

            for (int i = 0; i < 4; i++)
            {
                var gameClient = new ClientGameView();
                var point = points[i];
                gameClient.ClientGameManager.OnReady += () =>
                {
                    Global.SetTimeout(() =>
                    {
                        gameClient.ClientGameManager.MoveToLocation(point.X, point.Y);
                    }, 1000);
                    Global.SetInterval(() =>
                    {
                        gameClient.ClientGameManager.MoveToLocation(point.X, point.Y);
                    }, 10000);
                };

                clients.Add(gameClient);
            }
        }

        [TestMethod(disable: true)]
        public void Connect5(Deferred deferred)
        {
            ((dynamic)Window.Instance).NoDraw = true;

            List<ClientGameView> clients = new List<ClientGameView>();

            List<Point> points = new List<Point>()
            {
                new Point(600, 600),
                new Point(25, 25),
                new Point(650, 650),
                new Point(200, 200),
                new Point(50, 50),
            };

            for (int i = 0; i < 5; i++)
            {
                var gameClient = new ClientGameView();
                var point = points[i];
                gameClient.ClientGameManager.OnReady += () =>
                {
                    Global.SetTimeout(() =>
                    {
                        gameClient.ClientGameManager.MoveToLocation(point.X, point.Y);
                    }, 1000 + (int)(Math.Random() * 500));
                    Global.SetInterval(() =>
                    {
                        gameClient.ClientGameManager.MoveToLocation(point.X, point.Y);
                    }, 10000);
                };

                clients.Add(gameClient);
            }
        }



        [TestMethod()]
        public void Slam(Deferred deferred)
        {
            ((dynamic)Window.Instance).NoDraw = true;

            var totalHits = 20;

            for (var i = 0; i < totalHits; i++)
            {
                createUser(i);
            }




        }

        private static void createUser(int i)
        {
            Global.SetTimeout(() =>
            {
                var receivedCount = 0;

                var gameClient = new ClientGameView();
                gameClient.ClientGameManager.OnReady += () =>
                {
                    var cl = 0;
                    cl = Global.SetInterval(() =>
                    {
                        if (++receivedCount < 200)
                        {
                            Global.Console.Log("Moving User ", i, " again " + receivedCount);
                            gameClient.ClientGameManager.MoveToLocation(Math.Random()*(Constants.NumberOfSquares - 5)*Constants.SquareSize, Math.Random()*(Constants.NumberOfSquares - 5)*Constants.SquareSize);
                        }
                        else
                        {
                            Global.ClearTimeout(cl);
                            Global.Console.Log("Done " + receivedCount);
                        }
                    }, 4000 + (int) (Math.Random()*10000));
                };
            }, (int) (Math.Random()*15000));
        }


        /*   [TestMethod()]
        public void SlamWWithUsers(Deferred deferred)
        {
            var users = new List<Promise<ClientCommunicator, UndefinedPromiseError>>();


            var averageTimes = new List<long>();
            var id = Utilities.UniqueId();
            var done = 0;
            var totalHits = 50;

            for (var i = 0; i < totalHits; i++)
            {
                var i1 = i;
                Global.SetTimeout(() =>
                {
                    var startTime = new DateTime().GetTime();


                    var moveUserAction = new MoveEntityGameSegmentAction()
                    {
                        X = (int) (Math.Random()*50),
                        Y = (int) (Math.Random()*50)
                    };
                    var moveToLocation = new GameSegmentAction_User_Gateway_Socket_Message()
                    {
                        GameSegmentAction = moveUserAction
                    };


                    var receivedCount = 0;
                    var userToken = id + "-" + i1;
                    JoinUser(userToken, (communicator, message) =>
                    {
                        if (message.Action.ClientActionType != ClientActionType.Move) return;

                        var action = (MoveEntityAction) message.Action;

                        if (action.EntityId == userToken && action.X == moveUserAction.X && action.Y == moveUserAction.Y)
                        {
                            Window.SetTimeout(() =>
                            {
                                if (++receivedCount == 200)
                                {
                                    communicator.Disconnect();
                                    done++;

                                    if (done == totalHits)
                                    {
                                        var average = averageTimes.Average(a => a);
                                        Global.Console.Log("Average join time:", average, "ms");
                                        deferred.Resolve();
                                    }
                                    ;
                                }
                                else
                                {
                                    moveUserAction.X = ((moveUserAction.X + (int) (Math.Random()*4) - 2) + 50)%50;
                                    moveUserAction.Y = ((moveUserAction.Y + (int) (Math.Random()*4) - 2) + 50)%50;
                                    communicator.SendMessage(new GameSegmentAction_User_Gateway_Socket_Message()
                                    {
                                        GameSegmentAction = moveUserAction,
                                    });

                                    Global.Console.Log("Moving User again " + receivedCount, moveUserAction);
                                }
                            }, (int) (Math.Random()*1000));
                        }
                    }).Then((communicator) =>
                    {
                        var joinTime = new DateTime().GetTime() - startTime;
                        Global.Console.Log("Join Time", joinTime);
                        averageTimes.Add(joinTime);
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
            JoinUser(id, (communicator, message) =>
            {
                if (message.Action.UserActionType != UserActionType.Move) return;

                var action = (MoveEntityAction) message.Action;

                if (action.X == proposedX && action.Y == proposedY)
                {
                    defer.Resolve();
                }
                else
                {
                    defer.Reject();
                }
            }).Then(communicator =>
            {
                communicator.SendMessage(new GameSegmentAction_User_Gateway_Socket_Message()
                {
                    GameSegmentAction = new MoveEntityAction()
                    {
                        X = proposedX,
                        Y = proposedY
                    }
                });
            });
        }

        [TestMethod(disable: true)]
        public void Login3AndMove(Deferred defer)
        {
            var id = "salvatore";
            var proposedX = 12;
            var proposedY = 25;
            var move = 0;
            JoinUser(id + 1, (communicator, message) =>
            {
                Global.Console.Log("1", message);
                if (message.UserId == id + 1 && move < 40)
                {
                    move++;
                    Global.SetTimeout(() =>
                    {
                        communicator.SendMessage(new GameSegmentAction_User_Gateway_Socket_Message()
                        {
                            GameSegmentAction = new MoveEntityAction()
                            {
                                X = proposedX + move,
                                Y = proposedY
                            }
                        });
                    }, 500);
                }
            }).Then(communicator =>
            {
                communicator.SendMessage(new GameSegmentAction_User_Gateway_Socket_Message()
                {
                    GameSegmentAction = new MoveEntityAction()
                    {
                        X = proposedX,
                        Y = proposedY
                    }
                });
            });

            JoinUser(id + 2, (communicator, message) =>
            {
                Global.Console.Log("2", message);
            }).Then(communicator =>
            {
                communicator.SendMessage(new GameSegmentAction_User_Gateway_Socket_Message()
                {
                    GameSegmentAction = new MoveEntityAction()
                    {
                        X = proposedX + 1,
                        Y = proposedY
                    }
                });
            });

            var once = true;
            JoinUser(id + 3, (communicator, message) =>
            {
                Global.Console.Log("3", message);
                if (message.UserId == id + 3 && once)
                {
                    once = false;
                    communicator.SendMessage(new GameSegmentAction_User_Gateway_Socket_Message()
                    {
                        GameSegmentAction = new MoveEntityAction()
                        {
                            X = proposedX + 20,
                            Y = proposedY
                        }
                    });
                }
            }).Then(communicator =>
            {
                communicator.SendMessage(new GameSegmentAction_User_Gateway_Socket_Message()
                {
                    GameSegmentAction = new MoveEntityAction()
                    {
                        X = proposedX + 1,
                        Y = proposedY
                    }
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

                http.request(options, ((Action<dynamic>) ((res) =>
                {
                    res.setEncoding("utf8");
                    res.on("data", (Action<string>) ((chunk) =>
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


        private static Promise<ClientCommunicator, UndefinedPromiseError> JoinUser(string userToken,
            Action<ClientCommunicator, UserAction_Gateway_User_Socket_Message> onUserAction)
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
                        case Gateway_User_Socket_MessageType.ClientAction:
                            onUserAction(clientCommunicator, (UserAction_Gateway_User_Socket_Message) message);
                            break;
                        case Gateway_User_Socket_MessageType.UserJoined:
                            deferred.Resolve(clientCommunicator);
                            break;
                        case Gateway_User_Socket_MessageType.TickSync:
                            break;
                        case Gateway_User_Socket_MessageType.Pong:
                            break;
                        case Gateway_User_Socket_MessageType.UpdateNeighbors:
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
        }*/
    }
}