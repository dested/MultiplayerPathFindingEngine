using System;
using System.Runtime.CompilerServices;
using Pather.Common.Utils;
using Pather.Server.Libraries.NodeJS;
using Pather.Server.Libraries.Socket.IO;

namespace Pather.Server
{
    public class Server
    {
        public Server()
        {
            var http = Global.Require<Http>("http");

            Global.SetInterval(() => { Global.Console.Log("keep alive " + new DateTime().ToString().Substring(17, 24)); }, 10*1000);

            //load();

            var app = http.CreateServer((req, res) => res.End());
            var io = SocketIO.Listen(app);

            app.Listen(8998);
            io.Sockets.On("connection", (SocketIOConnection socket) =>
            {
                socket.On("hello", new Action<DataObject<string>>((helloData) =>
                {
                    Global.Console.Log("Received" + helloData.Data);
                    socket.Emit("hello.ack", new DataObject<string>(helloData.Data));
                }));
            });
        }

        public static void Main()
        {
            new Server();
        }
    }

}