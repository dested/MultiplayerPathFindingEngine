using System;
using Pather.Client.Libraries;
using Pather.Client.Utils;
using Pather.Common;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.Common.UserActions;
using Pather.Common.Models.Gateway.Socket.Base;
using Pather.Common.Utils;

namespace Pather.Client
{
    public class NetworkManager
    {
        private ClientCommunicator clientCommunicator;
        public Action<Gateway_User_Socket_Message> OnMessage;

        public NetworkManager()
        {
            GetRequest("http://localhost:2222/api/", 2222, (url) =>
            {
                Global.Console.Log(url);

                clientCommunicator = new ClientCommunicator(url);
                clientCommunicator.ListenForGatewayMessage((message) =>
                {
                    OnMessage(message);
                });
                JoinUser();

            });
        }

        public void JoinUser()
        {
            clientCommunicator.SendMessage(new UserJoined_User_Gateway_Socket_Message()
            {
                UserToken = "salvatore" + Utilities.UniqueId()
            }); 
        }

        public void SendPing()
        {
            if (clientCommunicator != null)
            {
                clientCommunicator.SendMessage(new Ping_User_Gateway_Socket_Message());
            }
        }

        public void SendAction(UserAction action)
        {
            clientCommunicator.SendMessage(new UserAction_User_Gateway_Socket_Message()
            {
                Action = action
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
    }
}