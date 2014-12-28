using System;
using Pather.Common.Libraries.NodeJS;

namespace Pather.Servers.Common
{
    public class TickWatcher
    {
        private long counter = 0;
        private long startTime = 0;
        public TickWatcher()
        {

            startTime = new DateTime().GetTime();

            setTimout();
        }

        private void setTimout()
        {
            var now = new DateTime().GetTime();

            var elap = now - startTime;

            counter++;

            if (counter % 10 == 0)
            {
                Global.Console.Log("Tick called ", counter, "Seconds since start", elap / 1000);
            }


            Global.SetTimeout(setTimout, 1);
        }
    }
}