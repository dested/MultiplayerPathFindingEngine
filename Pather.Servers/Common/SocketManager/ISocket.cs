using System;
using System.Runtime.CompilerServices;
using Pather.Common.Utils;

namespace Pather.Servers.Common.SocketManager
{
    public interface ISocket
    {
        [IncludeGenericArguments(false)]
        void On<T>(string channel, Action<T> callback);

        void Disconnect(Action callback);
        void Emit<T>(string channel, DataObject<T> dataObject);
    }
}