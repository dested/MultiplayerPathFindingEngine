using System;
using System.Collections.Generic;

namespace Pather.Common.Models
{
    [Serializable]
    public class MoveModel
    {
        public string PlayerId { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
    }
    [Serializable]
    public class ConnectedModel
    {
        public long LockstepTickNumber { get; set; }
        public int[][] Grid { get; set; }
    }
    [Serializable]
    public class PlayerSyncModel
    {
        public List<PlayerModel> JoinedPlayers { get; set; }
        public List<PlayerModel> LeftPlayers { get; set; }

    } 
    [Serializable]
    public class PlayerModel
    {
        public string PlayerId { get; set; }
        public double X { get; set; }
        public double Y { get; set; }
    }

    [Serializable]
    public class PlayerJoinModel
    {
        public string PlayerId { get; set; }
    }
}