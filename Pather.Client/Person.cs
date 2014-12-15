using System.Collections.Generic;
using System.Html.Media.Graphics;
using Pather.Client.Definitions;
using Pather.Client.Utils;

namespace Pather.Client
{
    public class Person
    {
        public double X { get; set; }
        public double Y { get; set; }
        public int SquareX { get; set; }
        public int SquareY { get; set; }
        public double Speed { get; set; }
        public List<AStarPath> Path { get; set; }
        public Point RePathFindPosition { get; set; }
        public List<AnimationPoint> Animations { get; set; }
        private Game Game { get; set; }

        public Person(Game game)
        {
            Game = game;
            X = 0;
            Y = 0;
            SquareX = 0;
            SquareY = 0;
            Speed = 50;
            Path = new List<AStarPath>();
            RePathFindPosition = null;

        }

        public void Init(int squareX, int squareY)
        {
            SquareX = squareX;
            SquareY = squareY;
            X = SquareX * Constants.SquareSize;
            Y = SquareY * Constants.SquareSize;
            Animations = new List<AnimationPoint>();
        }

        public void RePathFind(int SquareX, int SquareY)
        {
            RePathFindPosition = new Point(SquareX, SquareY);
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

        public void Tick()
        {
            //            console.log('ticked');

            if (RePathFindPosition != null)
            {
                var graph = new AStarGraph(Game.Grid);
                var start = graph.Grid[SquareX][SquareY];
                var end = graph.Grid[(int)RePathFindPosition.X][(int)RePathFindPosition.Y];
                Path = new List<AStarPath>(AStar.Search(graph, start, end));
                RePathFindPosition = null;
            }


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

                X = Constants.MoveTowards(X, projectedX, (Speed / Constants.AnimationSteps));
                Y = Constants.MoveTowards(Y, projectedY, (Speed / Constants.AnimationSteps));


                Animations.Add(new AnimationPoint(fromX, fromY, X, Y));
            }


        }

    }
}