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
        private readonly Dictionary<string, CanvasRenderingContext2D> contextCollection =
            new Dictionary<string, CanvasRenderingContext2D>();

        private readonly ClientGameManager clientGameManager;

        public ClientGameView()
        {
            clientGameManager = new ClientGameManager();
            clientGameManager.OnReady += ReadyToPlay;


            NextGameTime = new DateTime().GetTime();

            CurGameTime = new DateTime().GetTime();
            CurTickTime = new DateTime().GetTime();

            Global.SetTimeout(() => Tick(), 1);
        }

        private void ReadyToPlay()
        {
            if (!Constants.TestServer)
            {
                var backCanvas = (CanvasElement) Document.GetElementById("backCanvas");
                var backContext = (CanvasRenderingContext2D) backCanvas.GetContext(CanvasContextId.Render2D);
                var canvas = (CanvasElement) Document.GetElementById("canvas");
                var context = (CanvasRenderingContext2D) canvas.GetContext(CanvasContextId.Render2D);
                contextCollection.Add("Background", backContext);
                contextCollection.Add("Foreground", context);
                canvas.OnMousedown = (ev) =>
                {
                    var @event = (dynamic) ev;

                    clientGameManager.MoveToLocation(@event.offsetX, @event.offsetY);
                };


                Window.RequestAnimationFrame((a) => Draw());
            }
        }


        private void Draw()
        {
            Window.RequestAnimationFrame((a) => Draw());

            var interpolatedTime = (((new DateTime()).GetTime() - NextGameTime)/(double) Constants.GameTicks);

            clientGameManager.Draw(contextCollection, interpolatedTime);
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
                var l = (vc - clientGameManager.FrontEndTickManager.CurrentLockstepTime);

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

                clientGameManager.Tick(TickNumber);
                //todo probably should only happen once? and not in the loop
                var v = new DateTime().GetTime();
                NextGameTime += v - CurGameTime;
                CurGameTime = v;
            }
        }
    }
}