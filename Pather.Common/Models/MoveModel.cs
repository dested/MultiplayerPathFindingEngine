using System;
using System.Collections.Generic;

namespace Pather.Common.Models
{
    [Serializable]
    public class MoveModel
    {
        public string PlayerId ;
        public int X ;
        public int Y ;
    }
    [Serializable]
    public class ConnectedModel
    {
        public int[][] Grid ;
    }

    [Serializable]
    public class SyncLockstepModel
    {
        public long LockstepTickNumber ;
    }
        


    [Serializable]
    public class PlayerSyncModel
    {
        public List<PlayerModel> JoinedPlayers ;
        public List<PlayerModel> LeftPlayers ;

    } 
    [Serializable]
    public class PlayerModel
    {
        public string PlayerId ;
        public double X ;
        public double Y ;
    }

    [Serializable]
    public class PlayerJoinModel
    {
        public string PlayerId ;
    }
    [Serializable]
    public class PingPongModel
    {
    }

}