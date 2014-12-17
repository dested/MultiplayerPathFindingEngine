using System;
using Pather.Common;
using Pather.Common.Models;
using Pather.Common.Utils;
using SocketIOWebLibrary;

namespace Pather.Client
{
    public class Communicator
    {
        public SocketIOClient Socket { get; set; }

        public Communicator()
        {
            Socket = SocketIOClient.Connect("127.0.0.1:8998");
            Socket.On("connect", Connect);
        }

        public void Connect()
        {
            //            Socket.On<DataObject<ConnectedModel>>(SocketChannels.ServerChannel(SocketChannels.Server.Connect), OnConnectedCallback); 
        }

        public void ListenOnChannel<T>(string channel,Action<T> callback)
        {
            Socket.On<DataObject<T>>(channel, obj=>callback(obj.Data));
        }
         
        public void SendMessage(string channel, object obj)
        {
            Socket.Emit(channel, new DataObject<object>(obj));
        }
    }
}