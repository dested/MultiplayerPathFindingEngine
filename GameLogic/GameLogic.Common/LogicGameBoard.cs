using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Pather.Common;
using Pather.Common.Definitions.AStar;
using Pather.Common.GameFramework;

namespace GameLogic.Common
{
    public class LogicGameBoard : GameBoard
    {
        public LogicGridItem[][] LogicGrid;
        public override void Init(string[][] grid)
        {
            Grid = grid;
            WeightGrid = new double[grid.Length][];
            LogicGrid = new LogicGridItem[grid.Length][];
            for (int i = 0; i < grid.Length; i++)
            {
                var strings = grid[i];
                WeightGrid[i] = new double[strings.Length];
                LogicGrid[i] = new LogicGridItem[strings.Length];
                for (int j = 0; j < strings.Length; j++)
                {
                    var s = strings[j];
                    var item = FromGridItem(s);
                    LogicGrid[i][j] = item;
                    UpdateWeightedGrid(item, i, j);
                }
            }
            AStarGraph = new AStarGraph(WeightGrid);
        }

        public override void Init()
        {

            Grid = new string[Constants.NumberOfSquares][];
            for (var x = 0; x < Constants.NumberOfSquares; x++)
            {
                Grid[x] = new string[Constants.NumberOfSquares];
                for (var y = 0; y < Constants.NumberOfSquares; y++)
                {

                    var rand = Math.Random() * 100;
                    var slot = BuildGridItem(new LogicGridItem(LogicGridItemType.Empty));
                    if (rand < 15)
                    {
                        slot = BuildGridItem(new LogicGridItem(LogicGridItemType.Wall));
                    }
                    else
                    {
                        rand = Math.Random() * 100;

                        if (rand < 20)
                        {
                            slot = BuildGridItem(new LogicGridItem(LogicGridItemType.Tree, (int)(Math.Random() * 100)));
                        }
                    }

                    Grid[x][y] = slot;
                }
            }

            Init(Grid);

        }

        private void UpdateWeightedGrid(LogicGridItem item, int x, int y)
        {
            switch (item.Type)
            {
                case LogicGridItemType.Tree:
                    WeightGrid[x][y] = 0;
                    break;
                case LogicGridItemType.Wall:
                    WeightGrid[x][y] = 0;
                    break;
                case LogicGridItemType.Empty:
                    WeightGrid[x][y] = 1;
                    break;
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }

        public void ChangePoint(LogicGridItem item, int x, int y)
        {
            LogicGrid[x][y] = item;
            Grid[x][y] = BuildGridItem(item);
            UpdateWeightedGrid(item,x,y);

            AStarGraph.Grid[x][y].Weight = WeightGrid[x][y];

        }

        public LogicGridItem GetAtXY(int squareX, int squareY)
        {
            return LogicGrid[squareX][squareY];
        }



        public static string BuildGridItem(LogicGridItem item)
        {
            if (item.Value == int.MinValue)
            {
                return item.Type.ToString();
            }
            else
            {
                return item.Type.ToString() + "|" + item.Value;
            }
        }
        public static LogicGridItem FromGridItem(string s)
        {
            if (s.Contains("|"))
            {
                var strings = s.Split("|");
                return new LogicGridItem((LogicGridItemType)Enum.Parse(typeof(LogicGridItemType), strings[0]), int.Parse(strings[1]));
            }
            else
            {
                return new LogicGridItem((LogicGridItemType)Enum.Parse(typeof(LogicGridItemType), s), int.MinValue);
            }
        }
    }
}
