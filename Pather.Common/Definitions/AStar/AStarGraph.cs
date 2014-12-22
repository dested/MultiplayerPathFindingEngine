using System.Runtime.CompilerServices;

namespace Pather.Common.Definitions.AStar
{
    [Imported()]
    [ScriptName("Graph")]
    [IgnoreNamespace]
    public class AStarGraph
    {
        public AStarGraph(int[][] gridWeight)
        {
        }

        public AStarGridPoint[][] Grid;
    }
}