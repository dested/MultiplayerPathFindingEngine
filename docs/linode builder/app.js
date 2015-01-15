require('./passwords');



function LinodeBuilder() {
    this.client = new (require('linode-api').LinodeClient)(global.apikey);
    this.smallPlanId = 1;
    this.mediumPlanId = 4;
    this.ubuntuDistribution = 133;
    this.goodKernalId = 138;

    this.mainDomainId = 656600;
    this.mainDomainName = 'whoscoding.net';

    this.mainDomainResources = {
        '': { resourceId: 4769266 },
        'www': { resourceId: 4769255 },
        'head': { resourceId: 4769265 },
        'redis': { resourceId: 4769264 }
    };
}

LinodeBuilder.prototype.init = function (callback) {
    this.images = {};
    this.client.call('image.list', {}, (function (err, res) {
        for (var i = 0; i < res.length; i++) {
            var script = res[i];

            this.images[script.LABEL] = script.IMAGEID;
        };

        callback();
    }).bind(this));
}


LinodeBuilder.prototype.waitTillDone = function (id, callback) {

    var that = this;
    console.log("waiting:", id);
    this.client.call('linode.job.list', { LinodeID: id, pendingOnly: true }, function (err, res) {

        if (err) {
            console.log(err);
            throw err;
        }

        var badCount = 0;
        for (var i = 0; i < res.length; i++) {
            if (!res[i].HOST_SUCCESS) {
                badCount++;
            }
        };


        if (badCount == 0) {
            callback();
        } else {
            console.log('Waiting on', badCount, 'Tasks');
            setTimeout(function () { that.waitTillDone(id, callback); }, 5000);
        }
    });

}


LinodeBuilder.prototype.updateDomainTarget = function (resourceId, target, callback) {

    var that = this;
    this.client.call('domain.resource.update', { DomainID: this.mainDomainId, ResourceId: resourceId, Target: target }, function (err, res) {
        if (err) {
            console.log(err);
            throw err;
        }
        callback();
    });

}


LinodeBuilder.prototype.getDomains = function (callback) {

    var that = this;
    this.client.call('domain.resource.list', { DomainID: this.mainDomainId }, function (err, res) {

        if (err) {
            console.log(err);
            throw err;
        }
        console.log(res);
    });

}

LinodeBuilder.prototype.create = function (name, image, planId, callback) {

    var client = this.client;
    var that = this;
    client.call('linode.create', {
        DatacenterID: 3,
        PlanId: planId,
    },
	function (err, res) {
	    if (err) {
	        console.log(err);
	        throw err;
	    }
	    console.log("Created");
	    var id = res.LinodeID;
	    client.call('linode.update', { LinodeID: id, Label: name }, function (err, res) {
	        if (err) {
	            console.log(err);
	            throw err;
	        }
	        console.log("Updated Name");
	        client.call('linode.ip.list', { LinodeID: id },
				function (err, res) {
				    if (err) {
				        console.log(err);
				        throw err;
				    }
				    var ip = res[0].IPADDRESS;

				    console.log("Got IP");


				    client.call('linode.disk.create', {
				        LinodeID: id,
				        Type: 'swap',
				        Label: "Swap Disk",
				        Size: 256
				    }, function (err, res) {

				        if (err) {
				            console.log(err);
				            throw err;
				        }
				        console.log('Created swap disk!')

				        var swapId = res.DiskID;
				        client.call('linode.disk.createfromimage', {
				            LinodeID: id,
				            ImageID: that.images[image]
				        },
						function (err, res) {

						    if (err) {
						        console.log(err);
						        throw err;
						    }

						    console.log("Configuration set!");
						    var diskId = res.DISKID;

						    client.call('linode.config.create', {
						        LinodeID: id,
						        KernelID: that.goodKernalId,
						        Label: name,
						        DiskList: diskId + ',' + swapId
						    }, function (err, res) {
						        if (err) {
						            console.log(err);
						            throw err;
						        }
						        console.log("Created Image");

						        client.call('linode.boot', { LinodeID: id },
									function (err, res) {
									    if (err) {
									        console.log(err);
									        throw err;
									    }
									    console.log('Booted')
									    that.waitTillDone(id, function () {
									        callback(id, name, ip);

									    });

									});
						    });

						});
				    });

				});
	    });
	});





}



var builder = new LinodeBuilder();
builder.init(function () {
    builder.create('Redis', 'Redis', builder.smallPlanId, redisReady);
    builder.create('Main-Node', 'Node', builder.mediumPlanId, mainNodeReady);
    builder.create('Cluster-Node', 'Node', builder.mediumPlanId, clusterNodeReady);

    /*	builder.create('Client1','Node',builder.mediumPlanId,ready);
        builder.create('Client2','Node',builder.mediumPlanId,ready);
        builder.create('Client3','Node',builder.mediumPlanId,ready);
        builder.create('Client4','Node',builder.mediumPlanId,ready);
        */
});

function redisReady(id, name, ip) {

    var exec = require('ssh-exec');

    var c = exec.connection({
        user: 'root',
        host: ip,
        password: global.password
    });



    console.log('updating target domain');
    builder.updateDomainTarget(builder.mainDomainResources['redis'].resourceId, ip, function () {

        console.log('executing data');

        exec('redis-server  --port 6379 --bind redis.whoscoding.net &', c).pipe(process.stdout);
        exec('redis-server  --port 6380 --bind redis.whoscoding.net &', c).pipe(process.stdout);

        console.log("Ready! " + name, ip, id);
    });





}



function mainNodeReady(id, name, ip) {

    console.log('updating target domain');
    builder.updateDomainTarget(builder.mainDomainResources[''].resourceId, ip, function (err, res) {
        if (err) {
            console.log(err);
            throw err;
        }

    });
    builder.updateDomainTarget(builder.mainDomainResources['www'].resourceId, ip, function (err, res) {
        if (err) {
            console.log(err);
            throw err;
        }

    });
    builder.updateDomainTarget(builder.mainDomainResources['head'].resourceId, ip, function (err, res) {
        if (err) {
            console.log(err);
            throw err;
        }
    });



    var exec = require('ssh-exec');

    var c = exec.connection({
        user: 'root',
        host: ip,
        password: global.password
    });

    exec('/usr/local/src/main.sh &', c).pipe(process.stdout);
    console.log('main node done');

}



function clusterNodeReady(id, name, ip) {


    var exec = require('ssh-exec');

    var c = exec.connection({
        user: 'root',
        host: ip,
        password: global.password
    });

    exec('/usr/local/src/cluster.sh &', c).pipe(process.stdout);
    console.log('cluster done');

}
