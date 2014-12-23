using System;
using System.Collections.Generic;

namespace Pather.Common.Models.Game
{
    [Serializable]
    public class PlayerSyncModel
    {
        public List<PlayerModel> JoinedPlayers;
        public List<PlayerModel> LeftPlayers;
    }
}