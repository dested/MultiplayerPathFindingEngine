namespace Pather.Servers.GameSegment.Models
{
    public class GameSegmentNeighbor
    {
        public GameSegmentUser User;
        public double Distance;

        public GameSegmentNeighbor(GameSegmentUser cUser, double distance)
        {
            Distance = distance;
            User = cUser;
        }
    }
}