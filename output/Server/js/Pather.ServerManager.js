'use strict';

var socketio = require('socket.io');
var $asm = {};
global.Pather = global.Pather || {};
global.Pather.ServerManager = global.Pather.ServerManager || {};
global.Pather.ServerManager.AuthServer = global.Pather.ServerManager.AuthServer || {};
global.Pather.ServerManager.Common = global.Pather.ServerManager.Common || {};
global.Pather.ServerManager.Common.PubSub = global.Pather.ServerManager.Common.PubSub || {};
global.Pather.ServerManager.Common.PushPop = global.Pather.ServerManager.Common.PushPop || {};
global.Pather.ServerManager.Common.SocketManager = global.Pather.ServerManager.Common.SocketManager || {};
global.Pather.ServerManager.Database = global.Pather.ServerManager.Database || {};
global.Pather.ServerManager.GameSegment = global.Pather.ServerManager.GameSegment || {};
global.Pather.ServerManager.GameSegmentCluster = global.Pather.ServerManager.GameSegmentCluster || {};
global.Pather.ServerManager.GameSegmentCluster.Tests = global.Pather.ServerManager.GameSegmentCluster.Tests || {};
global.Pather.ServerManager.GameWorldServer = global.Pather.ServerManager.GameWorldServer || {};
global.Pather.ServerManager.GameWorldServer.Tests = global.Pather.ServerManager.GameWorldServer.Tests || {};
global.Pather.ServerManager.GatewayServer = global.Pather.ServerManager.GatewayServer || {};
global.Pather.ServerManager.GatewayServer.Tests = global.Pather.ServerManager.GatewayServer.Tests || {};
global.Pather.ServerManager.TickServer = global.Pather.ServerManager.TickServer || {};
global.Pather.ServerManager.Utils = global.Pather.ServerManager.Utils || {};
ss.initAssembly($asm, 'Pather.ServerManager');
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.ServerManager
var $Pather_ServerManager_ServerManager = function() {
};
$Pather_ServerManager_ServerManager.__typeName = 'Pather.ServerManager.ServerManager';
$Pather_ServerManager_ServerManager.main = function() {
	debugger;
	var arg = global.process.argv[2];
	if (ss.isNullOrEmptyString(arg)) {
		throw new ss.Exception('Server argument not supplied');
	}
	arg = arg.toLowerCase();
	console.log('Server started', arg);
	if (arg === 'test') {
		var testClass = null;
		if (!ss.isNullOrEmptyString(global.process.argv[3])) {
			testClass = global.process.argv[3];
		}
		Pather.Common.TestFramework.TestFramework.runTests(testClass);
		return;
	}
	try {
		switch (arg) {
			case 'gt':
			case 'gateway': {
				new $Pather_ServerManager_GatewayServer_GatewayServer(new $Pather_ServerManager_Common_PubSub_PubSub(), new $Pather_ServerManager_Common_SocketManager_SocketIOManager());
				break;
			}
			case 'au':
			case 'auth': {
				new $Pather_ServerManager_AuthServer_AuthServer();
				break;
			}
			case 'gsc':
			case 'GameSegmentCluster': {
				new $Pather_ServerManager_GameSegmentCluster_GameSegmentCluster(new $Pather_ServerManager_Common_PubSub_PubSub(), new $Pather_ServerManager_Common_PushPop_PushPop());
				break;
			}
			case 'gs':
			case 'game': {
				new $Pather_ServerManager_GameSegment_GameSegment(new $Pather_ServerManager_Common_SocketManager_SocketIOManager(), new $Pather_ServerManager_Common_PubSub_PubSub(), new $Pather_ServerManager_Common_PushPop_PushPop(), global.process.argv[3]);
				break;
			}
			case 'gw':
			case 'gameworld': {
				new $Pather_ServerManager_GameWorldServer_GameWorldServer(new $Pather_ServerManager_Common_PubSub_PubSub(), new $Pather_ServerManager_Database_DatabaseQueries());
				break;
			}
			case 't':
			case 'tick': {
				new $Pather_ServerManager_TickServer_TickServer();
				break;
			}
			default: {
				console.log('Failed to load: ', global.process.argv[2]);
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
// Pather.ServerManager.Common.ServerCommunicator
var $Pather_ServerManager_Common_ServerCommunicator = function(socketManager, port) {
	this.$socketManager = null;
	this.onNewConnection = null;
	this.onDisconnectConnection = null;
	this.$socketManager = socketManager;
	socketManager.init(port);
	socketManager.connections(ss.mkdel(this, function(socket) {
		this.onNewConnection(socket);
		socket.disconnect(ss.mkdel(this, function() {
			if (!ss.staticEquals(this.onDisconnectConnection, null)) {
				this.onDisconnectConnection(socket);
			}
		}));
	}));
};
$Pather_ServerManager_Common_ServerCommunicator.__typeName = 'Pather.ServerManager.Common.ServerCommunicator';
global.Pather.ServerManager.Common.ServerCommunicator = $Pather_ServerManager_Common_ServerCommunicator;
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.Common.PubSub.IPubSub
var $Pather_ServerManager_Common_PubSub_IPubSub = function() {
};
$Pather_ServerManager_Common_PubSub_IPubSub.__typeName = 'Pather.ServerManager.Common.PubSub.IPubSub';
global.Pather.ServerManager.Common.PubSub.IPubSub = $Pather_ServerManager_Common_PubSub_IPubSub;
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.Common.PubSub.PubSub
var $Pather_ServerManager_Common_PubSub_PubSub = function() {
	this.$pready = false;
	this.$pubClient = null;
	this.$sready = false;
	this.$subClient = null;
	this.$subbed = null;
};
$Pather_ServerManager_Common_PubSub_PubSub.__typeName = 'Pather.ServerManager.Common.PubSub.PubSub';
global.Pather.ServerManager.Common.PubSub.PubSub = $Pather_ServerManager_Common_PubSub_PubSub;
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.Common.PubSub.PubSubChannels
var $Pather_ServerManager_Common_PubSub_PubSubChannels = function() {
};
$Pather_ServerManager_Common_PubSub_PubSubChannels.__typeName = 'Pather.ServerManager.Common.PubSub.PubSubChannels';
global.Pather.ServerManager.Common.PubSub.PubSubChannels = $Pather_ServerManager_Common_PubSub_PubSubChannels;
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.Common.PushPop.IPushPop
var $Pather_ServerManager_Common_PushPop_IPushPop = function() {
};
$Pather_ServerManager_Common_PushPop_IPushPop.__typeName = 'Pather.ServerManager.Common.PushPop.IPushPop';
global.Pather.ServerManager.Common.PushPop.IPushPop = $Pather_ServerManager_Common_PushPop_IPushPop;
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.Common.PushPop.PushPop
var $Pather_ServerManager_Common_PushPop_PushPop = function() {
	this.$pushReady = false;
	this.$pushClient = null;
	this.$popReady = false;
	this.$popClient = null;
};
$Pather_ServerManager_Common_PushPop_PushPop.__typeName = 'Pather.ServerManager.Common.PushPop.PushPop';
global.Pather.ServerManager.Common.PushPop.PushPop = $Pather_ServerManager_Common_PushPop_PushPop;
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.Common.SocketManager.ISocket
var $Pather_ServerManager_Common_SocketManager_ISocket = function() {
};
$Pather_ServerManager_Common_SocketManager_ISocket.__typeName = 'Pather.ServerManager.Common.SocketManager.ISocket';
global.Pather.ServerManager.Common.SocketManager.ISocket = $Pather_ServerManager_Common_SocketManager_ISocket;
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.Common.SocketManager.ISocketManager
var $Pather_ServerManager_Common_SocketManager_ISocketManager = function() {
};
$Pather_ServerManager_Common_SocketManager_ISocketManager.__typeName = 'Pather.ServerManager.Common.SocketManager.ISocketManager';
global.Pather.ServerManager.Common.SocketManager.ISocketManager = $Pather_ServerManager_Common_SocketManager_ISocketManager;
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.Common.SocketManager.SocketIOManager
var $Pather_ServerManager_Common_SocketManager_SocketIOManager = function() {
	this.$io = null;
};
$Pather_ServerManager_Common_SocketManager_SocketIOManager.__typeName = 'Pather.ServerManager.Common.SocketManager.SocketIOManager';
global.Pather.ServerManager.Common.SocketManager.SocketIOManager = $Pather_ServerManager_Common_SocketManager_SocketIOManager;
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.Common.SocketManager.SocketIOSocket
var $Pather_ServerManager_Common_SocketManager_SocketIOSocket = function(socket) {
	this.$1$SocketField = null;
	this.set_socket(socket);
};
$Pather_ServerManager_Common_SocketManager_SocketIOSocket.__typeName = 'Pather.ServerManager.Common.SocketManager.SocketIOSocket';
global.Pather.ServerManager.Common.SocketManager.SocketIOSocket = $Pather_ServerManager_Common_SocketManager_SocketIOSocket;
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
// Pather.ServerManager.GameSegment.GameSegment
var $Pather_ServerManager_GameSegment_GameSegment = function(socketManager, pubsub, pushPop, gameServerName) {
	this.$1$SocketManagerField = null;
	this.$1$PubsubField = null;
	this.$1$PushPopField = null;
	this.$1$GameServerNameField = null;
	this.set_socketManager(socketManager);
	this.set_pubsub(pubsub);
	this.set_pushPop(pushPop);
	this.set_gameServerName(gameServerName);
	//            Global.SetInterval(() => { Global.Console.Log("keep alive " + new DateTime().ToString().Substring(17, 24)); }, 10 * 1000);
	//            var game = new ServerGame(socketManager, gameServerName);
	//            game.Init();
	pushPop.init().then(ss.mkdel(this, this.$ready));
};
$Pather_ServerManager_GameSegment_GameSegment.__typeName = 'Pather.ServerManager.GameSegment.GameSegment';
global.Pather.ServerManager.GameSegment.GameSegment = $Pather_ServerManager_GameSegment_GameSegment;
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.GameSegment.GameServerUser
var $Pather_ServerManager_GameSegment_GameServerUser = function() {
	this.gatewayServer = null;
};
$Pather_ServerManager_GameSegment_GameServerUser.__typeName = 'Pather.ServerManager.GameSegment.GameServerUser';
global.Pather.ServerManager.GameSegment.GameServerUser = $Pather_ServerManager_GameSegment_GameServerUser;
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.GameSegment.ServerEntity
var $Pather_ServerManager_GameSegment_ServerEntity = function(game, playerId) {
	this.socket = null;
	Pather.Common.Entity.call(this, game, playerId);
};
$Pather_ServerManager_GameSegment_ServerEntity.__typeName = 'Pather.ServerManager.GameSegment.ServerEntity';
global.Pather.ServerManager.GameSegment.ServerEntity = $Pather_ServerManager_GameSegment_ServerEntity;
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.GameSegment.ServerGame
var $Pather_ServerManager_GameSegment_ServerGame = function(socketManager, gameServerName) {
	this.syncLockstep = null;
	Pather.Common.Game.call(this);
	console.log(gameServerName + ' Has come online');
	this.stepManager = new $Pather_ServerManager_GameSegment_ServerStepManager(this, new $Pather_ServerManager_GameSegment_ServerNetworkManager(this, socketManager));
	this.constructGrid();
	this.ready = true;
};
$Pather_ServerManager_GameSegment_ServerGame.__typeName = 'Pather.ServerManager.GameSegment.ServerGame';
global.Pather.ServerManager.GameSegment.ServerGame = $Pather_ServerManager_GameSegment_ServerGame;
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.GameSegment.ServerNetworkManager
var $Pather_ServerManager_GameSegment_ServerNetworkManager = function(game, socketManager) {
	this.game = null;
	this.serverCommunicator = null;
	this.onRecieveAction = null;
	this.$forceSyncNextLockstep = [];
	this.game = game;
	this.game.syncLockstep = ss.delegateCombine(this.game.syncLockstep, ss.mkdel(this, this.$onSyncLockstep));
	this.serverCommunicator = new $Pather_ServerManager_Common_ServerCommunicator(socketManager, 8991);
	this.serverCommunicator.onNewConnection = ss.delegateCombine(this.serverCommunicator.onNewConnection, ss.mkdel(this, this.$onNewConnection));
	this.serverCommunicator.onDisconnectConnection = ss.delegateCombine(this.serverCommunicator.onDisconnectConnection, ss.mkdel(this, this.$onDisconnectConnection));
};
$Pather_ServerManager_GameSegment_ServerNetworkManager.__typeName = 'Pather.ServerManager.GameSegment.ServerNetworkManager';
global.Pather.ServerManager.GameSegment.ServerNetworkManager = $Pather_ServerManager_GameSegment_ServerNetworkManager;
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.GameSegment.ServerStepManager
var $Pather_ServerManager_GameSegment_ServerStepManager = function(game, serverNetworkManager) {
	this.serverNetworkManager = null;
	Pather.Common.StepManager.call(this, game);
	this.serverNetworkManager = serverNetworkManager;
	this.serverNetworkManager.onRecieveAction = ss.delegateCombine(this.serverNetworkManager.onRecieveAction, ss.mkdel(this, this.receiveAction));
};
$Pather_ServerManager_GameSegment_ServerStepManager.__typeName = 'Pather.ServerManager.GameSegment.ServerStepManager';
global.Pather.ServerManager.GameSegment.ServerStepManager = $Pather_ServerManager_GameSegment_ServerStepManager;
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.GameSegmentCluster.GameSegmentCluster
var $Pather_ServerManager_GameSegmentCluster_GameSegmentCluster = function(pubsub, pushPop) {
	this.$1$PushPopField = null;
	this.$pubsub = null;
	this.set_pushPop(pushPop);
	this.$pubsub = pubsub;
	Pather.Common.Utils.Promises.Q.all([pubsub.init(), pushPop.init()]).then(ss.mkdel(this, this.$pubsubsConnected));
};
$Pather_ServerManager_GameSegmentCluster_GameSegmentCluster.__typeName = 'Pather.ServerManager.GameSegmentCluster.GameSegmentCluster';
global.Pather.ServerManager.GameSegmentCluster.GameSegmentCluster = $Pather_ServerManager_GameSegmentCluster_GameSegmentCluster;
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.GameSegmentCluster.Tests.GameSegmentClusterTest
var $Pather_ServerManager_GameSegmentCluster_Tests_GameSegmentClusterTest = function() {
};
$Pather_ServerManager_GameSegmentCluster_Tests_GameSegmentClusterTest.__typeName = 'Pather.ServerManager.GameSegmentCluster.Tests.GameSegmentClusterTest';
global.Pather.ServerManager.GameSegmentCluster.Tests.GameSegmentClusterTest = $Pather_ServerManager_GameSegmentCluster_Tests_GameSegmentClusterTest;
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.GameSegmentCluster.Tests.StubPubSub
var $Pather_ServerManager_GameSegmentCluster_Tests_StubPubSub = function() {
	this.$channels = new (ss.makeGenericType(ss.Dictionary$2, [String, Function]))();
};
$Pather_ServerManager_GameSegmentCluster_Tests_StubPubSub.__typeName = 'Pather.ServerManager.GameSegmentCluster.Tests.StubPubSub';
global.Pather.ServerManager.GameSegmentCluster.Tests.StubPubSub = $Pather_ServerManager_GameSegmentCluster_Tests_StubPubSub;
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.GameWorldServer.GameSegment
var $Pather_ServerManager_GameWorldServer_GameSegment = function() {
	this.users = null;
	this.gameSegmentId = null;
	this.users = [];
};
$Pather_ServerManager_GameWorldServer_GameSegment.__typeName = 'Pather.ServerManager.GameWorldServer.GameSegment';
global.Pather.ServerManager.GameWorldServer.GameSegment = $Pather_ServerManager_GameWorldServer_GameSegment;
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.GameWorldServer.GameWorld
var $Pather_ServerManager_GameWorldServer_GameWorld = function(gameWorldPubSub) {
	this.gameWorldPubSub = null;
	this.users = null;
	this.gameServers = null;
	this.gameWorldPubSub = gameWorldPubSub;
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
// Pather.ServerManager.GameWorldServer.GameWorldNeighbor
var $Pather_ServerManager_GameWorldServer_GameWorldNeighbor = function(cUser, distance) {
	this.user = null;
	this.distance = 0;
	this.distance = distance;
	this.user = cUser;
};
$Pather_ServerManager_GameWorldServer_GameWorldNeighbor.__typeName = 'Pather.ServerManager.GameWorldServer.GameWorldNeighbor';
global.Pather.ServerManager.GameWorldServer.GameWorldNeighbor = $Pather_ServerManager_GameWorldServer_GameWorldNeighbor;
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.GameWorldServer.GameWorldPubSub
var $Pather_ServerManager_GameWorldServer_GameWorldPubSub = function(pubSub) {
	this.pubSub = null;
	this.message = null;
	this.deferredMessages = new (ss.makeGenericType(ss.Dictionary$2, [String, ss.makeGenericType(Pather.Common.Utils.Promises.Deferred$2, [Object, Pather.Common.Utils.Promises.UndefinedPromiseError])]))();
	this.pubSub = pubSub;
};
$Pather_ServerManager_GameWorldServer_GameWorldPubSub.__typeName = 'Pather.ServerManager.GameWorldServer.GameWorldPubSub';
global.Pather.ServerManager.GameWorldServer.GameWorldPubSub = $Pather_ServerManager_GameWorldServer_GameWorldPubSub;
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.GameWorldServer.GameWorldServer
var $Pather_ServerManager_GameWorldServer_GameWorldServer = function(pubSub, dbQueries) {
	this.$pubSub = null;
	this.$databaseQueries = null;
	this.gameWorld = null;
	this.$pubSub = pubSub;
	this.$databaseQueries = dbQueries;
	pubSub.init().then(ss.mkdel(this, this.$pubsubReady));
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
	this.gameSegment = null;
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
// Pather.ServerManager.GatewayServer.GatewayUser
var $Pather_ServerManager_GatewayServer_$GatewayUser = function() {
	this.$1$SocketField = null;
	this.$1$UserTokenField = null;
};
$Pather_ServerManager_GatewayServer_$GatewayUser.__typeName = 'Pather.ServerManager.GatewayServer.$GatewayUser';
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.GatewayServer.GatewayServer
var $Pather_ServerManager_GatewayServer_GatewayServer = function(pubsub, socketManager) {
	this.$1$PubsubField = null;
	this.gatewayName = null;
	this.$1$ServerCommunicatorField = null;
	this.$users = [];
	this.set_pubsub(pubsub);
	this.gatewayName = 'Gateway ' + ss.Guid.newGuid();
	console.log(this.gatewayName);
	var port = 1800 + (Math.random() * 4000 | 0);
	port = 1800;
	this.set_serverCommunicator(new $Pather_ServerManager_Common_ServerCommunicator(socketManager, port));
	pubsub.init().then(ss.mkdel(this, this.$pubsubReady));
};
$Pather_ServerManager_GatewayServer_GatewayServer.__typeName = 'Pather.ServerManager.GatewayServer.GatewayServer';
global.Pather.ServerManager.GatewayServer.GatewayServer = $Pather_ServerManager_GatewayServer_GatewayServer;
////////////////////////////////////////////////////////////////////////////////
// Pather.ServerManager.GatewayServer.Tests.GatewayServerTests
var $Pather_ServerManager_GatewayServer_Tests_GatewayServerTests = function() {
};
$Pather_ServerManager_GatewayServer_Tests_GatewayServerTests.__typeName = 'Pather.ServerManager.GatewayServer.Tests.GatewayServerTests';
global.Pather.ServerManager.GatewayServer.Tests.GatewayServerTests = $Pather_ServerManager_GatewayServer_Tests_GatewayServerTests;
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
ss.initClass($Pather_ServerManager_Common_ServerCommunicator, $asm, {
	listenOnChannel: function(T) {
		return function(socket, channel, callback) {
			socket.on(channel, function(obj) {
				callback(socket, obj.data);
			});
		};
	},
	sendMessage: function(socket, channel, obj) {
		socket.emit(Object).call(socket, channel, ss.makeGenericType(Pather.Common.Utils.DataObject$1, [Object]).$ctor(obj));
	}
});
ss.initInterface($Pather_ServerManager_Common_PubSub_IPubSub, $asm, { publish: null, publish$1: null, subscribe: null, init: null, receivedMessage: null });
ss.initClass($Pather_ServerManager_Common_PubSub_PubSub, $asm, {
	init: function() {
		var deferred = Pather.Common.Utils.Promises.Q.defer();
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
			this.receivedMessage(channel2, message);
		}));
		this.$subClient.on('ready', ss.mkdel(this, function() {
			this.$sready = true;
			if (this.$sready && this.$pready) {
				deferred.resolve();
			}
		}));
		this.$pubClient.on('ready', ss.mkdel(this, function() {
			this.$pready = true;
			if (this.$sready && this.$pready) {
				deferred.resolve();
			}
		}));
		return deferred.promise;
	},
	receivedMessage: function(channel, message) {
		console.log('Pubsub Message Received', channel, message);
		var channelCallback = this.$subbed[channel];
		if (!ss.staticEquals(channelCallback, null)) {
			channelCallback(message);
		}
	},
	publish: function(channel, message) {
		console.log('Pubsub Message Sent', channel, message);
		this.$pubClient.publish(channel, message);
	},
	publish$1: function(channel, message) {
		var stringMessage = JSON.stringify(message);
		console.log('Pubsub Message Sent', channel, stringMessage);
		this.$pubClient.publish(channel, stringMessage);
	},
	subscribe: function(channel, callback) {
		this.$subClient.subscribe(channel);
		this.$subbed[channel] = callback;
	}
}, null, [$Pather_ServerManager_Common_PubSub_IPubSub]);
ss.initClass($Pather_ServerManager_Common_PubSub_PubSubChannels, $asm, {});
ss.initInterface($Pather_ServerManager_Common_PushPop_IPushPop, $asm, { init: null, push: null, blockingPop: null });
ss.initClass($Pather_ServerManager_Common_PushPop_PushPop, $asm, {
	init: function() {
		var deferred = Pather.Common.Utils.Promises.Q.defer();
		var redis = require('redis');
		redis.debug_mode = false;
		this.$pushClient = redis.createClient(6379, $Pather_ServerManager_Common_ConnectionConstants.redisIP);
		this.$popClient = redis.createClient(6379, $Pather_ServerManager_Common_ConnectionConstants.redisIP);
		this.$pushClient.on('ready', ss.mkdel(this, function() {
			this.$pushReady = true;
			if (this.$pushReady && this.$popReady) {
				deferred.resolve();
			}
		}));
		this.$popClient.on('ready', ss.mkdel(this, function() {
			this.$popReady = true;
			if (this.$pushReady && this.$popReady) {
				deferred.resolve();
			}
		}));
		return deferred.promise;
	},
	push: function(channel, content) {
		this.$pushClient.rpush(channel, content);
	},
	blockingPop: function(channel, timeout) {
		var d = Pather.Common.Utils.Promises.Q.defer$2(String, String).call(null);
		this.$popClient.blpop([channel, timeout], function(caller, dtj) {
			if (ss.isValue(dtj)) {
				d.resolve(dtj[1]);
			}
			else {
				d.reject(null);
			}
		});
		return d.promise;
	}
}, null, [$Pather_ServerManager_Common_PushPop_IPushPop]);
ss.initInterface($Pather_ServerManager_Common_SocketManager_ISocket, $asm, { on: null, disconnect: null, emit: null });
ss.initInterface($Pather_ServerManager_Common_SocketManager_ISocketManager, $asm, { init: null, connections: null });
ss.initClass($Pather_ServerManager_Common_SocketManager_SocketIOManager, $asm, {
	init: function(port) {
		var http = require('http');
		var app = http.createServer(function(req, res) {
			res.end();
		});
		this.$io = socketio.listen(app);
		var networkIPs = $Pather_ServerManager_Utils_ServerHelper.getNetworkIPs();
		var currentIP = networkIPs[0] + ':' + port;
		var url;
		url = ss.formatString('http://{0}', currentIP);
		console.log('Server URL', url);
		app.listen(port);
	},
	connections: function(action) {
		this.$io.sockets.on('connection', function(socket) {
			action(new $Pather_ServerManager_Common_SocketManager_SocketIOSocket(socket));
		});
	}
}, null, [$Pather_ServerManager_Common_SocketManager_ISocketManager]);
ss.initClass($Pather_ServerManager_Common_SocketManager_SocketIOSocket, $asm, {
	get_socket: function() {
		return this.$1$SocketField;
	},
	set_socket: function(value) {
		this.$1$SocketField = value;
	},
	on: function(channel, callback) {
		this.get_socket().on(channel, callback);
	},
	disconnect: function(callback) {
		this.get_socket().on('disconnect', function() {
			console.log('Disconnectesion');
			callback();
		});
	},
	emit: function(T) {
		return function(channel, dataObject) {
			this.get_socket().emit(channel, dataObject);
		};
	}
}, null, [$Pather_ServerManager_Common_SocketManager_ISocket]);
ss.initClass($Pather_ServerManager_Database_DatabaseError, $asm, {});
ss.initInterface($Pather_ServerManager_Database_IDatabaseQueries, $asm, { getUserByToken: null });
ss.initClass($Pather_ServerManager_Database_DatabaseQueries, $asm, {
	getUserByToken: function(token) {
		var deferred = Pather.Common.Utils.Promises.Q.defer$2($Pather_ServerManager_Database_DBUser, $Pather_ServerManager_Database_DatabaseError).call(null);
		setTimeout(function() {
			var $t1 = $Pather_ServerManager_Database_DBUser.$ctor();
			$t1.userId = token;
			$t1.token = token;
			$t1.x = ss.Int32.trunc(Math.random() * 500);
			$t1.y = ss.Int32.trunc(Math.random() * 500);
			deferred.resolve($t1);
		}, 20);
		return deferred.promise;
	}
}, null, [$Pather_ServerManager_Database_IDatabaseQueries]);
ss.initClass($Pather_ServerManager_Database_DBUser, $asm, {});
ss.initClass($Pather_ServerManager_GameSegment_GameSegment, $asm, {
	get_socketManager: function() {
		return this.$1$SocketManagerField;
	},
	set_socketManager: function(value) {
		this.$1$SocketManagerField = value;
	},
	get_pubsub: function() {
		return this.$1$PubsubField;
	},
	set_pubsub: function(value) {
		this.$1$PubsubField = value;
	},
	get_pushPop: function() {
		return this.$1$PushPopField;
	},
	set_pushPop: function(value) {
		this.$1$PushPopField = value;
	},
	get_gameServerName: function() {
		return this.$1$GameServerNameField;
	},
	set_gameServerName: function(value) {
		this.$1$GameServerNameField = value;
	},
	$ready: function() {
		this.get_pushPop().push(this.get_gameServerName(), 1);
	}
});
ss.initClass($Pather_ServerManager_GameSegment_GameServerUser, $asm, {});
ss.initClass($Pather_ServerManager_GameSegment_ServerEntity, $asm, {}, Pather.Common.Entity);
ss.initClass($Pather_ServerManager_GameSegment_ServerGame, $asm, {
	createPlayer: function(playerId) {
		return new $Pather_ServerManager_GameSegment_ServerEntity(this, playerId);
	},
	tick: function() {
		var tickResult = Pather.Common.Game.prototype.tick.call(this);
		if (tickResult === 2 || tickResult === 3) {
			this.syncLockstep(this.lockstepTickNumber);
		}
		return tickResult;
	}
}, Pather.Common.Game);
ss.initClass($Pather_ServerManager_GameSegment_ServerNetworkManager, $asm, {
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
		var player = ss.cast(this.game.createPlayer(model.playerId), $Pather_ServerManager_GameSegment_ServerEntity);
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
ss.initClass($Pather_ServerManager_GameSegment_ServerStepManager, $asm, {
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
ss.initClass($Pather_ServerManager_GameSegmentCluster_GameSegmentCluster, $asm, {
	get_pushPop: function() {
		return this.$1$PushPopField;
	},
	set_pushPop: function(value) {
		this.$1$PushPopField = value;
	},
	$pubsubsConnected: function() {
		this.$pubsub.subscribe($Pather_ServerManager_Common_PubSub_PubSubChannels.gameSegmentCluster + 1, ss.mkdel(this, this.$receiveMessage));
	},
	$receiveMessage: function(message) {
		var GameSegmentCluster = JSON.parse(message);
		switch (GameSegmentCluster.type) {
			case 0: {
				this.$createGameSegment(GameSegmentCluster);
				break;
			}
		}
	},
	$createGameSegment: function(createGameServer) {
		console.log('Spawning new game segment');
		var spawn = require('child_process').spawn;
		var fs = require('fs');
		var m = fs.openSync('./out.log', 'a', null);
		var out = fs.openSync('./out.log', 'a', null);
		var err = fs.openSync('./out.log', 'a', null);
		this.get_pushPop().blockingPop(createGameServer.gameSegmentId, 10).then(ss.mkdel(this, function(content) {
			var $t2 = this.$pubsub;
			var $t3 = $Pather_ServerManager_Common_PubSub_PubSubChannels.gameWorld;
			var $t1 = Pather.Common.Models.GameWorld.CreateGameServerResponseGameWorldPubSubMessage.$ctor();
			$t1.gameSegmentId = createGameServer.gameSegmentId;
			$t1.messageId = createGameServer.messageId;
			$t2.publish$1($t3, $t1);
			console.log('Server Created!', createGameServer.gameSegmentId);
		})).error(function(a) {
			console.log('Server Creation Failed!');
		});
		var child = spawn('node', ['app.js', 'gs', createGameServer.gameSegmentId], { stdio: [m, out, err] });
		//            child.Unref();
	}
});
ss.initClass($Pather_ServerManager_GameSegmentCluster_Tests_GameSegmentClusterTest, $asm, {
	createGameServer: function(testDeferred) {
		var pubSub = new $Pather_ServerManager_GameSegmentCluster_Tests_StubPubSub();
		var pushPop = new $Pather_ServerManager_Common_PushPop_PushPop();
		global.$overwiteMethodCallForMocker$(ss.mkdel(pubSub, pubSub.init), function() {
			return Pather.Common.Utils.Promises.Q.resolvedPromise();
		});
		global.$overwiteMethodCallForMocker$(ss.mkdel(pubSub, pubSub.publish$1), function(channel, data) {
		});
		var gts = new $Pather_ServerManager_GameSegmentCluster_GameSegmentCluster(pubSub, pushPop);
		var $t2 = $Pather_ServerManager_Common_PubSub_PubSubChannels.gameSegmentCluster + 0;
		var $t1 = Pather.Common.Models.GameSegmentCluster.CreateGameServerGameSegmentClusterPubSubMessage.$ctor();
		$t1.type = 0;
		pubSub.receivedMessage($t2, JSON.stringify($t1));
		debugger;
		testDeferred.resolve();
	}
});
ss.initClass($Pather_ServerManager_GameSegmentCluster_Tests_StubPubSub, $asm, {
	publish: function(channel, content) {
		throw new ss.NotImplementedException();
	},
	publish$1: function(channel, content) {
		throw new ss.NotImplementedException();
	},
	subscribe: function(channel, callback) {
		this.$channels.add(channel, callback);
	},
	init: function() {
		throw new ss.NotImplementedException();
	},
	receivedMessage: function(channel, message) {
		this.$channels.get_item(channel)(message);
	}
}, null, [$Pather_ServerManager_Common_PubSub_IPubSub]);
ss.initClass($Pather_ServerManager_GameWorldServer_GameSegment, $asm, {
	addUserToSegment: function(gwUser) {
		this.users.push(gwUser);
		gwUser.gameSegment = this;
	}
});
ss.initClass($Pather_ServerManager_GameWorldServer_GameWorld, $asm, {
	userJoined: function(gatewayChannel, dbUser) {
		var defer = Pather.Common.Utils.Promises.Q.defer$2($Pather_ServerManager_GameWorldServer_GameWorldUser, $Pather_ServerManager_GameWorldServer_UserJoinError).call(null);
		var gwUser = new $Pather_ServerManager_GameWorldServer_GameWorldUser();
		gwUser.userId = dbUser.userId;
		gwUser.x = dbUser.x;
		gwUser.y = dbUser.y;
		gwUser.set_neighbors([]);
		gwUser.gatewayServer = gatewayChannel;
		this.$buildNeighbors(gwUser, 0);
		this.$determineGameSegment(gwUser).then(ss.mkdel(this, function(gameSegment) {
			this.$addUserToSegment(gwUser, gameSegment).then(ss.mkdel(this, function() {
				this.users.push(gwUser);
				defer.resolve(gwUser);
			}));
		}));
		return defer.promise;
	},
	$determineGameSegment: function(gwUser) {
		var deferred = Pather.Common.Utils.Promises.Q.defer$2($Pather_ServerManager_GameWorldServer_GameSegment, Pather.Common.Utils.Promises.UndefinedPromiseError).call(null);
		if (this.users.length === 0) {
			console.log('Creating new segment.');
			this.createGameServer().then(function(gameSegment) {
				console.log('New segment created.');
				deferred.resolve(gameSegment);
			});
		}
		else {
			deferred.passPromiseThrough(this.$findBestGameSegment(gwUser));
		}
		return deferred.promise;
	},
	$findBestGameSegment: function(gwUser) {
		var deferred = Pather.Common.Utils.Promises.Q.defer$2($Pather_ServerManager_GameWorldServer_GameSegment, Pather.Common.Utils.Promises.UndefinedPromiseError).call(null);
		var neighbor = this.$determineClosestNeighbor(gwUser);
		var neighborGameSegment = neighbor.user.gameSegment;
		if (this.$canAcceptNewUsers(neighborGameSegment)) {
			deferred.resolve(neighborGameSegment);
		}
		else {
			throw new ss.NotImplementedException('todo split gamesegment up?');
		}
		return deferred.promise;
	},
	$canAcceptNewUsers: function(gameSegment) {
		return gameSegment.users.length < Pather.Common.Constants.usersPerGameSegment;
	},
	$addUserToSegment: function(gwUser, gameSegment) {
		var deferred = Pather.Common.Utils.Promises.Q.defer();
		gameSegment.addUserToSegment(gwUser);
		console.log('Gameworld has added a new user to game segment', gameSegment.gameSegmentId, 'bring the total number of players to', this.users.length, '. The game segment has', gameSegment.users.length, 'users.');
		deferred.resolve();
		return deferred.promise;
	},
	createGameServer: function() {
		var deferred = Pather.Common.Utils.Promises.Q.defer$2($Pather_ServerManager_GameWorldServer_GameSegment, Pather.Common.Utils.Promises.UndefinedPromiseError).call(null);
		var $t1 = Pather.Common.Models.GameSegmentCluster.CreateGameServerGameSegmentClusterPubSubMessage.$ctor();
		$t1.gameSegmentId = 'gamesegment-' + Pather.Common.Common.uniqueId();
		$t1.messageId = Pather.Common.Common.uniqueId();
		var createGameMessage = $t1;
		this.gameWorldPubSub.publishToGameSegmentWithCallback(Pather.Common.Models.GameWorld.CreateGameServerResponseGameWorldPubSubMessage).call(this.gameWorldPubSub, createGameMessage).then(ss.mkdel(this, function(createGameMessageResponse) {
			var gs = new $Pather_ServerManager_GameWorldServer_GameSegment();
			gs.gameSegmentId = createGameMessageResponse.gameSegmentId;
			this.gameServers.push(gs);
			deferred.resolve(gs);
		}));
		return deferred.promise;
	},
	buildNeighbors: function() {
		var count = this.users.length;
		for (var i = 0; i < count; i++) {
			var pUser = this.users[i];
			ss.clear(pUser.get_neighbors());
			this.$buildNeighbors(pUser, i);
		}
	},
	$determineClosestNeighbor: function(pUser) {
		var closestNeighbor = pUser.closestNeighbor();
		if (ss.isValue(closestNeighbor)) {
			return closestNeighbor;
		}
		var count = this.users.length;
		var closestDistance = Number.MAX_VALUE;
		for (var c = 0; c < count; c++) {
			var cUser = this.users[c];
			var distance = $Pather_ServerManager_GameWorldServer_GameWorld.$pointDistance(pUser, cUser);
			if (distance < closestDistance) {
				closestNeighbor = new $Pather_ServerManager_GameWorldServer_GameWorldNeighbor(cUser, distance);
				closestDistance = distance;
			}
		}
		return closestNeighbor;
	},
	$buildNeighbors: function(pUser, i) {
		var count = this.users.length;
		for (var c = i; c < count; c++) {
			var cUser = this.users[c];
			var distance = $Pather_ServerManager_GameWorldServer_GameWorld.$pointDistance(pUser, cUser);
			if (distance <= Pather.Common.Constants.neighborDistance) {
				pUser.get_neighbors().push(new $Pather_ServerManager_GameWorldServer_GameWorldNeighbor(cUser, distance));
				cUser.get_neighbors().push(new $Pather_ServerManager_GameWorldServer_GameWorldNeighbor(pUser, distance));
			}
		}
	}
});
ss.initClass($Pather_ServerManager_GameWorldServer_GameWorldNeighbor, $asm, {});
ss.initClass($Pather_ServerManager_GameWorldServer_GameWorldPubSub, $asm, {
	init: function() {
		this.pubSub.subscribe($Pather_ServerManager_Common_PubSub_PubSubChannels.gameWorld, ss.mkdel(this, function(message) {
			var gameWorldPubSubMessage = JSON.parse(message);
			var possibleMessageReqRes = gameWorldPubSubMessage;
			if (!(typeof(possibleMessageReqRes.messageId) === 'undefined')) {
				if (gameWorldPubSubMessage.type === 1) {
					if (!this.deferredMessages.containsKey(possibleMessageReqRes.messageId)) {
						console.log('Received message that I didnt ask for.');
						throw new ss.Exception('Received message that I didnt ask for.');
					}
					this.deferredMessages.get_item(possibleMessageReqRes.messageId).resolve(gameWorldPubSubMessage);
					return;
				}
			}
			this.message(gameWorldPubSubMessage);
		}));
	},
	publishToGameSegment: function(message) {
		this.pubSub.publish$1($Pather_ServerManager_Common_PubSub_PubSubChannels.gameSegmentCluster + 1, message);
	},
	publishToGameSegmentWithCallback: function(T) {
		return function(message) {
			var deferred = Pather.Common.Utils.Promises.Q.defer$2(T, Pather.Common.Utils.Promises.UndefinedPromiseError).call(null);
			this.pubSub.publish$1($Pather_ServerManager_Common_PubSub_PubSubChannels.gameSegmentCluster + 1, message);
			this.deferredMessages.add(message.messageId, deferred);
			return deferred.promise;
		};
	}
});
ss.initClass($Pather_ServerManager_GameWorldServer_GameWorldServer, $asm, {
	$pubsubReady: function() {
		var gameSegmentClusterPubSub = new $Pather_ServerManager_GameWorldServer_GameWorldPubSub(this.$pubSub);
		gameSegmentClusterPubSub.init();
		gameSegmentClusterPubSub.message = ss.delegateCombine(gameSegmentClusterPubSub.message, ss.mkdel(this, this.$gameWorldMessage));
		this.gameWorld = new $Pather_ServerManager_GameWorldServer_GameWorld(gameSegmentClusterPubSub);
	},
	$gameWorldMessage: function(gameworldMessage) {
		switch (gameworldMessage.type) {
			case 0: {
				this.$userJoined(gameworldMessage).then(ss.mkdel(this, function(gwUser) {
					var $t2 = this.$pubSub;
					var $t3 = gwUser.gatewayServer;
					var $t1 = Pather.Common.Models.Gateway.UserJoinedGatewayPubSubMessage.$ctor();
					$t1.gameServerId = gwUser.gameSegment.gameSegmentId;
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
		//query database for user
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
	},
	closestNeighbor: function() {
		var closestNeighbor = null;
		var $t1 = this.get_neighbors();
		for (var $t2 = 0; $t2 < $t1.length; $t2++) {
			var gameWorldNeighbor = $t1[$t2];
			if (ss.isNullOrUndefined(closestNeighbor) || gameWorldNeighbor.distance < closestNeighbor.distance) {
				closestNeighbor = gameWorldNeighbor;
			}
		}
		return closestNeighbor;
	}
});
ss.initClass($Pather_ServerManager_GameWorldServer_UserJoinError, $asm, {});
ss.initClass($Pather_ServerManager_GameWorldServer_Tests_GameWorldServerTests, $asm, {
	userShouldJoin: function(testDeferred) {
		var pubSubTest = global.$instantiateInterface$($Pather_ServerManager_Common_PubSub_IPubSub);
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
		global.$overwiteMethodCallForMocker$(ss.mkdel(pubSubTest, pubSubTest.init), function() {
			return Pather.Common.Utils.Promises.Q.resolvedPromise();
		});
		global.$overwiteMethodCallForMocker$(ss.mkdel(pubSubTest, pubSubTest.subscribe), function(channel, callback) {
			Pather.Common.TestFramework.DeferredAssert.that(testDeferred, channel).get_does().equal($Pather_ServerManager_Common_PubSub_PubSubChannels.gameWorld);
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
ss.initClass($Pather_ServerManager_GatewayServer_$GatewayUser, $asm, {
	get_$socket: function() {
		return this.$1$SocketField;
	},
	set_$socket: function(value) {
		this.$1$SocketField = value;
	},
	get_$userToken: function() {
		return this.$1$UserTokenField;
	},
	set_$userToken: function(value) {
		this.$1$UserTokenField = value;
	}
});
ss.initClass($Pather_ServerManager_GatewayServer_GatewayServer, $asm, {
	get_pubsub: function() {
		return this.$1$PubsubField;
	},
	set_pubsub: function(value) {
		this.$1$PubsubField = value;
	},
	get_serverCommunicator: function() {
		return this.$1$ServerCommunicatorField;
	},
	set_serverCommunicator: function(value) {
		this.$1$ServerCommunicatorField = value;
	},
	$pubsubReady: function() {
		console.log('pubsub ready');
		this.get_pubsub().subscribe(this.gatewayName, ss.mkdel(this, this.$gatewayMessage));
		var $t1 = this.get_serverCommunicator();
		$t1.onDisconnectConnection = ss.delegateCombine($t1.onDisconnectConnection, ss.mkdel(this, function(socket) {
			console.log('Disconnect', this.$users.length);
			for (var $t2 = 0; $t2 < this.$users.length; $t2++) {
				var gatewayUser = this.$users[$t2];
				if (ss.referenceEquals(gatewayUser.get_$socket(), socket)) {
					console.log('Left');
					ss.remove(this.$users, gatewayUser);
					break;
				}
			}
		}));
		var $t3 = this.get_serverCommunicator();
		$t3.onNewConnection = ss.delegateCombine($t3.onNewConnection, ss.mkdel(this, function(socket1) {
			var $t4 = new $Pather_ServerManager_GatewayServer_$GatewayUser();
			$t4.set_$socket(socket1);
			var user = $t4;
			this.$users.push(user);
			var $t5 = this.get_serverCommunicator();
			$t5.listenOnChannel(Pather.Common.Models.Gateway.GatewaySocketMessageModel).call($t5, socket1, 'Gateway.Message', function(cSocket, data) {
				console.log('Socket message ', data);
			});
			var $t6 = this.get_serverCommunicator();
			$t6.listenOnChannel(Pather.Common.Models.Gateway.GatewayJoinModel).call($t6, socket1, 'Gateway.Join', ss.mkdel(this, function(cSocket1, data1) {
				user.set_$userToken(data1.userToken);
				var $t8 = this.get_pubsub();
				var $t9 = $Pather_ServerManager_Common_PubSub_PubSubChannels.gameWorld;
				var $t7 = Pather.Common.Models.GameWorld.UserJoinedGameWorldPubSubMessage.$ctor();
				$t7.type = 0;
				$t7.gatewayChannel = this.gatewayName;
				$t7.userToken = data1.userToken;
				$t8.publish$1($t9, $t7);
			}));
		}));
	},
	$gatewayMessage: function(message) {
		console.log('message:', message);
		var gMessage = JSON.parse(message);
		switch (gMessage.type) {
			case 0: {
				var userJoinedMessage = gMessage;
				for (var $t1 = 0; $t1 < this.$users.length; $t1++) {
					var gatewayUser = this.$users[$t1];
					if (ss.referenceEquals(gatewayUser.get_$userToken(), userJoinedMessage.userId)) {
						//                            this is only sending once idk why
						this.get_serverCommunicator().sendMessage(gatewayUser.get_$socket(), 'Gateway.Join.Success', userJoinedMessage);
						break;
					}
				}
				break;
			}
			default: {
				throw new ss.ArgumentOutOfRangeException();
			}
		}
	}
});
ss.initClass($Pather_ServerManager_GatewayServer_Tests_GatewayServerTests, $asm, {
	userShouldJoinFromGateway: function(testDeferred) {
		var userToken = 'abcdef';
		var publishData = null;
		var sendMessageToGameWorld = null;
		var socketManager = global.$instantiateInterface$($Pather_ServerManager_Common_SocketManager_ISocketManager);
		global.$overwiteMethodCallForMocker$(ss.mkdel(socketManager, socketManager.init), function() {
		});
		global.$overwiteMethodCallForMocker$(ss.mkdel(socketManager, socketManager.connections), function(callback) {
			var socket = global.$instantiateInterface$($Pather_ServerManager_Common_SocketManager_ISocket);
			global.$overwiteMethodCallForMocker$(ss.mkdel(socket, socket.disconnect), function() {
			});
			global.$overwiteMethodCallForMocker$(ss.mkdel(socket, socket.on), function(channel, onCallback) {
				if (channel === 'Gateway.Join') {
					setTimeout(function() {
						//user logged in via socketio
						var $t2 = ss.makeGenericType(Pather.Common.Utils.DataObject$1, [Pather.Common.Models.Gateway.GatewayJoinModel]);
						var $t1 = Pather.Common.Models.Gateway.GatewayJoinModel.$ctor();
						$t1.userToken = userToken;
						onCallback($t2.$ctor($t1));
					}, 1);
				}
			});
			setTimeout(function() {
				callback(socket);
			}, 1);
		});
		var pubSub = global.$instantiateInterface$($Pather_ServerManager_Common_PubSub_IPubSub);
		global.$overwiteMethodCallForMocker$(ss.mkdel(pubSub, pubSub.init), function() {
			return Pather.Common.Utils.Promises.Q.resolvedPromise();
		});
		global.$overwiteMethodCallForMocker$(ss.mkdel(pubSub, pubSub.subscribe), function(channel1, callback1) {
			publishData = ss.delegateCombine(publishData, function(pchannel, pmessage) {
				pubSub.receivedMessage(channel1, JSON.stringify(pmessage));
			});
		});
		global.$overwiteMethodCallForMocker$(ss.mkdel(pubSub, pubSub.publish$1), function(channel2, data) {
			if (ss.referenceEquals(channel2, $Pather_ServerManager_Common_PubSub_PubSubChannels.gameWorld)) {
				sendMessageToGameWorld(data);
			}
		});
		var gatewayName = null;
		global.$overwiteMethodCallForMocker$(ss.mkdel(pubSub, pubSub.receivedMessage), function(channel3, message) {
			if (ss.referenceEquals(channel3, gatewayName)) {
				var userJoined = JSON.parse(message);
				Pather.Common.TestFramework.DeferredAssert.that(testDeferred, userJoined.userId).get_does().equal(userToken);
				testDeferred.resolve();
			}
		});
		var gts = new $Pather_ServerManager_GatewayServer_GatewayServer(pubSub, socketManager);
		gatewayName = gts.gatewayName;
		var pubSubTest = global.$instantiateInterface$($Pather_ServerManager_Common_PubSub_IPubSub);
		var databaseQueriesTest = global.$instantiateInterface$($Pather_ServerManager_Database_IDatabaseQueries);
		global.$overwiteMethodCallForMocker$(ss.mkdel(databaseQueriesTest, databaseQueriesTest.getUserByToken), function(utoken) {
			var deferred = Pather.Common.Utils.Promises.Q.defer$2($Pather_ServerManager_Database_DBUser, $Pather_ServerManager_Database_DatabaseError).call(null);
			var $t3 = $Pather_ServerManager_Database_DBUser.$ctor();
			$t3.token = utoken;
			$t3.userId = userToken;
			$t3.x = 400;
			$t3.y = 400;
			deferred.resolve($t3);
			return deferred.promise;
		});
		global.$overwiteMethodCallForMocker$(ss.mkdel(pubSub, pubSub.init), function() {
			return Pather.Common.Utils.Promises.Q.resolvedPromise();
		});
		global.$overwiteMethodCallForMocker$(ss.mkdel(pubSubTest, pubSubTest.subscribe), function(channel4, callback2) {
			sendMessageToGameWorld = ss.delegateCombine(sendMessageToGameWorld, function(data1) {
				callback2(JSON.stringify(data1));
			});
		});
		global.$overwiteMethodCallForMocker$(ss.mkdel(pubSubTest, pubSubTest.publish$1), function(channel5, data2) {
			Pather.Common.TestFramework.DeferredAssert.that(testDeferred, data2.userId).get_does().equal(userToken);
			publishData(channel5, data2);
		});
		var gws = new $Pather_ServerManager_GameWorldServer_GameWorldServer(pubSubTest, databaseQueriesTest);
	}
});
ss.initClass($Pather_ServerManager_TickServer_TickServer, $asm, {});
ss.initClass($Pather_ServerManager_Utils_ServerHelper, $asm, {});
ss.setMetadata($Pather_ServerManager_GameSegmentCluster_Tests_GameSegmentClusterTest, { attr: [new Pather.Common.TestFramework.TestClassAttribute()], members: [{ attr: [new Pather.Common.TestFramework.TestMethodAttribute()], name: 'CreateGameServer', type: 8, sname: 'createGameServer', returnType: Object, params: [Pather.Common.Utils.Promises.Deferred] }] });
ss.setMetadata($Pather_ServerManager_GameWorldServer_Tests_GameWorldServerTests, { attr: [new Pather.Common.TestFramework.TestClassAttribute()], members: [{ attr: [new Pather.Common.TestFramework.TestMethodAttribute()], name: 'UserShouldJoin', type: 8, sname: 'userShouldJoin', returnType: Object, params: [Pather.Common.Utils.Promises.Deferred] }] });
ss.setMetadata($Pather_ServerManager_GatewayServer_Tests_GatewayServerTests, { attr: [new Pather.Common.TestFramework.TestClassAttribute()], members: [{ attr: [new Pather.Common.TestFramework.TestMethodAttribute()], name: 'UserShouldJoinFromGateway', type: 8, sname: 'userShouldJoinFromGateway', returnType: Object, params: [Pather.Common.Utils.Promises.Deferred] }] });
(function() {
	$Pather_ServerManager_Common_PubSub_PubSubChannels.gameWorld = 'gameworld';
	$Pather_ServerManager_Common_PubSub_PubSubChannels.gameSegmentCluster = 'GameSegmentCluster.';
})();
(function() {
	$Pather_ServerManager_Common_ConnectionConstants.redisIP = '127.0.0.1';
})();
$Pather_ServerManager_ServerManager.main();
