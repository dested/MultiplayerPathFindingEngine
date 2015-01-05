using System.Collections.Generic;
using System.Diagnostics;
using System.Html.Media.Graphics;
using Pather.Common;
using Pather.Common.Definitions.AStar;
using Pather.Common.GameFramework;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Utils;

namespace Pather.Client.GameFramework
{
    public class ClientGameUser : GameUser, IClientGameEntity
    {

        public ClientGameUser(ClientGame game, string userId): base(game,userId)
        {
            Animations = new List<AnimationPoint>();
        }

        public List<AnimationPoint> Animations;
        public override void Tick()
        {
            base.Tick();

            var result = Path[0];
            Animations = new List<AnimationPoint>();

            int projectedX;
            int projectedY;
            int projectedSquareX;
            int projectedSquareY;

            projectedSquareX = result == null ? SquareX : (result.X);
            projectedSquareY = result == null ? SquareY : (result.Y);


            for (var i = 0; i < Constants.AnimationSteps; i++)
            {
                SquareX = (int)((X) / Constants.SquareSize);
                SquareY = (int)((Y) / Constants.SquareSize);
                var fromX = X;
                var fromY = Y;


                if (result != null && (SquareX == result.X && SquareY == result.Y))
                {
                    Path.RemoveAt(0);
                    result = Path[0];

                    projectedSquareX = result == null ? SquareX : (result.X);
                    projectedSquareY = result == null ? SquareY : (result.Y);
                }


                projectedX = projectedSquareX * Constants.SquareSize + Constants.SquareSize / 2;
                projectedY = projectedSquareY * Constants.SquareSize + Constants.SquareSize / 2;


                if (((int)projectedX) == ((int)X) && ((int)projectedY) == ((int)Y))
                {
                    return;
                }

                X = Lerper.MoveTowards(X, projectedX, (Speed / Constants.AnimationSteps));
                Y = Lerper.MoveTowards(Y, projectedY, (Speed / Constants.AnimationSteps));


                Animations.Add(new AnimationPoint(fromX, fromY, X, Y));
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
                var animationIndex = ((int)(interpolatedTime * Constants.AnimationSteps));
                var animation = Animations[animationIndex];
                if (animation != null)
                {
                    var interpolateStep = (interpolatedTime % (1.0 / Constants.AnimationSteps)) * Constants.AnimationSteps;
                    _x = (int)(animation.FromX + (animation.X - animation.FromX) * interpolateStep);
                    _y = (int)(animation.FromY + (animation.Y - animation.FromY) * interpolateStep);
                }
            }

            var result = Path[0];
            if (result != null)
            {
                context.LineWidth = 5;
                context.StrokeStyle = "yellow";
                //                context.StrokeRect(result.X * Constants.SquareSize, result.Y * Constants.SquareSize, Constants.SquareSize, Constants.SquareSize);
            }
            context.StrokeStyle = "green";
            //            context.StrokeRect(SquareX * Constants.SquareSize, SquareY * Constants.SquareSize, Constants.SquareSize, Constants.SquareSize);

            //            Console.WriteLine(_x + " " + _y);


            context.LineWidth = 5;
            context.StrokeStyle = "yellow";
            context.FillStyle = "red";
            context.FillRect((_x) - (Constants.SquareSize / 2), (_y) - (Constants.SquareSize / 2), (Constants.SquareSize), (Constants.SquareSize));
            context.StrokeRect((_x) - (Constants.SquareSize / 2), (_y) - (Constants.SquareSize / 2), (Constants.SquareSize), (Constants.SquareSize));
            context.Restore();

        }
         
    }

    public interface IClientGameEntity
    {
        void Draw(CanvasRenderingContext2D context, double interpolatedTime);
    }
}