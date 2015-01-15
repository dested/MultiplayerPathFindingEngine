using System.Collections.Generic;
using Pather.Common.Libraries.NodeJS;

namespace Pather.Common.Utils.Histogram
{
    internal static class HistogramManager
    {
        private static JsDictionary<string, List<int>> histograms = new JsDictionary<string, List<int>>();
        private static int[] bins = new[] { 0, 3, 5, 10, 20, 30, 50, 75, 100, 500, 1000, 100000000 };

        public static void AddPoint(string name, int value)
        {
            if (!histograms.ContainsKey(name))
            {
                histograms[name] = new List<int>();
            }
            var ints = histograms[name];
            ints.Add(value);


            if (ints.Count % 20 == 0)
            {
                PrintDistributions(GetDistribution(name));
            }
        }
        public static HistogramDistribution GetDistribution(string name)
        {
            if (!histograms.ContainsKey(name))
                histograms[name] = new List<int>();

            var l = histograms[name];
            l.Sort((a, b) => a - b);

            JsDictionary<int, int> binCounter = new JsDictionary<int, int>();
            foreach (var bin in bins)
            {
                binCounter[bin] = 0;
            }

            for (int index = 0; index < l.Count; index++)
            {
                var i = l[index];
                foreach (var bin in bins)
                {
                    if (i <= bin)
                    {
                        binCounter[bin]++;
                        break;
                    }
                }
            }

            HistogramDistribution dist = new HistogramDistribution();
            dist.Name = name;
            dist.Items = new List<HistogramDistributionItem>();
            dist.TotalItems = l.Count;


            for (int index = 0; index < bins.Length - 1; index++)
            {

                dist.Items.Add(new HistogramDistributionItem() { LowerBound = bins[index], UpperBound = bins[index + 1], Value = binCounter[bins[index]] });
            }

            return dist;
        }

        public static void PrintDistributions(HistogramDistribution dist)
        {
            return;
            Global.Console.Log(dist.Name + " Histogram:");
            foreach (var item in dist.Items)
            {
                if (item.Value == 0) continue;
                var c = (((double)item.Value / (double)dist.TotalItems) * 100).ToString("F");
                Global.Console.Log(c + "% Of the items took between " + item.LowerBound + "ms and " + item.UpperBound + "ms");
            }
        }
    }
}