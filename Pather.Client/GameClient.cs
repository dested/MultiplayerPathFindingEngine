using System; 
using System.Html;
using System.Html.Media.Graphics;
using Pather.Common;
using Pather.Common.Definitions.AStar;
using Pather.Common.Libraries.NodeJS; 

namespace Pather.Client
{
    public class GameClient
    {
        private CanvasElement canvas;
        private CanvasRenderingContext2D context;
        public CanvasElement BackCanvas;
        public CanvasRenderingContext2D BackContext;

        private readonly GameManager gameManager;

        public GameClient()
        {
            gameManager = new GameManager();
            gameManager.OnReady += ReadyToPlay;

            
            
            
            NextGameTime = new DateTime().GetTime();

            CurGameTime = new DateTime().GetTime();
            CurTickTime = new DateTime().GetTime();

            Global.SetTimeout(() => Tick(), 1);
        }

        private void ReadyToPlay()
        {
            if (!Constants.TestServer)
            {
                BackCanvas = (CanvasElement)Document.GetElementById("backCanvas");
                BackContext = (CanvasRenderingContext2D)BackCanvas.GetContext(CanvasContextId.Render2D);
                canvas = (CanvasElement)Document.GetElementById("canvas");
                context = (CanvasRenderingContext2D)canvas.GetContext(CanvasContextId.Render2D);
                canvas.OnMousedown = (ev) =>
                {
                    var @event = (dynamic) ev;

                    var squareX = ((int) @event.offsetX)/Constants.SquareSize;
                    var squareY = ((int) @event.offsetY)/Constants.SquareSize;


                    gameManager.MoveToLocation(squareX, squareY);
                };


                Window.RequestAnimationFrame((a) => Draw());
            }
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
                    if (gameManager.clientGame.Board.Grid[x][y] == 0)
                    {
                        BackContext.FillRect(x * Constants.SquareSize, y * Constants.SquareSize, Constants.SquareSize, Constants.SquareSize);
                    }
                }
            }
            BackContext.Restore();
        }


        private void Draw()
        {
            Window.RequestAnimationFrame((a) => Draw());
            DrawBack();

            context.ClearRect(0, 0, 1200, 1200);
            var interpolatedTime = (((new DateTime()).GetTime() - NextGameTime) / (double)Constants.GameTicks);
            foreach (var activeUser in gameManager.ActiveUsers.List)
            {
                context.Save();
                activeUser.Draw(context, interpolatedTime);
             
                context.Restore();
            }

        }
              
        public long CurTickTime; 
        public long TickNumber; 
         
        public long CurGameTime; 
        public long NextGameTime;
        public int ServerLatency;
        public long TrackTickNumber;
        public long TrackLockstepTickNumber;


        public double PercentCompletedWithLockStep
        {
            get
            {
                var vc = new DateTime().GetTime();
                var l = (vc - gameManager.FrontEndTickManager.CurrentLockstepTime);

                return l/(double) Constants.LockstepTicks;
            }
        }


        public void Tick()
        {
            Global.SetTimeout(() => Tick(), 1);


            var vc = new DateTime().GetTime();
           
            var l2 = (vc - CurTickTime);
            var nextTickTime = l2/Constants.GameTicks;
            while (nextTickTime > TrackTickNumber)
            {
                TrackTickNumber++;
                TickNumber++;
                foreach (var person in gameManager.ActiveUsers.List)
                {
                    person.Tick();
                }
                //todo probably should only happen once? and not in the loop
                var v = new DateTime().GetTime();
                NextGameTime += v - CurGameTime;
                CurGameTime = v;
            }

        }

    }
}