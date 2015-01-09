using System;
using Pather.Common.Models.Common.Actions.ClientActions.Base;

namespace Pather.Common.Models.Common
{
    [Serializable]
    public class ClientActionCacheModel
    {
        public ClientAction ClientAction;
        public string UserId;
    }
}