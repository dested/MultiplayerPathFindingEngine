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

        public AStarGridPoint[][] Grid ; 
    }
}