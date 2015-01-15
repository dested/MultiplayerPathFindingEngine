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
        private const int smallPlanId = 1;
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
            string linodeId;

            Call<CreateInstanceResponse>("linode.create", new {DatacenterID = 3, PlanId = planId})
                .Then(res =>
                {
                    linodeId = res.LinodeID;

                    return Call<object>("linode.update", new {LinodeID = linodeId, Label = name});
                }).Then(a =>
                {
                    
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