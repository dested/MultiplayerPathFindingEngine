using System.Html.Media.Graphics;
using Pather.Common;
using Pather.Common.old;

namespace Pather.Client.Old
{
    public class ClientEntity : Entity
    {
        private ClientGame ClientGame;

        public ClientEntity(ClientGame game, string playerId)
            : base(game, playerId)
        {
            ClientGame = game;
        }

        public void Draw(CanvasRenderingContext2D context, double interpolatedTime)
        {
            context.Save();

            if (interpolatedTime < 0) interpolatedTime = 0;
            if (interpolatedTime > 1) interpolatedTime = 1;

            var _x = (int) X;
            var _y = (int) Y;
            if (Animations.Count > 0)
            {
                var animationIndex = ((int) (interpolatedTime*Constants.AnimationSteps));
                var animation = Animations[animationIndex];
                if (animation != null)
                {
                    var interpolateStep = (interpolatedTime%(1.0/Constants.AnimationSteps))*Constants.AnimationSteps;
                    _x = (int) (animation.FromX + (animation.X - animation.FromX)*interpolateStep);
                    _y = (int) (animation.FromY + (animation.Y - animation.FromY)*interpolateStep);
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
            context.FillRect((_x) - (Constants.SquareSize/2), (_y) - (Constants.SquareSize/2), (Constants.SquareSize), (Constants.SquareSize));
            context.StrokeRect((_x) - (Constants.SquareSize/2), (_y) - (Constants.SquareSize/2), (Constants.SquareSize), (Constants.SquareSize));
            context.Restore();
        }
    }
}