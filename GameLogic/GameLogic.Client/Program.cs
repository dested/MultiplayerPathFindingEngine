using System;
using System.Collections.Generic;
using System.Html;
using System.Html.Media.Graphics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Pather.Client;
using Pather.Client.GameFramework;
using Pather.Client.Utils;
using Pather.Common;
using Pather.Common.GameFramework;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.TestFramework;
using Pather.Common.Utils;

namespace GameLogic.Client
{
    class Program
    {
        static void Main()
        {
            if (((dynamic)Window.Instance).RunTests || Window.Location.Hash == "#test")
            {
                TestFramework.RunTests((string)null);
                return;
            }

            var gameClient = new LogicClientGameView(new ClientInstantiateLogic());

            Global.Console.Log("Hello client!");
        }
    }

    public class ClientInstantiateLogic : IClientInstantiateLogic
    {
        public ClientGameManager CreateClientGameManager()
        {
            return new LogicClientGameManager(this);
        }

        public ClientGame CreateClientGame(FrontEndTickManager frontEndTickManager)
        {
            return new LogicClientGame(frontEndTickManager);
        }
    }

    public class LogicClientGame : ClientGame
    {
        public LogicClientGame(FrontEndTickManager frontEndTickManager)
            : base(frontEndTickManager)
        {


        }

        public override GameUser CreateGameUser(string userId)
        {
            return new LogicClientGameUser(this, userId);
        }

        public void DrawEntities(CanvasRenderingContext2D context, double interpolatedTime)
        {
            foreach (IClientGameEntity entity in ActiveEntities.List)
            {
                context.Save();
                entity.Draw(context, interpolatedTime);

                context.Restore();
            }
        }



    }

    public interface IClientGameEntity
    {
        void Draw(CanvasRenderingContext2D context, double interpolatedTime);
    }


    public class LogicClientGameUser : ClientGameUser, IClientGameEntity
    {
        public List<AnimationStep> Animations;



        public LogicClientGameUser(LogicClientGame clientGame, string userId)
            : base(clientGame, userId)
        {
            Animations = new List<AnimationStep>();

        }

        public override void Tick()
        {
            base.Tick();
            Animations.Clear();


            var nextPathPoint = Path[0];
            if (nextPathPoint == null) return;

            //            Global.Console.Log(EntityId, X, Y, game.tickManager.LockstepTickNumber);
            var halfSquareSize = Constants.SquareSize / 2;
            var animationDividedSpeed = (Speed / Constants.NumberOfAnimationSteps);

            var projectedX = nextPathPoint.X * Constants.SquareSize + halfSquareSize;
            var projectedY = nextPathPoint.Y * Constants.SquareSize + halfSquareSize;


            for (var i = 0; i < Constants.NumberOfAnimationSteps; i++)
            {
                var squareX = Utilities.ToSquare(X);
                var squareY = Utilities.ToSquare(Y);
                var fromX = X;
                var fromY = Y;

                if (squareX == nextPathPoint.X && squareY == nextPathPoint.Y)
                {
                    Path.RemoveAt(0);
                    nextPathPoint = Path[0];

                    if (nextPathPoint == null) return;
                    projectedX = nextPathPoint.X * Constants.SquareSize + halfSquareSize;
                    projectedY = nextPathPoint.Y * Constants.SquareSize + halfSquareSize;
                }

                if ((projectedX) == (int)X && (projectedY) == (int)Y)
                {
                    return;
                }

                X = Lerper.MoveTowards(X, projectedX, animationDividedSpeed);
                Y = Lerper.MoveTowards(Y, projectedY, animationDividedSpeed);


                Animations.Add(new AnimationStep(fromX, fromY, X, Y));
            }
        }

        public void Draw(CanvasRenderingContext2D context, double interpolatedTime)
        {
            context.Save();

            if (interpolatedTime < 0) interpolatedTime = 0;
            if (interpolatedTime > 1) interpolatedTime = 1;

            var _x = (int)X;
            var _y = (int)Y;
            if (Animations.Count > 0)
            {
                var animationIndex = ((int)(interpolatedTime * Constants.NumberOfAnimationSteps));
                var animation = Animations[animationIndex];
                if (animation != null)
                {
                    var interpolateStep = (interpolatedTime % (1.0 / Constants.NumberOfAnimationSteps)) * Constants.NumberOfAnimationSteps;
                    _x = (int)(animation.FromX + (animation.X - animation.FromX) * interpolateStep);
                    _y = (int)(animation.FromY + (animation.Y - animation.FromY) * interpolateStep);
                }
            }

            context.LineWidth = 5;
            if (Controlled)
            {
                context.StrokeStyle = "green";
            }
            else
            {
                context.StrokeStyle = "yellow";
            }
            context.FillStyle = "red";
            context.FillRect((_x) - (Constants.SquareSize / 2), (_y) - (Constants.SquareSize / 2), (Constants.SquareSize), (Constants.SquareSize));
            context.StrokeRect((_x) - (Constants.SquareSize / 2), (_y) - (Constants.SquareSize / 2), (Constants.SquareSize), (Constants.SquareSize));
            context.Restore();
        }


    }

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

                    ClientGameManager.MoveToLocation(@event.offsetX, @event.offsetY);
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

    public class LogicClientGameManager : ClientGameManager
    {
        public LogicClientGameManager(IClientInstantiateLogic clientInstantiateLogic)
            : base(clientInstantiateLogic)
        {
        }


        public void Draw(JsDictionary<string, CanvasRenderingContext2D> contextCollection, double interpolatedTime)
        {
            contextCollection["Foreground"].ClearRect(0, 0, Constants.NumberOfSquares * Constants.SquareSize, Constants.NumberOfSquares * Constants.SquareSize);
            DrawBackground(contextCollection["Background"]);
            ((LogicClientGame)clientGame).DrawEntities(contextCollection["Foreground"], interpolatedTime);
        }

        private void DrawBackground(CanvasRenderingContext2D context)
        {
            context.ClearRect(0, 0, Constants.NumberOfSquares * Constants.SquareSize, Constants.NumberOfSquares * Constants.SquareSize);
            context.Save();
            context.FillStyle = "black";
            context.FillRect(0, 0, Constants.NumberOfSquares * Constants.SquareSize, Constants.NumberOfSquares * Constants.SquareSize);

            context.FillStyle = "blue";
            for (var y = 0; y < Constants.NumberOfSquares; y++)
            {
                for (var x = 0; x < Constants.NumberOfSquares; x++)
                {
                    if (clientGame.Board.Grid[x][y] == 0)
                    {
                        context.FillRect(x * Constants.SquareSize, y * Constants.SquareSize, Constants.SquareSize, Constants.SquareSize);
                    }
                }
            }
            context.Restore();
        }

    }
}
