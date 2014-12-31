using Pather.Servers.GameWorldServer.Models;

namespace Pather.Servers.GameWorldServer
{
    public class ReoragGameWorldModel
    {
        public GameWorldUser GameWorldUser { get; set; }
        public GameSegment BestGameSegment { get; set; }

        public ReoragGameWorldModel(GameWorldUser gameWorldUser, GameSegment bestGameSegment)
        {
            GameWorldUser = gameWorldUser;
            BestGameSegment = bestGameSegment;
        }
    }
}