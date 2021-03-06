﻿using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Runtime.CompilerServices;
using Pather.Common;
using Pather.Common.Libraries.NodeJS;
using Pather.Common.Utils.Promises;
using Pather.Servers.Common.ServerLogging;
using Pather.Servers.Utils.Linode.ResponseModels;

namespace Pather.Servers.Utils.Linode
{

    public class LinodeBuilder
    {
        public const int SmallPlanId = 1;
        public const int MediumPlanId = 4;

        private const int ubuntuDistribution = 133;
        private const int kernelId = 138;

        private JsDictionary<string, int> Images;
        public LinodeClient Client;
        private ServerLogger serverLogger;


        public LinodeBuilder()
        {
        }

        public Promise Init(ServerLogger serverLogger)
        {
            var deferred = Q.Defer();
            this.serverLogger = serverLogger;
            Client = Script.Reinterpret<LinodeClient>(Script.Eval("new (require('linode-api').LinodeClient)('" + Constants.LinodeApiKey + "')"));

            Images = new JsDictionary<string, int>();

            Call<List<ImageListResponse>>("image.list", new { }).Then(res =>
            {
                foreach (var imageListResponse in res)
                {
                    Images[imageListResponse.LABEL] = imageListResponse.IMAGEID;
                }
                serverLogger.LogDebug("Linode Images:", Images);
                deferred.Resolve();
            });
            return deferred.Promise;
        }


        public Promise<ServerInstance, LinodeCallError> Create(string name, string image, int planId)
        {
            var deferred = Q.Defer<ServerInstance, LinodeCallError>();
            var instance = new ServerInstance();



            Call<CreateInstanceResponse>("linode.create", new { DatacenterID = 3, PlanId = planId })
                .ThenPromise(res =>
                {
                    serverLogger.LogInformation("Linode", "Created!");
                    instance.LinodeId = res.LinodeID;
                    return Call<object>("linode.update", new { LinodeID = instance.LinodeId, Label = name });
                })
                .ThenPromise(res =>
                {
                    serverLogger.LogInformation("Linode", "Updated!");
                    return Call<List<LinodeIPListResponse>>("linode.ip.list", new { LinodeID = instance.LinodeId });
                })
                .ThenPromise(res =>
                {
                    serverLogger.LogInformation("Linode", "Got IP!");
                    instance.IPAddress = res[0].IPADDRESS;
                    return Call<LinodeDiskCreateResponse>("linode.disk.create", new { LinodeID = instance.LinodeId, Type = "swap", Label = "Swap Disk", Size = 256 });
                })
                .ThenPromise(res =>
                {
                    serverLogger.LogInformation("Linode", "Created Swap!");
                    instance.SwapDiskId = res.DiskID;
                    return Call<LinodeDiskCreateFromImageResponse>("linode.disk.createfromimage", new { LinodeID = instance.LinodeId, ImageID = Images[image] });
                })
                .ThenPromise(res =>
                {
                    serverLogger.LogInformation("Linode", "Created Image!");
                    instance.MainDiskId = res.DISKID;
                    return Call<LinodeConfigCreate>("linode.config.create", new { LinodeID = instance.LinodeId, KernelID = kernelId, Label = name, DiskList = instance.MainDiskId + "," + instance.SwapDiskId });
                })
                .ThenPromise(res =>
                {
                    serverLogger.LogInformation("Linode", "Booted!");
                    return Call<LinodeConfigCreate>("linode.boot", new { LinodeID = instance.LinodeId });
                })
                .ThenPromise(res =>
                {
                    serverLogger.LogInformation("Linode", "Waiting!");
                    return WaitTillDone(instance.LinodeId);
                })
                .Then(res => deferred.Resolve(instance))
                .Error((err) =>
                {
                    serverLogger.LogError("Linode", err);
                    deferred.Reject(err);
                });

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
                        serverLogger.LogInformation("Linode","Waiting on", stillRunning, "tasks!");
                        Global.SetTimeout(() =>
                        {
                            WaitTillDone(linodeId).PassThrough(deferred.Promise);
                        }, 5000);
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
    [Serializable]
    public class ServerInstance
    {
        public string LinodeId;
        public string IPAddress;
        public int SwapDiskId;
        public int MainDiskId;
    }
}