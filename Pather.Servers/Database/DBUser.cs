using System;

namespace Pather.Servers.Database
{
    [Serializable]
    public class DBUser
    {
        public string UserId;
        public string Token;
        public int X;
        public int Y;
    }
}