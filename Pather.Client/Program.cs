using System;
using Pather.Common.Utils;
using SocketIOWebLibrary;

namespace Pather.Client
{
    class Program
    {
        static void Main()
        {

            var client = SocketIOClient.Connect("127.0.0.1:8998");
            client.Emit<DataObject<string>>("hello",new DataObject<string>("Fuck you"));
            client.On<DataObject<string>>("hello.ack",data => { Console.WriteLine(data.Data); });


            var game = new ClientGame();
            game.Init();
        }


    }
}
