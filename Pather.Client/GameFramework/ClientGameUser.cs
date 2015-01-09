using System.Collections.Generic;
using System.Html.Media.Graphics;
using System.Serialization;
using Pather.Common;
using Pather.Common.Definitions.AStar;
using Pather.Common.GameFramework;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.Common.Actions.ClientActions;
using Pather.Common.Utils;

namespace Pather.Client.GameFramework
{
    public class ClientGameUser : GameUser, IClientGameEntity
    {
        public ClientGameUser(ClientGame game, string userId) : base(game, userId)
        {
            Animations = new List<AnimationStep>();
            Path = new List<AStarLockstepPath>();
        }

        public List<AnimationStep> Animations;

        public List<AStarLockstepPath> Path;

        public override void Tick()
        {
            base.Tick();
            Animations.Clear();


            var nextPathPoint = Path[0];
            if (nextPathPoint == null) return;

            Global.Console.Log(EntityId, X, Y, game.tickManager.LockstepTickNumber);
            var halfSquareSize = Constants.SquareSize/2;
            var animationDividedSpeed = (Speed/Constants.NumberOfAnimationSteps);

            var projectedX = nextPathPoint.X*Constants.SquareSize + halfSquareSize;
            var projectedY = nextPathPoint.Y*Constants.SquareSize + halfSquareSize;


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
                    projectedX = nextPathPoint.X*Constants.SquareSize + halfSquareSize;
                    projectedY = nextPathPoint.Y*Constants.SquareSize + halfSquareSize;
                }

                if ((projectedX) == (int) X && (projectedY) == (int) Y)
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

            var _x = (int) X;
            var _y = (int) Y;
            if (Animations.Count > 0)
            {
                var animationIndex = ((int) (interpolatedTime*Constants.NumberOfAnimationSteps));
                var animation = Animations[animationIndex];
                if (animation != null)
                {
                    var interpolateStep = (interpolatedTime%(1.0/Constants.NumberOfAnimationSteps))*Constants.NumberOfAnimationSteps;
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


        public void RePathFind(MoveEntity_ClientAction destinationAction)
        {
            var graph = game.Board.AStarGraph;


            var start = graph.Grid[Utilities.ToSquare(X)][Utilities.ToSquare(Y)];
            var end = graph.Grid[Utilities.ToSquare(destinationAction.X)][Utilities.ToSquare(destinationAction.Y)];
            Path.Clear();
            Path.AddRange(AStar.Search(graph, start, end).Select(a => new AStarLockstepPath(a.X, a.Y)));
            Global.Console.Log("Path", Json.Stringify(Path));
        }


        public void SetPath(List<AStarLockstepPath> path)
        {
            Path.Clear();
            Path.AddRange(path);
            Global.Console.Log("Path", Json.Stringify(Path));
        }
    }
}