using System;
using System.Collections.Generic;

namespace Pather.Common.Models.Common
{
    [Serializable]
    public class UpdatedNeighbor
    {
        public string UserId;
        public double X;
        public double Y;
        public List<InProgressClientAction> InProgressClientActions;
    }
}