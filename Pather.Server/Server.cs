using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using Pather.Common;
using Pather.Common.Models;
using Pather.Common.StepManager;
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

            Global.SetInterval(() => { Global.Console.Log("keep alive " + new DateTime().ToString().Substring(17, 24)); }, 10 * 1000);



            var game = new Game();
            game.Init();





            var app = http.CreateServer((req, res) => res.End());
            var io = SocketIO.Listen(app);

            app.Listen(8998);
            io.Sockets.On("connection", (SocketIOConnection socket) =>
            {
                Global.Console.Log("new connection");
                socket.Emit(SocketChannels.ServerChannel(SocketChannels.Server.Connect), new DataObject<ConnectedModel>(new ConnectedModel()
                {
                    TickNumber = game.TickNumber,
                    Grid = game.Grid
                }));
                Person player = null;
                socket.On("disconnect", () =>
                {
                    if (player == null) return;
                    Global.Console.Log("disc " + player.PlayerId);
                    socket.Broadcast.Emit(SocketChannels.ServerChannel(SocketChannels.Server.PlayerLeft),
                        new DataObject<PlayerLeftModel>(
                            new PlayerLeftModel()
                            {
                                PlayerId = player.PlayerId
                            })
                        );
                    game.People.Remove(player);
                });
                socket.On(SocketChannels.ClientChannel(SocketChannels.Client.Connect), new Action<DataObject<string>>((obj) =>
                {

                    var playerId = obj.Data;
                    Global.Console.Log("new player " + playerId);

                    var person = game.CreatePerson(playerId);
                    player = person;
                    person.Init(0, 0);
                    game.People.Add(person);



                    socket.Emit(SocketChannels.ServerChannel(SocketChannels.Server.PlayerList), new DataObject<PlayerListModel>(new PlayerListModel()
                    {
                        Players = game.People
                        .Filter(a => a.PlayerId != playerId)
                        .Map(p => new PlayerModel()
                        {
                            PlayerId = p.PlayerId,
                            X = p.X,
                            Y = p.Y,
                        })
                    }));
                    socket.Broadcast.Emit(SocketChannels.ServerChannel(SocketChannels.Server.NewPlayer), new DataObject<NewPlayerModel>(new NewPlayerModel()
                    {
                        PlayerId = playerId
                    }));
                }));

                socket.On(SocketChannels.ClientChannel(SocketChannels.Client.PostAction), new Action<DataObject<MoveModel>>((obj) =>
                {
                    var moveModel = obj.Data;
                    Global.Console.Log("player moved ", moveModel);

                    foreach (var person in game.People)
                    {
                        if (person.PlayerId == moveModel.PlayerId)
                        {
//                            person.RePathFind(moveModel.X, moveModel.Y, moveModel.LockstepTick);
                            socket.Broadcast.Emit(SocketChannels.ServerChannel(SocketChannels.Server.Move), new DataObject<MoveModel>(moveModel));
                            return;
                        }
                    }

                }));
            });
        }

        public static void Main()
        {
            new Server();
        }
    }


    public class StepManagerServer : StepManager
    {
        public StepManagerServer(Game game)
            : base(game)
        {
        }

        public void SendActionServer(IAction action)
        {
            SerializableAction serAction = new SerializableAction();
            serAction.Data = action.Data;
            serAction.LockstepTickNumber = action.LockstepTickNumber;
            serAction.Type = action.Type;
        }

        public override List<NetworkPlayer> NetworkPlayers
        {
            get { throw new NotImplementedException(); }
        }
    }

}