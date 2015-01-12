using System;
using System.Collections.Generic;
using System.Html;
using System.Html.Media.Graphics;
using Pather.Client.GameFramework;
using Pather.Common;
using Pather.Common.Libraries.NodeJS;

namespace Pather.Client
{
    public class ClientGameView
    {
        private readonly JsDictionary<string, CanvasRenderingContext2D> contextCollection =
            new JsDictionary<string, CanvasRenderingContext2D>();

        public readonly ClientGameManager ClientGameManager;

        public ClientGameView()
        {
            ClientGameManager = new ClientGameManager();
            ClientGameManager.OnReady += ReadyToPlay;


            NextGameTime = new DateTime().GetTime();

            CurGameTime = new DateTime().GetTime();
            CurTickTime = new DateTime().GetTime();

            Global.SetTimeout(() => Tick(), 1);
        }

        private void ReadyToPlay()
        {
            if (!Constants.NoDraw)
            {
                var backCanvas = (CanvasElement) Document.GetElementById("backCanvas");
                backCanvas.Width = Constants.NumberOfSquares * Constants.SquareSize;
                backCanvas.Height = Constants.NumberOfSquares * Constants.SquareSize;
                var backContext = (CanvasRenderingContext2D) backCanvas.GetContext(CanvasContextId.Render2D);
                var canvas = (CanvasElement) Document.GetElementById("canvas");
                canvas.Width = Constants.NumberOfSquares * Constants.SquareSize;
                canvas.Height = Constants.NumberOfSquares * Constants.SquareSize;
                var context = (CanvasRenderingContext2D)canvas.GetContext(CanvasContextId.Render2D);
                contextCollection["Background"] = backContext;
                contextCollection["Foreground"] = context;
                canvas.OnMousedown = (ev) =>
                {
                    var @event = (dynamic) ev;

                    ClientGameManager.MoveToLocation(@event.offsetX, @event.offsetY);
                };


                Window.RequestAnimationFrame((a) => Draw());
            }
        }


        private void Draw()
        {
            Window.RequestAnimationFrame((a) => Draw());

            var interpolatedTime = (((new DateTime()).GetTime() - NextGameTime)/(double) Constants.GameTicks);

            ClientGameManager.Draw(contextCollection, interpolatedTime);
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
                var l = (vc - ClientGameManager.FrontEndTickManager.CurrentLockstepTime);

                return l/(double) Constants.LockstepTicks;
            }
        }


        public void Tick()
        {
            Global.SetTimeout(Tick, 1);


            var vc = new DateTime().GetTime();

            var l2 = (vc - CurTickTime);
            var nextTickTime = l2/Constants.GameTicks;
            while (nextTickTime > TrackTickNumber)
            {
                TrackTickNumber++;
                TickNumber++;

                ClientGameManager.Tick(TickNumber);
                //todo probably should only happen once? and not in the loop
                var v = new DateTime().GetTime();
                NextGameTime += v - CurGameTime;
                CurGameTime = v;
            }
        }
    }
}