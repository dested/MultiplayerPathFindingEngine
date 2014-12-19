using System.Collections.Generic;
using Pather.Client.Definitions;
using Pather.Client.Utils;

namespace Pather.Common
{
    public class Entity
    {
        public double X ;
        public double Y ;
        public int SquareX ;
        public int SquareY ;
        public double Speed ;
        public string PlayerId ;
        public List<AStarPath> Path ;
        public List<AnimationPoint> Animations ;
        private Game Game ;

        public Entity(Game game, string playerId)
        {
            Game = game;
            PlayerId = playerId;
            X = 0;
            Y = 0;
            SquareX = 0;
            SquareY = 0;
            Speed = 40;
            Path = new List<AStarPath>();
            Animations = new List<AnimationPoint>();
        }

        public void Init(double x, double y)
        {
            X = x;
            Y = y;
            SquareX = (int)((X) / Constants.SquareSize);
            SquareY = (int)((Y) / Constants.SquareSize);
        }

        public void RePathFind(int squareX, int squareY)
        {
            var graph = new AStarGraph(Game.Grid);
            var start = graph.Grid[SquareX][SquareY];
            var end = graph.Grid[squareX][squareY];
            Path = new List<AStarPath>(AStar.Search(graph, start, end));
        }


        public void Tick()
        {
        


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