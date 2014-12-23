using System;
using System.Html;
using System.Html.Media.Graphics;
using Pather.Common;
using Pather.Common.Models.Game.Old;

namespace Pather.Client
{
    public class ClientGame : Game
    {
        public CanvasElement Canvas;
        public CanvasRenderingContext2D Context;
        public CanvasElement BackCanvas;
        public CanvasRenderingContext2D BackContext;
        public string MyPlayerId;
        public Entity MyPlayer;

        private bool sentMovementForThisLockstep = false;

        public ClientGame()
        {
            MyPlayerId = Guid.NewGuid().ToString();


            StepManager = new ClientStepManager(this, new ClientNetworkManager());
            randomMoveMeTo();
            if (!Constants.TestServer)
            {
                BackCanvas = (CanvasElement) Document.GetElementById("backCanvas");
                BackContext = (CanvasRenderingContext2D) BackCanvas.GetContext(CanvasContextId.Render2D);
                Canvas = (CanvasElement) Document.GetElementById("canvas");
                Context = (CanvasRenderingContext2D) Canvas.GetContext(CanvasContextId.Render2D);
                Canvas.OnMousedown = (ev) =>
                {
                    if (sentMovementForThisLockstep) return;

                    sentMovementForThisLockstep = true;
                    var @event = (dynamic) ev;

                    var squareX = ((int) @event.offsetX)/Constants.SquareSize;
                    var squareY = ((int) @event.offsetY)/Constants.SquareSize;

                    if (squareX < Constants.NumberOfSquares && squareY < Constants.NumberOfSquares)
                    {
                        moveMeTo(squareX, squareY);
                    }
                };
            }
        }

        private void randomMoveMeTo()
        {
            Window.SetTimeout(() =>
            {
                randomMoveMeTo();

                var x = (int) (Math.Random()*Constants.NumberOfSquares);
                var y = (int) (Math.Random()*Constants.NumberOfSquares);

                x = Math.Max(x, 0);
                y = Math.Max(y, 0);

                x = Math.Min(x, Constants.NumberOfSquares - 1);
                y = Math.Min(y, Constants.NumberOfSquares - 1);

                moveMeTo(x, y);
            }, (int) (Math.Random()*2500 + 500));
        }

        private void moveMeTo(int squareX, int squareY)
        {
            var lockstepNumber = LockstepTickNumber;

            if (PercentCompletedWithLockStep > .5)
            {
                lockstepNumber += 2;
            }
            else
            {
                lockstepNumber += 1;
            }


            ((ClientStepManager) StepManager).SendActionClient(new MoveAction(new MoveModel()
            {
                X = squareX,
                Y = squareY,
                PlayerId = MyPlayer.PlayerId
            }, lockstepNumber));
        }


        public override void Init()
        {
            base.Init();


            if (!Constants.TestServer)
            {
                Window.RequestAnimationFrame((a) => Draw());
            }
        }

        public override Entity CreatePlayer(string playerId)
        {
            return new ClientEntity(this, playerId);
        }

        public void DrawBack()
        {
            BackContext.Save();
            BackContext.FillStyle = "black";
            BackContext.FillRect(0, 0, 1200, 1200);

            BackContext.FillStyle = "blue";
            for (var y = 0; y < Constants.NumberOfSquares; y++)
            {
                for (var x = 0; x < Constants.NumberOfSquares; x++)
                {
                    if (Grid[x][y] == 0)
                    {
                        BackContext.FillRect(x*Constants.SquareSize, y*Constants.SquareSize, Constants.SquareSize, Constants.SquareSize);
                    }
                }
            }
            BackContext.Restore();
        }

        private bool hasGrid = false;

        public void Draw()
        {
            if (!Constants.TestServer)
            {
                Window.RequestAnimationFrame((a) => Draw());

                if (!hasGrid && Grid != null)
                {
                    hasGrid = true;
                    DrawBack();
                }


                Context.ClearRect(0, 0, 1200, 1200);
                if (!Ready)
                {
                    Context.FillText("Syncing with server!", 100, 100);
                    return;
                }


                var interpolatedTime = (((new DateTime()).GetTime() - NextGameTime)/(double) Constants.GameTicks);


                foreach (ClientEntity person in Players)
                {
                    person.Draw(Context, interpolatedTime);
                }
            }
        }

        public override TickResult Tick()
        {
            var tickResult = base.Tick();
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