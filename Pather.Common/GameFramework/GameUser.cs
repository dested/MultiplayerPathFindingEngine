using System.Collections.Generic;
using System.Diagnostics;
using Pather.Common.Definitions.AStar;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Utils;

namespace Pather.Common.GameFramework
{
    public class GameUser : GameEntity
    {

        public GameUser(Game game, string userId)
            : base(game)
        {
            EntityId = userId;
            Path = new List<AStarPath>();
            Speed = 20;
        }

        public double Speed;
        public List<AStarPath> Path;
        public override void Tick()
        {
            

        }
        public void RePathFind(int squareX, int squareY)
        {
            var graph = game.Board.AStarGraph;

            var start = graph.Grid[SquareX][SquareY];
            var end = graph.Grid[squareX][squareY];
            Path = new List<AStarPath>(AStar.Search(graph, start, end));
            Debug.Break();
            BuildMovement();
        }

        public void BuildMovement()
        {
            var result = Path[0];

            int projectedSquareX = result == null ? SquareX : (result.X);
            int projectedSquareY = result == null ? SquareY : (result.Y);
            List<Point> points = new List<Point>();

            while (result != null)
            {
                SquareX = (int)((X) / Constants.SquareSize);
                SquareY = (int)((Y) / Constants.SquareSize);

                if (SquareX == result.X && SquareY == result.Y)
                {
                    Path.RemoveAt(0);
                    result = Path[0];

                    projectedSquareX = result == null ? SquareX : (result.X);
                    projectedSquareY = result == null ? SquareY : (result.Y);
                }


                int projectedX = projectedSquareX * Constants.SquareSize + Constants.SquareSize / 2;
                int projectedY = projectedSquareY * Constants.SquareSize + Constants.SquareSize / 2;


                if (((int)projectedX) == ((int)X) && ((int)projectedY) == ((int)Y))
                {
                    break;
                }

                X = Lerper.MoveTowards(X, projectedX, (Speed));
                Y = Lerper.MoveTowards(Y, projectedY, (Speed));


                points.Add(new Point(X, Y));
            }
            Global.Console.Log(points);
        }
    }
}