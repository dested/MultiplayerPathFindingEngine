using System;
using Pather.Common.Definitions.AStar;

namespace Pather.Common.GameFramework
{
    public class GameBoard
    {
        public int[][] Grid;
        public AStarGraph AStarGraph;
        public void ConstructGrid()
        {
            Grid = new int[Constants.NumberOfSquares][];
            for (var x = 0; x < Constants.NumberOfSquares; x++)
            {
                Grid[x] = new int[Constants.NumberOfSquares];
                for (var y = 0; y < Constants.NumberOfSquares; y++)
                {
                    Grid[x][y] = (Math.Random() * 100 < 15) ? 0 : 1;
                }
            }
            AStarGraph = new AStarGraph(Grid);
        }
        public void Init(int[][] grid)
        {
            Grid = grid;
            AStarGraph = new AStarGraph(Grid);
        }

    }
}