using System.Collections.Generic;
using Pather.Client.Definitions;
using Pather.Client.Utils;

namespace Pather.Common
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
            Speed = 40;
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