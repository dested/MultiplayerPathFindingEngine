using System;

namespace Pather.Common.Models.Gateway
{
    [Serializable]
    public class GatewaySocketMessageModel
    {
        public string Channel { get; set; }
        public string Payload { get; set; }
    }
}