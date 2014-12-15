using System;
using System.Collections.Generic;
using System.Html;
using System.Html.Media.Graphics;
using Pather.Common;

namespace Pather.Client
{
    public class ClientGame:Game
    { 
        public CanvasElement Canvas { get; set; }
        public CanvasRenderingContext2D Context { get; set; }

        public ClientGame()
        { 
            Canvas = (CanvasElement)Document.GetElementById("canvas");
            Context = (CanvasRenderingContext2D)Canvas.GetContext(CanvasContextId.Render2D);

            Canvas.OnMousedown = (ev) =>
            {
                var person = People[0];
                var @event = (dynamic)ev;
                person.RePathFind(((int)@event.offsetX) / Constants.SquareSize, ((int)@event.offsetY) / Constants.SquareSize);
            };
        }
         
        public override void Init()
        {
            base.Init();

            Window.RequestAnimationFrame((a) => Draw());
        }

        public override Person CreatePerson()
        {
            return new ClientPerson(this);
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

            var interpolatedTime = (((new DateTime()).GetTime() - NextGameTick) / (double)Constants.GameTicks);


            foreach (ClientPerson person in People)
            {
                person.Draw(Context, interpolatedTime);
            }
        }
    }
}