using System;
using System.Html;
using System.Html.Media.Graphics;
using Pather.Common;
using Pather.Common.Libraries;
using Pather.Common.Models;

namespace Pather.Client
{
    public class ClientGame:Game
    { 
        public CanvasElement Canvas ;
        public CanvasRenderingContext2D Context ;
        public string MyPlayerId ;
        public Entity MyPlayer ;

        private bool sentMovementForThisLockstep = false;
        public ClientGame()
        {
            MyPlayerId = Guid.NewGuid().ToString();


            StepManager = new ClientStepManager(this, new ClientNetworkManager());

            Canvas = (CanvasElement)Document.GetElementById("canvas");
            Context = (CanvasRenderingContext2D)Canvas.GetContext(CanvasContextId.Render2D);

            Canvas.OnMousedown = (ev) =>
            {

                if (sentMovementForThisLockstep) return;
                
                sentMovementForThisLockstep = true;
                var @event = (dynamic)ev;
                
                var squareX = ((int)@event.offsetX) / Constants.SquareSize;
                var squareY = ((int)@event.offsetY) / Constants.SquareSize;


                var lockstepNumber = LockstepTickNumber;

                if (PercentCompletedWithLockStep > .5)
                {
                    lockstepNumber += 2;
                }
                else
                {
                    lockstepNumber += 1;
                }


                ((ClientStepManager)StepManager).SendActionClient(new MoveAction(new MoveModel()
                {
                    X = squareX,
                    Y = squareY,
                    PlayerId = MyPlayer.PlayerId
                }, lockstepNumber));
                 
            };
        }




        public override void Init()
        {
            base.Init();


            Window.RequestAnimationFrame((a) => Draw());
        }

        public override Entity CreatePlayer(string playerId)
        {
            return new ClientEntity(this, playerId);
        }

        public void Draw()
        {
            Window.RequestAnimationFrame((a) => Draw());


            Context.Save();
            Context.FillStyle = "black";
            Context.FillRect(0, 0, 1200, 1200);
            Context.Restore();
            if (!Ready)
            {
                Context.FillText("Syncing with server!", 100, 100);
                return;
            }

            Context.Save();
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


            foreach (ClientEntity person in Players)
            {
                person.Draw(Context, interpolatedTime);
            }
        }

        public override TickResult Tick()
        {
            var tickResult=base.Tick();
            if (tickResult == TickResult.Lockstep || tickResult == TickResult.Both)
            {
                sentMovementForThisLockstep = false;
            }
            return tickResult;
        }

        public void LocalPlayerJoined(Entity player)
        {
            MyPlayer = player;
        }
    }
}
