using System;
using System.Collections.Generic;
using System.Html;
using System.Html.Media.Graphics;
using Pather.Client;
using Pather.Client.Utils;
using Pather.Common;

namespace GameLogic.Client
{
    public class LogicClientGameView : ClientGameView
    {


        private readonly JsDictionary<string, CanvasRenderingContext2D> contextCollection = new JsDictionary<string, CanvasRenderingContext2D>();

        public LogicClientGameView(IClientInstantiateLogic clientInstantiateLogic)
            : base(clientInstantiateLogic)
        {


        }

        public override void ReadyToPlay()
        {

            if (!Constants.NoDraw)
            {
                var backCanvas = (CanvasElement)Document.GetElementById("backCanvas");
                backCanvas.Width = Constants.NumberOfSquares * Constants.SquareSize;
                backCanvas.Height = Constants.NumberOfSquares * Constants.SquareSize;
                var backContext = (CanvasRenderingContext2D)backCanvas.GetContext(CanvasContextId.Render2D);
                var canvas = (CanvasElement)Document.GetElementById("canvas");
                canvas.Width = Constants.NumberOfSquares * Constants.SquareSize;
                canvas.Height = Constants.NumberOfSquares * Constants.SquareSize;
                var context = (CanvasRenderingContext2D)canvas.GetContext(CanvasContextId.Render2D);
                contextCollection["Background"] = backContext;
                contextCollection["Foreground"] = context;
                canvas.OnMousedown = (ev) =>
                {
                    var @event = (dynamic)ev;

                    ((LogicClientGameManager)ClientGameManager).ClickLocation(@event.offsetX, @event.offsetY);
                };


                Window.RequestAnimationFrame((a) => Draw());
            }

        }

        private void Draw()
        {
            Window.RequestAnimationFrame((a) => Draw());

            var interpolatedTime = (((new DateTime()).GetTime() - NextGameTime) / (double)Constants.GameTicks);

            ((LogicClientGameManager)ClientGameManager).Draw(contextCollection, interpolatedTime);
        }

    }
}