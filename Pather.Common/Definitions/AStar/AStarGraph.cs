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
}