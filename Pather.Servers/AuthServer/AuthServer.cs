﻿using Pather.Servers.Common.ServerLogger;

namespace Pather.Servers.AuthServer
{
    public class AuthServer
    {
        public AuthServer()
        {
            ServerLogger.InitLogger("Auth", "0");
        }
    }
}