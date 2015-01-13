using System.Collections.Generic;
using System.Html.Media.Graphics;
using Pather.Client.GameFramework;
using Pather.Common;
using Pather.Common.Utils;

namespace GameLogic.Client
{
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
}