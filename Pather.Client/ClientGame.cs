using System;
using System.Collections.Generic;
using System.Html;
using System.Html.Media.Graphics;
using Pather.Common;
using Pather.Common.Libraries;
using Pather.Common.Models;

namespace Pather.Client
{
    public class ClientGame:Game
    { 
        public CanvasElement Canvas { get; set; }
        public CanvasRenderingContext2D Context { get; set; }


        private Communicator communicator;
        public ClientGame()
        { 
            Canvas = (CanvasElement)Document.GetElementById("canvas");
            Context = (CanvasRenderingContext2D)Canvas.GetContext(CanvasContextId.Render2D);

            Canvas.OnMousedown = (ev) =>
            {
                var person = People[0];
                var @event = (dynamic)ev;
                
                var squareX = ((int)@event.offsetX) / Constants.SquareSize;
                var squareY = ((int)@event.offsetY) / Constants.SquareSize;


                communicator.SendMove(new MoveModel()
                {
                    Tick = TickNumber,
                    X = squareX,
                    Y = squareY
                });

                person.RePathFind(squareX, squareY);
            };
        }
         
        public override void Init()
        {
            base.Init();


            Me = CreatePerson(Guid.NewGuid().ToString());
            Me.Init(0,0);
            People.Add(Me);



            communicator = new Communicator();
            communicator.Connect(Me.PlayerId);
            communicator.OnConnected += (connectedModel) =>
            {
                TickNumber = connectedModel.TickNumber;
                Grid = connectedModel.Grid;
            };
            communicator.OnNewPlayer += (newPlayerModel) =>
            {
                Global.Console.Log("New Player", newPlayerModel);
                var person = CreatePerson(newPlayerModel.PlayerId);
                person.Init(0, 0);
                People.Add(person);
            };
            communicator.OnPlayerLeft += (playerLeftModel) =>
            {
                Global.Console.Log("playerLeft", playerLeftModel);
                foreach (var person in People)
                {
                    if (person.PlayerId == playerLeftModel.PlayerId)
                    {
                        People.Remove(person);
                        break;
                    }
                }
            };
            communicator.OnPlayerList += (playerListModel) =>
            {
                Global.Console.Log("playerList", playerListModel);


                foreach (var playerModel in playerListModel.Players)
                {
                    var person = CreatePerson(playerModel.PlayerId);
                    person.Init(playerModel.X, playerModel.Y);
                    People.Add(person);
                }
            };
            communicator.OnMove += (moveModel) =>
            {
                foreach (var person in People)
                {
                    if (person.PlayerId == moveModel.PlayerId)
                    {
                        Global.Console.Log("move found", moveModel);
                        person.RePathFind(moveModel.X, moveModel.Y, moveModel.Tick);
                        return;
                    }
                }
            };



            Window.RequestAnimationFrame((a) => Draw());
        }

        public override Person CreatePerson(string playerId)
        {
            return new ClientPerson(this, playerId);
        }

        public void Draw()
        {
            Window.RequestAnimationFrame((a) => Draw());

            Context.Save();
            Context.FillStyle = "black";
            Context.FillRect(0, 0, 1200, 1200);
            Context.Restore();

            Context.Save();
            //                        Context.LineWidth = 5;
            Context.FillStyle = "blue";
            for (var y = 0; y < Constants.NumberOfSquares; y++)
            {
                for (var x = 0; x < Constants.NumberOfSquares; x++)
                {
                    if (Grid[x][y]==0)
                    {
                        Context.FillRect(x * Constants.SquareSize, y * Constants.SquareSize, Constants.SquareSize, Constants.SquareSize);
                    }
                }
            }
            Context.Restore();

            var interpolatedTime = (((new DateTime()).GetTime() - NextGameTime) / (double)Constants.GameTicks);


            foreach (ClientPerson person in People)
            {
                person.Draw(Context, interpolatedTime);
            }
        }
    }
}