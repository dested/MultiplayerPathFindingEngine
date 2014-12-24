using System.Collections.Generic;
using Pather.Client.Utils;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.Gateway;
using Pather.Common.TestFramework;
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



            for (int i = 0; i < 15; i++)
            {
                users.Add(JoinUser("salvatore"+i));
            }
            Q.AllSequential(users).Then((clientCommunicators) =>
            {
                Global.SetTimeout(() =>
                {
                    foreach (var clientCommunicator in clientCommunicators)
                    {
                        clientCommunicator.Disconnect();
                    }
                    defer.Resolve();
                }, 2000);
            });
        }

        private static Promise<ClientCommunicator, UndefinedPromiseError> JoinUser(string userToken)
        {
            var deferred = Q.Defer<ClientCommunicator, UndefinedPromiseError>();

            var clientCommunicator = new ClientCommunicator("http://127.0.0.1:1800");
            clientCommunicator.ListenOnChannel<string>("Gateway.Join.Success", (item) =>
            {
                Global.Console.Log(item);
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