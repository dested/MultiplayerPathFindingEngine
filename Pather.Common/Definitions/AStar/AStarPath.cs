using System.Runtime.CompilerServices;

namespace Pather.Client.Definitions
{
    [Imported()]
    public class AStarPath
    {
        [IntrinsicProperty]
        public  int X { get; set; }
        [IntrinsicProperty]
        public int Y { get; set; }
    }
}