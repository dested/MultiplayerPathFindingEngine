/*using System;
using Pather.Server.Libraries.NodeJS;
using Global = Pather.Common.Libraries.Global;

namespace Pather.Client
{
    public class ServerSlammer
    {
        private Func<string, Process> exec;
        private Util util;
        private FS fs;

        static ServerSlammer()
        {
            new ServerSlammer();
        }

        public ServerSlammer()
        {


            fs = Global.Require<FS>("fs");
            util = Global.Require<Util>("util");
            exec = Global.Require<ChildProcess>("child_process").Exec;
            for (int i = 0; i < 100; i++)
            {
                Global.SetTimeout(() =>
                {

                    runProcess("node app.js");
                }, i * 1000);

            }
        }

        private int ind = 0;
        private Process runProcess(string process)
        {
            string[] al;
            var name = "";


            var dummy = exec(process);

            string file = "abcdefg" + ind++;
            Action pollGateways = () =>
            {
                fs.AppendFile("C:\\bbbbbb" + file + ".txt", "BAD BAD BAD BAD BAD BAD BAD", null, null);
//                Global.Process.Exit();
            };
            var cl = Global.SetTimeout(pollGateways, 10000);
            dummy.STDOut.On<string>("data",
                                    (data) =>
                                    {
                                        fs.AppendFile("C:\\bbbbbb" + file + ".txt", data + "\n", null, null);
                                        Global.ClearTimeout(cl);
                                        cl = Global.SetTimeout(pollGateways, 10000);

                                        if (data.IndexOf("debug: ") == -1)
                                        {
                                            util.Print(string.Format("--{0}: {1}   {2}", name, 0, data));
                                            util.Print("?: ");
                                        }
                                    });
            dummy.STDError.On<string>("data",
                                      (data) =>
                                      {
                                          fs.AppendFile("C:\\bbbbbb" + file + ".txt", data + "\n", null, null);
                                          util.Print(string.Format("--{0}: {1}   {2}", name, 0, data));
                                          util.Print("?: ");
                                      });

            return dummy;
        }

    }
}*/