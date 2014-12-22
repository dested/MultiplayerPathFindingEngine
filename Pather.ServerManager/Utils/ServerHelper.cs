using System.Collections.Generic;
using Pather.Common.Libraries.NodeJS;

namespace Pather.ServerManager.Utils
{
    public class ServerHelper
    {
        public static List<string> GetNetworkIPs()
        {
            var os = Global.Require<dynamic>("os");

            var interfaces = ((JsDictionary<string, JsDictionary<string, string>>) os.networkInterfaces());
            var addresses = new List<string>();
            foreach (var k in interfaces)
            {
                foreach (var k2 in k.Value)
                {
                    dynamic address = k2.Value;
                    if (address.family == "IPv4" && !address.@internal)
                    {
                        addresses.Add(address.address);
                    }
                }
            }

            return addresses;
        }
    }
}