using System;
using Pather.Common;
using Pather.Common.Models;
using Pather.Common.Utils;
using SocketIOWebLibrary;

namespace Pather.Client
{
    public class ClientCommunicator
    {
        public SocketIOClient Socket ;
        
        public ClientCommunicator()
        {
            Socket = SocketIOClient.Connect("198.211.107.101:8991");
//            Socket = SocketIOClient.Connect("127.0.0.1:8991");
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