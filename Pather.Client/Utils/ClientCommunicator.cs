﻿using System;
using Pather.Client.Libraries;
using Pather.Common;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.Gateway.Socket.Base;
using Pather.Common.Utils;

namespace Pather.Client.Utils
{
    public class ClientCommunicator
    {
        public SocketIOClient Socket;

        public ClientCommunicator(string url = null)
        {
//            var url = "http://198.211.107.101:8991";
            url = url ?? "http://127.0.0.1:8991";

            if (Constants.TestServer)
            {
                Socket = Global.Require<Func<string, object, SocketIOClient>>("socket.io-client")(url,
                    new
                    {
                        reconnection = false,
                        forceNew = true
                    });
                Socket.On("connect", () =>
                {
                    Global.Console.Log("hi");
                });
            }
            else
            {
                Socket = SocketIOClient.Connect(url, new
                {
                    reconnection = false,
                    forceNew = true
                });
            }
        }

        public void ListenForGatewayMessage(Action<Gateway_User_Socket_Message> callback)
        {
            Socket.On<DataObject<Gateway_User_Socket_Message>>("Gateway.Message", obj => callback(obj.Data));
        }

        public void OldListenOnChannel<T>(string channel, Action<T> callback)
        {
            Socket.On<DataObject<T>>(channel, obj => callback(obj.Data));
        }

        public void OldSendMessage(string channel, object obj)
        {
            Socket.Emit(channel, new DataObject<object>(obj));
        }

        public void SendMessage(User_Gateway_Socket_Message obj)
        {
            Socket.Emit("Gateway.Message", new DataObject<object>(obj));
        }

        public void Disconnect()
        {
            Socket.Disconnect();
        }
    }
}