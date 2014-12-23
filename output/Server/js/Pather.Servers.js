'use strict';

var socketio = require('socket.io');
var $asm = {};
global.Pather = global.Pather || {};
global.Pather.Servers = global.Pather.Servers || {};
global.Pather.Servers.AuthServer = global.Pather.Servers.AuthServer || {};
global.Pather.Servers.Common = global.Pather.Servers.Common || {};
global.Pather.Servers.Common.PubSub = global.Pather.Servers.Common.PubSub || {};
global.Pather.Servers.Common.PushPop = global.Pather.Servers.Common.PushPop || {};
global.Pather.Servers.Common.SocketManager = global.Pather.Servers.Common.SocketManager || {};
global.Pather.Servers.Database = global.Pather.Servers.Database || {};
global.Pather.Servers.GameSegment = global.Pather.Servers.GameSegment || {};
global.Pather.Servers.GameSegment.OldGameServer = global.Pather.Servers.GameSegment.OldGameServer || {};
global.Pather.Servers.GameSegmentCluster = global.Pather.Servers.GameSegmentCluster || {};
global.Pather.Servers.GameSegmentCluster.Tests = global.Pather.Servers.GameSegmentCluster.Tests || {};
global.Pather.Servers.GameWorldServer = global.Pather.Servers.GameWorldServer || {};
global.Pather.Servers.GameWorldServer.Tests = global.Pather.Servers.GameWorldServer.Tests || {};
global.Pather.Servers.GatewayServer = global.Pather.Servers.GatewayServer || {};
global.Pather.Servers.GatewayServer.Tests = global.Pather.Servers.GatewayServer.Tests || {};
global.Pather.Servers.TickServer = global.Pather.Servers.TickServer || {};
global.Pather.Servers.Utils = global.Pather.Servers.Utils || {};
ss.initAssembly($asm, 'Pather.Servers');
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.ServerManager
var $Pather_Servers_ServerManager = function() {
};
$Pather_Servers_ServerManager.__typeName = 'Pather.Servers.ServerManager';
$Pather_Servers_ServerManager.main = function() {
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
				new $Pather_Servers_GatewayServer_GatewayServer(new $Pather_Servers_Common_PubSub_PubSub(), new $Pather_Servers_Common_SocketManager_SocketIOManager());
				break;
			}
			case 'au':
			case 'auth': {
				new $Pather_Servers_AuthServer_AuthServer();
				break;
			}
			case 'gsc':
			case 'GameSegmentCluster': {
				new $Pather_Servers_GameSegmentCluster_GameSegmentCluster(new $Pather_Servers_Common_PubSub_PubSub(), new $Pather_Servers_Common_PushPop_PushPop());
				break;
			}
			case 'gs':
			case 'game': {
				new $Pather_Servers_GameSegment_GameSegment(new $Pather_Servers_Common_SocketManager_SocketIOManager(), new $Pather_Servers_Common_PubSub_PubSub(), new $Pather_Servers_Common_PushPop_PushPop(), global.process.argv[3]);
				break;
			}
			case 'gw':
			case 'gameworld': {
				new $Pather_Servers_GameWorldServer_GameWorldServer(new $Pather_Servers_Common_PubSub_PubSub(), new $Pather_Servers_Database_DatabaseQueries());
				break;
			}
			case 't':
			case 'tick': {
				new $Pather_Servers_TickServer_TickServer(new $Pather_Servers_Common_PubSub_PubSub());
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
global.Pather.Servers.ServerManager = $Pather_Servers_ServerManager;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.AuthServer.AuthServer
var $Pather_Servers_AuthServer_AuthServer = function() {
};
$Pather_Servers_AuthServer_AuthServer.__typeName = 'Pather.Servers.AuthServer.AuthServer';
global.Pather.Servers.AuthServer.AuthServer = $Pather_Servers_AuthServer_AuthServer;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.Common.ConnectionConstants
var $Pather_Servers_Common_ConnectionConstants = function() {
};
$Pather_Servers_Common_ConnectionConstants.__typeName = 'Pather.Servers.Common.ConnectionConstants';
global.Pather.Servers.Common.ConnectionConstants = $Pather_Servers_Common_ConnectionConstants;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.Common.ServerCommunicator
var $Pather_Servers_Common_ServerCommunicator = function(socketManager, port) {
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
$Pather_Servers_Common_ServerCommunicator.__typeName = 'Pather.Servers.Common.ServerCommunicator';
global.Pather.Servers.Common.ServerCommunicator = $Pather_Servers_Common_ServerCommunicator;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.Common.PubSub.IPubSub
var $Pather_Servers_Common_PubSub_IPubSub = function() {
};
$Pather_Servers_Common_PubSub_IPubSub.__typeName = 'Pather.Servers.Common.PubSub.IPubSub';
global.Pather.Servers.Common.PubSub.IPubSub = $Pather_Servers_Common_PubSub_IPubSub;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.Common.PubSub.PubSub
var $Pather_Servers_Common_PubSub_PubSub = function() {
	this.$pready = false;
	this.$pubClient = null;
	this.$sready = false;
	this.$subClient = null;
	this.$subbed = null;
};
$Pather_Servers_Common_PubSub_PubSub.__typeName = 'Pather.Servers.Common.PubSub.PubSub';
global.Pather.Servers.Common.PubSub.PubSub = $Pather_Servers_Common_PubSub_PubSub;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.Common.PubSub.PubSubChannels
var $Pather_Servers_Common_PubSub_PubSubChannels = function() {
};
$Pather_Servers_Common_PubSub_PubSubChannels.__typeName = 'Pather.Servers.Common.PubSub.PubSubChannels';
global.Pather.Servers.Common.PubSub.PubSubChannels = $Pather_Servers_Common_PubSub_PubSubChannels;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.Common.PushPop.IPushPop
var $Pather_Servers_Common_PushPop_IPushPop = function() {
};
$Pather_Servers_Common_PushPop_IPushPop.__typeName = 'Pather.Servers.Common.PushPop.IPushPop';
global.Pather.Servers.Common.PushPop.IPushPop = $Pather_Servers_Common_PushPop_IPushPop;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.Common.PushPop.PushPop
var $Pather_Servers_Common_PushPop_PushPop = function() {
	this.$pushReady = false;
	this.$pushClient = null;
	this.$popReady = false;
	this.$popClient = null;
};
$Pather_Servers_Common_PushPop_PushPop.__typeName = 'Pather.Servers.Common.PushPop.PushPop';
global.Pather.Servers.Common.PushPop.PushPop = $Pather_Servers_Common_PushPop_PushPop;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.Common.SocketManager.ISocket
var $Pather_Servers_Common_SocketManager_ISocket = function() {
};
$Pather_Servers_Common_SocketManager_ISocket.__typeName = 'Pather.Servers.Common.SocketManager.ISocket';
global.Pather.Servers.Common.SocketManager.ISocket = $Pather_Servers_Common_SocketManager_ISocket;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.Common.SocketManager.ISocketManager
var $Pather_Servers_Common_SocketManager_ISocketManager = function() {
};
$Pather_Servers_Common_SocketManager_ISocketManager.__typeName = 'Pather.Servers.Common.SocketManager.ISocketManager';
global.Pather.Servers.Common.SocketManager.ISocketManager = $Pather_Servers_Common_SocketManager_ISocketManager;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.Common.SocketManager.SocketIOManager
var $Pather_Servers_Common_SocketManager_SocketIOManager = function() {
	this.$io = null;
};
$Pather_Servers_Common_SocketManager_SocketIOManager.__typeName = 'Pather.Servers.Common.SocketManager.SocketIOManager';
global.Pather.Servers.Common.SocketManager.SocketIOManager = $Pather_Servers_Common_SocketManager_SocketIOManager;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.Common.SocketManager.SocketIOSocket
var $Pather_Servers_Common_SocketManager_SocketIOSocket = function(socket) {
	this.$1$SocketField = null;
	this.set_socket(socket);
};
$Pather_Servers_Common_SocketManager_SocketIOSocket.__typeName = 'Pather.Servers.Common.SocketManager.SocketIOSocket';
global.Pather.Servers.Common.SocketManager.SocketIOSocket = $Pather_Servers_Common_SocketManager_SocketIOSocket;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.Database.DatabaseError
var $Pather_Servers_Database_DatabaseError = function() {
};
$Pather_Servers_Database_DatabaseError.__typeName = 'Pather.Servers.Database.DatabaseError';
global.Pather.Servers.Database.DatabaseError = $Pather_Servers_Database_DatabaseError;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.Database.DatabaseQueries
var $Pather_Servers_Database_DatabaseQueries = function() {
};
$Pather_Servers_Database_DatabaseQueries.__typeName = 'Pather.Servers.Database.DatabaseQueries';
global.Pather.Servers.Database.DatabaseQueries = $Pather_Servers_Database_DatabaseQueries;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.Database.DBUser
var $Pather_Servers_Database_DBUser = function() {
};
$Pather_Servers_Database_DBUser.__typeName = 'Pather.Servers.Database.DBUser';
$Pather_Servers_Database_DBUser.createInstance = function() {
	return $Pather_Servers_Database_DBUser.$ctor();
};
$Pather_Servers_Database_DBUser.$ctor = function() {
	var $this = {};
	$this.userId = null;
	$this.token = null;
	$this.x = 0;
	$this.y = 0;
	return $this;
};
global.Pather.Servers.Database.DBUser = $Pather_Servers_Database_DBUser;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.Database.IDatabaseQueries
var $Pather_Servers_Database_IDatabaseQueries = function() {
};
$Pather_Servers_Database_IDatabaseQueries.__typeName = 'Pather.Servers.Database.IDatabaseQueries';
global.Pather.Servers.Database.IDatabaseQueries = $Pather_Servers_Database_IDatabaseQueries;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameSegment.GameSegment
var $Pather_Servers_GameSegment_GameSegment = function(socketManager, pubsub, pushPop, gameSegmentName) {
	this.$1$SocketManagerField = null;
	this.$1$PubsubField = null;
	this.$1$PushPopField = null;
	this.$1$GameSegmentNameField = null;
	this.set_socketManager(socketManager);
	this.set_pubsub(pubsub);
	this.set_pushPop(pushPop);
	this.set_gameSegmentName(gameSegmentName);
	//            Global.SetInterval(() => { Global.Console.Log("keep alive " + new DateTime().ToString().Substring(17, 24)); }, 10 * 1000);
	//            var game = new ServerGame(socketManager, gameServerName);
	//            game.Init();
	pushPop.init().then(ss.mkdel(this, this.$ready));
};
$Pather_Servers_GameSegment_GameSegment.__typeName = 'Pather.Servers.GameSegment.GameSegment';
global.Pather.Servers.GameSegment.GameSegment = $Pather_Servers_GameSegment_GameSegment;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameSegment.OldGameServer.GameSegmentUser
var $Pather_Servers_GameSegment_OldGameServer_GameSegmentUser = function() {
	this.gatewayServer = null;
};
$Pather_Servers_GameSegment_OldGameServer_GameSegmentUser.__typeName = 'Pather.Servers.GameSegment.OldGameServer.GameSegmentUser';
global.Pather.Servers.GameSegment.OldGameServer.GameSegmentUser = $Pather_Servers_GameSegment_OldGameServer_GameSegmentUser;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameSegment.OldGameServer.ServerEntity
var $Pather_Servers_GameSegment_OldGameServer_ServerEntity = function(game, playerId) {
	this.socket = null;
	Pather.Common.Entity.call(this, game, playerId);
};
$Pather_Servers_GameSegment_OldGameServer_ServerEntity.__typeName = 'Pather.Servers.GameSegment.OldGameServer.ServerEntity';
global.Pather.Servers.GameSegment.OldGameServer.ServerEntity = $Pather_Servers_GameSegment_OldGameServer_ServerEntity;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameSegment.OldGameServer.ServerGame
var $Pather_Servers_GameSegment_OldGameServer_ServerGame = function(socketManager, gameServerName) {
	this.syncLockstep = null;
	Pather.Common.Game.call(this);
	console.log(gameServerName + ' Has come online');
	this.stepManager = new $Pather_Servers_GameSegment_OldGameServer_ServerStepManager(this, new $Pather_Servers_GameSegment_OldGameServer_ServerNetworkManager(this, socketManager));
	this.constructGrid();
	this.ready = true;
};
$Pather_Servers_GameSegment_OldGameServer_ServerGame.__typeName = 'Pather.Servers.GameSegment.OldGameServer.ServerGame';
global.Pather.Servers.GameSegment.OldGameServer.ServerGame = $Pather_Servers_GameSegment_OldGameServer_ServerGame;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameSegment.OldGameServer.ServerNetworkManager
var $Pather_Servers_GameSegment_OldGameServer_ServerNetworkManager = function(game, socketManager) {
	this.game = null;
	this.serverCommunicator = null;
	this.onRecieveAction = null;
	this.$forceSyncNextLockstep = [];
	this.game = game;
	this.game.syncLockstep = ss.delegateCombine(this.game.syncLockstep, ss.mkdel(this, this.$onSyncLockstep));
	this.serverCommunicator = new $Pather_Servers_Common_ServerCommunicator(socketManager, 8991);
	this.serverCommunicator.onNewConnection = ss.delegateCombine(this.serverCommunicator.onNewConnection, ss.mkdel(this, this.$onNewConnection));
	this.serverCommunicator.onDisconnectConnection = ss.delegateCombine(this.serverCommunicator.onDisconnectConnection, ss.mkdel(this, this.$onDisconnectConnection));
};
$Pather_Servers_GameSegment_OldGameServer_ServerNetworkManager.__typeName = 'Pather.Servers.GameSegment.OldGameServer.ServerNetworkManager';
global.Pather.Servers.GameSegment.OldGameServer.ServerNetworkManager = $Pather_Servers_GameSegment_OldGameServer_ServerNetworkManager;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameSegment.OldGameServer.ServerStepManager
var $Pather_Servers_GameSegment_OldGameServer_ServerStepManager = function(game, serverNetworkManager) {
	this.serverNetworkManager = null;
	Pather.Common.StepManager.call(this, game);
	this.serverNetworkManager = serverNetworkManager;
	this.serverNetworkManager.onRecieveAction = ss.delegateCombine(this.serverNetworkManager.onRecieveAction, ss.mkdel(this, this.receiveAction));
};
$Pather_Servers_GameSegment_OldGameServer_ServerStepManager.__typeName = 'Pather.Servers.GameSegment.OldGameServer.ServerStepManager';
global.Pather.Servers.GameSegment.OldGameServer.ServerStepManager = $Pather_Servers_GameSegment_OldGameServer_ServerStepManager;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameSegmentCluster.GameSegmentCluster
var $Pather_Servers_GameSegmentCluster_GameSegmentCluster = function(pubsub, pushPop) {
	this.$1$PushPopField = null;
	this.$pubsub = null;
	this.set_pushPop(pushPop);
	this.$pubsub = pubsub;
	Pather.Common.Utils.Promises.Q.all([pubsub.init(), pushPop.init()]).then(ss.mkdel(this, this.$pubsubsConnected));
};
$Pather_Servers_GameSegmentCluster_GameSegmentCluster.__typeName = 'Pather.Servers.GameSegmentCluster.GameSegmentCluster';
global.Pather.Servers.GameSegmentCluster.GameSegmentCluster = $Pather_Servers_GameSegmentCluster_GameSegmentCluster;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameSegmentCluster.Tests.GameSegmentClusterTest
var $Pather_Servers_GameSegmentCluster_Tests_GameSegmentClusterTest = function() {
};
$Pather_Servers_GameSegmentCluster_Tests_GameSegmentClusterTest.__typeName = 'Pather.Servers.GameSegmentCluster.Tests.GameSegmentClusterTest';
global.Pather.Servers.GameSegmentCluster.Tests.GameSegmentClusterTest = $Pather_Servers_GameSegmentCluster_Tests_GameSegmentClusterTest;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameSegmentCluster.Tests.StubPubSub
var $Pather_Servers_GameSegmentCluster_Tests_StubPubSub = function() {
	this.$channels = new (ss.makeGenericType(ss.Dictionary$2, [String, Function]))();
};
$Pather_Servers_GameSegmentCluster_Tests_StubPubSub.__typeName = 'Pather.Servers.GameSegmentCluster.Tests.StubPubSub';
global.Pather.Servers.GameSegmentCluster.Tests.StubPubSub = $Pather_Servers_GameSegmentCluster_Tests_StubPubSub;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameWorldServer.GameSegment
var $Pather_Servers_GameWorldServer_GameSegment = function() {
	this.users = null;
	this.gameSegmentId = null;
	this.users = [];
};
$Pather_Servers_GameWorldServer_GameSegment.__typeName = 'Pather.Servers.GameWorldServer.GameSegment';
global.Pather.Servers.GameWorldServer.GameSegment = $Pather_Servers_GameWorldServer_GameSegment;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameWorldServer.GameWorld
var $Pather_Servers_GameWorldServer_GameWorld = function(gameWorldPubSub) {
	this.gameWorldPubSub = null;
	this.users = null;
	this.gameSegments = null;
	this.gameWorldPubSub = gameWorldPubSub;
	this.users = [];
	this.gameSegments = [];
};
$Pather_Servers_GameWorldServer_GameWorld.__typeName = 'Pather.Servers.GameWorldServer.GameWorld';
$Pather_Servers_GameWorldServer_GameWorld.$pointDistance = function(pUser, cUser) {
	var mx = pUser.x;
	var my = pUser.y;
	var cx = cUser.x;
	var cy = cUser.y;
	var _x = cx - mx;
	var _y = cy - my;
	var dis = Math.sqrt(_x * _x + _y * _y);
	return dis;
};
global.Pather.Servers.GameWorldServer.GameWorld = $Pather_Servers_GameWorldServer_GameWorld;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameWorldServer.GameWorldNeighbor
var $Pather_Servers_GameWorldServer_GameWorldNeighbor = function(cUser, distance) {
	this.user = null;
	this.distance = 0;
	this.distance = distance;
	this.user = cUser;
};
$Pather_Servers_GameWorldServer_GameWorldNeighbor.__typeName = 'Pather.Servers.GameWorldServer.GameWorldNeighbor';
global.Pather.Servers.GameWorldServer.GameWorldNeighbor = $Pather_Servers_GameWorldServer_GameWorldNeighbor;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameWorldServer.GameWorldPubSub
var $Pather_Servers_GameWorldServer_GameWorldPubSub = function(pubSub) {
	this.pubSub = null;
	this.message = null;
	this.deferredMessages = new (ss.makeGenericType(ss.Dictionary$2, [String, ss.makeGenericType(Pather.Common.Utils.Promises.Deferred$2, [Object, Pather.Common.Utils.Promises.UndefinedPromiseError])]))();
	this.pubSub = pubSub;
};
$Pather_Servers_GameWorldServer_GameWorldPubSub.__typeName = 'Pather.Servers.GameWorldServer.GameWorldPubSub';
global.Pather.Servers.GameWorldServer.GameWorldPubSub = $Pather_Servers_GameWorldServer_GameWorldPubSub;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameWorldServer.GameWorldServer
var $Pather_Servers_GameWorldServer_GameWorldServer = function(pubSub, dbQueries) {
	this.$pubSub = null;
	this.$databaseQueries = null;
	this.gameWorld = null;
	this.$pubSub = pubSub;
	this.$databaseQueries = dbQueries;
	pubSub.init().then(ss.mkdel(this, this.$pubsubReady));
};
$Pather_Servers_GameWorldServer_GameWorldServer.__typeName = 'Pather.Servers.GameWorldServer.GameWorldServer';
global.Pather.Servers.GameWorldServer.GameWorldServer = $Pather_Servers_GameWorldServer_GameWorldServer;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameWorldServer.GameWorldUser
var $Pather_Servers_GameWorldServer_GameWorldUser = function() {
	this.userId = null;
	this.x = 0;
	this.y = 0;
	this.gatewayServer = null;
	this.gameSegment = null;
	this.$1$NeighborsField = null;
};
$Pather_Servers_GameWorldServer_GameWorldUser.__typeName = 'Pather.Servers.GameWorldServer.GameWorldUser';
global.Pather.Servers.GameWorldServer.GameWorldUser = $Pather_Servers_GameWorldServer_GameWorldUser;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameWorldServer.UserJoinError
var $Pather_Servers_GameWorldServer_UserJoinError = function() {
};
$Pather_Servers_GameWorldServer_UserJoinError.__typeName = 'Pather.Servers.GameWorldServer.UserJoinError';
global.Pather.Servers.GameWorldServer.UserJoinError = $Pather_Servers_GameWorldServer_UserJoinError;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameWorldServer.Tests.GameWorldServerTests
var $Pather_Servers_GameWorldServer_Tests_GameWorldServerTests = function() {
};
$Pather_Servers_GameWorldServer_Tests_GameWorldServerTests.__typeName = 'Pather.Servers.GameWorldServer.Tests.GameWorldServerTests';
global.Pather.Servers.GameWorldServer.Tests.GameWorldServerTests = $Pather_Servers_GameWorldServer_Tests_GameWorldServerTests;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GatewayServer.GatewayUser
var $Pather_Servers_GatewayServer_$GatewayUser = function() {
	this.$1$SocketField = null;
	this.$1$UserTokenField = null;
};
$Pather_Servers_GatewayServer_$GatewayUser.__typeName = 'Pather.Servers.GatewayServer.$GatewayUser';
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GatewayServer.GatewayServer
var $Pather_Servers_GatewayServer_GatewayServer = function(pubsub, socketManager) {
	this.$1$PubsubField = null;
	this.gatewayName = null;
	this.$1$ServerCommunicatorField = null;
	this.$users = [];
	this.set_pubsub(pubsub);
	this.gatewayName = 'Gateway ' + ss.Guid.newGuid();
	console.log(this.gatewayName);
	var port = 1800 + (Math.random() * 4000 | 0);
	port = 1800;
	this.set_serverCommunicator(new $Pather_Servers_Common_ServerCommunicator(socketManager, port));
	pubsub.init().then(ss.mkdel(this, this.$pubsubReady));
};
$Pather_Servers_GatewayServer_GatewayServer.__typeName = 'Pather.Servers.GatewayServer.GatewayServer';
global.Pather.Servers.GatewayServer.GatewayServer = $Pather_Servers_GatewayServer_GatewayServer;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GatewayServer.Tests.GatewayServerTests
var $Pather_Servers_GatewayServer_Tests_GatewayServerTests = function() {
};
$Pather_Servers_GatewayServer_Tests_GatewayServerTests.__typeName = 'Pather.Servers.GatewayServer.Tests.GatewayServerTests';
global.Pather.Servers.GatewayServer.Tests.GatewayServerTests = $Pather_Servers_GatewayServer_Tests_GatewayServerTests;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.TickServer.TickManager
var $Pather_Servers_TickServer_TickManager = function(tickPubSub) {
	this.tickPubSub = null;
	this.curLockstepTime = 0;
	this.lockstepTickNumber = 0;
	this.tickPubSub = tickPubSub;
};
$Pather_Servers_TickServer_TickManager.__typeName = 'Pather.Servers.TickServer.TickManager';
global.Pather.Servers.TickServer.TickManager = $Pather_Servers_TickServer_TickManager;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.TickServer.TickPubSub
var $Pather_Servers_TickServer_TickPubSub = function(pubSub) {
	this.pubSub = null;
	this.onMessage = null;
	this.pubSub = pubSub;
};
$Pather_Servers_TickServer_TickPubSub.__typeName = 'Pather.Servers.TickServer.TickPubSub';
global.Pather.Servers.TickServer.TickPubSub = $Pather_Servers_TickServer_TickPubSub;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.TickServer.TickServer
var $Pather_Servers_TickServer_TickServer = function(pubSub) {
	this.tickManager = null;
	this.tickPubSub = null;
	this.pubSub = null;
	this.pubSub = pubSub;
	pubSub.init().then(ss.mkdel(this, function() {
		this.tickPubSub = new $Pather_Servers_TickServer_TickPubSub(pubSub);
		this.tickPubSub.init().then(ss.mkdel(this, this.$ready));
	}));
};
$Pather_Servers_TickServer_TickServer.__typeName = 'Pather.Servers.TickServer.TickServer';
global.Pather.Servers.TickServer.TickServer = $Pather_Servers_TickServer_TickServer;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.Utils.ServerHelper
var $Pather_Servers_Utils_ServerHelper = function() {
};
$Pather_Servers_Utils_ServerHelper.__typeName = 'Pather.Servers.Utils.ServerHelper';
$Pather_Servers_Utils_ServerHelper.getNetworkIPs = function() {
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
global.Pather.Servers.Utils.ServerHelper = $Pather_Servers_Utils_ServerHelper;
ss.initClass($Pather_Servers_ServerManager, $asm, {});
ss.initClass($Pather_Servers_AuthServer_AuthServer, $asm, {});
ss.initClass($Pather_Servers_Common_ConnectionConstants, $asm, {});
ss.initClass($Pather_Servers_Common_ServerCommunicator, $asm, {
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
ss.initInterface($Pather_Servers_Common_PubSub_IPubSub, $asm, { publish: null, publish$1: null, subscribe: null, init: null, receivedMessage: null });
ss.initClass($Pather_Servers_Common_PubSub_PubSub, $asm, {
	init: function() {
		var deferred = Pather.Common.Utils.Promises.Q.defer();
		this.$subbed = {};
		var redis = require('redis');
		redis.debug_mode = false;
		this.$subClient = redis.createClient(6379, $Pather_Servers_Common_ConnectionConstants.redisIP);
		this.$pubClient = redis.createClient(6379, $Pather_Servers_Common_ConnectionConstants.redisIP);
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
}, null, [$Pather_Servers_Common_PubSub_IPubSub]);
ss.initClass($Pather_Servers_Common_PubSub_PubSubChannels, $asm, {});
ss.initInterface($Pather_Servers_Common_PushPop_IPushPop, $asm, { init: null, push: null, blockingPop: null });
ss.initClass($Pather_Servers_Common_PushPop_PushPop, $asm, {
	init: function() {
		var deferred = Pather.Common.Utils.Promises.Q.defer();
		var redis = require('redis');
		redis.debug_mode = false;
		this.$pushClient = redis.createClient(6379, $Pather_Servers_Common_ConnectionConstants.redisIP);
		this.$popClient = redis.createClient(6379, $Pather_Servers_Common_ConnectionConstants.redisIP);
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
}, null, [$Pather_Servers_Common_PushPop_IPushPop]);
ss.initInterface($Pather_Servers_Common_SocketManager_ISocket, $asm, { on: null, disconnect: null, emit: null });
ss.initInterface($Pather_Servers_Common_SocketManager_ISocketManager, $asm, { init: null, connections: null });
ss.initClass($Pather_Servers_Common_SocketManager_SocketIOManager, $asm, {
	init: function(port) {
		var http = require('http');
		var app = http.createServer(function(req, res) {
			res.end();
		});
		this.$io = socketio.listen(app);
		var networkIPs = $Pather_Servers_Utils_ServerHelper.getNetworkIPs();
		var currentIP = networkIPs[0] + ':' + port;
		var url;
		url = ss.formatString('http://{0}', currentIP);
		console.log('Server URL', url);
		app.listen(port);
	},
	connections: function(action) {
		this.$io.sockets.on('connection', function(socket) {
			action(new $Pather_Servers_Common_SocketManager_SocketIOSocket(socket));
		});
	}
}, null, [$Pather_Servers_Common_SocketManager_ISocketManager]);
ss.initClass($Pather_Servers_Common_SocketManager_SocketIOSocket, $asm, {
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
}, null, [$Pather_Servers_Common_SocketManager_ISocket]);
ss.initClass($Pather_Servers_Database_DatabaseError, $asm, {});
ss.initInterface($Pather_Servers_Database_IDatabaseQueries, $asm, { getUserByToken: null });
ss.initClass($Pather_Servers_Database_DatabaseQueries, $asm, {
	getUserByToken: function(token) {
		var deferred = Pather.Common.Utils.Promises.Q.defer$2($Pather_Servers_Database_DBUser, $Pather_Servers_Database_DatabaseError).call(null);
		setTimeout(function() {
			var $t1 = $Pather_Servers_Database_DBUser.$ctor();
			$t1.userId = token;
			$t1.token = token;
			$t1.x = ss.Int32.trunc(Math.random() * 500);
			$t1.y = ss.Int32.trunc(Math.random() * 500);
			deferred.resolve($t1);
		}, 20);
		return deferred.promise;
	}
}, null, [$Pather_Servers_Database_IDatabaseQueries]);
ss.initClass($Pather_Servers_Database_DBUser, $asm, {});
ss.initClass($Pather_Servers_GameSegment_GameSegment, $asm, {
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
	get_gameSegmentName: function() {
		return this.$1$GameSegmentNameField;
	},
	set_gameSegmentName: function(value) {
		this.$1$GameSegmentNameField = value;
	},
	$ready: function() {
		this.get_pushPop().push(this.get_gameSegmentName(), 1);
	}
});
ss.initClass($Pather_Servers_GameSegment_OldGameServer_GameSegmentUser, $asm, {});
ss.initClass($Pather_Servers_GameSegment_OldGameServer_ServerEntity, $asm, {}, Pather.Common.Entity);
ss.initClass($Pather_Servers_GameSegment_OldGameServer_ServerGame, $asm, {
	createPlayer: function(playerId) {
		return new $Pather_Servers_GameSegment_OldGameServer_ServerEntity(this, playerId);
	},
	tick: function() {
		var tickResult = Pather.Common.Game.prototype.tick.call(this);
		if (tickResult === 2 || tickResult === 3) {
			this.syncLockstep(this.lockstepTickNumber);
		}
		return tickResult;
	}
}, Pather.Common.Game);
ss.initClass($Pather_Servers_GameSegment_OldGameServer_ServerNetworkManager, $asm, {
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
		var player = ss.cast(this.game.createPlayer(model.playerId), $Pather_Servers_GameSegment_OldGameServer_ServerEntity);
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
ss.initClass($Pather_Servers_GameSegment_OldGameServer_ServerStepManager, $asm, {
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
ss.initClass($Pather_Servers_GameSegmentCluster_GameSegmentCluster, $asm, {
	get_pushPop: function() {
		return this.$1$PushPopField;
	},
	set_pushPop: function(value) {
		this.$1$PushPopField = value;
	},
	$pubsubsConnected: function() {
		this.$pubsub.subscribe($Pather_Servers_Common_PubSub_PubSubChannels.gameSegmentCluster + 1, ss.mkdel(this, this.$receiveMessage));
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
	$createGameSegment: function(createGameSegment) {
		console.log('Spawning new game segment');
		var spawn = require('child_process').spawn;
		var fs = require('fs');
		var m = fs.openSync('./out.log', 'a', null);
		var out = fs.openSync('./out.log', 'a', null);
		var err = fs.openSync('./out.log', 'a', null);
		this.get_pushPop().blockingPop(createGameSegment.gameSegmentId, 10).then(ss.mkdel(this, function(content) {
			var $t2 = this.$pubsub;
			var $t3 = $Pather_Servers_Common_PubSub_PubSubChannels.gameWorld;
			var $t1 = Pather.Common.Models.GameWorld.CreateGameSegmentResponseGameWorldPubSubMessage.$ctor();
			$t1.gameSegmentId = createGameSegment.gameSegmentId;
			$t1.messageId = createGameSegment.messageId;
			$t2.publish$1($t3, $t1);
			console.log('Server Created!', createGameSegment.gameSegmentId);
		})).error(function(a) {
			console.log('Server Creation Failed!');
		});
		var child = spawn('node', ['app.js', 'gs', createGameSegment.gameSegmentId], { stdio: [m, out, err] });
		//            child.Unref();
	}
});
ss.initClass($Pather_Servers_GameSegmentCluster_Tests_GameSegmentClusterTest, $asm, {
	createGameSegment: function(testDeferred) {
		var pubSub = new $Pather_Servers_GameSegmentCluster_Tests_StubPubSub();
		var pushPop = new $Pather_Servers_Common_PushPop_PushPop();
		global.$overwiteMethodCallForMocker$(ss.mkdel(pubSub, pubSub.init), function() {
			return Pather.Common.Utils.Promises.Q.resolvedPromise();
		});
		global.$overwiteMethodCallForMocker$(ss.mkdel(pubSub, pubSub.publish$1), function(channel, data) {
		});
		var gts = new $Pather_Servers_GameSegmentCluster_GameSegmentCluster(pubSub, pushPop);
		var $t2 = $Pather_Servers_Common_PubSub_PubSubChannels.gameSegmentCluster + 0;
		var $t1 = Pather.Common.Models.GameSegmentCluster.CreateGameSegmentGameSegmentClusterPubSubMessage.$ctor();
		$t1.type = 0;
		pubSub.receivedMessage($t2, JSON.stringify($t1));
		debugger;
		testDeferred.resolve();
	}
});
ss.initClass($Pather_Servers_GameSegmentCluster_Tests_StubPubSub, $asm, {
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
}, null, [$Pather_Servers_Common_PubSub_IPubSub]);
ss.initClass($Pather_Servers_GameWorldServer_GameSegment, $asm, {
	addUserToSegment: function(gwUser) {
		this.users.push(gwUser);
		gwUser.gameSegment = this;
	}
});
ss.initClass($Pather_Servers_GameWorldServer_GameWorld, $asm, {
	userJoined: function(gatewayChannel, dbUser) {
		var defer = Pather.Common.Utils.Promises.Q.defer$2($Pather_Servers_GameWorldServer_GameWorldUser, $Pather_Servers_GameWorldServer_UserJoinError).call(null);
		var gwUser = new $Pather_Servers_GameWorldServer_GameWorldUser();
		gwUser.userId = dbUser.userId;
		gwUser.x = dbUser.x;
		gwUser.y = dbUser.y;
		gwUser.set_neighbors([]);
		gwUser.gatewayServer = gatewayChannel;
		this.$buildNeighbors(gwUser, 0);
		this.$determineGameSegment(gwUser).then(ss.mkdel(this, function(gameSegment) {
			this.$addUserToSegment(gwUser, gameSegment).then(ss.mkdel(this, function() {
				this.users.push(gwUser);
				console.log('Gameworld has added a new user to game segment', gameSegment.gameSegmentId, 'bring the total number of players to', this.users.length, '. The game segment has', gameSegment.users.length, 'users.');
				defer.resolve(gwUser);
			}));
		}));
		return defer.promise;
	},
	$determineGameSegment: function(gwUser) {
		var deferred = Pather.Common.Utils.Promises.Q.defer$2($Pather_Servers_GameWorldServer_GameSegment, Pather.Common.Utils.Promises.UndefinedPromiseError).call(null);
		if (this.users.length === 0) {
			console.log('Creating new segment.');
			this.createGameSegment().then(function(gameSegment) {
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
		var deferred = Pather.Common.Utils.Promises.Q.defer$2($Pather_Servers_GameWorldServer_GameSegment, Pather.Common.Utils.Promises.UndefinedPromiseError).call(null);
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
		deferred.resolve();
		return deferred.promise;
	},
	createGameSegment: function() {
		var deferred = Pather.Common.Utils.Promises.Q.defer$2($Pather_Servers_GameWorldServer_GameSegment, Pather.Common.Utils.Promises.UndefinedPromiseError).call(null);
		var $t1 = Pather.Common.Models.GameSegmentCluster.CreateGameSegmentGameSegmentClusterPubSubMessage.$ctor();
		$t1.gameSegmentId = 'gamesegment-' + Pather.Common.Common.uniqueId();
		$t1.messageId = Pather.Common.Common.uniqueId();
		var createGameMessage = $t1;
		this.gameWorldPubSub.publishToGameSegmentWithCallback(Pather.Common.Models.GameWorld.CreateGameSegmentResponseGameWorldPubSubMessage).call(this.gameWorldPubSub, createGameMessage).then(ss.mkdel(this, function(createGameMessageResponse) {
			var gs = new $Pather_Servers_GameWorldServer_GameSegment();
			gs.gameSegmentId = createGameMessageResponse.gameSegmentId;
			this.gameSegments.push(gs);
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
			var distance = $Pather_Servers_GameWorldServer_GameWorld.$pointDistance(pUser, cUser);
			if (distance < closestDistance) {
				closestNeighbor = new $Pather_Servers_GameWorldServer_GameWorldNeighbor(cUser, distance);
				closestDistance = distance;
			}
		}
		return closestNeighbor;
	},
	$buildNeighbors: function(pUser, i) {
		var count = this.users.length;
		for (var c = i; c < count; c++) {
			var cUser = this.users[c];
			var distance = $Pather_Servers_GameWorldServer_GameWorld.$pointDistance(pUser, cUser);
			if (distance <= Pather.Common.Constants.neighborDistance) {
				pUser.get_neighbors().push(new $Pather_Servers_GameWorldServer_GameWorldNeighbor(cUser, distance));
				cUser.get_neighbors().push(new $Pather_Servers_GameWorldServer_GameWorldNeighbor(pUser, distance));
			}
		}
	}
});
ss.initClass($Pather_Servers_GameWorldServer_GameWorldNeighbor, $asm, {});
ss.initClass($Pather_Servers_GameWorldServer_GameWorldPubSub, $asm, {
	init: function() {
		this.pubSub.subscribe($Pather_Servers_Common_PubSub_PubSubChannels.gameWorld, ss.mkdel(this, function(message) {
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
		this.pubSub.publish$1($Pather_Servers_Common_PubSub_PubSubChannels.gameSegmentCluster + 1, message);
	},
	publishToGameSegmentWithCallback: function(T) {
		return function(message) {
			var deferred = Pather.Common.Utils.Promises.Q.defer$2(T, Pather.Common.Utils.Promises.UndefinedPromiseError).call(null);
			this.pubSub.publish$1($Pather_Servers_Common_PubSub_PubSubChannels.gameSegmentCluster + 1, message);
			this.deferredMessages.add(message.messageId, deferred);
			return deferred.promise;
		};
	}
});
ss.initClass($Pather_Servers_GameWorldServer_GameWorldServer, $asm, {
	$pubsubReady: function() {
		var gameSegmentClusterPubSub = new $Pather_Servers_GameWorldServer_GameWorldPubSub(this.$pubSub);
		gameSegmentClusterPubSub.init();
		gameSegmentClusterPubSub.message = ss.delegateCombine(gameSegmentClusterPubSub.message, ss.mkdel(this, this.$gameWorldMessage));
		this.gameWorld = new $Pather_Servers_GameWorldServer_GameWorld(gameSegmentClusterPubSub);
	},
	$gameWorldMessage: function(gameworldMessage) {
		switch (gameworldMessage.type) {
			case 0: {
				this.$userJoined(gameworldMessage).then(ss.mkdel(this, function(gwUser) {
					var $t2 = this.$pubSub;
					var $t3 = gwUser.gatewayServer;
					var $t1 = Pather.Common.Models.Gateway.UserJoinedGatewayPubSubMessage.$ctor();
					$t1.gameSegmentId = gwUser.gameSegment.gameSegmentId;
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
		var deferred = Pather.Common.Utils.Promises.Q.defer$2($Pather_Servers_GameWorldServer_GameWorldUser, $Pather_Servers_GameWorldServer_UserJoinError).call(null);
		//query database for user
		this.$databaseQueries.getUserByToken(userJoinedMessage.userToken).then(ss.mkdel(this, function(dbUser) {
			deferred.passPromiseThrough(this.gameWorld.userJoined(userJoinedMessage.gatewayChannel, dbUser));
		}));
		return deferred.promise;
	}
});
ss.initClass($Pather_Servers_GameWorldServer_GameWorldUser, $asm, {
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
ss.initClass($Pather_Servers_GameWorldServer_UserJoinError, $asm, {});
ss.initClass($Pather_Servers_GameWorldServer_Tests_GameWorldServerTests, $asm, {
	userShouldJoin: function(testDeferred) {
		var pubSubTest = global.$instantiateInterface$($Pather_Servers_Common_PubSub_IPubSub);
		var databaseQueriesTest = global.$instantiateInterface$($Pather_Servers_Database_IDatabaseQueries);
		var userId = 'user id';
		global.$overwiteMethodCallForMocker$(ss.mkdel(databaseQueriesTest, databaseQueriesTest.getUserByToken), function(userToken) {
			var deferred = Pather.Common.Utils.Promises.Q.defer$2($Pather_Servers_Database_DBUser, $Pather_Servers_Database_DatabaseError).call(null);
			var $t1 = $Pather_Servers_Database_DBUser.$ctor();
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
			Pather.Common.TestFramework.DeferredAssert.that(testDeferred, channel).get_does().equal($Pather_Servers_Common_PubSub_PubSubChannels.gameWorld);
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
		var gws = new $Pather_Servers_GameWorldServer_GameWorldServer(pubSubTest, databaseQueriesTest);
	}
});
ss.initClass($Pather_Servers_GatewayServer_$GatewayUser, $asm, {
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
ss.initClass($Pather_Servers_GatewayServer_GatewayServer, $asm, {
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
			var $t4 = new $Pather_Servers_GatewayServer_$GatewayUser();
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
				var $t9 = $Pather_Servers_Common_PubSub_PubSubChannels.gameWorld;
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
ss.initClass($Pather_Servers_GatewayServer_Tests_GatewayServerTests, $asm, {
	userShouldJoinFromGateway: function(testDeferred) {
		var userToken = 'abcdef';
		var publishData = null;
		var sendMessageToGameWorld = null;
		var socketManager = global.$instantiateInterface$($Pather_Servers_Common_SocketManager_ISocketManager);
		global.$overwiteMethodCallForMocker$(ss.mkdel(socketManager, socketManager.init), function() {
		});
		global.$overwiteMethodCallForMocker$(ss.mkdel(socketManager, socketManager.connections), function(callback) {
			var socket = global.$instantiateInterface$($Pather_Servers_Common_SocketManager_ISocket);
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
		var pubSub = global.$instantiateInterface$($Pather_Servers_Common_PubSub_IPubSub);
		global.$overwiteMethodCallForMocker$(ss.mkdel(pubSub, pubSub.init), function() {
			return Pather.Common.Utils.Promises.Q.resolvedPromise();
		});
		global.$overwiteMethodCallForMocker$(ss.mkdel(pubSub, pubSub.subscribe), function(channel1, callback1) {
			publishData = ss.delegateCombine(publishData, function(pchannel, pmessage) {
				pubSub.receivedMessage(channel1, JSON.stringify(pmessage));
			});
		});
		global.$overwiteMethodCallForMocker$(ss.mkdel(pubSub, pubSub.publish$1), function(channel2, data) {
			if (ss.referenceEquals(channel2, $Pather_Servers_Common_PubSub_PubSubChannels.gameWorld)) {
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
		var gts = new $Pather_Servers_GatewayServer_GatewayServer(pubSub, socketManager);
		gatewayName = gts.gatewayName;
		var pubSubTest = global.$instantiateInterface$($Pather_Servers_Common_PubSub_IPubSub);
		var databaseQueriesTest = global.$instantiateInterface$($Pather_Servers_Database_IDatabaseQueries);
		global.$overwiteMethodCallForMocker$(ss.mkdel(databaseQueriesTest, databaseQueriesTest.getUserByToken), function(utoken) {
			var deferred = Pather.Common.Utils.Promises.Q.defer$2($Pather_Servers_Database_DBUser, $Pather_Servers_Database_DatabaseError).call(null);
			var $t3 = $Pather_Servers_Database_DBUser.$ctor();
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
		var gws = new $Pather_Servers_GameWorldServer_GameWorldServer(pubSubTest, databaseQueriesTest);
	}
});
ss.initClass($Pather_Servers_TickServer_TickManager, $asm, {
	init: function(currentLockstepTickNumber) {
		this.lockstepTickNumber = currentLockstepTickNumber;
		this.curLockstepTime = (new Date()).getTime();
		setTimeout(ss.mkdel(this, this.$tick), 1);
	},
	$tick: function() {
		setTimeout(ss.mkdel(this, this.$tick), 1);
		var vc = (new Date()).getTime();
		var l = vc - this.curLockstepTime;
		while (l > Pather.Common.Constants.lockstepTicks) {
			l -= Pather.Common.Constants.lockstepTicks;
			this.curLockstepTime += Pather.Common.Constants.lockstepTicks;
			this.lockstepTickNumber++;
			console.log('Lockstep', this.lockstepTickNumber, (new Date()).getTime());
			this.$processLockstep(this.lockstepTickNumber);
		}
	},
	$processLockstep: function(lockstepTickNumber) {
		if (lockstepTickNumber % 15 === 0) {
			this.tickPubSub.publishToAllGameSegments(Pather.Common.Models.GameSegment.TickSyncGameSegmentPubSubMessage.$ctor(lockstepTickNumber));
			this.tickPubSub.publishToAllGateways(Pather.Common.Models.Gateway.TickSyncGatewayPubSubMessage.$ctor(lockstepTickNumber));
			this.tickPubSub.publishToGameWorld(Pather.Common.Models.GameWorld.TickSyncGameWorldPubSubMessage.$ctor(lockstepTickNumber));
		}
	}
});
ss.initClass($Pather_Servers_TickServer_TickPubSub, $asm, {
	init: function() {
		var deferred = Pather.Common.Utils.Promises.Q.defer();
		this.pubSub.subscribe($Pather_Servers_Common_PubSub_PubSubChannels.tick, ss.mkdel(this, function(message) {
			var tickPubSubMessage = JSON.parse(message);
			this.onMessage(tickPubSubMessage);
		}));
		deferred.resolve();
		return deferred.promise;
	},
	publishToAllGameSegments: function(message) {
		//todo test if its faster for redis to have one "tick" subscription for all relevent clients or not
		this.pubSub.publish$1($Pather_Servers_Common_PubSub_PubSubChannels.gameSegment, message);
	},
	publishToAllGateways: function(message) {
		//todo test if its faster for redis to have one "tick" subscription for all relevent clients or not
		this.pubSub.publish$1($Pather_Servers_Common_PubSub_PubSubChannels.gateway, message);
	},
	publishToGameWorld: function(message) {
		//todo test if its faster for redis to have one "tick" subscription for all relevent clients or not
		this.pubSub.publish$1($Pather_Servers_Common_PubSub_PubSubChannels.gameWorld, message);
	},
	publishToOrigin: function(origin, message) {
		this.pubSub.publish$1(origin, message);
	}
});
ss.initClass($Pather_Servers_TickServer_TickServer, $asm, {
	$ready: function() {
		this.tickManager = new $Pather_Servers_TickServer_TickManager(this.tickPubSub);
		this.tickManager.init(0);
		this.tickPubSub.onMessage = ss.delegateCombine(this.tickPubSub.onMessage, ss.mkdel(this, this.$pubSubMessage));
	},
	$pubSubMessage: function(message) {
		switch (message.type) {
			case 0: {
				var pingMessage = message;
				this.tickPubSub.publishToOrigin(pingMessage.origin, null);
				break;
			}
			default: {
				throw new ss.ArgumentOutOfRangeException();
			}
		}
	}
});
ss.initClass($Pather_Servers_Utils_ServerHelper, $asm, {});
ss.setMetadata($Pather_Servers_GameSegmentCluster_Tests_GameSegmentClusterTest, { attr: [new Pather.Common.TestFramework.TestClassAttribute()], members: [{ attr: [new Pather.Common.TestFramework.TestMethodAttribute()], name: 'CreateGameSegment', type: 8, sname: 'createGameSegment', returnType: Object, params: [Pather.Common.Utils.Promises.Deferred] }] });
ss.setMetadata($Pather_Servers_GameWorldServer_Tests_GameWorldServerTests, { attr: [new Pather.Common.TestFramework.TestClassAttribute()], members: [{ attr: [new Pather.Common.TestFramework.TestMethodAttribute()], name: 'UserShouldJoin', type: 8, sname: 'userShouldJoin', returnType: Object, params: [Pather.Common.Utils.Promises.Deferred] }] });
ss.setMetadata($Pather_Servers_GatewayServer_Tests_GatewayServerTests, { attr: [new Pather.Common.TestFramework.TestClassAttribute()], members: [{ attr: [new Pather.Common.TestFramework.TestMethodAttribute()], name: 'UserShouldJoinFromGateway', type: 8, sname: 'userShouldJoinFromGateway', returnType: Object, params: [Pather.Common.Utils.Promises.Deferred] }] });
(function() {
	$Pather_Servers_Common_PubSub_PubSubChannels.tick = 'Tick';
	$Pather_Servers_Common_PubSub_PubSubChannels.gameWorld = 'GameWorld';
	$Pather_Servers_Common_PubSub_PubSubChannels.gameSegmentCluster = 'GameSegmentCluster';
	$Pather_Servers_Common_PubSub_PubSubChannels.gameSegment = 'GameSegment';
	$Pather_Servers_Common_PubSub_PubSubChannels.gateway = 'Gateway';
})();
(function() {
	$Pather_Servers_Common_ConnectionConstants.redisIP = '127.0.0.1';
})();
$Pather_Servers_ServerManager.main();