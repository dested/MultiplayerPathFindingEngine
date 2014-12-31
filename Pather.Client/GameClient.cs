using System.Html;
using System.Html.Media.Graphics;
using Pather.Common;
using Pather.Common.old;

namespace Pather.Client
{
    public class GameClient
    {
        private CanvasElement canvas;
        private CanvasRenderingContext2D context;

        private GameManager gameManager;

        public GameClient()
        {

            gameManager = new GameManager();
            gameManager.OnReady += ReadyToPlay;
        }

        private void ReadyToPlay()
        {
            if (!Constants.TestServer)
            {
                canvas = (CanvasElement)Document.GetElementById("canvas");
                context = (CanvasRenderingContext2D)canvas.GetContext(CanvasContextId.Render2D);
                canvas.OnMousedown = (ev) =>
                {
                    var @event = (dynamic)ev;

                    var squareX = ((int)@event.offsetX) / Constants.SquareSize;
                    var squareY = ((int)@event.offsetY) / Constants.SquareSize;


                    gameManager.MoveToLocation(squareX, squareY);
                };


                Window.RequestAnimationFrame((a) => Draw());

            }

        }

        private void Draw()
        {
            Window.RequestAnimationFrame((a) => Draw());
            context.ClearRect(0, 0, 1200, 1200);
            foreach (var activeUser in gameManager.ActiveUsers)
            {
                context.Save();

                if (activeUser == gameManager.MyUser)
                {
                    context.FillStyle = "red";
                }
                else
                {
                    context.FillStyle = "blue";
                }

                context.FillRect(activeUser.X * Constants.SquareSize, activeUser.Y * Constants.SquareSize, Constants.SquareSize, Constants.SquareSize);
                context.Restore();
            }
        }
    }
}