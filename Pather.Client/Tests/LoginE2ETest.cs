using System;
using System.Collections.Generic;
using Pather.Client.Utils;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.Gateway;
using Pather.Common.TestFramework;
using Pather.Common.Utils;
using Pather.Common.Utils.Promises;

namespace Pather.Client.Tests
{
    [TestClass]
    public class LoginE2ETest
    {
        [TestMethod]
        public void Test1(Deferred defer)
        {
            List<Promise<ClientCommunicator, UndefinedPromiseError>> users = new List<Promise<ClientCommunicator, UndefinedPromiseError>>();


            List<long> averageTimes = new List<long>();

            var done = 0;
            int i2 = 100;
            for (int i = 0; i < i2; i++)
            {
                int i1 = i;
                Global.SetTimeout(() =>
                {
                    var startTime = new DateTime().GetTime();

                    JoinUser("salvatore" + i1).Then((communicator) =>
                    {
                        long joinTime = new DateTime().GetTime() - startTime;
                        Global.Console.Log("Join Time", joinTime);

                        averageTimes.Add(joinTime);
                        Global.SetTimeout(() =>
                        {
                            communicator.Disconnect();
                            done++;
                            if (done == i2)
                            {

                                var average=averageTimes.Average(a => a);

                                Global.Console.Log("Average join time:",average,"ms");
                                defer.Resolve();

                            }
                        }, (int)(Math.Random() * 5000));
                    });
                }, (int)(Math.Random() * 5000));
            }

        }

        private static Promise<ClientCommunicator, UndefinedPromiseError> JoinUser(string userToken)
        {
            var deferred = Q.Defer<ClientCommunicator, UndefinedPromiseError>();

            double b = Math.Random();
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
            string url = "http://127.0.0.1:" + port;
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