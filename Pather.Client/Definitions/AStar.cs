using System.Runtime.CompilerServices;

namespace Pather.Client.Definitions
{
    [Imported()]
    [ScriptName("Graph")]
    [IgnoreNamespace]
    public class AStarGraph
    {
        public AStarGraph(int[][] gridWeight)
        {
        }

        [IntrinsicProperty]
        public AStarGridPoint[][] Grid { get; set; } 
    }

    [Imported()]
    public  class AStarGridPoint
    {
    }
    [Imported()]
    [ScriptName("astar")]
    [IgnoreNamespace]
    public static class AStar
    {

        public static AStarPath[] Search(AStarGraph graph, AStarGridPoint start, AStarGridPoint end)
        {
            return null;
        }
    }

    [Imported()]
    public class AStarPath
    {
        [IntrinsicProperty]
      public  int X { get; set; }
        [IntrinsicProperty]
        public int Y { get; set; }
    }
}

/*    interface AStarGraph_Static {
        new (grid: boolean[][]): AStarGraph_Instance;
    }
    interface AStarGraph_Instance {
        constructor(grid: boolean[][]);
        grid:AStarGridPoint[][];
    }

    interface AStarPath {
        x: number;
        y: number;
    }

    interface AStarGridPoint {

    }

    interface AStar {
        search(graph: AStarGraph_Instance, start: AStarGridPoint, end: AStarGridPoint): AStarPath[]
    }
*/