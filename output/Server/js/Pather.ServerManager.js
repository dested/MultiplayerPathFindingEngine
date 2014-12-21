'use strict';

var socketio = require('socket.io');
var $asm = {};
global.Pather = global.Pather || {};
global.Pather.ServerManager = global.Pather.ServerManager || {};
global.Pather.ServerManager.AuthServer = global.Pather.ServerManager.AuthServer || {};
global.Pather.ServerManager.Common = global.Pather.ServerManager.Common || {};
global.Pather.ServerManager.Database = global.Pather.ServerManager.Database || {};
global.Pather.ServerManager.GameServer = global.Pather.ServerManager.GameServer || {};
global.Pather.ServerManager.GameWorldServer = global.Pather.ServerManager.GameWorldServer || {};
global.Pather.ServerManager.GameWorldServer.Tests = global.Pather.ServerManager.GameWorldServer.Tests || {};
global.Pather.ServerManager.GatewayServer = global.Pather.ServerManager.GatewayServer || {};
global.Pather.ServerManager.TickServer = global.Pather.ServerManager.TickServer || {};
global.Pather.ServerManager.Utils = global.Pather.ServerManager.Utils || {};
ss.initAssembly($asm, 'Pather.ServerManager');
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.ServerManager
var $Pather_ServerManager_ServerManager = function() {
};
$Pather_ServerManager_ServerManager.__typeName = 'Pather.ServerManager.ServerManager';
$Pather_ServerManager_ServerManager.main = function() {
	if (process.argv[2].toLowerCase() === 'test') {
		Pather.Common.TestFramework.TestFramework.runTests();
		return;
	}
	try {
		switch (process.argv[2].toLowerCase()) {
			case 'gt':
			case 'gateway': {
				new $Pather_ServerManager_GatewayServer_GatewayServer(new $Pather_ServerManager_Common_PubSub());
				break;
			}
			case 'au':
			case 'auth': {
				new $Pather_ServerManager_AuthServer_AuthServer();
				break;
			}
			case 'g':
			case 'game': {
				new $Pather_ServerManager_GameServer_GameServer();
				break;
			}
			case 'gw':
			case 'gameworld': {
				new $Pather_ServerManager_GameWorldServer_GameWorldServer(new $Pather_ServerManager_Common_PubSub(), new $Pather_ServerManager_Database_DatabaseQueries());
				break;
			}
			case 't':
			case 'tick': {
				new $Pather_ServerManager_TickServer_TickServer();
				break;
			}
			default: {
				console.log('Failed to load: ', process.argv[2]);
				break;
			}
		}
	}
	catch ($t1) {
		var exc = ss.Exception.wrap($t1);
		console.log('CRITICAL FAILURE: ', exc);
	}
};
global.Pather.ServerManager.ServerManager = $Pather_ServerManager_ServerManager;
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.AuthServer.AuthServer
var $Pather_ServerManager_AuthServer_AuthServer = function() {
};
$Pather_ServerManager_AuthServer_AuthServer.__typeName = 'Pather.ServerManager.AuthServer.AuthServer';
global.Pather.ServerManager.AuthServer.AuthServer = $Pather_ServerManager_AuthServer_AuthServer;
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.Common.ConnectionConstants
var $Pather_ServerManager_Common_ConnectionConstants = function() {
};
$Pather_ServerManager_Common_ConnectionConstants.__typeName = 'Pather.ServerManager.Common.ConnectionConstants';
global.Pather.ServerManager.Common.ConnectionConstants = $Pather_ServerManager_Common_ConnectionConstants;
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.Common.IPubSub
var $Pather_ServerManager_Common_IPubSub = function() {
};
$Pather_ServerManager_Common_IPubSub.__typeName = 'Pather.ServerManager.Common.IPubSub';
global.Pather.ServerManager.Common.IPubSub = $Pather_ServerManager_Common_IPubSub;
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.Common.PubSub
var $Pather_ServerManager_Common_PubSub = function() {
	this.$pready = false;
	this.$pubClient = null;
	this.$sready = false;
	this.$subClient = null;
	this.$subbed = null;
};
$Pather_ServerManager_Common_PubSub.__typeName = 'Pather.ServerManager.Common.PubSub';
global.Pather.ServerManager.Common.PubSub = $Pather_ServerManager_Common_PubSub;
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.Common.PubSubChannels
var $Pather_ServerManager_Common_PubSubChannels = function() {
};
$Pather_ServerManager_Common_PubSubChannels.__typeName = 'Pather.ServerManager.Common.PubSubChannels';
global.Pather.ServerManager.Common.PubSubChannels = $Pather_ServerManager_Common_PubSubChannels;
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.Database.DatabaseError
var $Pather_ServerManager_Database_DatabaseError = function() {
};
$Pather_ServerManager_Database_DatabaseError.__typeName = 'Pather.ServerManager.Database.DatabaseError';
global.Pather.ServerManager.Database.DatabaseError = $Pather_ServerManager_Database_DatabaseError;
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.Database.DatabaseQueries
var $Pather_ServerManager_Database_DatabaseQueries = function() {
};
$Pather_ServerManager_Database_DatabaseQueries.__typeName = 'Pather.ServerManager.Database.DatabaseQueries';
global.Pather.ServerManager.Database.DatabaseQueries = $Pather_ServerManager_Database_DatabaseQueries;
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.Database.DBUser
var $Pather_ServerManager_Database_DBUser = function() {
};
$Pather_ServerManager_Database_DBUser.__typeName = 'Pather.ServerManager.Database.DBUser';
$Pather_ServerManager_Database_DBUser.createInstance = function() {
	return $Pather_ServerManager_Database_DBUser.$ctor();
};
$Pather_ServerManager_Database_DBUser.$ctor = function() {
	var $this = {};
	$this.userId = null;
	$this.token = null;
	$this.x = 0;
	$this.y = 0;
	return $this;
};
global.Pather.ServerManager.Database.DBUser = $Pather_ServerManager_Database_DBUser;
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.Database.IDatabaseQueries
var $Pather_ServerManager_Database_IDatabaseQueries = function() {
};
$Pather_ServerManager_Database_IDatabaseQueries.__typeName = 'Pather.ServerManager.Database.IDatabaseQueries';
global.Pather.ServerManager.Database.IDatabaseQueries = $Pather_ServerManager_Database_IDatabaseQueries;
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.GameServer.GameServer
var $Pather_ServerManager_GameServer_GameServer = function() {
	//            Global.SetInterval(() => { Global.Console.Log("keep alive " + new DateTime().ToString().Substring(17, 24)); }, 10 * 1000);
	var game = new $Pather_ServerManager_GameServer_ServerGame();
	game.init();
};
$Pather_ServerManager_GameServer_GameServer.__typeName = 'Pather.ServerManager.GameServer.GameServer';
global.Pather.ServerManager.GameServer.GameServer = $Pather_ServerManager_GameServer_GameServer;
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.GameServer.GameServerUser
var $Pather_ServerManager_GameServer_GameServerUser = function() {
	this.gatewayServer = null;
};
$Pather_ServerManager_GameServer_GameServerUser.__typeName = 'Pather.ServerManager.GameServer.GameServerUser';
global.Pather.ServerManager.GameServer.GameServerUser = $Pather_ServerManager_GameServer_GameServerUser;
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.GameServer.ServerCommunicator
var $Pather_ServerManager_GameServer_ServerCommunicator = function() {
	this.onNewConnection = null;
	this.onDisconnectConnection = null;
	var http = require('http');
	var app = http.createServer(function(req, res) {
		res.end();
	});
	var io = socketio.listen(app);
	app.listen(8991);
	io.sockets.on('connection', ss.mkdel(this, function(socket) {
		//                Global.Console.Log("new connection");
		this.onNewConnection(socket);
		socket.on('disconnect', ss.mkdel(this, function() {
			this.onDisconnectConnection(socket);
		}));
	}));
};
$Pather_ServerManager_GameServer_ServerCommunicator.__typeName = 'Pather.ServerManager.GameServer.ServerCommunicator';
global.Pather.ServerManager.GameServer.ServerCommunicator = $Pather_ServerManager_GameServer_ServerCommunicator;
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.GameServer.ServerEntity
var $Pather_ServerManager_GameServer_ServerEntity = function(game, playerId) {
	this.socket = null;
	Pather.Common.Entity.call(this, game, playerId);
};
$Pather_ServerManager_GameServer_ServerEntity.__typeName = 'Pather.ServerManager.GameServer.ServerEntity';
global.Pather.ServerManager.GameServer.ServerEntity = $Pather_ServerManager_GameServer_ServerEntity;
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.GameServer.ServerGame
var $Pather_ServerManager_GameServer_ServerGame = function() {
	this.syncLockstep = null;
	Pather.Common.Game.call(this);
	this.stepManager = new $Pather_ServerManager_GameServer_ServerStepManager(this, new $Pather_ServerManager_GameServer_ServerNetworkManager(this));
	this.constructGrid();
	this.ready = true;
};
$Pather_ServerManager_GameServer_ServerGame.__typeName = 'Pather.ServerManager.GameServer.ServerGame';
global.Pather.ServerManager.GameServer.ServerGame = $Pather_ServerManager_GameServer_ServerGame;
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.GameServer.ServerNetworkManager
var $Pather_ServerManager_GameServer_ServerNetworkManager = function(game) {
	this.game = null;
	this.serverCommunicator = null;
	this.onRecieveAction = null;
	this.$forceSyncNextLockstep = [];
	this.game = game;
	this.game.syncLockstep = ss.delegateCombine(this.game.syncLockstep, ss.mkdel(this, this.$onSyncLockstep));
	this.serverCommunicator = new $Pather_ServerManager_GameServer_ServerCommunicator();
	this.serverCommunicator.onNewConnection = ss.delegateCombine(this.serverCommunicator.onNewConnection, ss.mkdel(this, this.$onNewConnection));
	this.serverCommunicator.onDisconnectConnection = ss.delegateCombine(this.serverCommunicator.onDisconnectConnection, ss.mkdel(this, this.$onDisconnectConnection));
};
$Pather_ServerManager_GameServer_ServerNetworkManager.__typeName = 'Pather.ServerManager.GameServer.ServerNetworkManager';
global.Pather.ServerManager.GameServer.ServerNetworkManager = $Pather_ServerManager_GameServer_ServerNetworkManager;
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.GameServer.ServerStepManager
var $Pather_ServerManager_GameServer_ServerStepManager = function(game, serverNetworkManager) {
	this.serverNetworkManager = null;
	Pather.Common.StepManager.call(this, game);
	this.serverNetworkManager = serverNetworkManager;
	this.serverNetworkManager.onRecieveAction = ss.delegateCombine(this.serverNetworkManager.onRecieveAction, ss.mkdel(this, this.receiveAction));
};
$Pather_ServerManager_GameServer_ServerStepManager.__typeName = 'Pather.ServerManager.GameServer.ServerStepManager';
global.Pather.ServerManager.GameServer.ServerStepManager = $Pather_ServerManager_GameServer_ServerStepManager;
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.GameWorldServer.GameServer
var $Pather_ServerManager_GameWorldServer_GameServer = function() {
	this.users = null;
	this.gameServerId = null;
};
$Pather_ServerManager_GameWorldServer_GameServer.__typeName = 'Pather.ServerManager.GameWorldServer.GameServer';
global.Pather.ServerManager.GameWorldServer.GameServer = $Pather_ServerManager_GameWorldServer_GameServer;
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.GameWorldServer.GameWorld
var $Pather_ServerManager_GameWorldServer_GameWorld = function() {
	this.users = null;
	this.gameServers = null;
	this.users = [];
	this.gameServers = [];
};
$Pather_ServerManager_GameWorldServer_GameWorld.__typeName = 'Pather.ServerManager.GameWorldServer.GameWorld';
$Pather_ServerManager_GameWorldServer_GameWorld.$pointDistance = function(pUser, cUser) {
	var mx = pUser.x;
	var my = pUser.y;
	var cx = cUser.x;
	var cy = cUser.y;
	var _x = cx - mx;
	var _y = cy - my;
	var dis = Math.sqrt(_x * _x + _y * _y);
	return dis;
};
global.Pather.ServerManager.GameWorldServer.GameWorld = $Pather_ServerManager_GameWorldServer_GameWorld;
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.GameWorldServer.GameWorldServer
var $Pather_ServerManager_GameWorldServer_GameWorldServer = function(pubSub, dbQueries) {
	this.$pubSub = null;
	this.$databaseQueries = null;
	this.gameWorld = null;
	this.$databaseQueries = dbQueries;
	this.gameWorld = new $Pather_ServerManager_GameWorldServer_GameWorld();
	pubSub.init(ss.mkdel(this, this.$pubsubReady));
};
$Pather_ServerManager_GameWorldServer_GameWorldServer.__typeName = 'Pather.ServerManager.GameWorldServer.GameWorldServer';
global.Pather.ServerManager.GameWorldServer.GameWorldServer = $Pather_ServerManager_GameWorldServer_GameWorldServer;
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.GameWorldServer.GameWorldUser
var $Pather_ServerManager_GameWorldServer_GameWorldUser = function() {
	this.userId = null;
	this.x = 0;
	this.y = 0;
	this.gatewayServer = null;
	this.gameServer = null;
	this.$1$NeighborsField = null;
};
$Pather_ServerManager_GameWorldServer_GameWorldUser.__typeName = 'Pather.ServerManager.GameWorldServer.GameWorldUser';
global.Pather.ServerManager.GameWorldServer.GameWorldUser = $Pather_ServerManager_GameWorldServer_GameWorldUser;
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.GameWorldServer.UserJoinError
var $Pather_ServerManager_GameWorldServer_UserJoinError = function() {
};
$Pather_ServerManager_GameWorldServer_UserJoinError.__typeName = 'Pather.ServerManager.GameWorldServer.UserJoinError';
global.Pather.ServerManager.GameWorldServer.UserJoinError = $Pather_ServerManager_GameWorldServer_UserJoinError;
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.GameWorldServer.Tests.GameWorldServerTests
var $Pather_ServerManager_GameWorldServer_Tests_GameWorldServerTests = function() {
};
$Pather_ServerManager_GameWorldServer_Tests_GameWorldServerTests.__typeName = 'Pather.ServerManager.GameWorldServer.Tests.GameWorldServerTests';
global.Pather.ServerManager.GameWorldServer.Tests.GameWorldServerTests = $Pather_ServerManager_GameWorldServer_Tests_GameWorldServerTests;
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.GatewayServer.GatewayServer
var $Pather_ServerManager_GatewayServer_GatewayServer = function(pubsub) {
	this.$io = null;
	this.$gatewayName = null;
	this.$gatewayName = 'Gateway ' + ss.Guid.newGuid();
	console.log(this.$gatewayName);
	var http = require('http');
	var app = http.createServer(function(req, res) {
		res.end();
	});
	this.$io = socketio.listen(app);
	var port = 1800 + (Math.random() * 4000 | 0);
	port = 1800;
	var networkIPs = $Pather_ServerManager_Utils_ServerHelper.getNetworkIPs();
	var currentIP = networkIPs[0] + ':' + port;
	var url;
	url = ss.formatString('http://{0}', currentIP);
	console.log('Server URL', url);
	app.listen(port);
	pubsub.init(ss.mkdel(this, this.$pubsubReady));
};
$Pather_ServerManager_GatewayServer_GatewayServer.__typeName = 'Pather.ServerManager.GatewayServer.GatewayServer';
global.Pather.ServerManager.GatewayServer.GatewayServer = $Pather_ServerManager_GatewayServer_GatewayServer;
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.TickServer.TickServer
var $Pather_ServerManager_TickServer_TickServer = function() {
};
$Pather_ServerManager_TickServer_TickServer.__typeName = 'Pather.ServerManager.TickServer.TickServer';
global.Pather.ServerManager.TickServer.TickServer = $Pather_ServerManager_TickServer_TickServer;
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.Utils.ServerHelper
var $Pather_ServerManager_Utils_ServerHelper = function() {
};
$Pather_ServerManager_Utils_ServerHelper.__typeName = 'Pather.ServerManager.Utils.ServerHelper';
$Pather_ServerManager_Utils_ServerHelper.getNetworkIPs = function() {
	var os = require('os');
	var interfaces = os.networkInterfaces();
	var addresses = [];
	var $t1 = new ss.ObjectEnumerator(interfaces);
	try {
		while ($t1.moveNext()) {
			var k = $t1.current();
			var $t2 = new ss.ObjectEnumerator(k.value);
			try {
				while ($t2.moveNext()) {
					var k2 = $t2.current();
					var address = k2.value;
					if (!!(address.family === 'IPv4' && !address.internal)) {
						addresses.push(ss.cast(address.address, String));
					}
				}
			}
			finally {
				$t2.dispose();
			}
		}
	}
	finally {
		$t1.dispose();
	}
	return addresses;
};
global.Pather.ServerManager.Utils.ServerHelper = $Pather_ServerManager_Utils_ServerHelper;
ss.initClass($Pather_ServerManager_ServerManager, $asm, {});
ss.initClass($Pather_ServerManager_AuthServer_AuthServer, $asm, {});
ss.initClass($Pather_ServerManager_Common_ConnectionConstants, $asm, {});
ss.initInterface($Pather_ServerManager_Common_IPubSub, $asm, { publish: null, publish$1: null, subscribe: null, init: null });
ss.initClass($Pather_ServerManager_Common_PubSub, $asm, {
	init: function(ready) {
		this.$subbed = {};
		var redis = require('redis');
		redis.debug_mode = false;
		this.$subClient = redis.createClient(6379, $Pather_ServerManager_Common_ConnectionConstants.redisIP);
		this.$pubClient = redis.createClient(6379, $Pather_ServerManager_Common_ConnectionConstants.redisIP);
		this.$subClient.on('subscribe', function(channel, count) {
			Pather.Common.Logger.log('subscribed: ' + channel + ' ' + count, 'information');
		});
		this.$subClient.on('unsubscribe', function(channel1, count1) {
			Pather.Common.Logger.log('unsubscribed: ' + channel1 + ' ' + count1, 'information');
		});
		this.$subClient.on('message', ss.mkdel(this, function(channel2, message) {
			if (!ss.staticEquals(this.$subbed[channel2], null)) {
				this.$subbed[channel2](message);
			}
		}));
		this.$subClient.on('ready', ss.mkdel(this, function() {
			this.$sready = true;
			if (this.$sready && this.$pready) {
				ready(this);
			}
		}));
		this.$pubClient.on('ready', ss.mkdel(this, function() {
			this.$pready = true;
			if (this.$sready && this.$pready) {
				ready(this);
			}
		}));
	},
	publish: function(channel, content) {
		this.$pubClient.publish(channel, content);
	},
	publish$1: function(channel, content) {
		this.$pubClient.publish(channel, JSON.stringify(content));
	},
	subscribe: function(channel, callback) {
		this.$subClient.subscribe(channel);
		this.$subbed[channel] = callback;
	}
}, null, [$Pather_ServerManager_Common_IPubSub]);
ss.initClass($Pather_ServerManager_Common_PubSubChannels, $asm, {});
ss.initClass($Pather_ServerManager_Database_DatabaseError, $asm, {});
ss.initInterface($Pather_ServerManager_Database_IDatabaseQueries, $asm, { getUserByToken: null });
ss.initClass($Pather_ServerManager_Database_DatabaseQueries, $asm, {
	getUserByToken: function(token) {
		var deferred = Pather.Common.Utils.Promises.Q.defer$2($Pather_ServerManager_Database_DBUser, $Pather_ServerManager_Database_DatabaseError).call(null);
		setTimeout(function() {
			var $t1 = $Pather_ServerManager_Database_DBUser.$ctor();
			$t1.token = token;
			$t1.x = ss.Int32.trunc(Math.random() * 500);
			$t1.y = ss.Int32.trunc(Math.random() * 500);
			deferred.resolve($t1);
		}, 20);
		return deferred.promise;
	}
}, null, [$Pather_ServerManager_Database_IDatabaseQueries]);
ss.initClass($Pather_ServerManager_Database_DBUser, $asm, {});
ss.initClass($Pather_ServerManager_GameServer_GameServer, $asm, {});
ss.initClass($Pather_ServerManager_GameServer_GameServerUser, $asm, {});
ss.initClass($Pather_ServerManager_GameServer_ServerCommunicator, $asm, {
	listenOnChannel: function(T) {
		return function(socket, channel, callback) {
			socket.on(channel, function(obj) {
				callback(socket, obj.data);
			});
		};
	},
	sendMessage: function(socket, channel, obj) {
		socket.emit(channel, ss.makeGenericType(Pather.Common.Utils.DataObject$1, [Object]).$ctor(obj));
	}
});
ss.initClass($Pather_ServerManager_GameServer_ServerEntity, $asm, {}, Pather.Common.Entity);
ss.initClass($Pather_ServerManager_GameServer_ServerGame, $asm, {
	createPlayer: function(playerId) {
		return new $Pather_ServerManager_GameServer_ServerEntity(this, playerId);
	},
	tick: function() {
		var tickResult = Pather.Common.Game.prototype.tick.call(this);
		if (tickResult === 2 || tickResult === 3) {
			this.syncLockstep(this.lockstepTickNumber);
		}
		return tickResult;
	}
}, Pather.Common.Game);
ss.initClass($Pather_ServerManager_GameServer_ServerNetworkManager, $asm, {
	$onSyncLockstep: function(lockStepTick) {
		if (lockStepTick % 15 === 0 || this.$forceSyncNextLockstep.length > 0) {
			for (var $t1 = 0; $t1 < this.$forceSyncNextLockstep.length; $t1++) {
				var socketIoConnection = this.$forceSyncNextLockstep[$t1];
				var $t3 = this.serverCommunicator;
				var $t4 = Pather.Common.SocketChannels.serverChannel('syncLockstep');
				var $t2 = Pather.Common.Models.Game.SyncLockstepModel.$ctor();
				$t2.lockstepTickNumber = lockStepTick;
				$t3.sendMessage(socketIoConnection, $t4, $t2);
			}
			for (var $t5 = 0; $t5 < this.game.players.length; $t5++) {
				var player = this.game.players[$t5];
				if (ss.indexOf(this.$forceSyncNextLockstep, player.socket) === -1) {
					var $t7 = this.serverCommunicator;
					var $t8 = player.socket;
					var $t9 = Pather.Common.SocketChannels.serverChannel('syncLockstep');
					var $t6 = Pather.Common.Models.Game.SyncLockstepModel.$ctor();
					$t6.lockstepTickNumber = lockStepTick;
					$t7.sendMessage($t8, $t9, $t6);
				}
			}
			ss.clear(this.$forceSyncNextLockstep);
		}
	},
	$onNewConnection: function(socketIoConnection) {
		var $t2 = this.serverCommunicator;
		var $t3 = Pather.Common.SocketChannels.serverChannel('connect');
		var $t1 = Pather.Common.Models.Game.ConnectedModel.$ctor();
		$t1.grid = this.game.grid;
		$t2.sendMessage(socketIoConnection, $t3, $t1);
		this.$forceSyncNextLockstep.push(socketIoConnection);
		this.serverCommunicator.listenOnChannel(Pather.Common.Models.Game.PlayerJoinModel).call(this.serverCommunicator, socketIoConnection, Pather.Common.SocketChannels.clientChannel('joinPlayer'), ss.mkdel(this, this.$joinPlayer));
		this.serverCommunicator.listenOnChannel(Pather.Common.SerializableAction).call(this.serverCommunicator, socketIoConnection, Pather.Common.SocketChannels.clientChannel('postAction'), ss.mkdel(this, this.$postAction));
		this.serverCommunicator.listenOnChannel(Pather.Common.Models.Game.PingPongModel).call(this.serverCommunicator, socketIoConnection, Pather.Common.SocketChannels.clientChannel('ping'), ss.mkdel(this, this.$pong));
	},
	$pong: function(socket, pingPongModel) {
		this.serverCommunicator.sendMessage(socket, Pather.Common.SocketChannels.serverChannel('pong'), pingPongModel);
	},
	$onDisconnectConnection: function(socketIoConnection) {
		var player = null;
		for (var $t1 = 0; $t1 < this.game.players.length; $t1++) {
			var entity = this.game.players[$t1];
			if (ss.referenceEquals(entity.socket, socketIoConnection)) {
				player = entity;
			}
		}
		if (ss.isNullOrUndefined(player)) {
			return;
		}
		var $t2 = Pather.Common.Models.Game.PlayerSyncModel.$ctor();
		var $t3 = [];
		var $t4 = Pather.Common.Models.Game.PlayerModel.$ctor();
		$t4.playerId = player.playerId;
		$t3.push($t4);
		$t2.leftPlayers = $t3;
		var playerSyncModel = $t2;
		ss.remove(this.game.players, player);
		for (var $t5 = 0; $t5 < this.game.players.length; $t5++) {
			var entity1 = this.game.players[$t5];
			this.serverCommunicator.sendMessage(entity1.socket, Pather.Common.SocketChannels.serverChannel('playerSync'), playerSyncModel);
		}
	},
	$postAction: function(socket, action) {
		//            Global.Console.Log("player action ", action);
		this.onRecieveAction(action);
	},
	sendAction: function(action) {
		for (var $t1 = 0; $t1 < this.game.players.length; $t1++) {
			var player = this.game.players[$t1];
			this.serverCommunicator.sendMessage(player.socket, Pather.Common.SocketChannels.serverChannel('postAction'), action);
		}
	},
	$joinPlayer: function(socket, model) {
		var player = ss.cast(this.game.createPlayer(model.playerId), $Pather_ServerManager_GameServer_ServerEntity);
		player.socket = socket;
		var x = Math.min(ss.Int32.trunc(Math.random() * Pather.Common.Constants.numberOfSquares), Pather.Common.Constants.numberOfSquares - 1);
		var y = Math.min(ss.Int32.trunc(Math.random() * Pather.Common.Constants.numberOfSquares), Pather.Common.Constants.numberOfSquares - 1);
		console.log('new player ', this.game.players.length);
		player.init(x * Pather.Common.Constants.squareSize, y * Pather.Common.Constants.squareSize);
		this.game.players.push(player);
		for (var $t1 = 0; $t1 < this.game.players.length; $t1++) {
			var entity = this.game.players[$t1];
			if (!ss.referenceEquals(entity.playerId, player.playerId)) {
				var $t5 = this.serverCommunicator;
				var $t6 = entity.socket;
				var $t7 = Pather.Common.SocketChannels.serverChannel('playerSync');
				var $t2 = Pather.Common.Models.Game.PlayerSyncModel.$ctor();
				var $t3 = [];
				var $t4 = Pather.Common.Models.Game.PlayerModel.$ctor();
				$t4.playerId = player.playerId;
				$t4.x = player.x;
				$t4.y = player.y;
				$t3.push($t4);
				$t2.joinedPlayers = $t3;
				$t5.sendMessage($t6, $t7, $t2);
			}
			else {
				var $t10 = this.serverCommunicator;
				var $t11 = Pather.Common.SocketChannels.serverChannel('playerSync');
				var $t8 = Pather.Common.Models.Game.PlayerSyncModel.$ctor();
				$t8.joinedPlayers = this.game.players.map(function(p) {
					var $t9 = Pather.Common.Models.Game.PlayerModel.$ctor();
					$t9.playerId = p.playerId;
					$t9.x = p.x;
					$t9.y = p.y;
					return $t9;
				});
				$t10.sendMessage(socket, $t11, $t8);
			}
		}
	}
});
ss.initClass($Pather_ServerManager_GameServer_ServerStepManager, $asm, {
	sendActionServer: function(action) {
		var serAction = Pather.Common.SerializableAction.$ctor();
		serAction.data = action.get_data();
		serAction.lockstepTickNumber = action.get_lockstepTickNumber();
		serAction.type = action.get_type();
	},
	receiveAction: function(serAction) {
		Pather.Common.StepManager.prototype.receiveAction.call(this, serAction);
		this.serverNetworkManager.sendAction(serAction);
	},
	get_networkPlayers: function() {
		return this.game.players.length;
	}
}, Pather.Common.StepManager);
ss.initClass($Pather_ServerManager_GameWorldServer_GameServer, $asm, {});
ss.initClass($Pather_ServerManager_GameWorldServer_GameWorld, $asm, {
	userJoined: function(gatewayChannel, dbUser) {
		var defer = Pather.Common.Utils.Promises.Q.defer$2($Pather_ServerManager_GameWorldServer_GameWorldUser, $Pather_ServerManager_GameWorldServer_UserJoinError).call(null);
		var gwUser = new $Pather_ServerManager_GameWorldServer_GameWorldUser();
		gwUser.userId = dbUser.userId;
		gwUser.x = dbUser.x;
		gwUser.y = dbUser.y;
		gwUser.set_neighbors([]);
		gwUser.gatewayServer = gatewayChannel;
		var closestGameServer;
		if (this.users.length === 0) {
			closestGameServer = this.createGameServer();
		}
		else {
			var closestUser = this.$determineNeighbors(gwUser, 0);
			closestGameServer = closestUser.gameServer;
		}
		gwUser.gameServer = closestGameServer;
		this.users.push(gwUser);
		defer.resolve(gwUser);
		return defer.promise;
	},
	createGameServer: function() {
		var gs = new $Pather_ServerManager_GameWorldServer_GameServer();
		gs.gameServerId = Pather.Common.Common.uniqueId();
		//todo idk :=/
		this.gameServers.push(gs);
		return gs;
	},
	determineNeighbors: function() {
		var count = this.users.length;
		for (var i = 0; i < count; i++) {
			var pUser = this.users[i];
			ss.clear(pUser.get_neighbors());
			this.$determineNeighbors(pUser, i);
		}
	},
	$determineNeighbors: function(pUser, i) {
		var count = this.users.length;
		var closestDistance = Number.MAX_VALUE;
		var closestUser = null;
		for (var c = i; c < count; c++) {
			var cUser = this.users[c];
			var distance = $Pather_ServerManager_GameWorldServer_GameWorld.$pointDistance(pUser, cUser);
			if (distance < closestDistance) {
				closestUser = cUser;
				closestDistance = distance;
			}
			if (distance <= Pather.Common.Constants.neighborDistance) {
				pUser.get_neighbors().push(cUser);
				cUser.get_neighbors().push(pUser);
			}
		}
		return closestUser;
	}
});
ss.initClass($Pather_ServerManager_GameWorldServer_GameWorldServer, $asm, {
	$pubsubReady: function(pubSub) {
		this.$pubSub = pubSub;
		pubSub.subscribe($Pather_ServerManager_Common_PubSubChannels.gameWorld, ss.mkdel(this, this.$gameworldMessage));
	},
	$gameworldMessage: function(message) {
		var gameworldMessage = JSON.parse(message);
		switch (gameworldMessage.type) {
			case 0: {
				this.$userJoined(gameworldMessage).then(ss.mkdel(this, function(gwUser) {
					var $t2 = this.$pubSub;
					var $t3 = gwUser.gatewayServer;
					var $t1 = Pather.Common.Models.Gateway.UserJoinedGatewayPubSubMessage.$ctor();
					$t1.gameServerId = gwUser.gameServer.gameServerId;
					$t1.userId = gwUser.userId;
					$t2.publish$1($t3, $t1);
				}));
				break;
			}
			default: {
				throw new ss.ArgumentOutOfRangeException();
			}
		}
	},
	$userJoined: function(userJoinedMessage) {
		var deferred = Pather.Common.Utils.Promises.Q.defer$2($Pather_ServerManager_GameWorldServer_GameWorldUser, $Pather_ServerManager_GameWorldServer_UserJoinError).call(null);
		this.$databaseQueries.getUserByToken(userJoinedMessage.userToken).then(ss.mkdel(this, function(dbUser) {
			deferred.passPromiseThrough(this.gameWorld.userJoined(userJoinedMessage.gatewayChannel, dbUser));
		}));
		return deferred.promise;
	}
});
ss.initClass($Pather_ServerManager_GameWorldServer_GameWorldUser, $asm, {
	get_neighbors: function() {
		return this.$1$NeighborsField;
	},
	set_neighbors: function(value) {
		this.$1$NeighborsField = value;
	}
});
ss.initClass($Pather_ServerManager_GameWorldServer_UserJoinError, $asm, {});
ss.initClass($Pather_ServerManager_GameWorldServer_Tests_GameWorldServerTests, $asm, {
	userShouldJoin: function(testDeferred) {
		var pubSubTest = global.$instantiateInterface$($Pather_ServerManager_Common_IPubSub);
		var databaseQueriesTest = global.$instantiateInterface$($Pather_ServerManager_Database_IDatabaseQueries);
		var userId = 'user id';
		global.$overwiteMethodCallForMocker$(ss.mkdel(databaseQueriesTest, databaseQueriesTest.getUserByToken), function(userToken) {
			var deferred = Pather.Common.Utils.Promises.Q.defer$2($Pather_ServerManager_Database_DBUser, $Pather_ServerManager_Database_DatabaseError).call(null);
			var $t1 = $Pather_ServerManager_Database_DBUser.$ctor();
			$t1.token = userToken;
			$t1.userId = userId;
			$t1.x = ss.Int32.trunc(Math.random() * 500);
			$t1.y = ss.Int32.trunc(Math.random() * 500);
			deferred.resolve($t1);
			return deferred.promise;
		});
		global.$overwiteMethodCallForMocker$(ss.mkdel(pubSubTest, pubSubTest.init), function(a) {
			a(pubSubTest);
		});
		global.$overwiteMethodCallForMocker$(ss.mkdel(pubSubTest, pubSubTest.subscribe), function(channel, callback) {
			Pather.Common.TestFramework.DeferredAssert.that(testDeferred, channel).get_does().equal($Pather_ServerManager_Common_PubSubChannels.gameWorld);
			var userJoinedGameWorldPubSubMessage = Pather.Common.Models.GameWorld.UserJoinedGameWorldPubSubMessage.$ctor();
			userJoinedGameWorldPubSubMessage.type = 0;
			userJoinedGameWorldPubSubMessage.userToken = 'abcd';
			userJoinedGameWorldPubSubMessage.gatewayChannel = 'Gateway 1';
			callback(JSON.stringify(userJoinedGameWorldPubSubMessage));
		});
		global.$overwiteMethodCallForMocker$(ss.mkdel(pubSubTest, pubSubTest.publish$1), function(channel1, data) {
			Pather.Common.TestFramework.DeferredAssert.that(testDeferred, data.userId).get_does().equal(userId);
			testDeferred.resolve();
		});
		var gws = new $Pather_ServerManager_GameWorldServer_GameWorldServer(pubSubTest, databaseQueriesTest);
	}
});
ss.initClass($Pather_ServerManager_GatewayServer_GatewayServer, $asm, {
	$pubsubReady: function(pubsub) {
		console.log('pubsub ready');
		pubsub.subscribe(this.$gatewayName, ss.mkdel(this, this.$gatewayMessage));
		this.$io.sockets.on('connection', function(socket) {
			socket.on('Gateway.Message', function(data) {
				console.log('Socket message ', data);
			});
			socket.on('Gateway.Join', function(data1) {
				var f = data1.get_userName();
			});
			socket.on('disconnect', function(data2) {
			});
		});
	},
	$gatewayMessage: function(message) {
		console.log('message:', message);
	}
});
ss.initClass($Pather_ServerManager_TickServer_TickServer, $asm, {});
ss.initClass($Pather_ServerManager_Utils_ServerHelper, $asm, {});
ss.setMetadata($Pather_ServerManager_GameWorldServer_Tests_GameWorldServerTests, { attr: [new Pather.Common.TestFramework.TestClassAttribute()], members: [{ attr: [new Pather.Common.TestFramework.TestMethodAttribute()], name: 'UserShouldJoin', type: 8, sname: 'userShouldJoin', returnType: Object, params: [Pather.Common.Utils.Promises.Deferred] }] });
(function() {
	$Pather_ServerManager_Common_ConnectionConstants.redisIP = '127.0.0.1';
})();
(function() {
	$Pather_ServerManager_Common_PubSubChannels.gameWorld = 'gameworld';
})();
$Pather_ServerManager_ServerManager.main();
