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
            var clientCommunicator = new ClientCommunicator("http://127.0.0.1:1800");
            clientCommunicator.ListenOnChannel<string>("Gateway.Join.Success", (item) =>
            {
                Global.Console.Log(item);

                clientCommunicator.Disconnect();
                defer.Resolve();
            });

            clientCommunicator.SendMessage("Gateway.Join", new GatewayJoinModel()
            {
                UserToken = "salvatore"
            });
        }
    }
}