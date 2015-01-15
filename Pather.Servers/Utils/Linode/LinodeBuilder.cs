using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;
using Pather.Common;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Utils.Promises;
using Pather.Servers.Utils.Linode.ResponseModels;

namespace Pather.Servers.Utils.Linode
{

    public class LinodeBuilder
    {
        public const int SmallPlanId = 1;
        private const int mediumPlanId = 4;

        private const int ubuntuDistribution = 133;
        private const int kernalId = 138;

        private JsDictionary<string, int> Images;


        public LinodeBuilder()
        {
            Client = Script.Reinterpret<LinodeClient>(Script.Eval("new (require('linode-api').LinodeClient)('" + Constants.LinodeApiKey + "')"));
        }

        public void Init()
        {
            Images = new JsDictionary<string, int>();

            Call<List<ImageListResponse>>("image.list", new { }).Then(res =>
            {
                foreach (var imageListResponse in res)
                {
                    Images[imageListResponse.LABEL] = imageListResponse.IMAGEID;
                }
                Global.Console.Log(Images);
            });
        }

        public Promise Create(string name, string image, int planId)
        {
            var deferred = Q.Defer();
            string linodeId = "";
            string ip = "";
            int swapDiskId = 0;
            int mainDiskId = 0;


            Call<CreateInstanceResponse>("linode.create", new { DatacenterID = 3, PlanId = planId })
                .ThenPromise(res =>
                {
                    Global.Console.Log("Created!");
                    linodeId = res.LinodeID;
                    return Call<object>("linode.update", new { LinodeID = linodeId, Label = name });
                })
                .ThenPromise(res =>
                {
                    Global.Console.Log("Updated!");
                    return Call<List<LinodeIPListResponse>>("linode.ip.list", new {LinodeID = linodeId});
                })
                .ThenPromise(res =>
                {
                    Global.Console.Log("Got IP!");
                    ip = res[0].IPADDRESS;
                    return Call<LinodeDiskCreateResponse>("linode.disk.create", new { LinodeID = linodeId, Type = "swap", Label = "Swap Disk", Size = 256 });
                })
                .ThenPromise(res =>
                {
                    Global.Console.Log("Created Swap!");
                    swapDiskId = res.DiskID;
                    return Call<LinodeDiskCreateResponse>("linode.disk.createfromimage", new { LinodeID = linodeId, ImageID = Images[image] });
                })
                .ThenPromise(res =>
                {
                    Global.Console.Log("Created Image!");
                    mainDiskId = res.DiskID;
                    return Call<LinodeConfigCreate>("linode.config.create", new { LinodeID = linodeId, KernalID = kernalId, Label = name, DiskList = mainDiskId + "," + swapDiskId });
                })
                .ThenPromise(res =>
                {
                    Global.Console.Log("Booted!");
                    return Call<LinodeConfigCreate>("linode.boot", new { LinodeID = linodeId });
                })
                .ThenPromise(res =>
                {
                    Global.Console.Log("Waiting!");
                    return WaitTillDone(linodeId);
                })
                .Then(res => deferred.Resolve());

            return deferred.Promise;
        }

        private Promise<object, LinodeCallError> WaitTillDone(string linodeId)
        {
            var deferred = Q.Defer<object, LinodeCallError>();
            Call<List<LinodeJobListResponse>>("linode.job.list", new { LinodeID = linodeId, pendingOnly = true }).Then(
                res =>
                {
                    var stillRunning = 0;
                    foreach (var item in res)
                    {
                        if (!item.HOST_SUCCESS)
                        {
                            stillRunning++;
                        }
                    }

                    if (stillRunning == 0)
                    {
                        deferred.Resolve(null);
                    }
                    else
                    {
                        Global.Console.Log("Waiting on", stillRunning, "tasks!");
                        Global.SetTimeout(() =>
                        {
                            WaitTillDone(linodeId).PassThrough(deferred.Promise);
                        },5000);
                    }

                });
            return deferred.Promise;
        }



        private Promise<T, LinodeCallError> Call<T>(string path, object data)
        {
            var deferred = Q.Defer<T, LinodeCallError>();
            Client.Call<T>(path, data, (err, res) =>
            {

                if (err != null)
                {
                    deferred.Reject(err);
                }
                else
                {
                    deferred.Resolve(res);
                }
            });
            return deferred.Promise;
        }

        public LinodeClient Client;
    }


    public class LinodeCallError
    {
    }
    [Imported]
    public class LinodeClient
    {
        [IncludeGenericArguments(false)]
        public void Call<T>(string imageList, object o, Action<LinodeCallError, T> action)
        {

        }
    }
}