namespace Pather.Servers.Libraries.RTree
{
    /// <summary>
    /// Currently hardcoded to 3 dimensions, but could be extended.
    /// author  aled@sourceforge.net
    /// version 1.0b2p1
    /// </summary>
    public class RTreePoint
    {



        /// <summary>
        /// Number of dimensions in a point. In theory this
        /// could be exended to three or more dimensions.
        /// </summary>
        private const int DIMENSIONS = 3;

        /// <summary>
        /// The (x, y) coordinates of the point.
        /// </summary>
        internal float[] coordinates;



        /// <summary>
        /// Constructor.
        /// </summary>
        /// <param name="x">The x coordinate of the point</param>
        /// <param name="y">The y coordinate of the point</param>
        /// <param name="z">The z coordinate of the point</param>
        public RTreePoint(float x, float y, float z = 1)
        {
            coordinates = new float[DIMENSIONS];
            coordinates[0] = x;
            coordinates[1] = y;
            coordinates[2] = z;
        }
    }
}