using System;
using Pather.Common.Models.Common.UserActions;

namespace Pather.Common.Models.Common
{
    [Serializable]
    public class UserActionCacheModel
    {
        public UserAction Action;
        public string UserId;
    }
}