using Pather.Common.Definitions.AStar;

namespace Pather.Common.GameFramework
{
    public class GameBoard
    {
        public int[][] Grid;
        public AStarGraph AStarGraph;

        public void Init(int[][] grid)
        {
            Grid = grid;
            AStarGraph = new AStarGraph(Grid);
        }
    }
}