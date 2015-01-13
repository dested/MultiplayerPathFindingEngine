using System;
using System.Runtime.CompilerServices;
using Pather.Common.Definitions.AStar;

namespace Pather.Common.GameFramework
{
    //todo should be abstract
    public class GameBoard
    {
        protected double[][] WeightGrid;
        public AStarGraph AStarGraph;
        public string[][] Grid;

        public virtual void Init(string[][] grid)
        {
            WeightGrid = new double[grid.Length][];
            for (int i = 0; i < grid.Length; i++)
            {
                var strings = grid[i];
                WeightGrid[i] = new double[strings.Length];
                for (int j = 0; j < strings.Length; j++)
                {
                    var s = strings[j];


                    WeightGrid[i][j] = double.Parse(s);
                }
            }
            AStarGraph = new AStarGraph(WeightGrid);
        }

        public virtual void Init()
        {
            
        }
    }

    

    
}