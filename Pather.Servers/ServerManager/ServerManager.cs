using System;
using System.Collections.Generic;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Models.Head.Base;
using Pather.Servers.Common.PubSub;
using Pather.Servers.Common.ServerLogging;
using Pather.Servers.Libraries.Socket.IO;
using Pather.Servers.Utils;

namespace Pather.Servers.ServerManager
{
    public class ServerManager
    {
        private ServerManagerPubSub serverManagerPubSub;

        public ServerManager(IPubSub pubSub)
        {
            pubSub.Init().Then(() => ready(pubSub));
        }

        private void ready(IPubSub pubSub)
        {
            serverManagerPubSub = new ServerManagerPubSub(pubSub);
            serverManagerPubSub.Init();

            serverManagerPubSub.OnMessage += OnMessage;

        }


        private void OnMessage(ServerManager_PubSub_Message message)
        {
            switch (message.Type)
            {
                default:
                    throw new ArgumentOutOfRangeException();
            }
        }
         
    }
}