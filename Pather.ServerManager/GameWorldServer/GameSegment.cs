using System.Collections.Generic;

namespace Pather.ServerManager.GameWorldServer
{
    public class GameSegment
    {
        public GameSegment()
        {
            Users = new List<GameWorldUser>();
        }

        public List<GameWorldUser> Users;
        public string GameSegmentId;

        public void AddUserToSegment(GameWorldUser gwUser)
        {
            Users.Add(gwUser);
            gwUser.GameSegment = this;
        }
    }
}