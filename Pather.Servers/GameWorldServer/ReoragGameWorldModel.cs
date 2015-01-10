using Pather.Servers.GameWorldServer.Models;

namespace Pather.Servers.GameWorldServer
{
    public class ReoragGameWorldModel
    {
        public GameWorldUser GameWorldUser;
        public GameSegment BestGameSegment;

        public ReoragGameWorldModel(GameWorldUser gameWorldUser, GameSegment bestGameSegment)
        {
            GameWorldUser = gameWorldUser;
            BestGameSegment = bestGameSegment;
        }
    }
}