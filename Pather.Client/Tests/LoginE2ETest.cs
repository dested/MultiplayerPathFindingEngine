using System;
using System.Collections.Generic;
using Pather.Client.Utils;
using Pather.Common;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.Gateway.Socket;
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
        public void SlamWWithUsers(Deferred defer)
        {
            var users = new List<Promise<ClientCommunicator, UndefinedPromiseError>>();


            var averageTimes = new List<long>();
            var id = Utilities.UniqueId();
            var done = 0;
            var i2 = 500;
            for (var i = 0; i < i2; i++)
            {
                var i1 = i;
                Global.SetTimeout(() =>
                {
                    var startTime = new DateTime().GetTime();

                    JoinUser(id + "   " + i1).Then((communicator) =>
                    {
                        var joinTime = new DateTime().GetTime() - startTime;
                        Global.Console.Log("Join Time", joinTime);

                        averageTimes.Add(joinTime);
                        Global.SetTimeout(() =>
                        {
                            communicator.Disconnect();
                            done++;
                            if (done == i2)
                            {
                                var average = averageTimes.Average(a => a);

                                Global.Console.Log("Average join time:", average, "ms");
                                defer.Resolve();
                            }
                        }, (int) (Math.Random()*2000));
                    });
                }, (int) (Math.Random()*15000));
            }
        }


        [TestMethod]
        public void LoginAndMove(Deferred defer)
        {
            var users = new List<Promise<ClientCommunicator, UndefinedPromiseError>>();
            var m = new MoveToLocation_User_Gateway_Socket_Message()
            {
                X = 12,
                Y = 25
            };


            var averageTimes = new List<long>();
            var id = Utilities.UniqueId();
            JoinUser(id).Then(communicator =>
            {
                communicator.SendMessage("Gateway.Message", new MoveToLocation_User_Gateway_Socket_Message()
                {
                    X = 12,
                    Y = 25
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
            clientCommunicator.ListenOnChannel<string>("Gateway.Join.Success", (item) =>
            {
//                Global.Console.Log(item);
                deferred.Resolve(clientCommunicator);
            });

            clientCommunicator.SendMessage("Gateway.Join", new GatewayJoinModel()
            {
                UserToken = userToken
            });

            return deferred.Promise;
        }
    }
}