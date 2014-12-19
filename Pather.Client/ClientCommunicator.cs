using System;
using Pather.Common;
using Pather.Common.Libraries;
using Pather.Common.Models;
using Pather.Common.Utils;
using SocketIOWebLibrary;

namespace Pather.Client
{
    public class ClientCommunicator
    {
        public SocketIOClient Socket;

        public ClientCommunicator()
        {
            var url = "http://198.211.107.101:8991";
//            var url = "http://127.0.0.1:8991";

            if (Constants.TestServer)
            {
                Socket = Global.Require<Func<string, SocketIOClient>>("socket.io-client")(url);
                Socket.On("connect", () =>
                {
                    Global.Console.Log("hi");
                });

            }
            else
            {
                Socket = SocketIOClient.Connect(url);
            }
        }

        public void ListenOnChannel<T>(string channel, Action<T> callback)
        {
            Socket.On<DataObject<T>>(channel, obj => callback(obj.Data));
        }

        public void SendMessage(string channel, object obj)
        {
            Socket.Emit(channel, new DataObject<object>(obj));
        }
    }
}