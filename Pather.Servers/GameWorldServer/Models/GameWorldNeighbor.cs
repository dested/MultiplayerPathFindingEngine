namespace Pather.Servers.GameWorldServer.Models
{
    public class GameWorldNeighbor
    {
        public GameWorldUser User;
        public double Distance;

        public GameWorldNeighbor(GameWorldUser cUser, double distance)
        {
            Distance = distance;
            User = cUser;
        }
    }
}