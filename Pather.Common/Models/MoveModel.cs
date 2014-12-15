using System;
using System.Collections.Generic;

namespace Pather.Common.Models
{
    [Serializable]
    public class MoveModel
    {
        public long Tick { get; set; }
        public string PlayerId { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
    }
    [Serializable]
    public class ConnectedModel
    {
        public long TickNumber { get; set; }
        public int[][] Grid { get; set; }
    }
    [Serializable]
    public class NewPlayerModel
    {
        public string PlayerId { get; set; }
    }
    [Serializable]
    public class PlayerLeftModel
    {
        public string PlayerId { get; set; }
    }

    [Serializable]
    public class PlayerListModel
    {
        public List<PlayerModel> Players { get; set; }
    }
    [Serializable]

    public class PlayerModel
    {
        public string PlayerId { get; set; }
        public double X { get; set; }
        public double Y { get; set; }
    }
}