'use strict';

var socketio = require('socket.io');
var $asm = {};
global.Pather = global.Pather || {};
global.Pather.Servers = global.Pather.Servers || {};
global.Pather.Servers.AuthServer = global.Pather.Servers.AuthServer || {};
global.Pather.Servers.ClusterManager = global.Pather.Servers.ClusterManager || {};
global.Pather.Servers.ClusterManager.Tests = global.Pather.Servers.ClusterManager.Tests || {};
global.Pather.Servers.Common = global.Pather.Servers.Common || {};
global.Pather.Servers.Common.PubSub = global.Pather.Servers.Common.PubSub || {};
global.Pather.Servers.Common.PushPop = global.Pather.Servers.Common.PushPop || {};
global.Pather.Servers.Common.ServerLogging = global.Pather.Servers.Common.ServerLogging || {};
global.Pather.Servers.Common.SocketManager = global.Pather.Servers.Common.SocketManager || {};
global.Pather.Servers.Common.Tests = global.Pather.Servers.Common.Tests || {};
global.Pather.Servers.Database = global.Pather.Servers.Database || {};
global.Pather.Servers.GameSegmentServer = global.Pather.Servers.GameSegmentServer || {};
global.Pather.Servers.GameSegmentServer.Logger = global.Pather.Servers.GameSegmentServer.Logger || {};
global.Pather.Servers.GameSegmentServer.Old = global.Pather.Servers.GameSegmentServer.Old || {};
global.Pather.Servers.GameWorldServer = global.Pather.Servers.GameWorldServer || {};
global.Pather.Servers.GameWorldServer.Models = global.Pather.Servers.GameWorldServer.Models || {};
global.Pather.Servers.GameWorldServer.Tests = global.Pather.Servers.GameWorldServer.Tests || {};
global.Pather.Servers.GatewayServer = global.Pather.Servers.GatewayServer || {};
global.Pather.Servers.GatewayServer.Tests = global.Pather.Servers.GatewayServer.Tests || {};
global.Pather.Servers.HeadServer = global.Pather.Servers.HeadServer || {};
global.Pather.Servers.HeadServer.Models = global.Pather.Servers.HeadServer.Models || {};
global.Pather.Servers.Libraries = global.Pather.Servers.Libraries || {};
global.Pather.Servers.Libraries.RTree = global.Pather.Servers.Libraries.RTree || {};
global.Pather.Servers.MonitorServer = global.Pather.Servers.MonitorServer || {};
global.Pather.Servers.ServerManager = global.Pather.Servers.ServerManager || {};
global.Pather.Servers.TickServer = global.Pather.Servers.TickServer || {};
global.Pather.Servers.Utils = global.Pather.Servers.Utils || {};
ss.initAssembly($asm, 'Pather.Servers');
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.ServerStarter
var $Pather_Servers_ServerStarter = function() {
};
$Pather_Servers_ServerStarter.__typeName = 'Pather.Servers.ServerStarter';
$Pather_Servers_ServerStarter.main = function() {
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
			case 'all': {
				$Pather_Servers_ServerStarter.$createTickServer();
				$Pather_Servers_ServerStarter.$createMonitorServer();
				$Pather_Servers_ServerStarter.$createAuthServer();
				$Pather_Servers_ServerStarter.$createServerManager();
				$Pather_Servers_ServerStarter.$createGameWorldServer();
				$Pather_Servers_ServerStarter.$createHeadServer();
				break;
			}
			case 'gt':
			case 'gateway': {
				$Pather_Servers_ServerStarter.$createGatewayServer(global.process.argv[3], parseInt(global.process.argv[4]));
				break;
			}
			case 'au':
			case 'auth': {
				$Pather_Servers_ServerStarter.$createAuthServer();
				break;
			}
			case 'm':
			case 'monitor': {
				$Pather_Servers_ServerStarter.$createMonitorServer();
				break;
			}
			case 'h':
			case 'head': {
				$Pather_Servers_ServerStarter.$createHeadServer();
				break;
			}
			case 'cm':
			case 'clustermanager': {
				$Pather_Servers_ServerStarter.$createClusterManagerServer(global.process.argv[3]);
				break;
			}
			case 'gs':
			case 'gamesegment': {
				$Pather_Servers_ServerStarter.$createGameSegmentServer(global.process.argv[3]);
				break;
			}
			case 'sm':
			case 'servermanager': {
				$Pather_Servers_ServerStarter.$createServerManager();
				break;
			}
			case 'gw':
			case 'gameworld': {
				$Pather_Servers_ServerStarter.$createGameWorldServer();
				break;
			}
			case 't':
			case 'tick': {
				$Pather_Servers_ServerStarter.$createTickServer();
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
$Pather_Servers_ServerStarter.$createServerManager = function() {
	new $Pather_Servers_ServerManager_ServerManager(new $Pather_Servers_Common_PubSub_PubSub(), new $Pather_Servers_Common_PushPop_PushPop());
};
$Pather_Servers_ServerStarter.$createTickServer = function() {
	new $Pather_Servers_TickServer_TickServer(new $Pather_Servers_Common_PubSub_PubSub());
};
$Pather_Servers_ServerStarter.$createGameWorldServer = function() {
	new $Pather_Servers_GameWorldServer_GameWorldServer(new $Pather_Servers_Common_PubSub_PubSub(), new $Pather_Servers_Database_DatabaseQueries());
};
$Pather_Servers_ServerStarter.$createGameSegmentServer = function(gameSegmentId) {
	new $Pather_Servers_GameSegmentServer_GameSegmentServer(new $Pather_Servers_Common_PubSub_PubSub(), new $Pather_Servers_Common_PushPop_PushPop(), gameSegmentId);
};
$Pather_Servers_ServerStarter.$createClusterManagerServer = function(clusterManagerId) {
	new $Pather_Servers_ClusterManager_ClusterManager(new $Pather_Servers_Common_PubSub_PubSub(), new $Pather_Servers_Common_PushPop_PushPop(), clusterManagerId);
};
$Pather_Servers_ServerStarter.$createHeadServer = function() {
	new $Pather_Servers_HeadServer_HeadServer(new $Pather_Servers_Common_PubSub_PubSub());
};
$Pather_Servers_ServerStarter.$createMonitorServer = function() {
	new $Pather_Servers_MonitorServer_MonitorServer();
};
$Pather_Servers_ServerStarter.$createAuthServer = function() {
	new $Pather_Servers_AuthServer_AuthServer();
};
$Pather_Servers_ServerStarter.$createGatewayServer = function(gatewayId, port) {
	new $Pather_Servers_GatewayServer_GatewayServer(new $Pather_Servers_Common_PubSub_PubSub(), new $Pather_Servers_Common_PushPop_PushPop(), new $Pather_Servers_Common_SocketManager_SocketIOManager(), gatewayId, port);
};
global.Pather.Servers.ServerStarter = $Pather_Servers_ServerStarter;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.AuthServer.AuthServer
var $Pather_Servers_AuthServer_AuthServer = function() {
	$Pather_Servers_Common_ServerLogging_ServerLogger.initLogger('Auth', '0');
};
$Pather_Servers_AuthServer_AuthServer.__typeName = 'Pather.Servers.AuthServer.AuthServer';
global.Pather.Servers.AuthServer.AuthServer = $Pather_Servers_AuthServer_AuthServer;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.ClusterManager.ClusterManager
var $Pather_Servers_ClusterManager_ClusterManager = function(pubsub, pushPop, clusterManagerId) {
	this.pushPop = null;
	this.clusterManagerPubSub = null;
	this.clusterManagerId = null;
	this.$pubsub = null;
	$Pather_Servers_Common_ServerLogging_ServerLogger.initLogger('ClusterManager', clusterManagerId);
	this.pushPop = pushPop;
	this.clusterManagerId = clusterManagerId;
	this.$pubsub = pubsub;
	Pather.Common.Utils.Promises.Q.all([pubsub.init(6379), pushPop.init()]).then(ss.mkdel(this, this.$pubsubsConnected));
};
$Pather_Servers_ClusterManager_ClusterManager.__typeName = 'Pather.Servers.ClusterManager.ClusterManager';
global.Pather.Servers.ClusterManager.ClusterManager = $Pather_Servers_ClusterManager_ClusterManager;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.ClusterManager.ClusterManagerPubSub
var $Pather_Servers_ClusterManager_ClusterManagerPubSub = function(pubSub, clusterManagerId) {
	this.clusterManagerId = null;
	this.pubSub = null;
	this.onMessage = null;
	this.clusterManagerId = clusterManagerId;
	this.pubSub = pubSub;
};
$Pather_Servers_ClusterManager_ClusterManagerPubSub.__typeName = 'Pather.Servers.ClusterManager.ClusterManagerPubSub';
global.Pather.Servers.ClusterManager.ClusterManagerPubSub = $Pather_Servers_ClusterManager_ClusterManagerPubSub;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.ClusterManager.Tests.ClusterManagerTest
var $Pather_Servers_ClusterManager_Tests_ClusterManagerTest = function() {
};
$Pather_Servers_ClusterManager_Tests_ClusterManagerTest.__typeName = 'Pather.Servers.ClusterManager.Tests.ClusterManagerTest';
global.Pather.Servers.ClusterManager.Tests.ClusterManagerTest = $Pather_Servers_ClusterManager_Tests_ClusterManagerTest;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.Common.BackEndTickManager
var $Pather_Servers_Common_BackEndTickManager = function() {
	this.$lastPing = 0;
	this.$pingSent = null;
	this.$sendPing = null;
	this.$onTickManagerReady = null;
	this.$hasLockstep = false;
	this.$hasLatency = false;
	this.$tickManagerInitialized = false;
	Pather.Common.Utils.TickManager.call(this);
};
$Pather_Servers_Common_BackEndTickManager.__typeName = 'Pather.Servers.Common.BackEndTickManager';
global.Pather.Servers.Common.BackEndTickManager = $Pather_Servers_Common_BackEndTickManager;
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
// Pather.Servers.Common.TickWatcher
var $Pather_Servers_Common_TickWatcher = function() {
	this.$counter = 0;
	this.$startTime = 0;
	this.$startTime = (new Date()).getTime();
	this.$setTimout();
};
$Pather_Servers_Common_TickWatcher.__typeName = 'Pather.Servers.Common.TickWatcher';
global.Pather.Servers.Common.TickWatcher = $Pather_Servers_Common_TickWatcher;
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
	this.$dontLog = false;
	this.$channelCacheDict = {};
	this.$channelCache = [];
};
$Pather_Servers_Common_PubSub_PubSub.__typeName = 'Pather.Servers.Common.PubSub.PubSub';
global.Pather.Servers.Common.PubSub.PubSub = $Pather_Servers_Common_PubSub_PubSub;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.Common.PubSub.PubSubChannels
var $Pather_Servers_Common_PubSub_PubSubChannels = function() {
};
$Pather_Servers_Common_PubSub_PubSubChannels.__typeName = 'Pather.Servers.Common.PubSub.PubSubChannels';
$Pather_Servers_Common_PubSub_PubSubChannels.tick = function() {
	return $Pather_Servers_Common_PubSub_PubSubChannels.$tick;
};
$Pather_Servers_Common_PubSub_PubSubChannels.gameWorld = function() {
	return $Pather_Servers_Common_PubSub_PubSubChannels.$gameWorld;
};
$Pather_Servers_Common_PubSub_PubSubChannels.clusterManager$1 = function(clusterManagerId) {
	return $Pather_Servers_Common_PubSub_PubSubChannels.$clusterManager + clusterManagerId;
};
$Pather_Servers_Common_PubSub_PubSubChannels.clusterManager = function() {
	return $Pather_Servers_Common_PubSub_PubSubChannels.$clusterManager;
};
$Pather_Servers_Common_PubSub_PubSubChannels.gameSegment$1 = function(gameSegmentId) {
	return $Pather_Servers_Common_PubSub_PubSubChannels.$gameSegment + gameSegmentId;
};
$Pather_Servers_Common_PubSub_PubSubChannels.gameSegment = function() {
	return $Pather_Servers_Common_PubSub_PubSubChannels.$gameSegment;
};
$Pather_Servers_Common_PubSub_PubSubChannels.gateway$1 = function(gatewayId) {
	return $Pather_Servers_Common_PubSub_PubSubChannels.$gateway + gatewayId;
};
$Pather_Servers_Common_PubSub_PubSubChannels.gateway = function() {
	return $Pather_Servers_Common_PubSub_PubSubChannels.$gateway;
};
$Pather_Servers_Common_PubSub_PubSubChannels.serverLogger = function(serverType) {
	return $Pather_Servers_Common_PubSub_PubSubChannels.$serverLogger + serverType;
};
$Pather_Servers_Common_PubSub_PubSubChannels.gameSegmentLogger = function() {
	return $Pather_Servers_Common_PubSub_PubSubChannels.$gameSegmentLogger;
};
$Pather_Servers_Common_PubSub_PubSubChannels.head = function() {
	return $Pather_Servers_Common_PubSub_PubSubChannels.$headServer;
};
$Pather_Servers_Common_PubSub_PubSubChannels.serverManager = function() {
	return $Pather_Servers_Common_PubSub_PubSubChannels.$serverManager;
};
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
// Pather.Servers.Common.ServerLogging.GameSegmentLogListener
var $Pather_Servers_Common_ServerLogging_GameSegmentLogListener = function(callback) {
	this.$pubsub = null;
	this.$pubsub = new $Pather_Servers_Common_PubSub_PubSub();
	this.$pubsub.dontLog();
	this.$pubsub.init(6380).then(ss.mkdel(this, function() {
		this.$pubsub.subscribe($Pather_Servers_Common_PubSub_PubSubChannels.gameSegmentLogger(), function(content) {
			callback(content);
		});
	}));
};
$Pather_Servers_Common_ServerLogging_GameSegmentLogListener.__typeName = 'Pather.Servers.Common.ServerLogging.GameSegmentLogListener';
global.Pather.Servers.Common.ServerLogging.GameSegmentLogListener = $Pather_Servers_Common_ServerLogging_GameSegmentLogListener;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.Common.ServerLogging.ServerLogger
var $Pather_Servers_Common_ServerLogging_ServerLogger = function() {
};
$Pather_Servers_Common_ServerLogging_ServerLogger.__typeName = 'Pather.Servers.Common.ServerLogging.ServerLogger';
$Pather_Servers_Common_ServerLogging_ServerLogger.initLogger = function(serverType, serverName) {
	$Pather_Servers_Common_ServerLogging_ServerLogger.$serverName = serverName;
	$Pather_Servers_Common_ServerLogging_ServerLogger.$serverType = serverType;
	$Pather_Servers_Common_ServerLogging_ServerLogger.$pubsub = new $Pather_Servers_Common_PubSub_PubSub();
	$Pather_Servers_Common_ServerLogging_ServerLogger.$pubsub.dontLog();
	$Pather_Servers_Common_ServerLogging_ServerLogger.$pubsub.init(6380).then(function() {
		setInterval(function() {
			$Pather_Servers_Common_ServerLogging_ServerLogger.logKeepAlive();
		}, 500);
	});
};
$Pather_Servers_Common_ServerLogging_ServerLogger.logInformation = function(item, jsonContent) {
	Pather.Common.Utils.Logger.log(item, 'information');
	//            pubsub.Publish(PubSubChannels.ServerLogger(ServerType), new ServerLogMessage(ServerType, ServerName, item, jsonContent, LogLevel.Information, DateTime.Now));
};
$Pather_Servers_Common_ServerLogging_ServerLogger.logDebug = function(item, jsonContent) {
	Pather.Common.Utils.Logger.log(item, 'debugInformation');
	//            pubsub.Publish(PubSubChannels.ServerLogger(ServerType), new ServerLogMessage(ServerType, ServerName, item, jsonContent, LogLevel.DebugInformation, DateTime.Now));
};
$Pather_Servers_Common_ServerLogging_ServerLogger.logKeepAlive = function() {
	//            pubsub.Publish(PubSubChannels.ServerLogger(ServerType), new ServerLogMessage(ServerType, ServerName, null, null, LogLevel.KeepAlive, DateTime.Now));
};
$Pather_Servers_Common_ServerLogging_ServerLogger.logError = function(item, jsonContent) {
	Pather.Common.Utils.Logger.log(item, 'error');
	//            pubsub.Publish(PubSubChannels.ServerLogger(ServerType), new ServerLogMessage(ServerType, ServerName, item, jsonContent, LogLevel.Error, DateTime.Now));
};
$Pather_Servers_Common_ServerLogging_ServerLogger.logTransport = function(item, jsonContent) {
	Pather.Common.Utils.Logger.log(item, 'transportInfo');
	//            pubsub.Publish(PubSubChannels.ServerLogger(ServerType), new ServerLogMessage(ServerType, ServerName, item, jsonContent, LogLevel.TransportInfo, DateTime.Now));
};
$Pather_Servers_Common_ServerLogging_ServerLogger.logData = function(item, jsonContent) {
	Pather.Common.Utils.Logger.log(item, 'dataInfo');
	//            pubsub.Publish(PubSubChannels.ServerLogger(ServerType), new ServerLogMessage(ServerType, ServerName, item, jsonContent, LogLevel.DataInfo, DateTime.Now));
};
global.Pather.Servers.Common.ServerLogging.ServerLogger = $Pather_Servers_Common_ServerLogging_ServerLogger;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.Common.ServerLogging.ServerLogListener
var $Pather_Servers_Common_ServerLogging_ServerLogListener = function(serverTypes, callback) {
	this.$pubsub = null;
	this.$pubsub = new $Pather_Servers_Common_PubSub_PubSub();
	this.$pubsub.dontLog();
	this.$pubsub.init(6380).then(ss.mkdel(this, function() {
		for (var $t1 = 0; $t1 < serverTypes.length; $t1++) {
			var serverType = serverTypes[$t1];
			this.$pubsub.subscribe($Pather_Servers_Common_PubSub_PubSubChannels.serverLogger(serverType), function(content) {
				callback(content);
			});
		}
	}));
};
$Pather_Servers_Common_ServerLogging_ServerLogListener.__typeName = 'Pather.Servers.Common.ServerLogging.ServerLogListener';
global.Pather.Servers.Common.ServerLogging.ServerLogListener = $Pather_Servers_Common_ServerLogging_ServerLogListener;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.Common.ServerLogging.ServerLogMessage
var $Pather_Servers_Common_ServerLogging_ServerLogMessage = function() {
};
$Pather_Servers_Common_ServerLogging_ServerLogMessage.__typeName = 'Pather.Servers.Common.ServerLogging.ServerLogMessage';
global.Pather.Servers.Common.ServerLogging.ServerLogMessage = $Pather_Servers_Common_ServerLogging_ServerLogMessage;
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
	this.$url = null;
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
// Pather.Servers.Common.Tests.StubPubSub
var $Pather_Servers_Common_Tests_StubPubSub = function() {
	this.$channels = new (ss.makeGenericType(ss.Dictionary$2, [String, Function]))();
};
$Pather_Servers_Common_Tests_StubPubSub.__typeName = 'Pather.Servers.Common.Tests.StubPubSub';
global.Pather.Servers.Common.Tests.StubPubSub = $Pather_Servers_Common_Tests_StubPubSub;
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
// Pather.Servers.GameSegmentServer.GameSegment
var $Pather_Servers_GameSegmentServer_GameSegment = function(gameSegmentId) {
	this.users = {};
	this.gameSegmentId = null;
	this.gameSegmentId = gameSegmentId;
};
$Pather_Servers_GameSegmentServer_GameSegment.__typeName = 'Pather.Servers.GameSegmentServer.GameSegment';
global.Pather.Servers.GameSegmentServer.GameSegment = $Pather_Servers_GameSegmentServer_GameSegment;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameSegmentServer.GameSegmentPubSub
var $Pather_Servers_GameSegmentServer_GameSegmentPubSub = function(pubSub, gameSegmentId) {
	this.gameSegmentId = null;
	this.pubSub = null;
	this.onMessage = null;
	this.onAllMessage = null;
	this.deferredMessages = new (ss.makeGenericType(ss.Dictionary$2, [String, ss.makeGenericType(Pather.Common.Utils.Promises.Deferred$2, [Object, Pather.Common.Utils.Promises.UndefinedPromiseError])]))();
	this.gameSegmentId = gameSegmentId;
	this.pubSub = pubSub;
};
$Pather_Servers_GameSegmentServer_GameSegmentPubSub.__typeName = 'Pather.Servers.GameSegmentServer.GameSegmentPubSub';
global.Pather.Servers.GameSegmentServer.GameSegmentPubSub = $Pather_Servers_GameSegmentServer_GameSegmentPubSub;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameSegmentServer.GameSegmentServer
var $Pather_Servers_GameSegmentServer_GameSegmentServer = function(pubsub, pushPop, gameSegmentId) {
	this.$pubsub = null;
	this.$pushPop = null;
	this.$gameSegmentId = null;
	this.gameSegmentPubSub = null;
	this.$gameManager = null;
	//            GameSegmentLogger.InitLogger(gameSegmentId);
	$Pather_Servers_Common_ServerLogging_ServerLogger.initLogger('GameSegment', gameSegmentId);
	this.$pubsub = pubsub;
	this.$pushPop = pushPop;
	this.$gameSegmentId = gameSegmentId;
	//Global.SetInterval(() => { Global.Console.Log("keep alive " + new DateTime().ToString().Substring(17, 24)); }, 10 * 1000);
	//var game = new ServerGame(socketManager, gameServerName);
	//game.Init();
	Pather.Common.Utils.Promises.Q.all([pubsub.init(6379), pushPop.init()]).then(ss.mkdel(this, function() {
		this.gameSegmentPubSub = new $Pather_Servers_GameSegmentServer_GameSegmentPubSub(this.$pubsub, this.$gameSegmentId);
		this.gameSegmentPubSub.onAllMessage = ss.delegateCombine(this.gameSegmentPubSub.onAllMessage, ss.mkdel(this, this.$onAllMessage));
		this.$gameManager = new $Pather_Servers_GameSegmentServer_ServerGameManager(this.$gameSegmentId, this.gameSegmentPubSub);
		this.$gameManager.registerGameSegmentWithCluster = ss.delegateCombine(this.$gameManager.registerGameSegmentWithCluster, ss.mkdel(this, this.$registerGameSegmentWithCluster));
		this.$gameManager.init();
	}));
};
$Pather_Servers_GameSegmentServer_GameSegmentServer.__typeName = 'Pather.Servers.GameSegmentServer.GameSegmentServer';
global.Pather.Servers.GameSegmentServer.GameSegmentServer = $Pather_Servers_GameSegmentServer_GameSegmentServer;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameSegmentServer.IServerGameEntity
var $Pather_Servers_GameSegmentServer_IServerGameEntity = function() {
};
$Pather_Servers_GameSegmentServer_IServerGameEntity.__typeName = 'Pather.Servers.GameSegmentServer.IServerGameEntity';
global.Pather.Servers.GameSegmentServer.IServerGameEntity = $Pather_Servers_GameSegmentServer_IServerGameEntity;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameSegmentServer.ServerGame
var $Pather_Servers_GameSegmentServer_ServerGame = function(gameManager, tickManager) {
	this.$gameManager = null;
	Pather.Common.GameFramework.Game.call(this, tickManager);
	this.$gameManager = gameManager;
	this.stepManager = new Pather.Common.GameFramework.StepManager(this);
	tickManager.onProcessLockstep = ss.delegateCombine(tickManager.onProcessLockstep, ss.mkdel(this.stepManager, this.stepManager.processAction));
};
$Pather_Servers_GameSegmentServer_ServerGame.__typeName = 'Pather.Servers.GameSegmentServer.ServerGame';
$Pather_Servers_GameSegmentServer_ServerGame.$pointDistance = function(pUser, cUser) {
	var mx = pUser.squareX;
	var my = pUser.squareY;
	var cx = cUser.squareX;
	var cy = cUser.squareY;
	var x = cx - mx;
	var y = cy - my;
	var dis = Math.sqrt(x * x + y * y);
	return dis;
};
global.Pather.Servers.GameSegmentServer.ServerGame = $Pather_Servers_GameSegmentServer_ServerGame;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameSegmentServer.ServerGameManager
var $Pather_Servers_GameSegmentServer_ServerGameManager = function(gameSegmentId, gameSegmentPubSub) {
	this.myGameSegment = null;
	this.$gameSegmentPubSub = null;
	this.$backEndTickManager = null;
	this.$serverGame = null;
	this.gameSegmentId = null;
	this.allGameSegments = null;
	this.onReady = null;
	this.registerGameSegmentWithCluster = null;
	this.gameSegmentId = gameSegmentId;
	this.$gameSegmentPubSub = gameSegmentPubSub;
	this.allGameSegments = {};
	this.$backEndTickManager = new $Pather_Servers_Common_BackEndTickManager();
	this.$serverGame = new $Pather_Servers_GameSegmentServer_ServerGame(this, this.$backEndTickManager);
};
$Pather_Servers_GameSegmentServer_ServerGameManager.__typeName = 'Pather.Servers.GameSegmentServer.ServerGameManager';
global.Pather.Servers.GameSegmentServer.ServerGameManager = $Pather_Servers_GameSegmentServer_ServerGameManager;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameSegmentServer.ServerGameUser
var $Pather_Servers_GameSegmentServer_ServerGameUser = function(game, userId) {
	this.gameSegment = null;
	this.gatewayId = null;
	this.animations = null;
	Pather.Common.GameFramework.GameUser.call(this, game, userId);
	this.animations = [];
};
$Pather_Servers_GameSegmentServer_ServerGameUser.__typeName = 'Pather.Servers.GameSegmentServer.ServerGameUser';
global.Pather.Servers.GameSegmentServer.ServerGameUser = $Pather_Servers_GameSegmentServer_ServerGameUser;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameSegmentServer.Logger.GameSegmentLogMessage
var $Pather_Servers_GameSegmentServer_Logger_GameSegmentLogMessage = function() {
};
$Pather_Servers_GameSegmentServer_Logger_GameSegmentLogMessage.__typeName = 'Pather.Servers.GameSegmentServer.Logger.GameSegmentLogMessage';
$Pather_Servers_GameSegmentServer_Logger_GameSegmentLogMessage.$ctor = function() {
	var $this = {};
	$this.type = null;
	return $this;
};
global.Pather.Servers.GameSegmentServer.Logger.GameSegmentLogMessage = $Pather_Servers_GameSegmentServer_Logger_GameSegmentLogMessage;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameSegmentServer.Logger.GameSegmentLogMessageContent
var $Pather_Servers_GameSegmentServer_Logger_GameSegmentLogMessageContent = function() {
};
$Pather_Servers_GameSegmentServer_Logger_GameSegmentLogMessageContent.__typeName = 'Pather.Servers.GameSegmentServer.Logger.GameSegmentLogMessageContent';
global.Pather.Servers.GameSegmentServer.Logger.GameSegmentLogMessageContent = $Pather_Servers_GameSegmentServer_Logger_GameSegmentLogMessageContent;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameSegmentServer.Logger.GameSegmentLogMessageType
var $Pather_Servers_GameSegmentServer_Logger_GameSegmentLogMessageType = function() {
};
$Pather_Servers_GameSegmentServer_Logger_GameSegmentLogMessageType.__typeName = 'Pather.Servers.GameSegmentServer.Logger.GameSegmentLogMessageType';
global.Pather.Servers.GameSegmentServer.Logger.GameSegmentLogMessageType = $Pather_Servers_GameSegmentServer_Logger_GameSegmentLogMessageType;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameSegmentServer.Logger.KeepAlive_GameSegmentLogMessage
var $Pather_Servers_GameSegmentServer_Logger_KeepAlive_GameSegmentLogMessage = function() {
};
$Pather_Servers_GameSegmentServer_Logger_KeepAlive_GameSegmentLogMessage.__typeName = 'Pather.Servers.GameSegmentServer.Logger.KeepAlive_GameSegmentLogMessage';
$Pather_Servers_GameSegmentServer_Logger_KeepAlive_GameSegmentLogMessage.createInstance = function() {
	return $Pather_Servers_GameSegmentServer_Logger_KeepAlive_GameSegmentLogMessage.$ctor();
};
$Pather_Servers_GameSegmentServer_Logger_KeepAlive_GameSegmentLogMessage.$ctor = function() {
	var $this = $Pather_Servers_GameSegmentServer_Logger_GameSegmentLogMessage.$ctor();
	$this.type = 'keepAlive';
	return $this;
};
global.Pather.Servers.GameSegmentServer.Logger.KeepAlive_GameSegmentLogMessage = $Pather_Servers_GameSegmentServer_Logger_KeepAlive_GameSegmentLogMessage;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameSegmentServer.Logger.TellUserMoved_GameSegmentLogMessage
var $Pather_Servers_GameSegmentServer_Logger_TellUserMoved_GameSegmentLogMessage = function() {
};
$Pather_Servers_GameSegmentServer_Logger_TellUserMoved_GameSegmentLogMessage.__typeName = 'Pather.Servers.GameSegmentServer.Logger.TellUserMoved_GameSegmentLogMessage';
$Pather_Servers_GameSegmentServer_Logger_TellUserMoved_GameSegmentLogMessage.createInstance = function() {
	return $Pather_Servers_GameSegmentServer_Logger_TellUserMoved_GameSegmentLogMessage.$ctor();
};
$Pather_Servers_GameSegmentServer_Logger_TellUserMoved_GameSegmentLogMessage.$ctor = function() {
	var $this = $Pather_Servers_GameSegmentServer_Logger_GameSegmentLogMessage.$ctor();
	$this.userId = null;
	$this.x = 0;
	$this.y = 0;
	$this.neighbors = null;
	$this.type = 'tellUserMoved';
	return $this;
};
global.Pather.Servers.GameSegmentServer.Logger.TellUserMoved_GameSegmentLogMessage = $Pather_Servers_GameSegmentServer_Logger_TellUserMoved_GameSegmentLogMessage;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameSegmentServer.Logger.UserJoined_GameSegmentLogMessage
var $Pather_Servers_GameSegmentServer_Logger_UserJoined_GameSegmentLogMessage = function() {
};
$Pather_Servers_GameSegmentServer_Logger_UserJoined_GameSegmentLogMessage.__typeName = 'Pather.Servers.GameSegmentServer.Logger.UserJoined_GameSegmentLogMessage';
$Pather_Servers_GameSegmentServer_Logger_UserJoined_GameSegmentLogMessage.createInstance = function() {
	return $Pather_Servers_GameSegmentServer_Logger_UserJoined_GameSegmentLogMessage.$ctor();
};
$Pather_Servers_GameSegmentServer_Logger_UserJoined_GameSegmentLogMessage.$ctor = function() {
	var $this = $Pather_Servers_GameSegmentServer_Logger_GameSegmentLogMessage.$ctor();
	$this.userId = null;
	$this.x = 0;
	$this.y = 0;
	$this.isMine = false;
	$this.neighbors = null;
	$this.type = 'userJoined';
	return $this;
};
global.Pather.Servers.GameSegmentServer.Logger.UserJoined_GameSegmentLogMessage = $Pather_Servers_GameSegmentServer_Logger_UserJoined_GameSegmentLogMessage;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameSegmentServer.Logger.UserLeft_GameSegmentLogMessage
var $Pather_Servers_GameSegmentServer_Logger_UserLeft_GameSegmentLogMessage = function() {
};
$Pather_Servers_GameSegmentServer_Logger_UserLeft_GameSegmentLogMessage.__typeName = 'Pather.Servers.GameSegmentServer.Logger.UserLeft_GameSegmentLogMessage';
$Pather_Servers_GameSegmentServer_Logger_UserLeft_GameSegmentLogMessage.createInstance = function() {
	return $Pather_Servers_GameSegmentServer_Logger_UserLeft_GameSegmentLogMessage.$ctor();
};
$Pather_Servers_GameSegmentServer_Logger_UserLeft_GameSegmentLogMessage.$ctor = function() {
	var $this = $Pather_Servers_GameSegmentServer_Logger_GameSegmentLogMessage.$ctor();
	$this.userId = null;
	$this.isMine = false;
	$this.type = 'userLeft';
	return $this;
};
global.Pather.Servers.GameSegmentServer.Logger.UserLeft_GameSegmentLogMessage = $Pather_Servers_GameSegmentServer_Logger_UserLeft_GameSegmentLogMessage;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameSegmentServer.Logger.UserMoved_GameSegmentLogMessage
var $Pather_Servers_GameSegmentServer_Logger_UserMoved_GameSegmentLogMessage = function() {
};
$Pather_Servers_GameSegmentServer_Logger_UserMoved_GameSegmentLogMessage.__typeName = 'Pather.Servers.GameSegmentServer.Logger.UserMoved_GameSegmentLogMessage';
$Pather_Servers_GameSegmentServer_Logger_UserMoved_GameSegmentLogMessage.createInstance = function() {
	return $Pather_Servers_GameSegmentServer_Logger_UserMoved_GameSegmentLogMessage.$ctor();
};
$Pather_Servers_GameSegmentServer_Logger_UserMoved_GameSegmentLogMessage.$ctor = function() {
	var $this = $Pather_Servers_GameSegmentServer_Logger_GameSegmentLogMessage.$ctor();
	$this.userId = null;
	$this.x = 0;
	$this.y = 0;
	$this.neighbors = null;
	$this.type = 'userMoved';
	return $this;
};
global.Pather.Servers.GameSegmentServer.Logger.UserMoved_GameSegmentLogMessage = $Pather_Servers_GameSegmentServer_Logger_UserMoved_GameSegmentLogMessage;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameSegmentServer.Old.ServerEntity
var $Pather_Servers_GameSegmentServer_Old_ServerEntity = function(game, playerId) {
	this.socket = null;
	Pather.Common.old.Entity.call(this, game, playerId);
};
$Pather_Servers_GameSegmentServer_Old_ServerEntity.__typeName = 'Pather.Servers.GameSegmentServer.Old.ServerEntity';
global.Pather.Servers.GameSegmentServer.Old.ServerEntity = $Pather_Servers_GameSegmentServer_Old_ServerEntity;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameSegmentServer.Old.ServerGame
var $Pather_Servers_GameSegmentServer_Old_ServerGame = function(socketManager, gameServerName) {
	this.syncLockstep = null;
	Pather.Common.old.Game.call(this);
	console.log(gameServerName + ' Has come online');
	this.stepManager = new $Pather_Servers_GameSegmentServer_Old_ServerStepManager(this, new $Pather_Servers_GameSegmentServer_Old_ServerNetworkManager(this, socketManager));
	this.ready = true;
};
$Pather_Servers_GameSegmentServer_Old_ServerGame.__typeName = 'Pather.Servers.GameSegmentServer.Old.ServerGame';
global.Pather.Servers.GameSegmentServer.Old.ServerGame = $Pather_Servers_GameSegmentServer_Old_ServerGame;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameSegmentServer.Old.ServerNetworkManager
var $Pather_Servers_GameSegmentServer_Old_ServerNetworkManager = function(game, socketManager) {
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
$Pather_Servers_GameSegmentServer_Old_ServerNetworkManager.__typeName = 'Pather.Servers.GameSegmentServer.Old.ServerNetworkManager';
global.Pather.Servers.GameSegmentServer.Old.ServerNetworkManager = $Pather_Servers_GameSegmentServer_Old_ServerNetworkManager;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameSegmentServer.Old.ServerStepManager
var $Pather_Servers_GameSegmentServer_Old_ServerStepManager = function(game, serverNetworkManager) {
	this.serverNetworkManager = null;
	Pather.Common.old.StepManager.call(this, game);
	this.serverNetworkManager = serverNetworkManager;
	this.serverNetworkManager.onRecieveAction = ss.delegateCombine(this.serverNetworkManager.onRecieveAction, ss.mkdel(this, this.receiveAction));
};
$Pather_Servers_GameSegmentServer_Old_ServerStepManager.__typeName = 'Pather.Servers.GameSegmentServer.Old.ServerStepManager';
global.Pather.Servers.GameSegmentServer.Old.ServerStepManager = $Pather_Servers_GameSegmentServer_Old_ServerStepManager;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameWorldServer.PlayerClusterInfo
var $Pather_Servers_GameWorldServer_$PlayerClusterInfo = function(player) {
	this.$player = null;
	this.$neighbors = null;
	this.$player = player;
	this.$neighbors = [];
};
$Pather_Servers_GameWorldServer_$PlayerClusterInfo.__typeName = 'Pather.Servers.GameWorldServer.$PlayerClusterInfo';
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameWorldServer.GameSegment
var $Pather_Servers_GameWorldServer_GameSegment = function(gameWorld) {
	this.gameWorld = null;
	this.preAddedUsers = null;
	this.users = null;
	this.gameSegmentId = null;
	this.gameWorld = gameWorld;
	this.users = [];
	this.preAddedUsers = [];
};
$Pather_Servers_GameWorldServer_GameSegment.__typeName = 'Pather.Servers.GameWorldServer.GameSegment';
global.Pather.Servers.GameWorldServer.GameSegment = $Pather_Servers_GameWorldServer_GameSegment;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameWorldServer.GameWorld
var $Pather_Servers_GameWorldServer_GameWorld = function(gameWorldPubSub) {
	this.gameWorldPubSub = null;
	this.users = null;
	this.gameSegments = null;
	this.$needToReorganize = [];
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
// Pather.Servers.GameWorldServer.GameWorldPubSub
var $Pather_Servers_GameWorldServer_GameWorldPubSub = function(pubSub) {
	this.pubSub = null;
	this.message = null;
	this.$deferredMessages = new (ss.makeGenericType(ss.Dictionary$2, [String, ss.makeGenericType(Pather.Common.Utils.Promises.Deferred$2, [Object, Pather.Common.Utils.Promises.UndefinedPromiseError])]))();
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
	this.backEndTickManager = null;
	this.$gameWorldPubSub = null;
	this.grid = null;
	this.$preAddedUsers = {};
	this.$stalledJoins = [];
	this.$joining = false;
	$Pather_Servers_Common_ServerLogging_ServerLogger.initLogger('GameWorld', 'GameWorld');
	this.$pubSub = pubSub;
	this.$databaseQueries = dbQueries;
	pubSub.init(6379).then(ss.mkdel(this, this.$pubsubReady));
	//            new TickWatcher();
	this.constructGrid();
	setInterval(ss.mkdel(this, this.$reorganize), 60000);
};
$Pather_Servers_GameWorldServer_GameWorldServer.__typeName = 'Pather.Servers.GameWorldServer.GameWorldServer';
global.Pather.Servers.GameWorldServer.GameWorldServer = $Pather_Servers_GameWorldServer_GameWorldServer;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameWorldServer.PlayerCluster
var $Pather_Servers_GameWorldServer_PlayerCluster = function() {
	this.players = null;
	this.bestGameSegment = null;
	this.players = [];
};
$Pather_Servers_GameWorldServer_PlayerCluster.__typeName = 'Pather.Servers.GameWorldServer.PlayerCluster';
global.Pather.Servers.GameWorldServer.PlayerCluster = $Pather_Servers_GameWorldServer_PlayerCluster;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameWorldServer.PlayerClusterGroup
var $Pather_Servers_GameWorldServer_PlayerClusterGroup = function() {
	this.numberOfPlayers = 0;
	this.playerClusters = null;
	this.playerClusters = [];
	this.numberOfPlayers = 0;
};
$Pather_Servers_GameWorldServer_PlayerClusterGroup.__typeName = 'Pather.Servers.GameWorldServer.PlayerClusterGroup';
global.Pather.Servers.GameWorldServer.PlayerClusterGroup = $Pather_Servers_GameWorldServer_PlayerClusterGroup;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameWorldServer.ReoragGameWorldModel
var $Pather_Servers_GameWorldServer_ReoragGameWorldModel = function(gameWorldUser, bestGameSegment) {
	this.$1$GameWorldUserField = null;
	this.$1$BestGameSegmentField = null;
	this.set_gameWorldUser(gameWorldUser);
	this.set_bestGameSegment(bestGameSegment);
};
$Pather_Servers_GameWorldServer_ReoragGameWorldModel.__typeName = 'Pather.Servers.GameWorldServer.ReoragGameWorldModel';
global.Pather.Servers.GameWorldServer.ReoragGameWorldModel = $Pather_Servers_GameWorldServer_ReoragGameWorldModel;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameWorldServer.ReorganizeManager
var $Pather_Servers_GameWorldServer_ReorganizeManager = function(gameWorldUsers, segments) {
	this.$gameWorldUsers = null;
	this.$segments = null;
	this.$tree = null;
	this.$viewRadius = 60;
	this.$gameWorldUsers = gameWorldUsers;
	this.$segments = segments;
};
$Pather_Servers_GameWorldServer_ReorganizeManager.__typeName = 'Pather.Servers.GameWorldServer.ReorganizeManager';
$Pather_Servers_GameWorldServer_ReorganizeManager.reorganize = function(gameWorldUsers, segments) {
	var reorgManager = new $Pather_Servers_GameWorldServer_ReorganizeManager(gameWorldUsers, segments);
	return reorgManager.$reorganize();
};
$Pather_Servers_GameWorldServer_ReorganizeManager.$pointDistance = function(nearPlayer, currentPlayer) {
	return Math.pow(currentPlayer.x - nearPlayer.x, 2) + Math.pow(currentPlayer.y - nearPlayer.y, 2);
};
global.Pather.Servers.GameWorldServer.ReorganizeManager = $Pather_Servers_GameWorldServer_ReorganizeManager;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameWorldServer.Models.GameWorldNeighbor
var $Pather_Servers_GameWorldServer_Models_GameWorldNeighbor = function(cUser, distance) {
	this.user = null;
	this.distance = 0;
	this.distance = distance;
	this.user = cUser;
};
$Pather_Servers_GameWorldServer_Models_GameWorldNeighbor.__typeName = 'Pather.Servers.GameWorldServer.Models.GameWorldNeighbor';
global.Pather.Servers.GameWorldServer.Models.GameWorldNeighbor = $Pather_Servers_GameWorldServer_Models_GameWorldNeighbor;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameWorldServer.Models.GameWorldUser
var $Pather_Servers_GameWorldServer_Models_GameWorldUser = function() {
	this.userId = null;
	this.x = 0;
	this.y = 0;
	this.gatewayId = null;
	this.gameSegment = null;
	this.$1$NeighborsField = null;
};
$Pather_Servers_GameWorldServer_Models_GameWorldUser.__typeName = 'Pather.Servers.GameWorldServer.Models.GameWorldUser';
global.Pather.Servers.GameWorldServer.Models.GameWorldUser = $Pather_Servers_GameWorldServer_Models_GameWorldUser;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameWorldServer.Models.UserJoinError
var $Pather_Servers_GameWorldServer_Models_UserJoinError = function() {
};
$Pather_Servers_GameWorldServer_Models_UserJoinError.__typeName = 'Pather.Servers.GameWorldServer.Models.UserJoinError';
global.Pather.Servers.GameWorldServer.Models.UserJoinError = $Pather_Servers_GameWorldServer_Models_UserJoinError;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameWorldServer.Tests.GameWorldServerTests
var $Pather_Servers_GameWorldServer_Tests_GameWorldServerTests = function() {
};
$Pather_Servers_GameWorldServer_Tests_GameWorldServerTests.__typeName = 'Pather.Servers.GameWorldServer.Tests.GameWorldServerTests';
global.Pather.Servers.GameWorldServer.Tests.GameWorldServerTests = $Pather_Servers_GameWorldServer_Tests_GameWorldServerTests;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GatewayServer.GatewayUser
var $Pather_Servers_GatewayServer_$GatewayUser = function() {
};
$Pather_Servers_GatewayServer_$GatewayUser.__typeName = 'Pather.Servers.GatewayServer.$GatewayUser';
$Pather_Servers_GatewayServer_$GatewayUser.createInstance = function() {
	return $Pather_Servers_GatewayServer_$GatewayUser.$ctor();
};
$Pather_Servers_GatewayServer_$GatewayUser.$ctor = function() {
	var $this = {};
	$this.socket = null;
	$this.userId = null;
	$this.gameSegmentId = null;
	return $this;
};
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GatewayServer.GatewayPubSub
var $Pather_Servers_GatewayServer_GatewayPubSub = function(pubSub, gatewayId) {
	this.$1$GatewayIdField = null;
	this.pubSub = null;
	this.onMessage = null;
	this.onAllMessage = null;
	this.set_gatewayId(gatewayId);
	this.pubSub = pubSub;
};
$Pather_Servers_GatewayServer_GatewayPubSub.__typeName = 'Pather.Servers.GatewayServer.GatewayPubSub';
global.Pather.Servers.GatewayServer.GatewayPubSub = $Pather_Servers_GatewayServer_GatewayPubSub;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GatewayServer.GatewayServer
var $Pather_Servers_GatewayServer_GatewayServer = function(pubsub, pushPop, socketManager, gatewayId, port) {
	this.$1$PushPopField = null;
	this.$socketManager = null;
	this.gatewayId = null;
	this.$port = 0;
	this.serverCommunicator = null;
	this.gatewayPubSub = null;
	this.backEndTickManager = null;
	this.$users = new (ss.makeGenericType(Pather.Common.Utils.DictionaryList$2, [String, $Pather_Servers_GatewayServer_$GatewayUser]))(function(a) {
		return a.userId;
	});
	this.$cachedUserMoves = {};
	this.set_pushPop(pushPop);
	this.$socketManager = socketManager;
	this.gatewayId = gatewayId;
	this.$port = port;
	$Pather_Servers_Common_ServerLogging_ServerLogger.initLogger('Gateway', this.gatewayId);
	console.log(this.gatewayId, port);
	Pather.Common.Utils.Promises.Q.all([pubsub.init(6379), pushPop.init()]).then(ss.mkdel(this, function() {
		this.gatewayPubSub = new $Pather_Servers_GatewayServer_GatewayPubSub(pubsub, this.gatewayId);
		this.gatewayPubSub.onMessage = ss.delegateCombine(this.gatewayPubSub.onMessage, ss.mkdel(this, this.$onMessage));
		this.gatewayPubSub.onAllMessage = ss.delegateCombine(this.gatewayPubSub.onAllMessage, ss.mkdel(this, this.$onAllMessage));
		this.gatewayPubSub.init();
		this.backEndTickManager = new $Pather_Servers_Common_BackEndTickManager();
		this.backEndTickManager.init$1(ss.mkdel(this, this.$sendPing), ss.mkdel(this, function() {
			console.log('Connected To Tick Server');
			this.$registerGatewayWithCluster();
			this.$pubsubReady();
		}));
		this.backEndTickManager.startPing();
	}));
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
// Pather.Servers.HeadServer.HeadPubSub
var $Pather_Servers_HeadServer_HeadPubSub = function(pubSub) {
	this.pubSub = null;
	this.onMessage = null;
	this.$deferredMessages = new (ss.makeGenericType(ss.Dictionary$2, [String, ss.makeGenericType(Pather.Common.Utils.Promises.Deferred$2, [Object, Pather.Common.Utils.Promises.UndefinedPromiseError])]))();
	this.pubSub = pubSub;
};
$Pather_Servers_HeadServer_HeadPubSub.__typeName = 'Pather.Servers.HeadServer.HeadPubSub';
global.Pather.Servers.HeadServer.HeadPubSub = $Pather_Servers_HeadServer_HeadPubSub;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.HeadServer.HeadServer
var $Pather_Servers_HeadServer_HeadServer = function(pubSub) {
	this.$headPubSub = null;
	this.$oldGateways = [];
	this.$gateways = [];
	this.$isCurrentlySpawning = 0;
	pubSub.init(6379).then(ss.mkdel(this, function() {
		this.$ready(pubSub);
	}));
};
$Pather_Servers_HeadServer_HeadServer.__typeName = 'Pather.Servers.HeadServer.HeadServer';
global.Pather.Servers.HeadServer.HeadServer = $Pather_Servers_HeadServer_HeadServer;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.HeadServer.Models.Gateway
var $Pather_Servers_HeadServer_Models_Gateway = function() {
	this.address = null;
	this.liveConnections = 0;
	this.lastPing = new Date(0);
	this.gatewayId = null;
};
$Pather_Servers_HeadServer_Models_Gateway.__typeName = 'Pather.Servers.HeadServer.Models.Gateway';
global.Pather.Servers.HeadServer.Models.Gateway = $Pather_Servers_HeadServer_Models_Gateway;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.Libraries.RTree.ILog
var $Pather_Servers_Libraries_RTree_$ILog = function() {
};
$Pather_Servers_Libraries_RTree_$ILog.__typeName = 'Pather.Servers.Libraries.RTree.$ILog';
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.Libraries.RTree.Log
var $Pather_Servers_Libraries_RTree_$Log = function() {
	this.$1$IsDebugEnabledField = false;
};
$Pather_Servers_Libraries_RTree_$Log.__typeName = 'Pather.Servers.Libraries.RTree.$Log';
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.Libraries.RTree.LogManager
var $Pather_Servers_Libraries_RTree_$LogManager = function() {
};
$Pather_Servers_Libraries_RTree_$LogManager.__typeName = 'Pather.Servers.Libraries.RTree.$LogManager';
$Pather_Servers_Libraries_RTree_$LogManager.$getLogger = function(fullName) {
	return new $Pather_Servers_Libraries_RTree_$Log();
};
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.Libraries.RTree.BoundingBox
var $Pather_Servers_Libraries_RTree_BoundingBox = function(min, max) {
	this.min = null;
	this.max = null;
	this.min = min;
	this.max = max;
};
$Pather_Servers_Libraries_RTree_BoundingBox.__typeName = 'Pather.Servers.Libraries.RTree.BoundingBox';
$Pather_Servers_Libraries_RTree_BoundingBox.createFromPoints = function(points) {
	if (ss.isNullOrUndefined(points)) {
		throw new ss.ArgumentNullException();
	}
	var flag = true;
	var min = new $Pather_Servers_Libraries_RTree_Vector2(3.40282346638529E+38);
	var max = new $Pather_Servers_Libraries_RTree_Vector2(-3.40282346638529E+38);
	var $t1 = ss.getEnumerator(points);
	try {
		while ($t1.moveNext()) {
			var vector2 = $t1.current();
			min.x = ((min.x < vector2.x) ? min.x : vector2.x);
			min.y = ((min.y < vector2.y) ? min.y : vector2.y);
			max.x = ((max.x > vector2.x) ? max.x : vector2.x);
			max.y = ((max.y > vector2.y) ? max.y : vector2.y);
			flag = false;
		}
	}
	finally {
		$t1.dispose();
	}
	if (flag) {
		throw new ss.ArgumentException();
	}
	else {
		return new $Pather_Servers_Libraries_RTree_BoundingBox(min, max);
	}
};
global.Pather.Servers.Libraries.RTree.BoundingBox = $Pather_Servers_Libraries_RTree_BoundingBox;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.Libraries.RTree.Node
var $Pather_Servers_Libraries_RTree_Node$1 = function(T) {
	var $type = function(nodeId, level, maxNodeEntries) {
		this.$nodeId = 0;
		this.$mbr = null;
		this.$entries = null;
		this.$ids = null;
		this.$level = 0;
		this.$entryCount = 0;
		this.$nodeId = nodeId;
		this.$level = level;
		this.$entries = new Array(maxNodeEntries);
		this.$ids = new Array(maxNodeEntries);
	};
	ss.registerGenericClassInstance($type, $Pather_Servers_Libraries_RTree_Node$1, [T], {
		$addEntry: function(r, id) {
			this.$ids[this.$entryCount] = id;
			this.$entries[this.$entryCount] = r.$copy();
			this.$entryCount++;
			if (ss.isNullOrUndefined(this.$mbr)) {
				this.$mbr = r.$copy();
			}
			else {
				this.$mbr.$add(r);
			}
		},
		$addEntryNoCopy: function(r, id) {
			this.$ids[this.$entryCount] = id;
			this.$entries[this.$entryCount] = r;
			this.$entryCount++;
			if (ss.isNullOrUndefined(this.$mbr)) {
				this.$mbr = r.$copy();
			}
			else {
				this.$mbr.$add(r);
			}
		},
		$findEntry: function(r, id) {
			for (var i = 0; i < this.$entryCount; i++) {
				if (id === this.$ids[i] && r.equals(this.$entries[i])) {
					return i;
				}
			}
			return -1;
		},
		$deleteEntry: function(i, minNodeEntries) {
			var lastIndex = this.$entryCount - 1;
			var deletedRectangle = this.$entries[i];
			this.$entries[i] = null;
			if (i !== lastIndex) {
				this.$entries[i] = this.$entries[lastIndex];
				this.$ids[i] = this.$ids[lastIndex];
				this.$entries[lastIndex] = null;
			}
			this.$entryCount--;
			// if there are at least minNodeEntries, adjust the MBR.
			// otherwise, don't bother, as the Node<T> will be 
			// eliminated anyway.
			if (this.$entryCount >= minNodeEntries) {
				this.$recalculateMBR(deletedRectangle);
			}
		},
		$recalculateMBR: function(deletedRectangle) {
			if (this.$mbr.$edgeOverlaps(deletedRectangle)) {
				this.$mbr.$set(this.$entries[0].$min, this.$entries[0].$max);
				for (var i = 1; i < this.$entryCount; i++) {
					this.$mbr.$add(this.$entries[i]);
				}
			}
		},
		getEntryCount: function() {
			return this.$entryCount;
		},
		getEntry: function(index) {
			if (index < this.$entryCount) {
				return this.$entries[index];
			}
			return null;
		},
		getId: function(index) {
			if (index < this.$entryCount) {
				return this.$ids[index];
			}
			return -1;
		},
		$reorganize: function(rtree) {
			var countdownIndex = rtree.$maxNodeEntries - 1;
			for (var index = 0; index < this.$entryCount; index++) {
				if (ss.isNullOrUndefined(this.$entries[index])) {
					while (ss.isNullOrUndefined(this.$entries[countdownIndex]) && countdownIndex > index) {
						countdownIndex--;
					}
					this.$entries[index] = this.$entries[countdownIndex];
					this.$ids[index] = this.$ids[countdownIndex];
					this.$entries[countdownIndex] = null;
				}
			}
		},
		$isLeaf: function() {
			return this.$level === 1;
		},
		getLevel: function() {
			return this.$level;
		},
		getMBR: function() {
			return this.$mbr;
		}
	}, function() {
		return null;
	}, function() {
		return [];
	});
	return $type;
};
$Pather_Servers_Libraries_RTree_Node$1.__typeName = 'Pather.Servers.Libraries.RTree.Node$1';
ss.initGenericClass($Pather_Servers_Libraries_RTree_Node$1, $asm, 1);
global.Pather.Servers.Libraries.RTree.Node$1 = $Pather_Servers_Libraries_RTree_Node$1;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.Libraries.RTree.Rectangle
var $Pather_Servers_Libraries_RTree_Rectangle = function(x1, y1) {
	this.$max = null;
	this.$min = null;
	this.$min = new Array($Pather_Servers_Libraries_RTree_Rectangle.$DIMENSIONS);
	this.$max = new Array($Pather_Servers_Libraries_RTree_Rectangle.$DIMENSIONS);
	this.$set$1(x1, y1, x1, y1, 1, 1);
};
$Pather_Servers_Libraries_RTree_Rectangle.__typeName = 'Pather.Servers.Libraries.RTree.Rectangle';
$Pather_Servers_Libraries_RTree_Rectangle.$ctor2 = function(x1, y1, x2, y2, z1, z2) {
	this.$max = null;
	this.$min = null;
	this.$min = new Array($Pather_Servers_Libraries_RTree_Rectangle.$DIMENSIONS);
	this.$max = new Array($Pather_Servers_Libraries_RTree_Rectangle.$DIMENSIONS);
	this.$set$1(x1, y1, x2, y2, z1, z2);
};
$Pather_Servers_Libraries_RTree_Rectangle.$ctor1 = function(min, max) {
	this.$max = null;
	this.$min = null;
	if (min.length !== $Pather_Servers_Libraries_RTree_Rectangle.$DIMENSIONS || max.length !== $Pather_Servers_Libraries_RTree_Rectangle.$DIMENSIONS) {
		throw new ss.Exception('Error in Rectangle constructor: min and max arrays must be of length ' + $Pather_Servers_Libraries_RTree_Rectangle.$DIMENSIONS);
	}
	this.$min = new Array($Pather_Servers_Libraries_RTree_Rectangle.$DIMENSIONS);
	this.$max = new Array($Pather_Servers_Libraries_RTree_Rectangle.$DIMENSIONS);
	this.$set(min, max);
};
global.Pather.Servers.Libraries.RTree.Rectangle = $Pather_Servers_Libraries_RTree_Rectangle;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.Libraries.RTree.RTree
var $Pather_Servers_Libraries_RTree_RTree$1 = function(T) {
	var $type = function() {
		this.$log = null;
		this.$deleteLog = null;
		this.$maxNodeEntries = 0;
		this.$minNodeEntries = 0;
		this.nodeMap = {};
		this.$entryStatus = null;
		this.$initialEntryStatus = null;
		this.$parents = new Array();
		this.$parentsEntry = new Array();
		this.$treeHeight = 1;
		this.$rootNodeId = 0;
		this.$msize = 0;
		this.$highestUsedNodeId = 0;
		this.$deletedNodeIds = new Array();
		this.$nearestIds = [];
		this.idsToItems = {};
		this.$itemsToIds = {};
		this.$idcounter = -2147483648;
		this.$oldRectangle = new $Pather_Servers_Libraries_RTree_Rectangle.$ctor2(0, 0, 0, 0, 0, 0);
		this.$init();
	};
	$type.$ctor1 = function(MaxNodeEntries, MinNodeEntries) {
		this.$log = null;
		this.$deleteLog = null;
		this.$maxNodeEntries = 0;
		this.$minNodeEntries = 0;
		this.nodeMap = {};
		this.$entryStatus = null;
		this.$initialEntryStatus = null;
		this.$parents = new Array();
		this.$parentsEntry = new Array();
		this.$treeHeight = 1;
		this.$rootNodeId = 0;
		this.$msize = 0;
		this.$highestUsedNodeId = 0;
		this.$deletedNodeIds = new Array();
		this.$nearestIds = [];
		this.idsToItems = {};
		this.$itemsToIds = {};
		this.$idcounter = -2147483648;
		this.$oldRectangle = new $Pather_Servers_Libraries_RTree_Rectangle.$ctor2(0, 0, 0, 0, 0, 0);
		this.$minNodeEntries = MinNodeEntries;
		this.$maxNodeEntries = MaxNodeEntries;
		this.$init();
	};
	ss.registerGenericClassInstance($type, $Pather_Servers_Libraries_RTree_RTree$1, [T], {
		$init: function() {
			//initialize logs
			this.$log = $Pather_Servers_Libraries_RTree_$LogManager.$getLogger(ss.getTypeFullName($type));
			this.$deleteLog = $Pather_Servers_Libraries_RTree_$LogManager.$getLogger(ss.getTypeFullName($type) + '-delete');
			// Obviously a Node&lt;T&gt; with less than 2 entries cannot be split.
			// The Node&lt;T&gt; splitting algorithm will work with only 2 entries
			// per node, but will be inefficient.
			if (this.$maxNodeEntries < 2) {
				this.$log.$warn('Invalid MaxNodeEntries = ' + this.$maxNodeEntries + ' Resetting to default value of ' + $type.$defaulT_MAX_NODE_ENTRIES);
				this.$maxNodeEntries = $type.$defaulT_MAX_NODE_ENTRIES;
			}
			// The MinNodeEntries must be less than or equal to (int) (MaxNodeEntries / 2)
			if (this.$minNodeEntries < 1 || this.$minNodeEntries > ss.Int32.div(this.$maxNodeEntries, 2)) {
				this.$log.$warn('MinNodeEntries must be between 1 and MaxNodeEntries / 2');
				this.$minNodeEntries = ss.Int32.div(this.$maxNodeEntries, 2);
			}
			this.$entryStatus = new Array(this.$maxNodeEntries);
			this.$initialEntryStatus = new Array(this.$maxNodeEntries);
			for (var i = 0; i < this.$maxNodeEntries; i++) {
				this.$initialEntryStatus[i] = 1;
			}
			var root = new (ss.makeGenericType($Pather_Servers_Libraries_RTree_Node$1, [T]))(this.$rootNodeId, 1, this.$maxNodeEntries);
			this.nodeMap[this.$rootNodeId] = root;
			this.$log.$info('init()  MaxNodeEntries = ' + this.$maxNodeEntries + ', MinNodeEntries = ' + this.$minNodeEntries);
		},
		add: function(r, item) {
			this.$idcounter++;
			var id = this.$idcounter;
			this.idsToItems[id] = item;
			this.$itemsToIds[item] = id;
			this.$add(r, id);
		},
		$add: function(r, id) {
			if (this.$log.get_$isDebugEnabled()) {
				this.$log.$debug('Adding rectangle ' + r + ', id ' + id);
			}
			this.$add$1(r.$copy(), id, 1);
			this.$msize++;
		},
		$add$1: function(r, id, level) {
			// I1 [Find position for new record] Invoke ChooseLeaf to select a 
			// leaf Node&lt;T&gt; L in which to place r
			var n = this.$chooseNode(r, level);
			var newLeaf = null;
			// I2 [Add record to leaf node] If L has room for another entry, 
			// install E. Otherwise invoke SplitNode to obtain L and LL containing
			// E and all the old entries of L
			if (n.$entryCount < this.$maxNodeEntries) {
				n.$addEntryNoCopy(r, id);
			}
			else {
				newLeaf = this.$splitNode(n, r, id);
			}
			// I3 [Propagate changes upwards] Invoke AdjustTree on L, also passing LL
			// if a split was performed
			var newNode = this.$adjustTree(n, newLeaf);
			// I4 [Grow tree taller] If Node&lt;T&gt; split propagation caused the root to 
			// split, create a new root whose children are the two resulting nodes.
			if (ss.isValue(newNode)) {
				var oldRootNodeId = this.$rootNodeId;
				var oldRoot = this.getNode(oldRootNodeId);
				this.$rootNodeId = this.$getNextNodeId();
				this.$treeHeight++;
				var root = new (ss.makeGenericType($Pather_Servers_Libraries_RTree_Node$1, [T]))(this.$rootNodeId, this.$treeHeight, this.$maxNodeEntries);
				root.$addEntry(newNode.$mbr, newNode.$nodeId);
				root.$addEntry(oldRoot.$mbr, oldRoot.$nodeId);
				this.nodeMap[this.$rootNodeId] = root;
			}
		},
		delete$1: function(r, item) {
			var id = this.$itemsToIds[item];
			var success = this.$delete(r, id);
			if (success === true) {
				delete this.idsToItems[id];
				delete this.$itemsToIds[item];
			}
			return success;
		},
		$delete: function(r, id) {
			// FindLeaf algorithm inlined here. Note the "official" algorithm 
			// searches all overlapping entries. This seems inefficient to me, 
			// as an entry is only worth searching if it contains (NOT overlaps)
			// the rectangle we are searching for.
			//
			// Also the algorithm has been changed so that it is not recursive.
			// FL1 [Search subtrees] If root is not a leaf, check each entry 
			// to determine if it contains r. For each entry found, invoke
			// findLeaf on the Node&lt;T&gt; pointed to by the entry, until r is found or
			// all entries have been checked.
			ss.clear(this.$parents);
			this.$parents.push(this.$rootNodeId);
			ss.clear(this.$parentsEntry);
			this.$parentsEntry.push(-1);
			var n = null;
			var foundIndex = -1;
			// index of entry to be deleted in leaf
			while (foundIndex === -1 && this.$parents.length > 0) {
				n = this.getNode(ss.arrayPeekBack(this.$parents));
				var startIndex = ss.arrayPeekBack(this.$parentsEntry) + 1;
				if (!n.$isLeaf()) {
					this.$deleteLog.$debug('searching Node<T> ' + n.$nodeId + ', from index ' + startIndex);
					var contains = false;
					for (var i = startIndex; i < n.$entryCount; i++) {
						if (n.$entries[i].$contains(r)) {
							this.$parents.push(n.$ids[i]);
							this.$parentsEntry.pop();
							this.$parentsEntry.push(i);
							// this becomes the start index when the child has been searched
							this.$parentsEntry.push(-1);
							contains = true;
							break;
							// ie go to next iteration of while()
						}
					}
					if (contains) {
						continue;
					}
				}
				else {
					foundIndex = n.$findEntry(r, id);
				}
				this.$parents.pop();
				this.$parentsEntry.pop();
			}
			// while not found
			if (foundIndex !== -1) {
				n.$deleteEntry(foundIndex, this.$minNodeEntries);
				this.$condenseTree(n);
				this.$msize--;
			}
			// shrink the tree if possible (i.e. if root Node&lt;T%gt; has exactly one entry,and that 
			// entry is not a leaf node, delete the root (it's entry becomes the new root)
			var root = this.getNode(this.$rootNodeId);
			while (root.$entryCount === 1 && this.$treeHeight > 1) {
				root.$entryCount = 0;
				this.$rootNodeId = root.$ids[0];
				this.$treeHeight--;
				root = this.getNode(this.$rootNodeId);
			}
			return foundIndex !== -1;
		},
		nearest: function(p, furthestDistance) {
			var retval = [];
			this.$nearest$1(p, ss.mkdel(this, function(id) {
				retval.push(this.idsToItems[id]);
			}), furthestDistance);
			return retval;
		},
		$nearest$1: function(p, v, furthestDistance) {
			var rootNode = this.getNode(this.$rootNodeId);
			this.$nearest(p, rootNode, furthestDistance);
			for (var $t1 = 0; $t1 < this.$nearestIds.length; $t1++) {
				var id = this.$nearestIds[$t1];
				v(id);
			}
			ss.clear(this.$nearestIds);
		},
		intersects: function(r) {
			var retval = [];
			this.$intersects(r, ss.mkdel(this, function(id) {
				retval.push(this.idsToItems[id]);
			}));
			return retval;
		},
		$intersects: function(r, v) {
			var rootNode = this.getNode(this.$rootNodeId);
			this.$intersects$1(r, v, rootNode);
		},
		contains: function(r) {
			var retval = [];
			this.$contains(r, ss.mkdel(this, function(id) {
				retval.push(this.idsToItems[id]);
			}));
			return retval;
		},
		$contains: function(r, v) {
			// find all rectangles in the tree that are contained by the passed rectangle
			// written to be non-recursive (should model other searches on this?)
			ss.clear(this.$parents);
			this.$parents.push(this.$rootNodeId);
			ss.clear(this.$parentsEntry);
			this.$parentsEntry.push(-1);
			// TODO: possible shortcut here - could test for intersection with the 
			// MBR of the root node. If no intersection, return immediately.
			while (this.$parents.length > 0) {
				var n = this.getNode(ss.arrayPeekBack(this.$parents));
				var startIndex = ss.arrayPeekBack(this.$parentsEntry) + 1;
				if (!n.$isLeaf()) {
					// go through every entry in the index Node<T> to check
					// if it intersects the passed rectangle. If so, it 
					// could contain entries that are contained.
					var intersects = false;
					for (var i = startIndex; i < n.$entryCount; i++) {
						if (r.intersects(n.$entries[i])) {
							this.$parents.push(n.$ids[i]);
							this.$parentsEntry.pop();
							this.$parentsEntry.push(i);
							// this becomes the start index when the child has been searched
							this.$parentsEntry.push(-1);
							intersects = true;
							break;
							// ie go to next iteration of while()
						}
					}
					if (intersects) {
						continue;
					}
				}
				else {
					// go through every entry in the leaf to check if 
					// it is contained by the passed rectangle
					for (var i1 = 0; i1 < n.$entryCount; i1++) {
						if (r.$contains(n.$entries[i1])) {
							v(n.$ids[i1]);
						}
					}
				}
				this.$parents.pop();
				this.$parentsEntry.pop();
			}
		},
		getBounds: function() {
			var bounds = null;
			var n = this.getNode(this.getRootNodeId());
			if (ss.isValue(n) && ss.isValue(n.getMBR())) {
				bounds = n.getMBR().$copy();
			}
			return bounds;
		},
		getVersion: function() {
			return 'RTree-1.0b2p1';
		},
		$getNextNodeId: function() {
			var nextNodeId = 0;
			if (this.$deletedNodeIds.length > 0) {
				nextNodeId = this.$deletedNodeIds.pop();
			}
			else {
				nextNodeId = 1 + this.$highestUsedNodeId++;
			}
			return nextNodeId;
		},
		getNode: function(index) {
			return this.nodeMap[index];
		},
		$getHighestUsedNodeId: function() {
			return this.$highestUsedNodeId;
		},
		getRootNodeId: function() {
			return this.$rootNodeId;
		},
		$splitNode: function(n, newRect, newId) {
			// [Pick first entry for each group] Apply algorithm pickSeeds to 
			// choose two entries to be the first elements of the groups. Assign
			// each to a group.
			// debug code
			var initialArea = 0;
			if (this.$log.get_$isDebugEnabled()) {
				var union = n.$mbr.$union(newRect);
				initialArea = union.$area();
			}
			for (var i = 0; i < this.$maxNodeEntries; i++) {
				this.$entryStatus[i] = this.$initialEntryStatus[i];
			}
			var newNode = null;
			newNode = new (ss.makeGenericType($Pather_Servers_Libraries_RTree_Node$1, [T]))(this.$getNextNodeId(), n.$level, this.$maxNodeEntries);
			this.nodeMap[newNode.$nodeId] = newNode;
			this.$pickSeeds(n, newRect, newId, newNode);
			// this also sets the entryCount to 1
			// [Check if done] If all entries have been assigned, stop. If one
			// group has so few entries that all the rest must be assigned to it in 
			// order for it to have the minimum number m, assign them and stop. 
			while (n.$entryCount + newNode.$entryCount < this.$maxNodeEntries + 1) {
				if (this.$maxNodeEntries + 1 - newNode.$entryCount === this.$minNodeEntries) {
					// assign all remaining entries to original node
					for (var i1 = 0; i1 < this.$maxNodeEntries; i1++) {
						if (this.$entryStatus[i1] === $type.$entrY_STATUS_UNASSIGNED) {
							this.$entryStatus[i1] = 0;
							n.$mbr.$add(n.$entries[i1]);
							n.$entryCount++;
						}
					}
					break;
				}
				if (this.$maxNodeEntries + 1 - n.$entryCount === this.$minNodeEntries) {
					// assign all remaining entries to new node
					for (var i2 = 0; i2 < this.$maxNodeEntries; i2++) {
						if (this.$entryStatus[i2] === $type.$entrY_STATUS_UNASSIGNED) {
							this.$entryStatus[i2] = 0;
							newNode.$addEntryNoCopy(n.$entries[i2], n.$ids[i2]);
							n.$entries[i2] = null;
						}
					}
					break;
				}
				// [Select entry to assign] Invoke algorithm pickNext to choose the
				// next entry to assign. Add it to the group whose covering rectangle 
				// will have to be enlarged least to accommodate it. Resolve ties
				// by adding the entry to the group with smaller area, then to the 
				// the one with fewer entries, then to either. Repeat from S2
				this.$pickNext(n, newNode);
			}
			n.$reorganize(this);
			// debug code
			if (this.$log.get_$isDebugEnabled()) {
				var newArea = n.$mbr.$area() + newNode.$mbr.$area();
				var percentageIncrease = 100 * (newArea - initialArea) / initialArea;
				this.$log.$debug('Node ' + n.$nodeId + ' split. New area increased by ' + percentageIncrease + '%');
			}
			return newNode;
		},
		$pickSeeds: function(n, newRect, newId, newNode) {
			// Find extreme rectangles along all dimension. Along each dimension,
			// find the entry whose rectangle has the highest low side, and the one 
			// with the lowest high side. Record the separation.
			var maxNormalizedSeparation = 0;
			var highestLowIndex = 0;
			var lowestHighIndex = 0;
			// for the purposes of picking seeds, take the MBR of the Node&lt;T&gt; to include
			// the new rectangle aswell.
			n.$mbr.$add(newRect);
			if (this.$log.get_$isDebugEnabled()) {
				this.$log.$debug('pickSeeds(): NodeId = ' + n.$nodeId + ', newRect = ' + newRect);
			}
			for (var d = 0; d < $Pather_Servers_Libraries_RTree_Rectangle.$DIMENSIONS; d++) {
				var tempHighestLow = newRect.$min[d];
				var tempHighestLowIndex = -1;
				// -1 indicates the new rectangle is the seed
				var tempLowestHigh = newRect.$max[d];
				var tempLowestHighIndex = -1;
				for (var i = 0; i < n.$entryCount; i++) {
					var tempLow = n.$entries[i].$min[d];
					if (tempLow >= tempHighestLow) {
						tempHighestLow = tempLow;
						tempHighestLowIndex = i;
					}
					else {
						// ensure that the same index cannot be both lowestHigh and highestLow
						var tempHigh = n.$entries[i].$max[d];
						if (tempHigh <= tempLowestHigh) {
							tempLowestHigh = tempHigh;
							tempLowestHighIndex = i;
						}
					}
					// PS2 [Adjust for shape of the rectangle cluster] Normalize the separations
					// by dividing by the widths of the entire set along the corresponding
					// dimension
					var normalizedSeparation = (tempHighestLow - tempLowestHigh) / (n.$mbr.$max[d] - n.$mbr.$min[d]);
					if (normalizedSeparation > 1 || normalizedSeparation < -1) {
						this.$log.$error('Invalid normalized separation');
					}
					if (this.$log.get_$isDebugEnabled()) {
						this.$log.$debug('Entry ' + i + ', dimension ' + d + ': HighestLow = ' + tempHighestLow + ' (index ' + tempHighestLowIndex + ')' + ', LowestHigh = ' + tempLowestHigh + ' (index ' + tempLowestHighIndex + ', NormalizedSeparation = ' + normalizedSeparation);
					}
					// PS3 [Select the most extreme pair] Choose the pair with the greatest
					// normalized separation along any dimension.
					if (normalizedSeparation > maxNormalizedSeparation) {
						maxNormalizedSeparation = normalizedSeparation;
						highestLowIndex = tempHighestLowIndex;
						lowestHighIndex = tempLowestHighIndex;
					}
				}
			}
			// highestLowIndex is the seed for the new node.
			if (highestLowIndex === -1) {
				newNode.$addEntry(newRect, newId);
			}
			else {
				newNode.$addEntryNoCopy(n.$entries[highestLowIndex], n.$ids[highestLowIndex]);
				n.$entries[highestLowIndex] = null;
				// move the new rectangle into the space vacated by the seed for the new node
				n.$entries[highestLowIndex] = newRect;
				n.$ids[highestLowIndex] = newId;
			}
			// lowestHighIndex is the seed for the original node. 
			if (lowestHighIndex === -1) {
				lowestHighIndex = highestLowIndex;
			}
			this.$entryStatus[lowestHighIndex] = 0;
			n.$entryCount = 1;
			n.$mbr.$set(n.$entries[lowestHighIndex].$min, n.$entries[lowestHighIndex].$max);
		},
		$pickNext: function(n, newNode) {
			var maxDifference = Number.NEGATIVE_INFINITY;
			var next = 0;
			var nextGroup = 0;
			maxDifference = Number.NEGATIVE_INFINITY;
			if (this.$log.get_$isDebugEnabled()) {
				this.$log.$debug('pickNext()');
			}
			for (var i = 0; i < this.$maxNodeEntries; i++) {
				if (this.$entryStatus[i] === $type.$entrY_STATUS_UNASSIGNED) {
					if (ss.isNullOrUndefined(n.$entries[i])) {
						this.$log.$error('Error: Node<T> ' + n.$nodeId + ', entry ' + i + ' is null');
					}
					var nIncrease = n.$mbr.$enlargement(n.$entries[i]);
					var newNodeIncrease = newNode.$mbr.$enlargement(n.$entries[i]);
					var difference = Math.abs(nIncrease - newNodeIncrease);
					if (difference > maxDifference) {
						next = i;
						if (nIncrease < newNodeIncrease) {
							nextGroup = 0;
						}
						else if (newNodeIncrease < nIncrease) {
							nextGroup = 1;
						}
						else if (n.$mbr.$area() < newNode.$mbr.$area()) {
							nextGroup = 0;
						}
						else if (newNode.$mbr.$area() < n.$mbr.$area()) {
							nextGroup = 1;
						}
						else if (newNode.$entryCount < ss.Int32.div(this.$maxNodeEntries, 2)) {
							nextGroup = 0;
						}
						else {
							nextGroup = 1;
						}
						maxDifference = difference;
					}
					if (this.$log.get_$isDebugEnabled()) {
						this.$log.$debug('Entry ' + i + ' group0 increase = ' + nIncrease + ', group1 increase = ' + newNodeIncrease + ', diff = ' + difference + ', MaxDiff = ' + maxDifference + ' (entry ' + next + ')');
					}
				}
			}
			this.$entryStatus[next] = 0;
			if (nextGroup === 0) {
				n.$mbr.$add(n.$entries[next]);
				n.$entryCount++;
			}
			else {
				// move to new node.
				newNode.$addEntryNoCopy(n.$entries[next], n.$ids[next]);
				n.$entries[next] = null;
			}
			return next;
		},
		$nearest: function(p, n, nearestDistance) {
			for (var i = 0; i < n.$entryCount; i++) {
				var tempDistance = n.$entries[i].$distance(p);
				if (n.$isLeaf()) {
					// for leaves, the distance is an actual nearest distance 
					if (tempDistance < nearestDistance) {
						//                        nearestDistance = tempDistance;
						//                        nearestIds.Clear();
					}
					if (tempDistance <= nearestDistance) {
						this.$nearestIds.push(n.$ids[i]);
					}
				}
				else {
					// for index nodes, only go into them if they potentially could have
					// a rectangle nearer than actualNearest
					if (tempDistance <= nearestDistance) {
						// search the child node
						nearestDistance = this.$nearest(p, this.getNode(n.$ids[i]), nearestDistance);
					}
				}
			}
			return nearestDistance;
		},
		$intersects$1: function(r, v, n) {
			for (var i = 0; i < n.$entryCount; i++) {
				if (r.intersects(n.$entries[i])) {
					if (n.$isLeaf()) {
						v(n.$ids[i]);
					}
					else {
						var childNode = this.getNode(n.$ids[i]);
						this.$intersects$1(r, v, childNode);
					}
				}
			}
		},
		$condenseTree: function(l) {
			// CT1 [Initialize] Set n=l. Set the list of eliminated
			// nodes to be empty.
			var n = l;
			var parent = null;
			var parentEntry = 0;
			//TIntStack eliminatedNodeIds = new TIntStack();
			var eliminatedNodeIds = new Array();
			// CT2 [Find parent entry] If N is the root, go to CT6. Otherwise 
			// let P be the parent of N, and let En be N's entry in P  
			while (n.$level !== this.$treeHeight) {
				parent = this.getNode(this.$parents.pop());
				parentEntry = this.$parentsEntry.pop();
				// CT3 [Eliminiate under-full node] If N has too few entries,
				// delete En from P and add N to the list of eliminated nodes
				if (n.$entryCount < this.$minNodeEntries) {
					parent.$deleteEntry(parentEntry, this.$minNodeEntries);
					eliminatedNodeIds.push(n.$nodeId);
				}
				else {
					// CT4 [Adjust covering rectangle] If N has not been eliminated,
					// adjust EnI to tightly contain all entries in N
					if (!n.$mbr.equals(parent.$entries[parentEntry])) {
						this.$oldRectangle.$set(parent.$entries[parentEntry].$min, parent.$entries[parentEntry].$max);
						parent.$entries[parentEntry].$set(n.$mbr.$min, n.$mbr.$max);
						parent.$recalculateMBR(this.$oldRectangle);
					}
				}
				// CT5 [Move up one level in tree] Set N=P and repeat from CT2
				n = parent;
			}
			// CT6 [Reinsert orphaned entries] Reinsert all entries of nodes in set Q.
			// Entries from eliminated leaf nodes are reinserted in tree leaves as in 
			// Insert(), but entries from higher level nodes must be placed higher in 
			// the tree, so that leaves of their dependent subtrees will be on the same
			// level as leaves of the main tree
			while (eliminatedNodeIds.length > 0) {
				var e = this.getNode(eliminatedNodeIds.pop());
				for (var j = 0; j < e.$entryCount; j++) {
					this.$add$1(e.$entries[j], e.$ids[j], e.$level);
					e.$entries[j] = null;
				}
				e.$entryCount = 0;
				delete this.nodeMap[e.$nodeId];
				this.$deletedNodeIds.push(e.$nodeId);
			}
		},
		$chooseNode: function(r, level) {
			// CL1 [Initialize] Set N to be the root node
			var n = this.getNode(this.$rootNodeId);
			ss.clear(this.$parents);
			ss.clear(this.$parentsEntry);
			// CL2 [Leaf check] If N is a leaf, return N
			while (true) {
				if (ss.isNullOrUndefined(n)) {
					this.$log.$error('Could not get root Node<T> (' + this.$rootNodeId + ')');
				}
				if (n.$level === level) {
					return n;
				}
				// CL3 [Choose subtree] If N is not at the desired level, let F be the entry in N 
				// whose rectangle FI needs least enlargement to include EI. Resolve
				// ties by choosing the entry with the rectangle of smaller area.
				var leastEnlargement = n.getEntry(0).$enlargement(r);
				var index = 0;
				// index of rectangle in subtree
				for (var i = 1; i < n.$entryCount; i++) {
					var tempRectangle = n.getEntry(i);
					var tempEnlargement = tempRectangle.$enlargement(r);
					if (tempEnlargement < leastEnlargement || tempEnlargement === leastEnlargement && tempRectangle.$area() < n.getEntry(index).$area()) {
						index = i;
						leastEnlargement = tempEnlargement;
					}
				}
				this.$parents.push(n.$nodeId);
				this.$parentsEntry.push(index);
				// CL4 [Descend until a leaf is reached] Set N to be the child Node&lt;T&gt; 
				// pointed to by Fp and repeat from CL2
				n = this.getNode(n.$ids[index]);
			}
		},
		$adjustTree: function(n, nn) {
			// AT1 [Initialize] Set N=L. If L was split previously, set NN to be 
			// the resulting second node.
			// AT2 [Check if done] If N is the root, stop
			while (n.$level !== this.$treeHeight) {
				// AT3 [Adjust covering rectangle in parent entry] Let P be the parent 
				// Node<T> of N, and let En be N's entry in P. Adjust EnI so that it tightly
				// encloses all entry rectangles in N.
				var parent = this.getNode(this.$parents.pop());
				var entry = this.$parentsEntry.pop();
				if (parent.$ids[entry] !== n.$nodeId) {
					this.$log.$error('Error: entry ' + entry + ' in Node<T> ' + parent.$nodeId + ' should point to Node<T> ' + n.$nodeId + '; actually points to Node<T> ' + parent.$ids[entry]);
				}
				if (!parent.$entries[entry].equals(n.$mbr)) {
					parent.$entries[entry].$set(n.$mbr.$min, n.$mbr.$max);
					parent.$mbr.$set(parent.$entries[0].$min, parent.$entries[0].$max);
					for (var i = 1; i < parent.$entryCount; i++) {
						parent.$mbr.$add(parent.$entries[i]);
					}
				}
				// AT4 [Propagate Node<T> split upward] If N has a partner NN resulting from 
				// an earlier split, create a new entry Enn with Ennp pointing to NN and 
				// Enni enclosing all rectangles in NN. Add Enn to P if there is room. 
				// Otherwise, invoke splitNode to produce P and PP containing Enn and
				// all P's old entries.
				var newNode = null;
				if (ss.isValue(nn)) {
					if (parent.$entryCount < this.$maxNodeEntries) {
						parent.$addEntry(nn.$mbr, nn.$nodeId);
					}
					else {
						newNode = this.$splitNode(parent, nn.$mbr.$copy(), nn.$nodeId);
					}
				}
				// AT5 [Move up to next level] Set N = P and set NN = PP if a split 
				// occurred. Repeat from AT2
				n = parent;
				nn = newNode;
				parent = null;
				newNode = null;
			}
			return nn;
		},
		$checkConsistency: function(nodeId, expectedLevel, expectedMBR) {
			// go through the tree, and check that the internal data structures of 
			// the tree are not corrupted.    
			var n = this.getNode(nodeId);
			if (ss.isNullOrUndefined(n)) {
				this.$log.$error('Error: Could not read Node<T> ' + nodeId);
			}
			if (n.$level !== expectedLevel) {
				this.$log.$error('Error: Node<T> ' + nodeId + ', expected level ' + expectedLevel + ', actual level ' + n.$level);
			}
			var calculatedMBR = this.$calculateMBR(n);
			if (!n.$mbr.equals(calculatedMBR)) {
				this.$log.$error('Error: Node<T> ' + nodeId + ', calculated MBR does not equal stored MBR');
			}
			if (ss.isValue(expectedMBR) && !n.$mbr.equals(expectedMBR)) {
				this.$log.$error('Error: Node<T> ' + nodeId + ', expected MBR (from parent) does not equal stored MBR');
			}
			// Check for corruption where a parent entry is the same object as the child MBR
			if (ss.isValue(expectedMBR) && n.$mbr.$sameObject(expectedMBR)) {
				this.$log.$error('Error: Node<T> ' + nodeId + " MBR using same rectangle object as parent's entry");
			}
			for (var i = 0; i < n.$entryCount; i++) {
				if (ss.isNullOrUndefined(n.$entries[i])) {
					this.$log.$error('Error: Node<T> ' + nodeId + ', Entry ' + i + ' is null');
				}
				if (n.$level > 1) {
					// if not a leaf
					this.$checkConsistency(n.$ids[i], n.$level - 1, n.$entries[i]);
				}
			}
		},
		$calculateMBR: function(n) {
			var mbr = new $Pather_Servers_Libraries_RTree_Rectangle.$ctor1(n.$entries[0].$min, n.$entries[0].$max);
			for (var i = 1; i < n.$entryCount; i++) {
				mbr.$add(n.$entries[i]);
			}
			return mbr;
		},
		get_count: function() {
			return this.$msize;
		}
	}, function() {
		return null;
	}, function() {
		return [];
	});
	$type.$ctor1.prototype = $type.prototype;
	$type.$version = '1.0b2p1';
	$type.$defaulT_MAX_NODE_ENTRIES = 10;
	$type.$entrY_STATUS_ASSIGNED = 0;
	$type.$entrY_STATUS_UNASSIGNED = 1;
	return $type;
};
$Pather_Servers_Libraries_RTree_RTree$1.__typeName = 'Pather.Servers.Libraries.RTree.RTree$1';
ss.initGenericClass($Pather_Servers_Libraries_RTree_RTree$1, $asm, 1);
global.Pather.Servers.Libraries.RTree.RTree$1 = $Pather_Servers_Libraries_RTree_RTree$1;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.Libraries.RTree.RTreePoint
var $Pather_Servers_Libraries_RTree_RTreePoint = function(x, y, z) {
	this.$coordinates = null;
	this.$coordinates = new Array($Pather_Servers_Libraries_RTree_RTreePoint.$DIMENSIONS);
	this.$coordinates[0] = x;
	this.$coordinates[1] = y;
	this.$coordinates[2] = z;
};
$Pather_Servers_Libraries_RTree_RTreePoint.__typeName = 'Pather.Servers.Libraries.RTree.RTreePoint';
global.Pather.Servers.Libraries.RTree.RTreePoint = $Pather_Servers_Libraries_RTree_RTreePoint;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.Libraries.RTree.Vector2
var $Pather_Servers_Libraries_RTree_Vector2 = function(value) {
	this.x = 0;
	this.y = 0;
	this.x = value;
	this.y = value;
};
$Pather_Servers_Libraries_RTree_Vector2.__typeName = 'Pather.Servers.Libraries.RTree.Vector2';
$Pather_Servers_Libraries_RTree_Vector2.$ctor1 = function(x, y) {
	this.x = 0;
	this.y = 0;
	this.x = x;
	this.y = y;
};
global.Pather.Servers.Libraries.RTree.Vector2 = $Pather_Servers_Libraries_RTree_Vector2;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.MonitorServer.MonitorServer
var $Pather_Servers_MonitorServer_MonitorServer = function() {
	$Pather_Servers_MonitorServer_MonitorServer.$startMonitorServer();
	$Pather_Servers_MonitorServer_MonitorServer.$startSegmentMonitorServer();
};
$Pather_Servers_MonitorServer_MonitorServer.__typeName = 'Pather.Servers.MonitorServer.MonitorServer';
$Pather_Servers_MonitorServer_MonitorServer.$startSegmentMonitorServer = function() {
	//ExtensionMethods.debugger("");
	var http = require('http');
	var app = http.createServer(function(req, res) {
		res.end();
	});
	var io = socketio.listen(app);
	var port = 9992;
	var currentIP = $Pather_Servers_Utils_ServerHelper.getNetworkIPs()[0];
	console.log(currentIP);
	app.listen(port);
	io.set('log level', 0);
	var connections = [];
	var logListener = new $Pather_Servers_Common_ServerLogging_GameSegmentLogListener(function(mess) {
		for (var $t1 = 0; $t1 < connections.length; $t1++) {
			var socketIoConnection = connections[$t1];
			socketIoConnection.emit('message', mess);
		}
	});
	io.sockets.on('connection', function(socket) {
		console.log('User Joined');
		connections.push(socket);
		socket.on('disconnect', function(data) {
			ss.remove(connections, socket);
		});
	});
};
$Pather_Servers_MonitorServer_MonitorServer.$startMonitorServer = function() {
	//ExtensionMethods.debugger("");
	var http = require('http');
	var app = http.createServer(function(req, res) {
		res.end();
	});
	var io = socketio.listen(app);
	var port = 9991;
	var currentIP = $Pather_Servers_Utils_ServerHelper.getNetworkIPs()[0];
	console.log(currentIP);
	app.listen(port);
	io.set('log level', 0);
	var serverTypes = ['GameSegment', 'ClusterManager', 'GameWorld', 'Gateway', 'Chat', 'Tick', 'Auth'];
	var connections = [];
	new $Pather_Servers_Common_ServerLogging_ServerLogListener(serverTypes, function(mess) {
		for (var $t1 = 0; $t1 < connections.length; $t1++) {
			var socketIoConnection = connections[$t1];
			socketIoConnection.emit(mess.serverType, mess);
		}
	});
	io.sockets.on('connection', function(socket) {
		console.log('User Joined');
		connections.push(socket);
		socket.on('disconnect', function(data) {
			ss.remove(connections, socket);
		});
	});
};
global.Pather.Servers.MonitorServer.MonitorServer = $Pather_Servers_MonitorServer_MonitorServer;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.ServerManager.ClusterCreation
var $Pather_Servers_ServerManager_$ClusterCreation = function() {
	this.$clusterManagerId = null;
};
$Pather_Servers_ServerManager_$ClusterCreation.__typeName = 'Pather.Servers.ServerManager.$ClusterCreation';
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.ServerManager.GameSegment
var $Pather_Servers_ServerManager_GameSegment = function() {
};
$Pather_Servers_ServerManager_GameSegment.__typeName = 'Pather.Servers.ServerManager.GameSegment';
global.Pather.Servers.ServerManager.GameSegment = $Pather_Servers_ServerManager_GameSegment;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.ServerManager.GameSegmentCluster
var $Pather_Servers_ServerManager_GameSegmentCluster = function() {
	this.gameSegments = null;
	this.clusterManagerId = null;
	this.gameSegments = [];
};
$Pather_Servers_ServerManager_GameSegmentCluster.__typeName = 'Pather.Servers.ServerManager.GameSegmentCluster';
global.Pather.Servers.ServerManager.GameSegmentCluster = $Pather_Servers_ServerManager_GameSegmentCluster;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.ServerManager.GatewayCluster
var $Pather_Servers_ServerManager_GatewayCluster = function() {
	this.gatewayServers = null;
	this.clusterManagerId = null;
	this.gatewayServers = [];
};
$Pather_Servers_ServerManager_GatewayCluster.__typeName = 'Pather.Servers.ServerManager.GatewayCluster';
global.Pather.Servers.ServerManager.GatewayCluster = $Pather_Servers_ServerManager_GatewayCluster;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.ServerManager.GatewayServer
var $Pather_Servers_ServerManager_GatewayServer = function() {
};
$Pather_Servers_ServerManager_GatewayServer.__typeName = 'Pather.Servers.ServerManager.GatewayServer';
global.Pather.Servers.ServerManager.GatewayServer = $Pather_Servers_ServerManager_GatewayServer;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.ServerManager.ServerManager
var $Pather_Servers_ServerManager_ServerManager = function(pubSub, pushPop) {
	this.pushPop = null;
	this.$serverManagerPubSub = null;
	this.$gameSegmentClusters = null;
	this.$gatewayClusters = null;
	this.pushPop = pushPop;
	this.$gameSegmentClusters = [];
	this.$gatewayClusters = [];
	Pather.Common.Utils.Promises.Q.all([pubSub.init(6379), pushPop.init()]).then(ss.mkdel(this, function() {
		this.$ready(pubSub);
	}));
};
$Pather_Servers_ServerManager_ServerManager.__typeName = 'Pather.Servers.ServerManager.ServerManager';
global.Pather.Servers.ServerManager.ServerManager = $Pather_Servers_ServerManager_ServerManager;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.ServerManager.ServerManagerPubSub
var $Pather_Servers_ServerManager_ServerManagerPubSub = function(pubSub) {
	this.pubSub = null;
	this.onMessage = null;
	this.$deferredMessages = new (ss.makeGenericType(ss.Dictionary$2, [String, ss.makeGenericType(Pather.Common.Utils.Promises.Deferred$2, [Object, Pather.Common.Utils.Promises.UndefinedPromiseError])]))();
	this.pubSub = pubSub;
};
$Pather_Servers_ServerManager_ServerManagerPubSub.__typeName = 'Pather.Servers.ServerManager.ServerManagerPubSub';
global.Pather.Servers.ServerManager.ServerManagerPubSub = $Pather_Servers_ServerManager_ServerManagerPubSub;
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
	this.$recievedOriginHash = {};
	$Pather_Servers_Common_ServerLogging_ServerLogger.initLogger('Tick', 'Tick');
	this.pubSub = pubSub;
	pubSub.init(6379).then(ss.mkdel(this, function() {
		this.tickPubSub = new $Pather_Servers_TickServer_TickPubSub(pubSub);
		this.tickPubSub.init().then(ss.mkdel(this, this.$ready));
	}));
};
$Pather_Servers_TickServer_TickServer.__typeName = 'Pather.Servers.TickServer.TickServer';
global.Pather.Servers.TickServer.TickServer = $Pather_Servers_TickServer_TickServer;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.TickServer.TickServerTickManager
var $Pather_Servers_TickServer_TickServerTickManager = function(tickPubSub) {
	this.tickPubSub = null;
	this.$forceOnNextTick = false;
	Pather.Common.Utils.TickManager.call(this);
	this.tickPubSub = tickPubSub;
	this.onProcessLockstep = ss.delegateCombine(this.onProcessLockstep, ss.mkdel(this, this.$onProcessLockstep));
};
$Pather_Servers_TickServer_TickServerTickManager.__typeName = 'Pather.Servers.TickServer.TickServerTickManager';
global.Pather.Servers.TickServer.TickServerTickManager = $Pather_Servers_TickServer_TickServerTickManager;
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
ss.initClass($Pather_Servers_ServerStarter, $asm, {});
ss.initClass($Pather_Servers_AuthServer_AuthServer, $asm, {});
ss.initClass($Pather_Servers_ClusterManager_ClusterManager, $asm, {
	$pubsubsConnected: function() {
		this.clusterManagerPubSub = new $Pather_Servers_ClusterManager_ClusterManagerPubSub(this.$pubsub, this.clusterManagerId);
		this.clusterManagerPubSub.onMessage = ss.delegateCombine(this.clusterManagerPubSub.onMessage, ss.mkdel(this, this.$receiveMessage));
		this.clusterManagerPubSub.init();
		this.pushPop.push(this.clusterManagerId, null);
	},
	$receiveMessage: function(message) {
		switch (message.type) {
			case 'createGameSegment': {
				this.$createGameSegment(message);
				break;
			}
			case 'createGateway': {
				this.$createGateway(message);
				break;
			}
			default: {
				throw new ss.ArgumentOutOfRangeException();
			}
		}
	},
	$createGateway: function(createGatewayMessage) {
		console.log('Spawning new gateway');
		var spawn = require('child_process').spawn;
		var fs = require('fs');
		var m = fs.openSync('./outgw.log', 'a', null);
		var out = fs.openSync('./outgw.log', 'a', null);
		var err = fs.openSync('./outgw.log', 'a', null);
		this.pushPop.blockingPop(createGatewayMessage.gatewayId, Pather.Common.Constants.gatewayCreationWait).then(ss.mkdel(this, function(content) {
			var $t2 = this.clusterManagerPubSub;
			var $t1 = Pather.Common.Models.ServerManager.CreateGateway_Response_ClusterManager_ServerManager_PubSub_ReqRes_Message.$ctor();
			$t1.gatewayId = createGatewayMessage.gatewayId;
			$t1.messageId = createGatewayMessage.messageId;
			$t2.publishToServerManager($t1);
			console.log('Gateway Server Created!', createGatewayMessage.gatewayId);
		})).error(function(a) {
			console.log('Gateway Server Creation Failed!');
		});
		var str = 'C:\\Users\\deste_000\\AppData\\Roaming\\npm\\node-debug.cmd';
		str = 'node';
		var child = spawn(str, ['app.js', 'gateway', createGatewayMessage.gatewayId, createGatewayMessage.port.toString()], { stdio: [m, out, err] });
		//            child.Unref();
	},
	$createGameSegment: function(createGameSegmentMessage) {
		console.log('Spawning new game segment');
		var spawn = require('child_process').spawn;
		var fs = require('fs');
		var m = fs.openSync('./outgs.log', 'a', null);
		var out = fs.openSync('./outgs.log', 'a', null);
		var err = fs.openSync('./outgs.log', 'a', null);
		this.pushPop.blockingPop(createGameSegmentMessage.gameSegmentId, Pather.Common.Constants.gameSegmentCreationWait).then(ss.mkdel(this, function(content) {
			var $t2 = this.clusterManagerPubSub;
			var $t1 = Pather.Common.Models.ServerManager.CreateGameSegment_Response_ClusterManager_ServerManager_PubSub_ReqRes_Message.$ctor();
			$t1.gameSegmentId = createGameSegmentMessage.gameSegmentId;
			$t1.messageId = createGameSegmentMessage.messageId;
			$t2.publishToServerManager($t1);
			console.log('Game Segment Server Created!', createGameSegmentMessage.gameSegmentId);
		})).error(function(a) {
			console.log('Game Segment Server Creation Failed!');
		});
		var str = 'C:\\Users\\deste_000\\AppData\\Roaming\\npm\\node-debug.cmd';
		//            str = "node";
		var child = spawn(str, ['app.js', 'gamesegment', createGameSegmentMessage.gameSegmentId], { stdio: [m, out, err] });
		//            child.Unref();
	}
});
ss.initClass($Pather_Servers_ClusterManager_ClusterManagerPubSub, $asm, {
	init: function() {
		this.pubSub.subscribe($Pather_Servers_Common_PubSub_PubSubChannels.clusterManager$1(this.clusterManagerId), ss.mkdel(this, function(message) {
			var gameWorldPubSubMessage = message;
			this.onMessage(gameWorldPubSubMessage);
		}));
	},
	publishToGameWorld: function(message) {
		this.pubSub.publish($Pather_Servers_Common_PubSub_PubSubChannels.gameWorld(), message);
	},
	publishToServerManager: function(message) {
		this.pubSub.publish($Pather_Servers_Common_PubSub_PubSubChannels.serverManager(), message);
	}
});
ss.initClass($Pather_Servers_ClusterManager_Tests_ClusterManagerTest, $asm, {});
ss.initClass($Pather_Servers_Common_BackEndTickManager, $asm, {
	init$1: function(sendPing, onTickManagerReady) {
		this.$sendPing = sendPing;
		this.$onTickManagerReady = onTickManagerReady;
		setInterval(ss.mkdel(this, this.startPing), Pather.Common.Constants.latencyPingInterval);
	},
	startPing: function() {
		this.$pingSent = [];
		this.$lastPing = (new Date()).getTime();
		this.$sendPing();
	},
	onPongReceived: function() {
		if (ss.isNullOrUndefined(this.$pingSent)) {
			console.log('Mis pong');
			return;
		}
		var cur = (new Date()).getTime();
		this.$pingSent.push(cur - this.$lastPing);
		this.$lastPing = cur;
		if (this.$pingSent.length < 2) {
			this.$sendPing();
		}
		else {
			var average = 0;
			for (var $t1 = 0; $t1 < this.$pingSent.length; $t1++) {
				var l = this.$pingSent[$t1];
				average += l;
			}
			var roundTripLatency = average / this.$pingSent.length;
			var oneWayLatency = ss.Int32.div(ss.Int32.trunc(roundTripLatency), 2);
			this.setServerLatency(oneWayLatency);
			this.$pingSent = null;
		}
	},
	setLockStepTick: function(lockStepTickNumber) {
		Pather.Common.Utils.TickManager.prototype.setLockStepTick.call(this, lockStepTickNumber);
		this.$hasLockstep = true;
		if (this.$hasLatency && this.$hasLockstep && !this.$tickManagerInitialized) {
			this.$tickManagerInitialized = true;
			this.$tickManagerReady();
		}
	},
	setServerLatency: function(latency) {
		if (this.currentServerLatency !== latency) {
			$Pather_Servers_Common_ServerLogging_ServerLogger.logInformation('Severy latency is ', [latency, 'ms']);
		}
		Pather.Common.Utils.TickManager.prototype.setServerLatency.call(this, latency);
		this.$hasLatency = true;
		if (this.$hasLatency && this.$hasLockstep && !this.$tickManagerInitialized) {
			this.$tickManagerInitialized = true;
			this.$tickManagerReady();
		}
	},
	$tickManagerReady: function() {
		this.init(this.lockstepTickNumber);
		this.$onTickManagerReady();
	}
}, Pather.Common.Utils.TickManager);
ss.initClass($Pather_Servers_Common_ConnectionConstants, $asm, {});
ss.initClass($Pather_Servers_Common_ServerCommunicator, $asm, {
	listenOnChannel: function(T) {
		return function(socket, channel, callback) {
			socket.on(channel, function(obj) {
				callback(socket, obj.data);
			});
		};
	},
	oldListenOnChannel: function(T) {
		return function(socket, channel, callback) {
			socket.on(channel, function(obj) {
				callback(socket, obj.data);
			});
		};
	},
	sendMessage: function(socket, obj) {
		socket.emit(Pather.Common.Models.Gateway.Socket.Base.User_Socket_Message).call(socket, 'Gateway.Message', ss.makeGenericType(Pather.Common.Utils.DataObject$1, [Pather.Common.Models.Gateway.Socket.Base.User_Socket_Message]).$ctor(obj));
	},
	oldSendMessage: function(T) {
		return function(socket, channel, obj) {
			socket.emit(T).call(socket, channel, ss.makeGenericType(Pather.Common.Utils.DataObject$1, [T]).$ctor(obj));
		};
	},
	get_URL: function() {
		return this.$socketManager.get_URL();
	}
});
ss.initClass($Pather_Servers_Common_TickWatcher, $asm, {
	$setTimout: function() {
		var now = (new Date()).getTime();
		var elap = now - this.$startTime;
		this.$counter++;
		if (this.$counter % 10 === 0) {
			console.log('Tick called ', this.$counter, 'Seconds since start', ss.Int32.div(elap, 1000));
		}
		setTimeout(ss.mkdel(this, this.$setTimout), 1);
	}
});
ss.initInterface($Pather_Servers_Common_PubSub_IPubSub, $asm, { publish: null, publishForce: null, subscribe: null, init: null, receivedMessage: null, dontLog: null });
ss.initClass($Pather_Servers_Common_PubSub_PubSub, $asm, {
	init: function(port) {
		var deferred = Pather.Common.Utils.Promises.Q.defer();
		this.$subbed = {};
		var redis = require('redis');
		redis.debug_mode = false;
		this.$subClient = redis.createClient(port, $Pather_Servers_Common_ConnectionConstants.redisIP);
		this.$pubClient = redis.createClient(port, $Pather_Servers_Common_ConnectionConstants.redisIP);
		this.$subClient.on('subscribe', function(channel, count) {
			Pather.Common.Utils.Logger.log('subscribed: ' + channel + ' ' + count, 'information');
		});
		this.$subClient.on('unsubscribe', function(channel1, count1) {
			Pather.Common.Utils.Logger.log('unsubscribed: ' + channel1 + ' ' + count1, 'information');
		});
		this.$subClient.on('message', ss.mkdel(this, function(channel2, messageString) {
			this.receivedMessage(channel2, JSON.parse(messageString));
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
		setInterval(this.$flush.bind(this), 10);
		this.$dontLog = true;
		return deferred.promise;
	},
	$flush: function() {
		if (this.$channelCache.length === 0) {
			return;
		}
		var count = 0;
		for (var $t1 = 0; $t1 < this.$channelCache.length; $t1++) {
			var channel = this.$channelCache[$t1];
			var $t2 = Pather.Common.Models.Common.PubSub_Message_Collection.$ctor();
			$t2.collection = channel.item2;
			var pubSubMessageCollection = $t2;
			this.$pubClient.publish(channel.item1, JSON.stringify(pubSubMessageCollection));
			count += channel.item2.length;
		}
		if (count > 70) {
			console.log('Flushing', count);
		}
		ss.clearKeys(this.$channelCacheDict);
		ss.clear(this.$channelCache);
	},
	receivedMessage: function(channel, message) {
		try {
			if (!this.$dontLog) {
				//                if (channel != PubSubChannels.Tick() && !message.Contains("pong") && !message.Contains("tickSync") /*todo this pong stuff aint gonna fly when you remove namedvalues*/)
				$Pather_Servers_Common_ServerLogging_ServerLogger.logTransport('Pubsub Message Received', [channel, message]);
			}
			var channelCallback = this.$subbed[channel];
			if (!ss.staticEquals(channelCallback, null)) {
				if (Pather.Common.Utils.Utilities.hasField(Pather.Common.Models.Common.PubSub_Message_Collection).call(null, message, function(a) {
					return a.collection;
				})) {
					var messages = message;
					for (var $t1 = 0; $t1 < messages.collection.length; $t1++) {
						var m = messages.collection[$t1];
						channelCallback(m);
					}
				}
				else {
					channelCallback(message);
				}
			}
		}
		catch ($t2) {
			var e = ss.Exception.wrap($t2);
			console.log('An exception has occured', e, e.get_stack());
			console.log('Payload Dump', channel, message);
			$Pather_Servers_Common_ServerLogging_ServerLogger.logError('Exception', [e, e.get_stack(), channel, message]);
		}
	},
	dontLog: function() {
		this.$dontLog = true;
	},
	publish: function(channel, message) {
		if (!this.$dontLog) {
			if (!ss.referenceEquals(channel, $Pather_Servers_Common_PubSub_PubSubChannels.tick())) {
				$Pather_Servers_Common_ServerLogging_ServerLogger.logTransport('Pubsub Message Sent', [channel, message]);
			}
		}
		this.$addToCache(channel, message);
	},
	publishForce: function(channel, message) {
		if (!this.$dontLog) {
			if (!ss.referenceEquals(channel, $Pather_Servers_Common_PubSub_PubSubChannels.tick())) {
				$Pather_Servers_Common_ServerLogging_ServerLogger.logTransport('Pubsub Message Sent', [channel, message]);
			}
		}
		this.$pubClient.publish(channel, JSON.stringify(message));
	},
	$addToCache: function(channel, message) {
		if (!this.$channelCacheDict[channel]) {
			this.$channelCacheDict[channel] = [];
			this.$channelCache.push({ item1: channel, item2: this.$channelCacheDict[channel] });
		}
		this.$channelCacheDict[channel].push(message);
	},
	subscribe: function(channel, callback) {
		if (!this.$dontLog) {
			if (!ss.referenceEquals(channel, $Pather_Servers_Common_PubSub_PubSubChannels.tick())) {
				$Pather_Servers_Common_ServerLogging_ServerLogger.logDebug('Pubsub Subscribed to', [channel]);
			}
		}
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
ss.initClass($Pather_Servers_Common_ServerLogging_GameSegmentLogListener, $asm, {
	subscribe: function(channel, callback) {
		this.$pubsub.subscribe($Pather_Servers_Common_PubSub_PubSubChannels.serverLogger(channel), function(content) {
			callback(content);
		});
	}
});
ss.initClass($Pather_Servers_Common_ServerLogging_ServerLogger, $asm, {});
ss.initClass($Pather_Servers_Common_ServerLogging_ServerLogListener, $asm, {
	subscribe: function(channel, callback) {
		this.$pubsub.subscribe($Pather_Servers_Common_PubSub_PubSubChannels.serverLogger(channel), function(content) {
			callback(content);
		});
	}
});
ss.initClass($Pather_Servers_Common_ServerLogging_ServerLogMessage, $asm, {}, null, [Pather.Common.Models.Common.IPubSub_Message]);
ss.initInterface($Pather_Servers_Common_SocketManager_ISocket, $asm, { on: null, disconnect: null, emit: null });
ss.initInterface($Pather_Servers_Common_SocketManager_ISocketManager, $asm, { init: null, connections: null, get_URL: null });
ss.initClass($Pather_Servers_Common_SocketManager_SocketIOManager, $asm, {
	init: function(port) {
		var http = require('http');
		var app = http.createServer(function(req, res) {
			res.end();
		});
		this.$io = socketio.listen(app);
		var networkIPs = $Pather_Servers_Utils_ServerHelper.getNetworkIPs();
		var currentIP = networkIPs[0] + ':' + port;
		this.$url = ss.formatString('http://{0}', currentIP);
		console.log('Server URL', this.$url);
		app.listen(port);
	},
	connections: function(action) {
		this.$io.sockets.on('connection', function(socket) {
			action(new $Pather_Servers_Common_SocketManager_SocketIOSocket(socket));
		});
	},
	get_URL: function() {
		return this.$url;
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
		this.get_socket().on('disconnect', callback);
	},
	emit: function(T) {
		return function(channel, dataObject) {
			this.get_socket().emit(channel, dataObject);
		};
	}
}, null, [$Pather_Servers_Common_SocketManager_ISocket]);
ss.initClass($Pather_Servers_Common_Tests_StubPubSub, $asm, {
	publish: function(channel, content) {
		throw new ss.NotImplementedException();
	},
	publishForce: function(channel, content) {
		throw new ss.NotImplementedException();
	},
	subscribe: function(channel, callback) {
		this.$channels.add(channel, callback);
	},
	init: function(port) {
		throw new ss.NotImplementedException();
	},
	receivedMessage: function(channel, message) {
		this.$channels.get_item(channel)(message);
	},
	dontLog: function() {
		throw new ss.NotImplementedException();
	}
}, null, [$Pather_Servers_Common_PubSub_IPubSub]);
ss.initClass($Pather_Servers_Database_DatabaseError, $asm, {});
ss.initInterface($Pather_Servers_Database_IDatabaseQueries, $asm, { getUserByToken: null });
ss.initClass($Pather_Servers_Database_DatabaseQueries, $asm, {
	getUserByToken: function(token) {
		//todo IMPLEMENT DATABASE FOOL
		var deferred = Pather.Common.Utils.Promises.Q.defer$2($Pather_Servers_Database_DBUser, $Pather_Servers_Database_DatabaseError).call(null);
		setTimeout(function() {
			var $t1 = $Pather_Servers_Database_DBUser.$ctor();
			$t1.userId = token;
			$t1.token = token;
			$t1.x = ss.Int32.trunc(Math.random() * 500);
			$t1.y = ss.Int32.trunc(Math.random() * 500);
			var dbUser = $t1;
			dbUser.x = 12;
			dbUser.y = 24;
			deferred.resolve(dbUser);
		}, 20);
		return deferred.promise;
	}
}, null, [$Pather_Servers_Database_IDatabaseQueries]);
ss.initClass($Pather_Servers_Database_DBUser, $asm, {});
ss.initClass($Pather_Servers_GameSegmentServer_GameSegment, $asm, {
	userLeft: function(userId) {
		var user = this.users[userId];
		if (ss.isNullOrUndefined(user)) {
			throw new ss.Exception('IDK Who this user is:' + userId);
		}
		delete this.users[userId];
		console.log(this.gameSegmentId, 'User Left Game Segment');
		$Pather_Servers_Common_ServerLogging_ServerLogger.logInformation('User Left Game Segment', ['User count now: ', ss.getKeyCount(this.users)]);
	},
	userJoin: function(gameSegmentUser) {
		this.users[gameSegmentUser.entityId] = gameSegmentUser;
		$Pather_Servers_Common_ServerLogging_ServerLogger.logInformation('User Joined A Game Segment', []);
		//            Global.Console.Log(GameSegmentId, "User Joined A Game Segment", gameSegmentUser.UserId, gameSegmentUser.GatewayId);
	}
});
ss.initClass($Pather_Servers_GameSegmentServer_GameSegmentPubSub, $asm, {
	init: function() {
		var deferred = Pather.Common.Utils.Promises.Q.defer();
		this.pubSub.subscribe($Pather_Servers_Common_PubSub_PubSubChannels.gameSegment(), ss.mkdel(this, function(message) {
			var gameSegmentPubSubMessage = message;
			this.onAllMessage(gameSegmentPubSubMessage);
		}));
		this.pubSub.subscribe($Pather_Servers_Common_PubSub_PubSubChannels.gameSegment$1(this.gameSegmentId), ss.mkdel(this, function(message1) {
			var gameSegmentPubSubMessage1 = message1;
			if (Pather.Common.Utils.Utilities.hasField(Pather.Common.Models.GameSegment.Base.GameSegment_PubSub_ReqRes_Message).call(null, gameSegmentPubSubMessage1, function(m) {
				return m.messageId;
			}) && gameSegmentPubSubMessage1.response) {
				var possibleMessageReqRes = gameSegmentPubSubMessage1;
				if (!this.deferredMessages.containsKey(possibleMessageReqRes.messageId)) {
					console.log('Received message that I didnt ask for.', message1);
					throw new ss.Exception('Received message that I didnt ask for.');
				}
				this.deferredMessages.get_item(possibleMessageReqRes.messageId).resolve(gameSegmentPubSubMessage1);
				this.deferredMessages.remove(possibleMessageReqRes.messageId);
				return;
			}
			this.onMessage(gameSegmentPubSubMessage1);
		}));
		deferred.resolve();
		return deferred.promise;
	},
	publishToTickServer: function(message) {
		this.pubSub.publish($Pather_Servers_Common_PubSub_PubSubChannels.tick(), message);
	},
	publishToGateway: function(gatewayId, message) {
		var gateway = $Pather_Servers_Common_PubSub_PubSubChannels.gateway$1(gatewayId);
		this.pubSub.publish(gateway, message);
	},
	publishToGameWorld: function(message) {
		this.pubSub.publish($Pather_Servers_Common_PubSub_PubSubChannels.gameWorld(), message);
	},
	publishToGameWorld_Force: function(message) {
		this.pubSub.publishForce($Pather_Servers_Common_PubSub_PubSubChannels.gameWorld(), message);
	},
	publishToGameWorldWithCallback: function(T) {
		return function(message) {
			var deferred = Pather.Common.Utils.Promises.Q.defer$2(T, Pather.Common.Utils.Promises.UndefinedPromiseError).call(null);
			this.pubSub.publish($Pather_Servers_Common_PubSub_PubSubChannels.gameWorld(), message);
			this.deferredMessages.add(message.messageId, deferred);
			return deferred.promise;
		};
	},
	publishToGameSegment: function(gameSegmentId, message) {
		this.pubSub.publish($Pather_Servers_Common_PubSub_PubSubChannels.gameSegment$1(gameSegmentId), message);
	}
});
ss.initClass($Pather_Servers_GameSegmentServer_GameSegmentServer, $asm, {
	$registerGameSegmentWithCluster: function() {
		//register game segment
		this.$pushPop.push(this.$gameSegmentId, 1);
	},
	$onAllMessage: function(message) {
		switch (message.type) {
			case 'tickSync': {
				var tickSyncMessage = message;
				this.$gameManager.setLockStepTick(tickSyncMessage.lockstepTickNumber);
				break;
			}
			default: {
				throw new ss.ArgumentOutOfRangeException();
			}
		}
	}
});
ss.initInterface($Pather_Servers_GameSegmentServer_IServerGameEntity, $asm, {});
ss.initClass($Pather_Servers_GameSegmentServer_ServerGame, $asm, {
	createGameUser: function(userId) {
		return new $Pather_Servers_GameSegmentServer_ServerGameUser(this, userId);
	},
	queueUserAction$1: function(user, action) {
		action.entityId = user.entityId;
		if (true) {
			this.queueUserAction(action);
			switch (action.userActionType) {
				case 0: {
					var moveAction = action;
					var $t2 = this.$gameManager;
					var $t1 = Pather.Common.Models.Common.UserActions.MoveEntityAction.$ctor();
					$t1.x = moveAction.x;
					$t1.y = moveAction.y;
					$t1.entityId = moveAction.entityId;
					$t1.lockstepTick = moveAction.lockstepTick;
					$t2.sendAction(user, $t1);
					break;
				}
				default: {
					throw new ss.ArgumentOutOfRangeException();
				}
			}
		}
	},
	userLeft: function(userId) {
		var user = ss.cast(this.activeEntities.get_item(userId), $Pather_Servers_GameSegmentServer_ServerGameUser);
		var gameSegment = user.gameSegment;
		gameSegment.userLeft(userId);
		//todo remove user ina  method or something
		var $t1 = [];
		$t1.push(userId);
		var removed = $t1;
		for (var $t2 = 0; $t2 < user.neighbors.list.length; $t2++) {
			var gameEntityNeighbor = user.neighbors.list[$t2];
			var serverGameUser = ss.cast(gameEntityNeighbor.entity, $Pather_Servers_GameSegmentServer_ServerGameUser);
			var neighbors = serverGameUser.neighbors;
			for (var $t3 = 0; $t3 < neighbors.list.length; $t3++) {
				var entityNeighbor = neighbors.list[$t3];
				if (ss.referenceEquals(entityNeighbor.entity, user)) {
					neighbors.remove(entityNeighbor);
					break;
				}
			}
			var $t5 = this.$gameManager;
			var $t4 = Pather.Common.Models.Gateway.PubSub.UpdateNeighbors_GameSegment_Gateway_PubSub_Message.$ctor();
			$t4.userId = serverGameUser.entityId;
			$t4.removed = removed;
			$t5.sendToUser(serverGameUser, $t4);
		}
		user.neighbors.clear();
		this.activeEntities.remove(user);
	},
	userJoin: function(userJoinGameUser) {
		var $t1 = new $Pather_Servers_GameSegmentServer_ServerGameUser(this, userJoinGameUser.userId);
		$t1.gameSegment = this.$gameManager.allGameSegments[this.$gameManager.gameSegmentId];
		$t1.gatewayId = userJoinGameUser.gatewayId;
		$t1.x = userJoinGameUser.x;
		$t1.y = userJoinGameUser.y;
		var serverGameUser = $t1;
		this.activeEntities.add(serverGameUser);
		serverGameUser.gameSegment.userJoin(serverGameUser);
		this.buildNeighbors();
	},
	tellUserJoin: function(message) {
		var $t1 = new $Pather_Servers_GameSegmentServer_ServerGameUser(this, message.userId);
		$t1.gameSegment = this.$gameManager.allGameSegments[message.gameSegmentId];
		$t1.gatewayId = message.gatewayId;
		$t1.x = message.x;
		$t1.y = message.y;
		var gameSegmentUser = $t1;
		var otherGameSegment = this.$gameManager.allGameSegments[message.gameSegmentId];
		this.activeEntities.add(gameSegmentUser);
		//            Global.Console.Log(GameSegmentId, "User joined from other gamesegment", message.GameSegmentId, message.UserId);
		otherGameSegment.userJoin(gameSegmentUser);
		this.buildNeighbors();
		//            GameSegmentLogger.LogUserJoin(false, gameSegmentUser.UserId, gameSegmentUser.X, gameSegmentUser.Y, gameSegmentUser.Neighbors.Keys);
	},
	buildNeighbors: function() {
		//            Global.Console.Log(GameSegmentId, "Building Neighbors");
		for (var $t1 = 0; $t1 < this.activeEntities.list.length; $t1++) {
			var entity = this.activeEntities.list[$t1];
			entity.set_oldNeighbors(ss.arrayClone(entity.neighbors.list));
			entity.neighbors.clear();
		}
		var $t2 = new ss.ObjectEnumerator(this.$gameManager.myGameSegment.users);
		try {
			while ($t2.moveNext()) {
				var user = $t2.current();
				this.buildNeighbors$1(user.value);
			}
		}
		finally {
			$t2.dispose();
		}
		this.diffNeighbors();
		//            Global.Console.Log(GameSegmentId, "Updated", AllGameSegments);
	},
	buildNeighbors$1: function(pUser) {
		for (var $t1 = 0; $t1 < this.activeEntities.list.length; $t1++) {
			var cUser = this.activeEntities.list[$t1];
			if (cUser.neighbors.contains$1(pUser.entityId) || ss.referenceEquals(cUser, pUser)) {
				continue;
			}
			var distance = $Pather_Servers_GameSegmentServer_ServerGame.$pointDistance(pUser, cUser);
			if (distance <= Pather.Common.Constants.neighborDistance) {
				//                    Global.Console.Log(GameSegmentId,"Neighbor Found", cUser.UserId, pUser.UserId, distance);
				pUser.neighbors.add(new Pather.Common.GameFramework.GameEntityNeighbor(cUser, distance));
				cUser.neighbors.add(new Pather.Common.GameFramework.GameEntityNeighbor(pUser, distance));
			}
		}
	},
	diffNeighbors: function() {
		var $t1 = new ss.ObjectEnumerator(this.$gameManager.myGameSegment.users);
		try {
			while ($t1.moveNext()) {
				var userKV = $t1.current();
				var removed = [];
				var added = [];
				var gameSegmentUser = userKV.value;
				for (var $t2 = 0; $t2 < gameSegmentUser.neighbors.list.length; $t2++) {
					var gameSegmentNeighbor = gameSegmentUser.neighbors.list[$t2];
					var notIn = true;
					var $t3 = gameSegmentUser.get_oldNeighbors();
					for (var $t4 = 0; $t4 < $t3.length; $t4++) {
						var segmentNeighbor = $t3[$t4];
						if (ss.referenceEquals(gameSegmentNeighbor.entity, segmentNeighbor.entity)) {
							notIn = false;
							break;
						}
					}
					if (notIn) {
						added.push(ss.cast(gameSegmentNeighbor.entity, $Pather_Servers_GameSegmentServer_ServerGameUser));
					}
				}
				var $t5 = gameSegmentUser.get_oldNeighbors();
				for (var $t6 = 0; $t6 < $t5.length; $t6++) {
					var gameSegmentNeighbor1 = $t5[$t6];
					var notIn1 = true;
					for (var $t7 = 0; $t7 < gameSegmentUser.neighbors.list.length; $t7++) {
						var segmentNeighbor1 = gameSegmentUser.neighbors.list[$t7];
						if (ss.referenceEquals(gameSegmentNeighbor1.entity, segmentNeighbor1.entity)) {
							notIn1 = false;
							break;
						}
					}
					if (notIn1) {
						removed.push(ss.cast(gameSegmentNeighbor1.entity, $Pather_Servers_GameSegmentServer_ServerGameUser));
					}
				}
				gameSegmentUser.set_oldNeighbors(null);
				if (added.length > 0 || removed.length > 0) {
					var $t8 = Pather.Common.Models.Gateway.PubSub.UpdateNeighbors_GameSegment_Gateway_PubSub_Message.$ctor();
					$t8.userId = gameSegmentUser.entityId;
					$t8.removed = Pather.Common.Utils.EnumerableExtensions.select(removed, function(a) {
						return a.entityId;
					});
					$t8.added = Pather.Common.Utils.EnumerableExtensions.select(added, function(a1) {
						var $t9 = Pather.Common.Models.Common.UpdatedNeighbor.$ctor();
						$t9.userId = a1.entityId;
						$t9.x = a1.x;
						$t9.y = a1.y;
						return $t9;
					});
					var updateNeighborsMessage = $t8;
					//                    Global.Console.Log(gameManager.GameSegmentId, updateNeighborsMessage);
					this.$gameManager.sendToUser(gameSegmentUser, updateNeighborsMessage);
				}
			}
		}
		finally {
			$t1.dispose();
		}
	}
}, Pather.Common.GameFramework.Game);
ss.initClass($Pather_Servers_GameSegmentServer_ServerGameManager, $asm, {
	init: function() {
		this.$gameSegmentPubSub.onMessage = ss.delegateCombine(this.$gameSegmentPubSub.onMessage, ss.mkdel(this, this.$onMessage));
		this.$gameSegmentPubSub.init().then(ss.mkdel(this, this.$ready));
	},
	$ready: function() {
		this.$backEndTickManager.init$1(ss.mkdel(this, this.$sendPing), ss.mkdel(this, this.$tickManagerReady));
		this.$backEndTickManager.startPing();
	},
	$tickManagerReady: function() {
		var $t2 = this.$gameSegmentPubSub;
		var $t1 = Pather.Common.Models.GameWorld.GameSegment.InitializeGameSegment_GameSegment_GameWorld_PubSub_ReqRes_Message.$ctor();
		$t1.originGameSegment = this.gameSegmentId;
		$t2.publishToGameWorldWithCallback(Pather.Common.Models.GameSegment.InitializeGameSegment_Response_GameWorld_GameSegment_PubSub_ReqRes_Message).call($t2, $t1).then(ss.mkdel(this, this.$initializeGameSegment));
	},
	$initializeGameSegment: function(message) {
		this.$serverGame.activeEntities.clear();
		ss.clearKeys(this.allGameSegments);
		this.$serverGame.init(message.grid, message.lockstepTickNumber);
		this.myGameSegment = new $Pather_Servers_GameSegmentServer_GameSegment(this.gameSegmentId);
		this.allGameSegments[this.myGameSegment.gameSegmentId] = this.myGameSegment;
		for (var $t1 = 0; $t1 < message.gameSegmentIds.length; $t1++) {
			var gameSegmentId = message.gameSegmentIds[$t1];
			this.allGameSegments[gameSegmentId] = new $Pather_Servers_GameSegmentServer_GameSegment(gameSegmentId);
		}
		for (var $t2 = 0; $t2 < message.allUsers.length; $t2++) {
			var initialGameUser = message.allUsers[$t2];
			var $t3 = new $Pather_Servers_GameSegmentServer_ServerGameUser(this.$serverGame, initialGameUser.userId);
			$t3.gameSegment = this.allGameSegments[initialGameUser.gameSegmentId];
			$t3.gatewayId = initialGameUser.gatewayId;
			$t3.x = initialGameUser.x;
			$t3.y = initialGameUser.y;
			var user = $t3;
			this.$serverGame.addEntity(user);
			user.gameSegment.userJoin(user);
		}
		this.$serverGame.buildNeighbors();
		console.log(this.gameSegmentId, 'Game Segment Initialized');
		setInterval(ss.mkdel(this.$serverGame, this.$serverGame.buildNeighbors), 2000);
		this.registerGameSegmentWithCluster();
	},
	$onMessage: function(message) {
		switch (message.type) {
			case 'userJoin': {
				this.$onMessageUserJoin(message);
				break;
			}
			case 'tellUserJoin': {
				this.$onMessageTellUserJoin(message);
				break;
			}
			case 'tellUserLeft': {
				this.$onMessageTellUserLeft(message);
				break;
			}
			case 'userLeft': {
				this.$onMessageUserLeft(message);
				break;
			}
			case 'newGameSegment': {
				this.onMessageNewGameSegment(message);
				break;
			}
			case 'pong': {
				this.$onMessagePong(message);
				break;
			}
			case 'userAction': {
				this.$onMessageUserAction$2(message);
				break;
			}
			case 'gameSegmentAction': {
				this.$onMessageUserAction$1(message);
				break;
			}
			case 'tellGameSegmentAction': {
				this.$onMessageUserAction(message);
				break;
			}
			default: {
				throw new ss.ArgumentOutOfRangeException();
			}
		}
	},
	$sendPing: function() {
		var $t2 = this.$gameSegmentPubSub;
		var $t1 = Pather.Common.Models.Tick.Ping_Tick_PubSub_Message.$ctor();
		$t1.origin = $Pather_Servers_Common_PubSub_PubSubChannels.gameSegment$1(this.gameSegmentId);
		$t1.originType = 0;
		$t2.publishToTickServer($t1);
	},
	tick: function(tickNumber) {
		this.$serverGame.tick(tickNumber);
	},
	sendAction: function(user, userAction) {
		var otherGameSegments = {};
		var gateways = Pather.Common.Utils.EnumerableExtensions.groupBy(user.neighbors.list, function(a) {
			return ss.cast(a.entity, $Pather_Servers_GameSegmentServer_ServerGameUser).gatewayId;
		});
		//todo maybe move this dict to a real object
		if (!ss.keyExists(gateways, user.gatewayId)) {
			gateways[user.gatewayId] = [];
		}
		gateways[user.gatewayId].push(new Pather.Common.GameFramework.GameEntityNeighbor(user, 0));
		var neighborGameSegments = Pather.Common.Utils.EnumerableExtensions.groupBy(user.neighbors.list, function(a1) {
			return ss.cast(a1.entity, $Pather_Servers_GameSegmentServer_ServerGameUser).gameSegment;
		});
		delete neighborGameSegments[this.myGameSegment];
		var $t1 = new ss.ObjectEnumerator(this.allGameSegments);
		try {
			while ($t1.moveNext()) {
				var otherGameSegment = $t1.current();
				if (!ss.keyExists(neighborGameSegments, otherGameSegment.value) && !ss.referenceEquals(otherGameSegment.key, this.gameSegmentId)) {
					otherGameSegments[otherGameSegment.key] = otherGameSegment.value;
				}
			}
		}
		finally {
			$t1.dispose();
		}
		var $t2 = new ss.ObjectEnumerator(gateways);
		try {
			while ($t2.moveNext()) {
				var gateway = $t2.current();
				var $t3 = Pather.Common.Models.Gateway.PubSub.UserActionCollection_GameSegment_Gateway_PubSub_Message.$ctor();
				$t3.users = Pather.Common.Utils.EnumerableExtensions.select(gateway.value, function(a2) {
					return a2.entity.entityId;
				});
				$t3.action = userAction;
				var userActionCollection = $t3;
				this.$gameSegmentPubSub.publishToGateway(gateway.key, userActionCollection);
			}
		}
		finally {
			$t2.dispose();
		}
		var $t4 = Pather.Common.Models.GameSegment.Base.TellUserAction_GameSegment_GameSegment_PubSub_Message.$ctor();
		$t4.userId = user.entityId;
		$t4.originatingGameSegmentId = this.gameSegmentId;
		$t4.action = userAction;
		var tellUserAction = $t4;
		var $t5 = new ss.ObjectEnumerator(otherGameSegments);
		try {
			while ($t5.moveNext()) {
				var otherGameSegment1 = $t5.current();
				this.$gameSegmentPubSub.publishToGameSegment(otherGameSegment1.key, tellUserAction);
			}
		}
		finally {
			$t5.dispose();
		}
		var $t6 = new ss.ObjectEnumerator(neighborGameSegments);
		try {
			while ($t6.moveNext()) {
				var neighborGameSegment = $t6.current();
				var $t8 = this.$gameSegmentPubSub;
				var $t9 = neighborGameSegment.key.gameSegmentId;
				var $t7 = Pather.Common.Models.GameSegment.Base.UserAction_GameSegment_GameSegment_PubSub_Message.$ctor();
				$t7.userId = user.entityId;
				$t7.originatingGameSegmentId = this.gameSegmentId;
				$t7.action = userAction;
				$t8.publishToGameSegment($t9, $t7);
			}
		}
		finally {
			$t6.dispose();
		}
		var $t11 = this.$gameSegmentPubSub;
		var $t10 = Pather.Common.Models.GameWorld.Gateway.TellUserAction_GameSegment_GameWorld_PubSub_Message.$ctor();
		$t10.userId = user.entityId;
		$t10.originatingGameSegmentId = this.gameSegmentId;
		$t10.action = userAction;
		$t11.publishToGameWorld($t10);
	},
	$onMessageUserAction$2: function(message) {
		if (!ss.keyExists(this.myGameSegment.users, message.userId)) {
			throw new ss.Exception('This aint my user! ' + message.userId);
		}
		this.$serverGame.queueUserAction$1(this.myGameSegment.users[message.userId], message.action);
	},
	$onMessageUserAction$1: function(message) {
		if (!ss.keyExists(this.myGameSegment.users, message.userId)) {
			throw new ss.Exception('This aint my user! ' + message.userId);
		}
		this.$serverGame.queueUserActionFromNeighbor(message.action);
	},
	$onMessageUserAction: function(message) {
		if (!ss.keyExists(this.myGameSegment.users, message.userId)) {
			throw new ss.Exception('This aint my user! ' + message.userId);
		}
		this.$serverGame.queueTellUserAction(message.action);
	},
	onMessageNewGameSegment: function(message) {
		var newGameSegment = new $Pather_Servers_GameSegmentServer_GameSegment(message.gameSegmentId);
		this.allGameSegments[newGameSegment.gameSegmentId] = newGameSegment;
		console.log(this.gameSegmentId, ' Added new Game Segment ', message.gameSegmentId);
	},
	$onMessagePong: function(message) {
		this.$backEndTickManager.onPongReceived();
	},
	$onMessageUserLeft: function(message) {
		this.$serverGame.userLeft(message.userId);
		var $t2 = this.$gameSegmentPubSub;
		var $t1 = Pather.Common.Models.GameWorld.GameSegment.UserLeft_Response_GameSegment_GameWorld_PubSub_ReqRes_Message.$ctor();
		$t1.messageId = message.messageId;
		$t2.publishToGameWorld($t1);
	},
	$onMessageTellUserLeft: function(message) {
		this.$serverGame.userLeft(message.userId);
		//todo maybe shoudlnt be reqres
		var $t2 = this.$gameSegmentPubSub;
		var $t1 = Pather.Common.Models.GameWorld.GameSegment.TellUserLeft_Response_GameSegment_GameWorld_PubSub_ReqRes_Message.$ctor();
		$t1.messageId = message.messageId;
		$t2.publishToGameWorld($t1);
	},
	$onMessageTellUserJoin: function(message) {
		this.$serverGame.tellUserJoin(message);
		var $t2 = this.$gameSegmentPubSub;
		var $t1 = Pather.Common.Models.GameWorld.GameSegment.TellUserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message.$ctor();
		$t1.messageId = message.messageId;
		$t2.publishToGameWorld($t1);
	},
	$onMessageUserJoin: function(message) {
		for (var $t1 = 0; $t1 < message.collection.length; $t1++) {
			var userJoinGameUser = message.collection[$t1];
			this.$serverGame.userJoin(userJoinGameUser);
			//                GameSegmentLogger.LogUserJoin(true, gameSegmentUser.UserId, gameSegmentUser.X, gameSegmentUser.Y, gameSegmentUser.Neighbors.Keys);
		}
		var $t3 = this.$gameSegmentPubSub;
		var $t2 = Pather.Common.Models.GameWorld.GameSegment.UserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message.$ctor();
		$t2.messageId = message.messageId;
		$t3.publishToGameWorld($t2);
	},
	setLockStepTick: function(lockstepTickNumber) {
		this.$backEndTickManager.setLockStepTick(lockstepTickNumber);
	},
	sendToUser: function(serverGameUser, gatewayPubSubMessage) {
		this.$gameSegmentPubSub.publishToGateway(serverGameUser.gatewayId, gatewayPubSubMessage);
	}
});
ss.initClass($Pather_Servers_GameSegmentServer_ServerGameUser, $asm, {
	tick: function() {
		Pather.Common.GameFramework.GameUser.prototype.tick.call(this);
		var result = this.path[0];
		this.animations = [];
		var projectedX;
		var projectedY;
		var projectedSquareX;
		var projectedSquareY;
		projectedSquareX = (ss.isNullOrUndefined(result) ? this.squareX : result.x);
		projectedSquareY = (ss.isNullOrUndefined(result) ? this.squareY : result.y);
		for (var i = 0; i < Pather.Common.Constants.animationSteps; i++) {
			this.squareX = ss.Int32.trunc(this.x / Pather.Common.Constants.squareSize);
			this.squareY = ss.Int32.trunc(this.y / Pather.Common.Constants.squareSize);
			var fromX = this.x;
			var fromY = this.y;
			if (ss.isValue(result) && (this.squareX === result.x && this.squareY === result.y)) {
				ss.removeAt(this.path, 0);
				result = this.path[0];
				projectedSquareX = (ss.isNullOrUndefined(result) ? this.squareX : result.x);
				projectedSquareY = (ss.isNullOrUndefined(result) ? this.squareY : result.y);
			}
			projectedX = projectedSquareX * Pather.Common.Constants.squareSize + ss.Int32.div(Pather.Common.Constants.squareSize, 2);
			projectedY = projectedSquareY * Pather.Common.Constants.squareSize + ss.Int32.div(Pather.Common.Constants.squareSize, 2);
			if (projectedX === ss.Int32.trunc(this.x) && projectedY === ss.Int32.trunc(this.y)) {
				return;
			}
			this.x = Pather.Common.Utils.Lerper.moveTowards(this.x, projectedX, this.speed / Pather.Common.Constants.animationSteps);
			this.y = Pather.Common.Utils.Lerper.moveTowards(this.y, projectedY, this.speed / Pather.Common.Constants.animationSteps);
			this.animations.push(new Pather.Common.Utils.AnimationPoint(fromX, fromY, this.x, this.y));
		}
	}
}, Pather.Common.GameFramework.GameUser, [$Pather_Servers_GameSegmentServer_IServerGameEntity]);
ss.initClass($Pather_Servers_GameSegmentServer_Logger_GameSegmentLogMessage, $asm, {});
ss.initClass($Pather_Servers_GameSegmentServer_Logger_GameSegmentLogMessageContent, $asm, {}, null, [Pather.Common.Models.Common.IPubSub_Message]);
ss.initEnum($Pather_Servers_GameSegmentServer_Logger_GameSegmentLogMessageType, $asm, { keepAlive: 'keepAlive', userJoined: 'userJoined', userMoved: 'userMoved', userLeft: 'userLeft', tellUserMoved: 'tellUserMoved' }, true);
ss.initClass($Pather_Servers_GameSegmentServer_Logger_KeepAlive_GameSegmentLogMessage, $asm, {}, $Pather_Servers_GameSegmentServer_Logger_GameSegmentLogMessage);
ss.initClass($Pather_Servers_GameSegmentServer_Logger_TellUserMoved_GameSegmentLogMessage, $asm, {}, $Pather_Servers_GameSegmentServer_Logger_GameSegmentLogMessage);
ss.initClass($Pather_Servers_GameSegmentServer_Logger_UserJoined_GameSegmentLogMessage, $asm, {}, $Pather_Servers_GameSegmentServer_Logger_GameSegmentLogMessage);
ss.initClass($Pather_Servers_GameSegmentServer_Logger_UserLeft_GameSegmentLogMessage, $asm, {}, $Pather_Servers_GameSegmentServer_Logger_GameSegmentLogMessage);
ss.initClass($Pather_Servers_GameSegmentServer_Logger_UserMoved_GameSegmentLogMessage, $asm, {}, $Pather_Servers_GameSegmentServer_Logger_GameSegmentLogMessage);
ss.initClass($Pather_Servers_GameSegmentServer_Old_ServerEntity, $asm, {}, Pather.Common.old.Entity);
ss.initClass($Pather_Servers_GameSegmentServer_Old_ServerGame, $asm, {
	createPlayer: function(playerId) {
		return new $Pather_Servers_GameSegmentServer_Old_ServerEntity(this, playerId);
	},
	tick: function() {
		var tickResult = Pather.Common.old.Game.prototype.tick.call(this);
		if (tickResult === 2 || tickResult === 3) {
			this.syncLockstep(this.lockstepTickNumber);
		}
		return tickResult;
	}
}, Pather.Common.old.Game);
ss.initClass($Pather_Servers_GameSegmentServer_Old_ServerNetworkManager, $asm, {
	$onSyncLockstep: function(lockStepTick) {
		if (lockStepTick % 15 === 0 || this.$forceSyncNextLockstep.length > 0) {
			for (var $t1 = 0; $t1 < this.$forceSyncNextLockstep.length; $t1++) {
				var socketIoConnection = this.$forceSyncNextLockstep[$t1];
				var $t3 = this.serverCommunicator;
				var $t4 = Pather.Common.SocketChannels.serverChannel('syncLockstep');
				var $t2 = Pather.Common.Models.Game.Old.SyncLockstepModel.$ctor();
				$t2.lockstepTickNumber = lockStepTick;
				$t3.oldSendMessage(Pather.Common.Models.Game.Old.SyncLockstepModel).call($t3, socketIoConnection, $t4, $t2);
			}
			for (var $t5 = 0; $t5 < this.game.players.length; $t5++) {
				var player = this.game.players[$t5];
				if (ss.indexOf(this.$forceSyncNextLockstep, player.socket) === -1) {
					var $t7 = this.serverCommunicator;
					var $t8 = player.socket;
					var $t9 = Pather.Common.SocketChannels.serverChannel('syncLockstep');
					var $t6 = Pather.Common.Models.Game.Old.SyncLockstepModel.$ctor();
					$t6.lockstepTickNumber = lockStepTick;
					$t7.oldSendMessage(Pather.Common.Models.Game.Old.SyncLockstepModel).call($t7, $t8, $t9, $t6);
				}
			}
			ss.clear(this.$forceSyncNextLockstep);
		}
	},
	$onNewConnection: function(socketIoConnection) {
		var $t2 = this.serverCommunicator;
		var $t3 = Pather.Common.SocketChannels.serverChannel('connect');
		var $t1 = Pather.Common.Models.Game.Old.ConnectedModel.$ctor();
		$t1.grid = this.game.grid;
		$t2.oldSendMessage(Pather.Common.Models.Game.Old.ConnectedModel).call($t2, socketIoConnection, $t3, $t1);
		this.$forceSyncNextLockstep.push(socketIoConnection);
		this.serverCommunicator.oldListenOnChannel(Pather.Common.Models.Game.Old.PlayerJoinModel).call(this.serverCommunicator, socketIoConnection, Pather.Common.SocketChannels.clientChannel('joinPlayer'), ss.mkdel(this, this.$joinPlayer));
		this.serverCommunicator.oldListenOnChannel(Pather.Common.old.SerializableAction).call(this.serverCommunicator, socketIoConnection, Pather.Common.SocketChannels.clientChannel('postAction'), ss.mkdel(this, this.$postAction));
		this.serverCommunicator.oldListenOnChannel(Pather.Common.Models.Game.Old.PingPongModel).call(this.serverCommunicator, socketIoConnection, Pather.Common.SocketChannels.clientChannel('ping'), ss.mkdel(this, this.$pong));
	},
	$pong: function(socket, pingPongModel) {
		this.serverCommunicator.oldSendMessage(Pather.Common.Models.Game.Old.PingPongModel).call(this.serverCommunicator, socket, Pather.Common.SocketChannels.serverChannel('pong'), pingPongModel);
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
		var $t2 = Pather.Common.Models.Game.Old.PlayerSyncModel.$ctor();
		var $t3 = [];
		var $t4 = Pather.Common.Models.Game.Old.PlayerModel.$ctor();
		$t4.playerId = player.playerId;
		$t3.push($t4);
		$t2.leftPlayers = $t3;
		var playerSyncModel = $t2;
		ss.remove(this.game.players, player);
		for (var $t5 = 0; $t5 < this.game.players.length; $t5++) {
			var entity1 = this.game.players[$t5];
			this.serverCommunicator.oldSendMessage(Pather.Common.Models.Game.Old.PlayerSyncModel).call(this.serverCommunicator, entity1.socket, Pather.Common.SocketChannels.serverChannel('playerSync'), playerSyncModel);
		}
	},
	$postAction: function(socket, action) {
		//            Global.Console.Log("player action ", action);
		this.onRecieveAction(action);
	},
	sendAction: function(action) {
		for (var $t1 = 0; $t1 < this.game.players.length; $t1++) {
			var player = this.game.players[$t1];
			this.serverCommunicator.oldSendMessage(Pather.Common.old.SerializableAction).call(this.serverCommunicator, player.socket, Pather.Common.SocketChannels.serverChannel('postAction'), action);
		}
	},
	$joinPlayer: function(socket, model) {
		var player = ss.cast(this.game.createPlayer(model.playerId), $Pather_Servers_GameSegmentServer_Old_ServerEntity);
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
				var $t2 = Pather.Common.Models.Game.Old.PlayerSyncModel.$ctor();
				var $t3 = [];
				var $t4 = Pather.Common.Models.Game.Old.PlayerModel.$ctor();
				$t4.playerId = player.playerId;
				$t4.x = player.x;
				$t4.y = player.y;
				$t3.push($t4);
				$t2.joinedPlayers = $t3;
				$t5.oldSendMessage(Pather.Common.Models.Game.Old.PlayerSyncModel).call($t5, $t6, $t7, $t2);
			}
			else {
				var $t10 = this.serverCommunicator;
				var $t11 = Pather.Common.SocketChannels.serverChannel('playerSync');
				var $t8 = Pather.Common.Models.Game.Old.PlayerSyncModel.$ctor();
				$t8.joinedPlayers = this.game.players.map(function(p) {
					var $t9 = Pather.Common.Models.Game.Old.PlayerModel.$ctor();
					$t9.playerId = p.playerId;
					$t9.x = p.x;
					$t9.y = p.y;
					return $t9;
				});
				$t10.oldSendMessage(Pather.Common.Models.Game.Old.PlayerSyncModel).call($t10, socket, $t11, $t8);
			}
		}
	}
});
ss.initClass($Pather_Servers_GameSegmentServer_Old_ServerStepManager, $asm, {
	sendActionServer: function(action) {
		var serAction = Pather.Common.old.SerializableAction.$ctor();
		serAction.data = action.get_data();
		serAction.lockstepTickNumber = action.get_lockstepTickNumber();
		serAction.type = action.get_type();
	},
	receiveAction: function(serAction) {
		Pather.Common.old.StepManager.prototype.receiveAction.call(this, serAction);
		this.serverNetworkManager.sendAction(serAction);
	},
	get_networkPlayers: function() {
		return this.game.players.length;
	}
}, Pather.Common.old.StepManager);
ss.initClass($Pather_Servers_GameWorldServer_$PlayerClusterInfo, $asm, {});
ss.initClass($Pather_Servers_GameWorldServer_GameSegment, $asm, {
	canAcceptNewUsers: function() {
		return this.users.length + this.preAddedUsers.length < Pather.Common.Constants.usersPerGameSegment;
	},
	addUsersToSegment: function(gwUsers) {
		var deferred = Pather.Common.Utils.Promises.Q.defer$2(Array, Pather.Common.Utils.Promises.UndefinedPromiseError).call(null);
		var collection = Pather.Common.Utils.EnumerableExtensions.take(gwUsers, 30);
		ss.arrayRemoveRange(gwUsers, 0, 30);
		var $t1 = Pather.Common.Models.GameSegment.UserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message.$ctor();
		$t1.collection = Pather.Common.Utils.EnumerableExtensions.select(collection, function(gwUser) {
			var $t2 = Pather.Common.Models.GameSegment.UserJoinGameUser.$ctor();
			$t2.x = gwUser.item1.x;
			$t2.y = gwUser.item1.y;
			$t2.gatewayId = gwUser.item1.gatewayId;
			$t2.userId = gwUser.item1.userId;
			return $t2;
		});
		var userJoinGameWorldGameSegmentPubSubReqResMessage = $t1;
		this.gameWorld.gameWorldPubSub.publishToGameSegmentWithCallback(Pather.Common.Models.GameWorld.GameSegment.UserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message).call(this.gameWorld.gameWorldPubSub, this.gameSegmentId, userJoinGameWorldGameSegmentPubSubReqResMessage).then(ss.mkdel(this, function(userJoinResponse) {
			//                Global.Console.Log("User joined!");
			for (var $t3 = 0; $t3 < collection.length; $t3++) {
				var gwUser1 = collection[$t3];
				this.users.push(gwUser1.item1);
				ss.remove(this.preAddedUsers, gwUser1.item1);
			}
			deferred.resolve(collection);
		}));
		return deferred.promise;
	},
	preAddUserToSegment: function(gwUser) {
		gwUser.gameSegment = this;
		this.preAddedUsers.push(gwUser);
	},
	removePreAddedUserToSegment: function(gwUser) {
		ss.remove(this.preAddedUsers, gwUser);
	},
	removeUserFromGameSegment: function(gwUser) {
		var deferred = Pather.Common.Utils.Promises.Q.defer();
		var $t1 = Pather.Common.Models.GameSegment.UserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message.$ctor();
		$t1.userId = gwUser.userId;
		var userJoin = $t1;
		this.gameWorld.gameWorldPubSub.publishToGameSegmentWithCallback(Pather.Common.Models.GameWorld.GameSegment.UserLeft_Response_GameSegment_GameWorld_PubSub_ReqRes_Message).call(this.gameWorld.gameWorldPubSub, this.gameSegmentId, userJoin).then(ss.mkdel(this, function(userJoinResponse) {
			ss.remove(this.users, gwUser);
			gwUser.gameSegment = null;
			deferred.resolve();
		}));
		return deferred.promise;
	},
	tellSegmentAboutUser: function(gwUser) {
		var deferred = Pather.Common.Utils.Promises.Q.defer$2($Pather_Servers_GameWorldServer_Models_GameWorldUser, Pather.Common.Utils.Promises.UndefinedPromiseError).call(null);
		var $t1 = Pather.Common.Models.GameSegment.TellUserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message.$ctor();
		$t1.x = gwUser.x;
		$t1.y = gwUser.y;
		$t1.gatewayId = gwUser.gatewayId;
		$t1.gameSegmentId = gwUser.gameSegment.gameSegmentId;
		$t1.userId = gwUser.userId;
		var tellUserJoin = $t1;
		//todo no request response?
		this.gameWorld.gameWorldPubSub.publishToGameSegmentWithCallback(Pather.Common.Models.GameWorld.GameSegment.TellUserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message).call(this.gameWorld.gameWorldPubSub, this.gameSegmentId, tellUserJoin).then(function(userJoinResponse) {
			//todo IDK
		});
		deferred.resolve(gwUser);
		return deferred.promise;
	},
	tellSegmentAboutRemoveUser: function(gwUser) {
		var deferred = Pather.Common.Utils.Promises.Q.defer();
		var $t1 = Pather.Common.Models.GameSegment.TellUserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message.$ctor();
		$t1.userId = gwUser.userId;
		var userLeftGameWorldGameSegmentPubSubReqResMessage = $t1;
		this.gameWorld.gameWorldPubSub.publishToGameSegmentWithCallback(Pather.Common.Models.GameWorld.GameSegment.TellUserLeft_Response_GameSegment_GameWorld_PubSub_ReqRes_Message).call(this.gameWorld.gameWorldPubSub, this.gameSegmentId, userLeftGameWorldGameSegmentPubSubReqResMessage).then(function(userJoinResponse) {
			//todo IDK
			deferred.resolve();
		});
		return deferred.promise;
	}
});
ss.initClass($Pather_Servers_GameWorldServer_GameWorld, $asm, {
	createUser: function(gatewayChannel, dbUser) {
		var defer = Pather.Common.Utils.Promises.Q.defer$2($Pather_Servers_GameWorldServer_Models_GameWorldUser, $Pather_Servers_GameWorldServer_Models_UserJoinError).call(null);
		var gwUser = new $Pather_Servers_GameWorldServer_Models_GameWorldUser();
		gwUser.userId = dbUser.userId;
		gwUser.x = dbUser.x;
		gwUser.y = dbUser.y;
		gwUser.set_neighbors([]);
		gwUser.gatewayId = gatewayChannel;
		this.$buildNeighbors(gwUser, 0);
		this.$determineGameSegment(gwUser).then(function(gameSegment) {
			gameSegment.preAddUserToSegment(gwUser);
			defer.resolve(gwUser);
		});
		return defer.promise;
	},
	userLeft: function(dbUser) {
		var deferred = Pather.Common.Utils.Promises.Q.defer();
		var gwUser = Pather.Common.Utils.EnumerableExtensions.first$1($Pather_Servers_GameWorldServer_Models_GameWorldUser).call(null, this.users, function(a) {
			return ss.referenceEquals(a.userId, dbUser.userId);
		});
		if (ss.isNullOrUndefined(gwUser)) {
			console.log('IDK WHO THIS USER IS', dbUser);
			throw new ss.Exception('IDK WHO THIS USER IS');
		}
		var $t1 = gwUser.get_neighbors();
		for (var $t2 = 0; $t2 < $t1.length; $t2++) {
			var gameSegmentNeighbor = $t1[$t2];
			var $t3 = gameSegmentNeighbor.user.get_neighbors();
			for (var $t4 = 0; $t4 < $t3.length; $t4++) {
				var segmentNeighbor = $t3[$t4];
				if (ss.referenceEquals(segmentNeighbor.user, gwUser)) {
					ss.remove(gameSegmentNeighbor.user.get_neighbors(), segmentNeighbor);
					break;
				}
			}
		}
		var promises = Pather.Common.Utils.EnumerableExtensions.select$1(Pather.Common.Utils.EnumerableExtensions.where(this.gameSegments, function(seg) {
			return !ss.referenceEquals(seg, gwUser.gameSegment);
		}), function(seg1) {
			return seg1.tellSegmentAboutRemoveUser(gwUser);
		});
		promises.push(gwUser.gameSegment.removeUserFromGameSegment(gwUser));
		Pather.Common.Utils.Promises.Q.all$2(promises).then(ss.mkdel(this, function() {
			ss.remove(this.users, gwUser);
			console.log('User left', gwUser.userId);
			deferred.resolve();
		}));
		return deferred.promise;
	},
	$determineGameSegment: function(gwUser) {
		var deferred = Pather.Common.Utils.Promises.Q.defer$2($Pather_Servers_GameWorldServer_GameSegment, Pather.Common.Utils.Promises.UndefinedPromiseError).call(null);
		var neighbors = this.$buildNeighborCollection(gwUser);
		var noneFound = true;
		for (var i = 0; i < neighbors.length; i++) {
			//todo REORG GAME SEGMENTS????
			var neighbor = neighbors[i];
			var neighborGameSegment = neighbor.user.gameSegment;
			if (neighborGameSegment.canAcceptNewUsers()) {
				deferred.resolve(neighborGameSegment);
				noneFound = false;
				break;
			}
		}
		if (noneFound) {
			for (var $t1 = 0; $t1 < this.gameSegments.length; $t1++) {
				var gameSegment = this.gameSegments[$t1];
				if (gameSegment.canAcceptNewUsers()) {
					deferred.resolve(gameSegment);
					noneFound = false;
					break;
				}
			}
		}
		if (noneFound) {
			return this.createGameSegment();
		}
		return deferred.promise;
	},
	createGameSegment: function() {
		var deferred = Pather.Common.Utils.Promises.Q.defer$2($Pather_Servers_GameWorldServer_GameSegment, Pather.Common.Utils.Promises.UndefinedPromiseError).call(null);
		this.gameWorldPubSub.publishToServerManagerWithCallback(Pather.Common.Models.GameWorld.ServerManager.CreateGameSegment_Response_ServerManager_GameWorld_PubSub_ReqRes_Message).call(this.gameWorldPubSub, Pather.Common.Models.ServerManager.Base.CreateGameSegment_GameWorld_ServerManager_PubSub_ReqRes_Message.$ctor()).then(ss.mkdel(this, function(createGameMessageResponse) {
			var gs = new $Pather_Servers_GameWorldServer_GameSegment(this);
			gs.gameSegmentId = createGameMessageResponse.gameSegmentId;
			for (var $t1 = 0; $t1 < this.gameSegments.length; $t1++) {
				var gameSegment = this.gameSegments[$t1];
				var $t3 = this.gameWorldPubSub;
				var $t4 = gameSegment.gameSegmentId;
				var $t2 = Pather.Common.Models.GameSegment.NewGameSegment_GameWorld_GameSegment_PubSub_Message.$ctor();
				$t2.gameSegmentId = gs.gameSegmentId;
				$t3.publishToGameSegment($t4, $t2);
			}
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
		}
		for (var i1 = 0; i1 < count; i1++) {
			var pUser1 = this.users[i1];
			this.$buildNeighbors(pUser1, i1);
		}
	},
	$buildNeighborCollection: function(pUser) {
		var count = this.users.length;
		var neighbors = [];
		for (var c = 0; c < count; c++) {
			var cUser = this.users[c];
			var distance = $Pather_Servers_GameWorldServer_GameWorld.$pointDistance(pUser, cUser);
			neighbors.push(new $Pather_Servers_GameWorldServer_Models_GameWorldNeighbor(cUser, distance));
		}
		neighbors.sort(function(a, b) {
			return ss.Int32.trunc(a.distance - b.distance);
		});
		return neighbors;
	},
	$buildNeighbors: function(pUser, i) {
		var count = this.users.length;
		for (var c = i; c < count; c++) {
			var cUser = this.users[c];
			var distance = $Pather_Servers_GameWorldServer_GameWorld.$pointDistance(pUser, cUser);
			if (distance <= Pather.Common.Constants.neighborDistance) {
				pUser.get_neighbors().push(new $Pather_Servers_GameWorldServer_Models_GameWorldNeighbor(cUser, distance));
				cUser.get_neighbors().push(new $Pather_Servers_GameWorldServer_Models_GameWorldNeighbor(pUser, distance));
			}
		}
	},
	changeUsersGameSegment: function(gameWorldUser, bestGameSegment) {
		this.$needToReorganize.push(new $Pather_Servers_GameWorldServer_ReoragGameWorldModel(gameWorldUser, bestGameSegment));
	},
	reorganize: function() {
		if (this.$needToReorganize.length > 0) {
			var reorg = Math.min(this.$needToReorganize.length, 10);
			for (var i = reorg - 1; i >= 0; i--) {
				var newGameSegment = this.$needToReorganize[reorg].get_bestGameSegment();
				var oldGameSegment = this.$needToReorganize[reorg].get_gameWorldUser();
				//                    GameWorldPubSub.PublishToGameSegmentWithCallback<>()
			}
		}
	},
	userAction: function(tellUserAction) {
		//todo var gwUser = Users.First(a => a.UserId == userId);
		//
		//if (gwUser == null)
		//{
		//throw new Exception("User not found: " + userId);
		//}
		//
		//gwUser.X = x;
		//gwUser.Y = y;
		////todo interpolate path find using setTimeout??
	}
});
ss.initClass($Pather_Servers_GameWorldServer_GameWorldPubSub, $asm, {
	init: function() {
		this.pubSub.subscribe($Pather_Servers_Common_PubSub_PubSubChannels.gameWorld(), ss.mkdel(this, function(message) {
			var gameWorldPubSubMessage = message;
			if (Pather.Common.Utils.Utilities.hasField(Pather.Common.Models.Common.IPubSub_ReqRes_Message).call(null, gameWorldPubSubMessage, function(m) {
				return m.messageId;
			}) && gameWorldPubSubMessage.response) {
				//                    Global.Console.Log("message", message);
				var possibleMessageReqRes = gameWorldPubSubMessage;
				if (!this.$deferredMessages.containsKey(possibleMessageReqRes.messageId)) {
					console.log('Received message that I didnt ask for.', message);
					throw new ss.Exception('Received message that I didnt ask for.');
				}
				this.$deferredMessages.get_item(possibleMessageReqRes.messageId).resolve(gameWorldPubSubMessage);
				this.$deferredMessages.remove(possibleMessageReqRes.messageId);
				return;
			}
			this.message(gameWorldPubSubMessage);
		}));
	},
	publishToGameSegment: function(gameSegmentId, message) {
		this.pubSub.publish($Pather_Servers_Common_PubSub_PubSubChannels.gameSegment$1(gameSegmentId), message);
	},
	publishToGameSegmentWithCallback: function(T) {
		return function(gameSegmentId, message) {
			var deferred = Pather.Common.Utils.Promises.Q.defer$2(T, Pather.Common.Utils.Promises.UndefinedPromiseError).call(null);
			this.pubSub.publish($Pather_Servers_Common_PubSub_PubSubChannels.gameSegment$1(gameSegmentId), message);
			this.$deferredMessages.add(message.messageId, deferred);
			return deferred.promise;
		};
	},
	publishToTickServer: function(message) {
		this.pubSub.publish($Pather_Servers_Common_PubSub_PubSubChannels.tick(), message);
	},
	publishToGatewayServer: function(gatewayId, message) {
		this.pubSub.publish(gatewayId, message);
	},
	publishToServerManagerWithCallback: function(T) {
		return function(message) {
			var deferred = Pather.Common.Utils.Promises.Q.defer$2(T, Pather.Common.Utils.Promises.UndefinedPromiseError).call(null);
			this.pubSub.publish($Pather_Servers_Common_PubSub_PubSubChannels.serverManager(), message);
			this.$deferredMessages.add(message.messageId, deferred);
			return deferred.promise;
		};
	}
});
ss.initClass($Pather_Servers_GameWorldServer_GameWorldServer, $asm, {
	$reorganize: function() {
		var clusters = $Pather_Servers_GameWorldServer_ReorganizeManager.reorganize(this.gameWorld.users, this.gameWorld.gameSegments);
		for (var $t1 = 0; $t1 < clusters.length; $t1++) {
			var playerCluster = clusters[$t1];
			for (var $t2 = 0; $t2 < playerCluster.players.length; $t2++) {
				var gameWorldUser = playerCluster.players[$t2];
				this.gameWorld.changeUsersGameSegment(gameWorldUser, playerCluster.bestGameSegment);
			}
		}
	},
	$pubsubReady: function() {
		this.$gameWorldPubSub = new $Pather_Servers_GameWorldServer_GameWorldPubSub(this.$pubSub);
		this.$gameWorldPubSub.init();
		this.$gameWorldPubSub.message = ss.delegateCombine(this.$gameWorldPubSub.message, ss.mkdel(this, this.$gameWorldMessage));
		this.gameWorld = new $Pather_Servers_GameWorldServer_GameWorld(this.$gameWorldPubSub);
		this.backEndTickManager = new $Pather_Servers_Common_BackEndTickManager();
		this.backEndTickManager.init$1(ss.mkdel(this, this.$sendPing), ss.mkdel(this, function() {
			console.log('Connected To Tick Server');
			setInterval(ss.mkdel(this, this.$flushPreAddedUsers), 200);
		}));
		this.backEndTickManager.startPing();
	},
	$flushPreAddedUsers: function() {
		var count = 0;
		var $t1 = new ss.ObjectEnumerator(this.$preAddedUsers);
		try {
			while ($t1.moveNext()) {
				var preAddedUser = $t1.current();
				if (preAddedUser.value.length === 0) {
					continue;
				}
				var items = { $: ss.arrayClone(preAddedUser.value) };
				count += items.$.length;
				ss.clear(preAddedUser.value);
				var gameSegment = { $: items.$[0].item1.gameSegment };
				gameSegment.$.addUsersToSegment(items.$).then(ss.mkdel({ items: items, gameSegment: gameSegment, $this: this }, function(users) {
					if (users.length === 0) {
						console.log('No users to resolve adding to segment', this.items.$);
						return;
					}
					var promises = Pather.Common.Utils.EnumerableExtensions.selectMany(Pather.Common.Utils.EnumerableExtensions.where(this.$this.gameWorld.gameSegments, ss.mkdel({ gameSegment: this.gameSegment }, function(seg) {
						return !ss.referenceEquals(seg, this.gameSegment.$);
					})), function(seg1) {
						return Pather.Common.Utils.EnumerableExtensions.select(users, function(user) {
							return seg1.tellSegmentAboutUser(user.item1);
						});
					});
					Pather.Common.Utils.Promises.Q.all$3($Pather_Servers_GameWorldServer_Models_GameWorldUser, Pather.Common.Utils.Promises.UndefinedPromiseError).call(null, promises).then(ss.mkdel(this.$this, function(gwUsers) {
						for (var $t2 = 0; $t2 < users.length; $t2++) {
							var u = users[$t2];
							this.gameWorld.users.push(u.item1);
							u.item2.resolve(u.item1);
						}
						console.log(this.gameWorld.users.length, 'Users total');
						//Global.Console.Log("",
						//"Gameworld added user to game segment", gameSegment.GameSegmentId,
						//"Total Players:", Users.Count,
						//"Game Segment Players:", gameSegment.Users.Count);
					}));
				}));
			}
		}
		finally {
			$t1.dispose();
		}
	},
	$sendPing: function() {
		var $t2 = this.$gameWorldPubSub;
		var $t1 = Pather.Common.Models.Tick.Ping_Tick_PubSub_Message.$ctor();
		$t1.origin = $Pather_Servers_Common_PubSub_PubSubChannels.gameWorld();
		$t1.originType = 1;
		$t2.publishToTickServer($t1);
	},
	$gameWorldMessage: function(message) {
		switch (message.type) {
			case 'userJoined': {
				this.$userJoined(message).then(ss.mkdel(this, function(gwUser) {
					var $t2 = this.$gameWorldPubSub;
					var $t3 = $Pather_Servers_Common_PubSub_PubSubChannels.gateway$1(gwUser.gatewayId);
					var $t1 = Pather.Common.Models.Gateway.PubSub.UserJoined_GameWorld_Gateway_PubSub_Message.$ctor();
					$t1.x = gwUser.x;
					$t1.y = gwUser.y;
					$t1.gameSegmentId = gwUser.gameSegment.gameSegmentId;
					$t1.userId = gwUser.userId;
					$t1.grid = this.grid;
					$t2.publishToGatewayServer($t3, $t1);
				}));
				break;
			}
			case 'userLeft': {
				var userLeftMessage = message;
				var done = false;
				var $t4 = new ss.ObjectEnumerator(this.$preAddedUsers);
				try {
					while ($t4.moveNext()) {
						var preAddedUser = $t4.current();
						for (var $t5 = 0; $t5 < preAddedUser.value.length; $t5++) {
							var addedUser = preAddedUser.value[$t5];
							if (ss.referenceEquals(addedUser.item1.userId, userLeftMessage.userId)) {
								ss.remove(preAddedUser.value, addedUser);
								addedUser.item1.gameSegment.removePreAddedUserToSegment(addedUser.item1);
								done = true;
								break;
							}
						}
						if (done) {
							break;
						}
					}
				}
				finally {
					$t4.dispose();
				}
				this.$userLeft(userLeftMessage).then(function() {
					//todo idk
				});
				break;
			}
			case 'pong': {
				var pongMessage = message;
				this.backEndTickManager.onPongReceived();
				break;
			}
			case 'tickSync': {
				var tickSyncMessage = message;
				this.backEndTickManager.setLockStepTick(tickSyncMessage.lockstepTickNumber);
				break;
			}
			case 'tellUserAction': {
				var tellUserAction = message;
				this.gameWorld.userAction(tellUserAction);
				break;
			}
			case 'initializeGameSegment': {
				var getAllGameSegments = message;
				var $t6 = Pather.Common.Models.GameSegment.InitializeGameSegment_Response_GameWorld_GameSegment_PubSub_ReqRes_Message.$ctor();
				$t6.messageId = getAllGameSegments.messageId;
				$t6.gameSegmentIds = Pather.Common.Utils.EnumerableExtensions.select(this.gameWorld.gameSegments, function(a) {
					return a.gameSegmentId;
				});
				$t6.lockstepTickNumber = this.backEndTickManager.lockstepTickNumber;
				$t6.grid = this.grid;
				$t6.allUsers = Pather.Common.Utils.EnumerableExtensions.select(this.gameWorld.users, function(user) {
					var $t7 = Pather.Common.Models.GameSegment.InitialGameUser.$ctor();
					$t7.gameSegmentId = user.gameSegment.gameSegmentId;
					$t7.userId = user.userId;
					$t7.gatewayId = user.gatewayId;
					$t7.x = user.x;
					$t7.y = user.y;
					return $t7;
				});
				var initializeGameSegmentMessage = $t6;
				console.log('Initalized');
				this.$gameWorldPubSub.publishToGameSegment(getAllGameSegments.originGameSegment, initializeGameSegmentMessage);
				break;
			}
			default: {
				throw new ss.ArgumentOutOfRangeException();
			}
		}
	},
	constructGrid: function() {
		this.grid = new Array(Pather.Common.Constants.numberOfSquares);
		for (var x = 0; x < Pather.Common.Constants.numberOfSquares; x++) {
			this.grid[x] = new Array(Pather.Common.Constants.numberOfSquares);
			for (var y = 0; y < Pather.Common.Constants.numberOfSquares; y++) {
				this.grid[x][y] = ((Math.random() * 100 < 15) ? 0 : 1);
			}
		}
	},
	$userJoined: function(message) {
		var deferred = Pather.Common.Utils.Promises.Q.defer$2($Pather_Servers_GameWorldServer_Models_GameWorldUser, $Pather_Servers_GameWorldServer_Models_UserJoinError).call(null);
		//                Global.Console.Log("User Joined Game World", message.UserToken, message.GatewayId);
		//            Global.Console.Log("User trying to join");
		if (!this.$joining) {
			this.$joining = true;
			this.$databaseQueries.getUserByToken(message.userToken).then(ss.mkdel(this, function(dbUser) {
				this.gameWorld.createUser(message.gatewayId, dbUser).then(ss.mkdel(this, function(user) {
					if (!this.$preAddedUsers[user.gameSegment.gameSegmentId]) {
						this.$preAddedUsers[user.gameSegment.gameSegmentId] = [];
					}
					this.$preAddedUsers[user.gameSegment.gameSegmentId].push({ item1: user, item2: deferred });
					this.$joining = false;
					if (this.$stalledJoins.length > 0) {
						var stalledJoin = this.$stalledJoins[0];
						ss.removeAt(this.$stalledJoins, 0);
						this.$userJoined(stalledJoin.item1).passThrough(stalledJoin.item2.promise);
					}
				}));
				//TODO THEN ADD USER TO TABLE OSMETHING IDK
			}));
		}
		else {
			this.$stalledJoins.push({ item1: message, item2: deferred });
			console.log(this.gameWorld.users.length, 'Users total');
		}
		return deferred.promise;
	},
	$userLeft: function(message) {
		var deferred = Pather.Common.Utils.Promises.Q.defer();
		//todo REMOVE USER FROM TABLE IDK
		this.$databaseQueries.getUserByToken(message.userId).then(ss.mkdel(this, function(dbUser) {
			this.gameWorld.userLeft(dbUser).passThrough(deferred.promise);
			//TODO THEN ADD USER TO TABLE OSMETHING IDK
		}));
		return deferred.promise;
	}
});
ss.initClass($Pather_Servers_GameWorldServer_PlayerCluster, $asm, {});
ss.initClass($Pather_Servers_GameWorldServer_PlayerClusterGroup, $asm, {});
ss.initClass($Pather_Servers_GameWorldServer_ReoragGameWorldModel, $asm, {
	get_gameWorldUser: function() {
		return this.$1$GameWorldUserField;
	},
	set_gameWorldUser: function(value) {
		this.$1$GameWorldUserField = value;
	},
	get_bestGameSegment: function() {
		return this.$1$BestGameSegmentField;
	},
	set_bestGameSegment: function(value) {
		this.$1$BestGameSegmentField = value;
	}
});
ss.initClass($Pather_Servers_GameWorldServer_ReorganizeManager, $asm, {
	$reorganize: function() {
		this.$tree = new (ss.makeGenericType($Pather_Servers_Libraries_RTree_RTree$1, [$Pather_Servers_GameWorldServer_Models_GameWorldUser]))();
		for (var $t1 = 0; $t1 < this.$gameWorldUsers.length; $t1++) {
			var gameWorldUser = this.$gameWorldUsers[$t1];
			this.$tree.add(new $Pather_Servers_Libraries_RTree_Rectangle(gameWorldUser.x, gameWorldUser.y), gameWorldUser);
		}
		var playerClusters = this.$buildClusters(this.$gameWorldUsers, this.$viewRadius);
		this.$groupToSegments(playerClusters);
		return playerClusters;
	},
	$groupToSegments: function(clusters) {
		var numberOfUsersInCluster = {};
		for (var $t1 = 0; $t1 < clusters.length; $t1++) {
			var playerCluster = clusters[$t1];
			var founds = [];
			for (var $t2 = 0; $t2 < this.$segments.length; $t2++) {
				var gameSegment = this.$segments[$t2];
				var found = 0;
				for (var $t3 = 0; $t3 < gameSegment.users.length; $t3++) {
					var gameWorldUser = gameSegment.users[$t3];
					if (ss.contains(playerCluster.players, gameWorldUser)) {
						found++;
					}
				}
				founds.push({ item1: found, item2: gameSegment });
			}
			founds.sort(function(a, b) {
				return a.item1 - b.item1;
			});
			var bestIndex = 0;
			while (bestIndex < founds.length) {
				var bestGameSegment = founds[bestIndex].item2;
				if (!ss.keyExists(numberOfUsersInCluster, bestGameSegment.gameSegmentId)) {
					numberOfUsersInCluster[bestGameSegment.gameSegmentId] = 0;
				}
				if (numberOfUsersInCluster[bestGameSegment.gameSegmentId] + playerCluster.players.length < $Pather_Servers_GameWorldServer_ReorganizeManager.$maxClusterSize) {
					numberOfUsersInCluster[bestGameSegment.gameSegmentId] += $Pather_Servers_GameWorldServer_ReorganizeManager.$maxClusterSize;
					playerCluster.bestGameSegment = bestGameSegment;
				}
				else {
					bestIndex++;
				}
			}
			if (ss.isNullOrUndefined(playerCluster.bestGameSegment)) {
				//TODO CREATE NEW CLUSTER FOOL!
			}
		}
	},
	$buildClusters: function(players, viewRadius) {
		var clusters = this.$clusterTree(this.$tree, players, viewRadius);
		//
		//
		//                        Console.WriteLine(string.Format("Clusters {0}", clusters.Count));
		//
		//
		//                        for (int i = 1; i <= MaxClusterSize; i++)
		//
		//
		//                        {
		//
		//
		//                        Console.WriteLine(string.Format("Clusters with {1} {0}", clusters.Count(a => a.Players.Count == i), i));
		//
		//
		//                        }
		//
		//
		//                        
		//
		//
		//                        clusters.Sort((a, b) =>
		//
		//
		//                        {
		//
		//
		//                        return b.Players.Count - a.Players.Count;
		//
		//
		//                        });
		//
		//
		//                        
		//
		//
		//                        for (int i = 0; i < clusters.Count; i++)
		//
		//
		//                        {
		//
		//
		//                        if (clusters[i].Players.Count <= MaxClusterSize) continue;
		//
		//
		//                        Console.WriteLine(string.Format("Cluster[{0}] Size {1}", i + 1, clusters[i].Players.Count));
		//
		//
		//                        }
		return clusters;
	},
	$clusterTree: function(tree, players, viewRadius) {
		var playerClusterInformations = this.$buildPlayerClusterInformations(tree, players, viewRadius);
		var playerClusters = this.$buildPlayerClusters(players, playerClusterInformations);
		return playerClusters;
	},
	$buildPlayerClusterInformations: function(tree, players, viewRadius) {
		var playerClusterInformations = new (ss.makeGenericType(ss.Dictionary$2, [$Pather_Servers_GameWorldServer_Models_GameWorldUser, $Pather_Servers_GameWorldServer_$PlayerClusterInfo]))();
		for (var index = 0; index < players.length; index++) {
			var currentPlayer = players[index];
			var nearest = tree.nearest(new $Pather_Servers_Libraries_RTree_RTreePoint(currentPlayer.x, currentPlayer.y, 1), viewRadius);
			var playerClusterInfo = new $Pather_Servers_GameWorldServer_$PlayerClusterInfo(currentPlayer);
			for (var i = 0; i < nearest.length; i++) {
				var nearPlayer = nearest[i];
				if (ss.referenceEquals(nearPlayer, currentPlayer)) {
					continue;
				}
				playerClusterInfo.$neighbors.push({ item1: $Pather_Servers_GameWorldServer_ReorganizeManager.$pointDistance(nearPlayer, currentPlayer), item2: nearPlayer });
			}
			playerClusterInformations.add(currentPlayer, playerClusterInfo);
		}
		return playerClusterInformations;
	},
	$buildPlayerClusters: function(players, playerClusterInformations) {
		var hitPlayers = Pather.Common.Utils.EnumerableExtensions.toDictionary($Pather_Servers_GameWorldServer_Models_GameWorldUser, String).call(null, players, function(a) {
			return a.userId;
		});
		var playerClusters = [];
		var hitPlayerCount = players.length;
		var playerClusterInfoHits = {};
		var playerClusterInfoHitsArray = [];
		while (hitPlayerCount > 0) {
			ss.clearKeys(playerClusterInfoHits);
			ss.clear(playerClusterInfoHitsArray);
			this.$getPlayerCluster(playerClusterInfoHits, playerClusterInfoHitsArray, playerClusterInformations, playerClusterInformations.get_item(hitPlayers[Pather.Common.Utils.EnumerableExtensions.first(String).call(null, Object.keys(hitPlayers))]), hitPlayers);
			var cluster = new $Pather_Servers_GameWorldServer_PlayerCluster();
			for (var index = 0; index < playerClusterInfoHitsArray.length; index++) {
				var playerClusterInfoHit = playerClusterInfoHitsArray[index];
				cluster.players.push(playerClusterInfoHit.$player);
				delete hitPlayers[playerClusterInfoHit.$player.userId];
				hitPlayerCount--;
			}
			playerClusters.push(cluster);
			//                Console.WriteLine(string.Format("Players Left: {0}, Clusters Total: {1} ", hitPlayerCount, playerClusters.Count));
		}
		return playerClusters;
	},
	$getPlayerCluster: function(playerClusterInfoHits, playerClusterInfoHitsArray, allPlayerClusterInformations, currentPlayerClusterInfo, hitPlayers) {
		var neighbors = [];
		neighbors.push({ item1: 0, item2: currentPlayerClusterInfo });
		var totalPlayers = 0;
		while (neighbors.length > 0) {
			var activePlayerClusterInfo = neighbors[0];
			if (!ss.keyExists(hitPlayers, activePlayerClusterInfo.item2.$player.userId) || ss.keyExists(playerClusterInfoHits, activePlayerClusterInfo.item2.$player.userId)) {
				ss.remove(neighbors, activePlayerClusterInfo);
				continue;
			}
			playerClusterInfoHits[activePlayerClusterInfo.item2.$player.userId] = activePlayerClusterInfo.item2;
			playerClusterInfoHitsArray.push(activePlayerClusterInfo.item2);
			totalPlayers++;
			if (totalPlayers === $Pather_Servers_GameWorldServer_ReorganizeManager.$maxClusterSize) {
				return;
			}
			for (var $t1 = 0; $t1 < activePlayerClusterInfo.item2.$neighbors.length; $t1++) {
				var playerNeighbor = activePlayerClusterInfo.item2.$neighbors[$t1];
				neighbors.push({ item1: playerNeighbor.item1, item2: allPlayerClusterInformations.get_item(playerNeighbor.item2) });
			}
			ss.remove(neighbors, activePlayerClusterInfo);
			neighbors.sort(function(a, b) {
				return ss.Int32.trunc(a.item1 - b.item1);
			});
			if (neighbors.length > 100) {
				ss.arrayRemoveRange(neighbors, 100, neighbors.length - 100);
			}
		}
	}
});
ss.initClass($Pather_Servers_GameWorldServer_Models_GameWorldNeighbor, $asm, {});
ss.initClass($Pather_Servers_GameWorldServer_Models_GameWorldUser, $asm, {
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
ss.initClass($Pather_Servers_GameWorldServer_Models_UserJoinError, $asm, {});
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
		global.$overwiteMethodCallForMocker$(ss.mkdel(pubSubTest, pubSubTest.init), function(port) {
			return Pather.Common.Utils.Promises.Q.resolvedPromise();
		});
		global.$overwiteMethodCallForMocker$(ss.mkdel(pubSubTest, pubSubTest.subscribe), function(channel, callback) {
			Pather.Common.TestFramework.DeferredAssert.that(testDeferred, channel).get_does().equal($Pather_Servers_Common_PubSub_PubSubChannels.gameWorld());
			var userJoinedGameWorldPubSubMessage = Pather.Common.Models.GameWorld.Gateway.UserJoined_Gateway_GameWorld_PubSub_Message.$ctor();
			userJoinedGameWorldPubSubMessage.type = 'userJoined';
			userJoinedGameWorldPubSubMessage.userToken = 'abcd';
			userJoinedGameWorldPubSubMessage.gatewayId = 'Gateway 1';
			callback(userJoinedGameWorldPubSubMessage);
		});
		global.$overwiteMethodCallForMocker$(ss.mkdel(pubSubTest, pubSubTest.publish), function(channel1, data) {
			Pather.Common.TestFramework.DeferredAssert.that(testDeferred, data.userId).get_does().equal(userId);
			testDeferred.resolve();
		});
		var gws = new $Pather_Servers_GameWorldServer_GameWorldServer(pubSubTest, databaseQueriesTest);
	}
});
ss.initClass($Pather_Servers_GatewayServer_$GatewayUser, $asm, {});
ss.initClass($Pather_Servers_GatewayServer_GatewayPubSub, $asm, {
	get_gatewayId: function() {
		return this.$1$GatewayIdField;
	},
	set_gatewayId: function(value) {
		this.$1$GatewayIdField = value;
	},
	init: function() {
		this.pubSub.subscribe($Pather_Servers_Common_PubSub_PubSubChannels.gateway(), ss.mkdel(this, function(message) {
			var gameWorldPubSubAllMessage = message;
			this.onAllMessage(gameWorldPubSubAllMessage);
		}));
		this.pubSub.subscribe($Pather_Servers_Common_PubSub_PubSubChannels.gateway$1(this.get_gatewayId()), ss.mkdel(this, function(message1) {
			var gameWorldPubSubMessage = message1;
			this.onMessage(gameWorldPubSubMessage);
		}));
	},
	publishToTickServer: function(message) {
		this.pubSub.publish($Pather_Servers_Common_PubSub_PubSubChannels.tick(), message);
	},
	publishToGameWorld: function(message) {
		this.pubSub.publish($Pather_Servers_Common_PubSub_PubSubChannels.gameWorld(), message);
	},
	publishToGameSegment: function(gameSegmentId, message) {
		this.pubSub.publish($Pather_Servers_Common_PubSub_PubSubChannels.gameSegment$1(gameSegmentId), message);
	},
	publishToHeadServer: function(message) {
		this.pubSub.publish($Pather_Servers_Common_PubSub_PubSubChannels.head(), message);
	}
});
ss.initClass($Pather_Servers_GatewayServer_GatewayServer, $asm, {
	get_pushPop: function() {
		return this.$1$PushPopField;
	},
	set_pushPop: function(value) {
		this.$1$PushPopField = value;
	},
	$registerGatewayWithCluster: function() {
		//register game segment
		this.get_pushPop().push(this.gatewayId, 1);
	},
	$sendPing: function() {
		var $t2 = this.gatewayPubSub;
		var $t1 = Pather.Common.Models.Tick.Ping_Tick_PubSub_Message.$ctor();
		$t1.origin = $Pather_Servers_Common_PubSub_PubSubChannels.gateway$1(this.gatewayId);
		$t1.originType = 1;
		$t2.publishToTickServer($t1);
	},
	$onAllMessage: function(message) {
		switch (message.type) {
			case 'ping': {
				if (ss.isNullOrUndefined(this.serverCommunicator)) {
					return;
				}
				var $t2 = this.gatewayPubSub;
				var $t1 = Pather.Common.Models.Head.Ping_Response_Gateway_Head_PubSub_Message.$ctor();
				$t1.gatewayId = this.gatewayId;
				$t1.address = this.serverCommunicator.get_URL();
				$t1.liveConnections = this.$users.get_count();
				$t2.publishToHeadServer($t1);
				break;
			}
			case 'tickSync': {
				var tickSyncMessage = message;
				this.backEndTickManager.setLockStepTick(tickSyncMessage.lockstepTickNumber);
				for (var $t3 = 0; $t3 < this.$users.list.length; $t3++) {
					var gatewayUser = this.$users.list[$t3];
					var $t5 = this.serverCommunicator;
					var $t6 = gatewayUser.socket;
					var $t4 = Pather.Common.Models.Gateway.Socket.Base.TickSync_Gateway_User_Socket_Message.$ctor();
					$t4.lockstepTickNumber = tickSyncMessage.lockstepTickNumber;
					$t5.sendMessage($t6, $t4);
				}
				break;
			}
			default: {
				throw new ss.ArgumentOutOfRangeException();
			}
		}
	},
	$onMessage: function(message) {
		var gatewayUser;
		switch (message.type) {
			case 'userJoined': {
				var userJoinedMessage = message;
				gatewayUser = this.$users.get_item(userJoinedMessage.userId);
				if (ss.isNullOrUndefined(gatewayUser)) {
					console.log('User succsfully joined, but doesnt exist anymore', userJoinedMessage);
					var $t2 = this.gatewayPubSub;
					var $t1 = Pather.Common.Models.GameWorld.Gateway.UserLeft_Gateway_GameWorld_PubSub_Message.$ctor();
					$t1.userId = userJoinedMessage.userId;
					$t2.publishToGameWorld($t1);
					return;
				}
				gatewayUser.gameSegmentId = userJoinedMessage.gameSegmentId;
				//                    Global.Console.Log(GatewayId, "Joined", gatewayUser.GameSegmentId, gatewayUser.UserId);
				var $t4 = this.serverCommunicator;
				var $t5 = gatewayUser.socket;
				var $t3 = Pather.Common.Models.Gateway.Socket.Base.UserJoined_Gateway_User_Socket_Message.$ctor();
				$t3.x = userJoinedMessage.x;
				$t3.y = userJoinedMessage.y;
				$t3.userId = userJoinedMessage.userId;
				$t3.grid = userJoinedMessage.grid;
				$t3.lockstepTickNumber = this.backEndTickManager.lockstepTickNumber;
				$t4.sendMessage($t5, $t3);
				if (ss.keyExists(this.$cachedUserMoves, userJoinedMessage.userId)) {
					console.log('Removing cached moved for ', userJoinedMessage.userId);
					var userMovedMessages = this.$cachedUserMoves[userJoinedMessage.userId];
					for (var $t6 = 0; $t6 < userMovedMessages.length; $t6++) {
						var userMovedMessage = userMovedMessages[$t6];
						//todo resend these messages
						//                            runUserMoved(userMovedMessage);
					}
					delete this.$cachedUserMoves[userJoinedMessage.userId];
				}
				break;
			}
			case 'pong': {
				var pongMessage = message;
				this.backEndTickManager.onPongReceived();
				break;
			}
			case 'userActionCollection': {
				var userActionCollectionMessage = message;
				this.$runUserAction(userActionCollectionMessage);
				break;
			}
			case 'updateNeighbors': {
				var updateNeighborsMessage = message;
				gatewayUser = this.$users.get_item(updateNeighborsMessage.userId);
				if (ss.isNullOrUndefined(gatewayUser)) {
					console.log('idk who this user is :-(', updateNeighborsMessage.userId);
					return;
				}
				var $t8 = this.serverCommunicator;
				var $t9 = gatewayUser.socket;
				var $t7 = Pather.Common.Models.Gateway.Socket.Base.UpdateNeighbors_Gateway_User_Socket_Message.$ctor();
				$t7.added = updateNeighborsMessage.added;
				$t7.removed = updateNeighborsMessage.removed;
				$t8.sendMessage($t9, $t7);
				break;
			}
			default: {
				throw new ss.ArgumentOutOfRangeException();
			}
		}
	},
	$runUserAction: function(userActionMessage) {
		var gatewayUser;
		for (var $t1 = 0; $t1 < userActionMessage.users.length; $t1++) {
			var userToSendTo = userActionMessage.users[$t1];
			gatewayUser = this.$users.get_item(userToSendTo);
			if (ss.isNullOrUndefined(gatewayUser)) {
				//todo find out why user does not exist yet
				if (!ss.keyExists(this.$cachedUserMoves, userToSendTo)) {
					this.$cachedUserMoves[userToSendTo] = [];
				}
				var $t3 = this.$cachedUserMoves[userToSendTo];
				var $t2 = Pather.Common.Models.Common.UserActionCacheModel.$ctor();
				$t2.userId = userToSendTo;
				$t2.action = userActionMessage.action;
				$t3.push($t2);
				return;
			}
			var $t5 = this.serverCommunicator;
			var $t6 = gatewayUser.socket;
			var $t4 = Pather.Common.Models.Gateway.Socket.Base.UserAction_Gateway_User_Socket_Message.$ctor();
			$t4.userId = gatewayUser.userId;
			$t4.action = userActionMessage.action;
			$t5.sendMessage($t6, $t4);
		}
	},
	$pubsubReady: function() {
		console.log('start socket server');
		this.serverCommunicator = new $Pather_Servers_Common_ServerCommunicator(this.$socketManager, this.$port);
		this.serverCommunicator.onDisconnectConnection = ss.delegateCombine(this.serverCommunicator.onDisconnectConnection, ss.mkdel(this, function(socket) {
			var gatewayUser = Pather.Common.Utils.EnumerableExtensions.first$1($Pather_Servers_GatewayServer_$GatewayUser).call(null, this.$users.list, function(a) {
				return ss.referenceEquals(a.socket, socket);
			});
			if (ss.isValue(gatewayUser)) {
				if (ss.isValue(gatewayUser.gameSegmentId)) {
					var $t2 = this.gatewayPubSub;
					var $t1 = Pather.Common.Models.GameWorld.Gateway.UserLeft_Gateway_GameWorld_PubSub_Message.$ctor();
					$t1.userId = gatewayUser.userId;
					$t2.publishToGameWorld($t1);
				}
				this.$users.remove(gatewayUser);
				console.log('Left', gatewayUser.userId, this.$users.get_count());
			}
			else {
				console.log('Left', this.$users.get_count());
			}
		}));
		this.serverCommunicator.onNewConnection = ss.delegateCombine(this.serverCommunicator.onNewConnection, ss.mkdel(this, function(socket1) {
			var $t3 = $Pather_Servers_GatewayServer_$GatewayUser.$ctor();
			$t3.socket = socket1;
			var user = $t3;
			//                Global.Console.Log("Joined", Users.Count);
			this.serverCommunicator.listenOnChannel(Pather.Common.Models.Gateway.Socket.Base.Gateway_Socket_Message).call(this.serverCommunicator, socket1, 'Gateway.Message', ss.mkdel(this, function(cSocket, message) {
				if (Pather.Common.Utils.Utilities.hasField(Pather.Common.Models.Gateway.Socket.Base.User_Gateway_Socket_Message).call(null, message, function(m) {
					return m.userGatewayMessageType;
				})) {
					//                            Global.Console.Log("Socket message ", message);
					this.$handleUserMessage(user, message);
				}
			}));
		}));
	},
	$handleUserMessage: function(user, message) {
		switch (message.userGatewayMessageType) {
			case 'ping': {
				var $t2 = this.serverCommunicator;
				var $t3 = user.socket;
				var $t1 = Pather.Common.Models.Gateway.Socket.Base.Pong_Gateway_User_PubSub_Message.$ctor();
				$t1.gatewayLatency = this.backEndTickManager.currentServerLatency;
				$t2.sendMessage($t3, $t1);
				break;
			}
			case 'userAction': {
				var userActionMessage = message;
				var $t5 = this.gatewayPubSub;
				var $t6 = user.gameSegmentId;
				var $t4 = Pather.Common.Models.GameSegment.Base.UserAction_Gateway_GameSegment_PubSub_Message.$ctor();
				$t4.userId = user.userId;
				$t4.action = userActionMessage.action;
				$t5.publishToGameSegment($t6, $t4);
				break;
			}
			case 'join': {
				var userJoinedMessage = message;
				user.userId = userJoinedMessage.userToken;
				this.$users.add(user);
				var $t8 = this.gatewayPubSub;
				var $t7 = Pather.Common.Models.GameWorld.Gateway.UserJoined_Gateway_GameWorld_PubSub_Message.$ctor();
				$t7.gatewayId = this.gatewayId;
				$t7.userToken = userJoinedMessage.userToken;
				$t8.publishToGameWorld($t7);
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
						var $t2 = ss.makeGenericType(Pather.Common.Utils.DataObject$1, [Pather.Common.Models.Gateway.Socket.Base.UserJoined_User_Gateway_Socket_Message]);
						var $t1 = Pather.Common.Models.Gateway.Socket.Base.UserJoined_User_Gateway_Socket_Message.$ctor();
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
		global.$overwiteMethodCallForMocker$(ss.mkdel(pubSub, pubSub.init), function(port) {
			return Pather.Common.Utils.Promises.Q.resolvedPromise();
		});
		global.$overwiteMethodCallForMocker$(ss.mkdel(pubSub, pubSub.subscribe), function(channel1, callback1) {
			publishData = ss.delegateCombine(publishData, function(pchannel, pmessage) {
				pubSub.receivedMessage(channel1, pmessage);
			});
		});
		global.$overwiteMethodCallForMocker$(ss.mkdel(pubSub, pubSub.publish), function(channel2, data) {
			if (ss.referenceEquals(channel2, $Pather_Servers_Common_PubSub_PubSubChannels.gameWorld())) {
				sendMessageToGameWorld(data);
			}
		});
		var gatewayName = null;
		global.$overwiteMethodCallForMocker$(ss.mkdel(pubSub, pubSub.receivedMessage), function(channel3, message) {
			if (ss.referenceEquals(channel3, gatewayName)) {
				var userJoined = message;
				Pather.Common.TestFramework.DeferredAssert.that(testDeferred, userJoined.userId).get_does().equal(userToken);
				testDeferred.resolve();
			}
		});
		var gts = new $Pather_Servers_GatewayServer_GatewayServer(pubSub, new $Pather_Servers_Common_PushPop_PushPop(), socketManager, 'gatewayServer1', 1800);
		gatewayName = gts.gatewayId;
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
		global.$overwiteMethodCallForMocker$(ss.mkdel(pubSub, pubSub.init), function(port1) {
			return Pather.Common.Utils.Promises.Q.resolvedPromise();
		});
		global.$overwiteMethodCallForMocker$(ss.mkdel(pubSubTest, pubSubTest.subscribe), function(channel4, callback2) {
			sendMessageToGameWorld = ss.delegateCombine(sendMessageToGameWorld, function(data1) {
				callback2(data1);
			});
		});
		global.$overwiteMethodCallForMocker$(ss.mkdel(pubSubTest, pubSubTest.publish), function(channel5, data2) {
			Pather.Common.TestFramework.DeferredAssert.that(testDeferred, data2.userId).get_does().equal(userToken);
			publishData(channel5, data2);
		});
		var gws = new $Pather_Servers_GameWorldServer_GameWorldServer(pubSubTest, databaseQueriesTest);
	}
});
ss.initClass($Pather_Servers_HeadServer_HeadPubSub, $asm, {
	init: function() {
		this.pubSub.subscribe($Pather_Servers_Common_PubSub_PubSubChannels.head(), ss.mkdel(this, function(message) {
			var headPubSubMessage = message;
			if (Pather.Common.Utils.Utilities.hasField(Pather.Common.Models.Common.IPubSub_ReqRes_Message).call(null, headPubSubMessage, function(m) {
				return m.messageId;
			}) && headPubSubMessage.response) {
				//                    Global.Console.Log("message", message);
				var possibleMessageReqRes = headPubSubMessage;
				if (!this.$deferredMessages.containsKey(possibleMessageReqRes.messageId)) {
					console.log('Received message that I didnt ask for.', message);
					throw new ss.Exception('Received message that I didnt ask for.');
				}
				this.$deferredMessages.get_item(possibleMessageReqRes.messageId).resolve(headPubSubMessage);
				this.$deferredMessages.remove(possibleMessageReqRes.messageId);
				return;
			}
			this.onMessage(headPubSubMessage);
		}));
	},
	publishToGateway$1: function(gatewayId, message) {
		this.pubSub.publish($Pather_Servers_Common_PubSub_PubSubChannels.gateway$1(gatewayId), message);
	},
	publishToGateway: function(message) {
		this.pubSub.publish($Pather_Servers_Common_PubSub_PubSubChannels.gateway(), message);
	},
	publishToServerManagerWithCallback: function(T) {
		return function(message) {
			var deferred = Pather.Common.Utils.Promises.Q.defer$2(T, Pather.Common.Utils.Promises.UndefinedPromiseError).call(null);
			this.pubSub.publish($Pather_Servers_Common_PubSub_PubSubChannels.serverManager(), message);
			this.$deferredMessages.add(message.messageId, deferred);
			return deferred.promise;
		};
	}
});
ss.initClass($Pather_Servers_HeadServer_HeadServer, $asm, {
	$ready: function(pubSub) {
		this.$headPubSub = new $Pather_Servers_HeadServer_HeadPubSub(pubSub);
		this.$headPubSub.init();
		var app = require('express')();
		var cors = require('cors');
		app.use(cors());
		setInterval(ss.mkdel(this, this.$pingGateways), Pather.Common.Constants.pingGatewayFromHeadTimeout);
		setInterval(ss.mkdel(this, this.$shouldSpinUpNewGateway), Pather.Common.Constants.spinUpNewGatewayCheck);
		this.$pingGateways();
		this.$headPubSub.onMessage = ss.delegateCombine(this.$headPubSub.onMessage, ss.mkdel(this, this.$onMessage));
		app.get('/api', ss.mkdel(this, function(req, res) {
			if (this.$oldGateways.length === 0) {
				if (this.$gateways.length === 0) {
					res.send('down');
				}
				else {
					res.send(this.$gateways[0].address);
				}
			}
			else {
				res.send(this.$oldGateways[0].address);
			}
		}));
		app.listen(2222);
	},
	$shouldSpinUpNewGateway: function() {
		if (this.$isCurrentlySpawning === 0) {
			var totalConnections = 0;
			for (var $t1 = 0; $t1 < this.$oldGateways.length; $t1++) {
				var gateway = this.$oldGateways[$t1];
				totalConnections += gateway.liveConnections;
			}
			if (totalConnections > this.$oldGateways.length * Pather.Common.Constants.maxConnectionsPerGateway - Pather.Common.Constants.gatewayConnectionSpawnThreshold) {
				this.$isCurrentlySpawning = 1;
				this.$headPubSub.publishToServerManagerWithCallback(Pather.Common.Models.Head.CreateGateway_Response_ServerManager_Head_PubSub_ReqRes_Message).call(this.$headPubSub, Pather.Common.Models.ServerManager.Base.CreateGateway_Head_ServerManager_PubSub_ReqRes_Message.$ctor()).then(ss.mkdel(this, function(response) {
					this.$isCurrentlySpawning = 0;
					//todo idk, the new gateway has been created. it shoudl begin accepting pings and stuff.
				}));
			}
		}
		else {
			this.$isCurrentlySpawning++;
			if (this.$isCurrentlySpawning === 10) {
				this.$isCurrentlySpawning = 0;
				console.log('Failed to create a new gateway.');
			}
		}
	},
	$pingGateways: function() {
		this.$oldGateways = ss.arrayClone(this.$gateways);
		this.$gateways = [];
		this.$headPubSub.publishToGateway(Pather.Common.Models.Gateway.PubSub.Ping_Head_Gateway_PubSub_AllMessage.$ctor());
	},
	$onMessage: function(message) {
		switch (message.type) {
			case 'ping': {
				this.$onPingMessage(message);
				break;
			}
			default: {
				throw new ss.ArgumentOutOfRangeException();
			}
		}
	},
	$onPingMessage: function(pingResponseMessage) {
		var $t2 = this.$gateways;
		var $t1 = new $Pather_Servers_HeadServer_Models_Gateway();
		$t1.address = pingResponseMessage.address;
		$t1.lastPing = new Date();
		$t1.liveConnections = pingResponseMessage.liveConnections;
		$t1.gatewayId = pingResponseMessage.gatewayId;
		$t2.push($t1);
		this.$gateways.sort(function(a, b) {
			return a.liveConnections - b.liveConnections;
		});
	}
});
ss.initClass($Pather_Servers_HeadServer_Models_Gateway, $asm, {});
ss.initInterface($Pather_Servers_Libraries_RTree_$ILog, $asm, { $error: null, $info: null, $warn: null, $debug: null, get_$isDebugEnabled: null, set_$isDebugEnabled: null });
ss.initClass($Pather_Servers_Libraries_RTree_$Log, $asm, {
	$error: function(p0) {
	},
	$info: function(s) {
	},
	$warn: function(p0) {
	},
	$debug: function(s) {
	},
	get_$isDebugEnabled: function() {
		return this.$1$IsDebugEnabledField;
	},
	set_$isDebugEnabled: function(value) {
		this.$1$IsDebugEnabledField = value;
	}
}, null, [$Pather_Servers_Libraries_RTree_$ILog]);
ss.initClass($Pather_Servers_Libraries_RTree_$LogManager, $asm, {});
ss.initClass($Pather_Servers_Libraries_RTree_BoundingBox, $asm, {});
ss.initClass($Pather_Servers_Libraries_RTree_Rectangle, $asm, {
	get_x: function() {
		return this.$min[0];
	},
	get_y: function() {
		return this.$min[1];
	},
	get_width: function() {
		return this.$max[0] - this.$min[0];
	},
	get_height: function() {
		return this.$max[1] - this.$min[1];
	},
	$set$1: function(x1, y1, x2, y2, z1, z2) {
		this.$min[0] = Math.min(x1, x2);
		this.$min[1] = Math.min(y1, y2);
		this.$min[2] = Math.min(z1, z2);
		this.$max[0] = Math.max(x1, x2);
		this.$max[1] = Math.max(y1, y2);
		this.$max[2] = Math.max(z1, z2);
	},
	$set: function(min, max) {
		this.$min[0] = min[0];
		this.$min[1] = min[1];
		this.$min[2] = min[2];
		this.$max[0] = max[0];
		this.$max[1] = max[1];
		this.$max[2] = max[2];
	},
	$copy: function() {
		return new $Pather_Servers_Libraries_RTree_Rectangle.$ctor1(this.$min, this.$max);
	},
	$edgeOverlaps: function(r) {
		for (var i = 0; i < $Pather_Servers_Libraries_RTree_Rectangle.$DIMENSIONS; i++) {
			if (this.$min[i] === r.$min[i] || this.$max[i] === r.$max[i]) {
				return true;
			}
		}
		return false;
	},
	intersects: function(r) {
		// Every dimension must intersect. If any dimension
		// does not intersect, return false immediately.
		for (var i = 0; i < $Pather_Servers_Libraries_RTree_Rectangle.$DIMENSIONS; i++) {
			if (this.$max[i] < r.$min[i] || this.$min[i] > r.$max[i]) {
				return false;
			}
		}
		return true;
	},
	$contains: function(r) {
		for (var i = 0; i < $Pather_Servers_Libraries_RTree_Rectangle.$DIMENSIONS; i++) {
			if (this.$max[i] < r.$max[i] || this.$min[i] > r.$min[i]) {
				return false;
			}
		}
		return true;
	},
	$containedBy: function(r) {
		for (var i = 0; i < $Pather_Servers_Libraries_RTree_Rectangle.$DIMENSIONS; i++) {
			if (this.$max[i] > r.$max[i] || this.$min[i] < r.$min[i]) {
				return false;
			}
		}
		return true;
	},
	$distance: function(p) {
		var distanceSquared = 0;
		for (var i = 0; i < $Pather_Servers_Libraries_RTree_Rectangle.$DIMENSIONS; i++) {
			var greatestMin = Math.max(this.$min[i], p.$coordinates[i]);
			var leastMax = Math.min(this.$max[i], p.$coordinates[i]);
			if (greatestMin > leastMax) {
				distanceSquared += (greatestMin - leastMax) * (greatestMin - leastMax);
			}
		}
		return Math.sqrt(distanceSquared);
	},
	$distance$1: function(r) {
		var distanceSquared = 0;
		for (var i = 0; i < $Pather_Servers_Libraries_RTree_Rectangle.$DIMENSIONS; i++) {
			var greatestMin = Math.max(this.$min[i], r.$min[i]);
			var leastMax = Math.min(this.$max[i], r.$max[i]);
			if (greatestMin > leastMax) {
				distanceSquared += (greatestMin - leastMax) * (greatestMin - leastMax);
			}
		}
		return Math.sqrt(distanceSquared);
	},
	$distanceSquared: function(dimension, point) {
		var distanceSquared = 0;
		var tempDistance = point - this.$max[dimension];
		for (var i = 0; i < 2; i++) {
			if (tempDistance > 0) {
				distanceSquared = tempDistance * tempDistance;
				break;
			}
			tempDistance = this.$min[dimension] - point;
		}
		return distanceSquared;
	},
	$enlargement: function(r) {
		var enlargedArea = (Math.max(this.$max[0], r.$max[0]) - Math.min(this.$min[0], r.$min[0])) * (Math.max(this.$max[1], r.$max[1]) - Math.min(this.$min[1], r.$min[1]));
		return enlargedArea - this.$area();
	},
	$area: function() {
		return (this.$max[0] - this.$min[0]) * (this.$max[1] - this.$min[1]);
	},
	$add: function(r) {
		for (var i = 0; i < $Pather_Servers_Libraries_RTree_Rectangle.$DIMENSIONS; i++) {
			if (r.$min[i] < this.$min[i]) {
				this.$min[i] = r.$min[i];
			}
			if (r.$max[i] > this.$max[i]) {
				this.$max[i] = r.$max[i];
			}
		}
	},
	$union: function(r) {
		var union = this.$copy();
		union.$add(r);
		return union;
	},
	$compareArrays: function(a1, a2) {
		if (ss.isNullOrUndefined(a1) || ss.isNullOrUndefined(a2)) {
			return false;
		}
		if (a1.length !== a2.length) {
			return false;
		}
		for (var i = 0; i < a1.length; i++) {
			if (a1[i] !== a2[i]) {
				return false;
			}
		}
		return true;
	},
	equals: function(obj) {
		if (ss.referenceEquals(null, obj)) {
			return false;
		}
		if (ss.referenceEquals(this, obj)) {
			return true;
		}
		if (!ss.referenceEquals(ss.getInstanceType(obj), ss.getInstanceType(this))) {
			return false;
		}
		return this.equals(ss.cast(obj, $Pather_Servers_Libraries_RTree_Rectangle));
	},
	$sameObject: function(o) {
		return ss.referenceEquals(this, o);
	},
	toString: function() {
		var sb = new ss.StringBuilder();
		// min coordinates
		sb.appendChar(40);
		for (var i = 0; i < $Pather_Servers_Libraries_RTree_Rectangle.$DIMENSIONS; i++) {
			if (i > 0) {
				sb.append(', ');
			}
			sb.append(this.$min[i]);
		}
		sb.append('), (');
		// max coordinates
		for (var i1 = 0; i1 < $Pather_Servers_Libraries_RTree_Rectangle.$DIMENSIONS; i1++) {
			if (i1 > 0) {
				sb.append(', ');
			}
			sb.append(this.$max[i1]);
		}
		sb.appendChar(41);
		return sb.toString();
	}
});
$Pather_Servers_Libraries_RTree_Rectangle.$ctor2.prototype = $Pather_Servers_Libraries_RTree_Rectangle.$ctor1.prototype = $Pather_Servers_Libraries_RTree_Rectangle.prototype;
ss.initClass($Pather_Servers_Libraries_RTree_RTreePoint, $asm, {});
ss.initClass($Pather_Servers_Libraries_RTree_Vector2, $asm, {});
$Pather_Servers_Libraries_RTree_Vector2.$ctor1.prototype = $Pather_Servers_Libraries_RTree_Vector2.prototype;
ss.initClass($Pather_Servers_MonitorServer_MonitorServer, $asm, {});
ss.initClass($Pather_Servers_ServerManager_$ClusterCreation, $asm, {});
ss.initClass($Pather_Servers_ServerManager_GameSegment, $asm, {});
ss.initClass($Pather_Servers_ServerManager_GameSegmentCluster, $asm, {
	canCreateNewSegment: function() {
		return this.gameSegments.length < Pather.Common.Constants.maxGameSegmentsPerCluster;
	}
});
ss.initClass($Pather_Servers_ServerManager_GatewayCluster, $asm, {
	canCreateNewSegment: function() {
		return this.gatewayServers.length < Pather.Common.Constants.maxGatewaysPerCluster;
	}
});
ss.initClass($Pather_Servers_ServerManager_GatewayServer, $asm, {});
ss.initClass($Pather_Servers_ServerManager_ServerManager, $asm, {
	$ready: function(pubSub) {
		this.$serverManagerPubSub = new $Pather_Servers_ServerManager_ServerManagerPubSub(pubSub);
		this.$serverManagerPubSub.init();
		this.$serverManagerPubSub.onMessage = ss.delegateCombine(this.$serverManagerPubSub.onMessage, ss.mkdel(this, this.$onMessage));
	},
	$onMessage: function(message) {
		switch (message.type) {
			case 'createGameSegment': {
				this.$createGameSegmentMessage(message);
				break;
			}
			case 'createGateway': {
				this.$createGatewayMessage(message);
				break;
			}
			default: {
				throw new ss.ArgumentOutOfRangeException();
			}
		}
	},
	$createGatewayMessage: function(message) {
		for (var $t1 = 0; $t1 < this.$gatewayClusters.length; $t1++) {
			var gatewayCluster = this.$gatewayClusters[$t1];
			if (gatewayCluster.canCreateNewSegment()) {
				this.$createNewGateway(gatewayCluster, message);
				return;
			}
		}
		this.$createNewGatewayCluster(message);
	},
	$createGameSegmentMessage: function(message) {
		for (var $t1 = 0; $t1 < this.$gameSegmentClusters.length; $t1++) {
			var gameSegmentCluster = this.$gameSegmentClusters[$t1];
			if (gameSegmentCluster.canCreateNewSegment()) {
				this.$createNewGameSegment(gameSegmentCluster, message);
				return;
			}
		}
		this.$createNewGameSegmentCluster(message);
	},
	$createNewGateway: function(gatewayCluster, message) {
		var $t2 = this.$serverManagerPubSub;
		var $t3 = gatewayCluster.clusterManagerId;
		var $t1 = Pather.Common.Models.ClusterManager.CreateGateway_ServerManager_ClusterManager_PubSub_ReqRes_Message.$ctor();
		$t1.gatewayId = Pather.Common.Utils.Utilities.uniqueId();
		$t1.port = this.$nextGatewayPort();
		$t2.publishToClusterManagerWithCallback(Pather.Common.Models.ServerManager.CreateGateway_Response_ClusterManager_ServerManager_PubSub_ReqRes_Message).call($t2, $t3, $t1).then(ss.mkdel(this, function(response) {
			gatewayCluster.gatewayServers.push(new $Pather_Servers_ServerManager_GatewayServer());
			var $t5 = this.$serverManagerPubSub;
			var $t4 = Pather.Common.Models.Head.CreateGateway_Response_ServerManager_Head_PubSub_ReqRes_Message.$ctor();
			$t4.messageId = message.messageId;
			$t4.gatewayId = response.gatewayId;
			$t5.publishToHead($t4);
		}));
	},
	$nextGatewayPort: function() {
		var port = 1800;
		for (var $t1 = 0; $t1 < this.$gatewayClusters.length; $t1++) {
			var gatewayCluster = this.$gatewayClusters[$t1];
			for (var $t2 = 0; $t2 < gatewayCluster.gatewayServers.length; $t2++) {
				var gatewayServer = gatewayCluster.gatewayServers[$t2];
				port++;
			}
		}
		return port;
	},
	$createNewGameSegment: function(gameSegmentCluster, message) {
		var $t2 = this.$serverManagerPubSub;
		var $t3 = gameSegmentCluster.clusterManagerId;
		var $t1 = Pather.Common.Models.ClusterManager.CreateGameSegment_ServerManager_ClusterManager_PubSub_ReqRes_Message.$ctor();
		$t1.gameSegmentId = Pather.Common.Utils.Utilities.uniqueId();
		$t2.publishToClusterManagerWithCallback(Pather.Common.Models.ServerManager.CreateGameSegment_Response_ClusterManager_ServerManager_PubSub_ReqRes_Message).call($t2, $t3, $t1).then(ss.mkdel(this, function(response) {
			gameSegmentCluster.gameSegments.push(new $Pather_Servers_ServerManager_GameSegment());
			var $t5 = this.$serverManagerPubSub;
			var $t4 = Pather.Common.Models.GameWorld.ServerManager.CreateGameSegment_Response_ServerManager_GameWorld_PubSub_ReqRes_Message.$ctor();
			$t4.messageId = message.messageId;
			$t4.gameSegmentId = response.gameSegmentId;
			$t5.publishToGameWorld($t4);
		}));
	},
	$createNewGatewayCluster: function(message) {
		this.$spawnNewServer().then(ss.mkdel(this, function(a) {
			var gatewayCluster = new $Pather_Servers_ServerManager_GatewayCluster();
			gatewayCluster.clusterManagerId = a.$clusterManagerId;
			this.$gatewayClusters.push(gatewayCluster);
			this.$createNewGateway(gatewayCluster, message);
		}));
	},
	$createNewGameSegmentCluster: function(message) {
		this.$spawnNewServer().then(ss.mkdel(this, function(a) {
			var gameSegmentCluster = new $Pather_Servers_ServerManager_GameSegmentCluster();
			gameSegmentCluster.clusterManagerId = a.$clusterManagerId;
			this.$gameSegmentClusters.push(gameSegmentCluster);
			this.$createNewGameSegment(gameSegmentCluster, message);
		}));
	},
	$spawnNewServer: function() {
		var deferred = Pather.Common.Utils.Promises.Q.defer$2($Pather_Servers_ServerManager_$ClusterCreation, Pather.Common.Utils.Promises.UndefinedPromiseError).call(null);
		var application = 'clustermanager';
		var applicationId = Pather.Common.Utils.Utilities.uniqueId();
		console.log('Spawning new server');
		var spawn = require('child_process').spawn;
		var fs = require('fs');
		var m = fs.openSync('./outcluster.log', 'a', null);
		var out = fs.openSync('./outcluster.log', 'a', null);
		var err = fs.openSync('./outcluster.log', 'a', null);
		this.pushPop.blockingPop(applicationId, Pather.Common.Constants.gameSegmentCreationWait).then(function(content) {
			var $t1 = new $Pather_Servers_ServerManager_$ClusterCreation();
			$t1.$clusterManagerId = applicationId;
			deferred.resolve($t1);
			console.log('Spawn Success');
		}).error(function(a) {
			console.log('Spawn Fail');
		});
		var str = 'C:\\Users\\deste_000\\AppData\\Roaming\\npm\\node-debug.cmd';
		str = 'node';
		var child = spawn(str, ['app.js', application, applicationId], { stdio: [m, out, err] });
		//            child.Unref();
		return deferred.promise;
	}
});
ss.initClass($Pather_Servers_ServerManager_ServerManagerPubSub, $asm, {
	init: function() {
		this.pubSub.subscribe($Pather_Servers_Common_PubSub_PubSubChannels.serverManager(), ss.mkdel(this, function(message) {
			var serverManagerPubSubMessage = message;
			if (Pather.Common.Utils.Utilities.hasField(Pather.Common.Models.Common.IPubSub_ReqRes_Message).call(null, serverManagerPubSubMessage, function(m) {
				return m.messageId;
			}) && serverManagerPubSubMessage.response) {
				//                    Global.Console.Log("message", message);
				var possibleMessageReqRes = serverManagerPubSubMessage;
				if (!this.$deferredMessages.containsKey(possibleMessageReqRes.messageId)) {
					console.log('Received message that I didnt ask for.', message);
					throw new ss.Exception('Received message that I didnt ask for.');
				}
				this.$deferredMessages.get_item(possibleMessageReqRes.messageId).resolve(serverManagerPubSubMessage);
				this.$deferredMessages.remove(possibleMessageReqRes.messageId);
				return;
			}
			this.onMessage(serverManagerPubSubMessage);
		}));
	},
	publishToClusterManagerWithCallback: function(T) {
		return function(clusterManagerId, message) {
			var deferred = Pather.Common.Utils.Promises.Q.defer$2(T, Pather.Common.Utils.Promises.UndefinedPromiseError).call(null);
			this.pubSub.publish($Pather_Servers_Common_PubSub_PubSubChannels.clusterManager$1(clusterManagerId), message);
			this.$deferredMessages.add(message.messageId, deferred);
			return deferred.promise;
		};
	},
	publishToClusterManager: function(clusterManagerId, message) {
		this.pubSub.publish($Pather_Servers_Common_PubSub_PubSubChannels.clusterManager$1(clusterManagerId), message);
	},
	publishToHead: function(message) {
		this.pubSub.publish($Pather_Servers_Common_PubSub_PubSubChannels.head(), message);
	},
	publishToGameWorld: function(message) {
		this.pubSub.publish($Pather_Servers_Common_PubSub_PubSubChannels.gameWorld(), message);
	}
});
ss.initClass($Pather_Servers_TickServer_TickPubSub, $asm, {
	init: function() {
		var deferred = Pather.Common.Utils.Promises.Q.defer();
		this.pubSub.subscribe($Pather_Servers_Common_PubSub_PubSubChannels.tick(), ss.mkdel(this, function(message) {
			this.onMessage(message);
		}));
		deferred.resolve();
		return deferred.promise;
	},
	publishToAllGameSegments: function(message) {
		//todo test if its faster for redis to have one "tick" subscription for all relevent clients or not
		this.pubSub.publish($Pather_Servers_Common_PubSub_PubSubChannels.gameSegment(), message);
	},
	publishToAllGateways: function(message) {
		//todo test if its faster for redis to have one "tick" subscription for all relevent clients or not
		this.pubSub.publish($Pather_Servers_Common_PubSub_PubSubChannels.gateway(), message);
	},
	publishToGameWorld: function(message) {
		//todo test if its faster for redis to have one "tick" subscription for all relevent clients or not
		this.pubSub.publish($Pather_Servers_Common_PubSub_PubSubChannels.gameWorld(), message);
	},
	publishToOrigin: function(origin, message) {
		this.pubSub.publish(origin, message);
	}
});
ss.initClass($Pather_Servers_TickServer_TickServer, $asm, {
	$ready: function() {
		this.tickManager = new $Pather_Servers_TickServer_TickServerTickManager(this.tickPubSub);
		this.tickManager.init(0);
		$Pather_Servers_Common_ServerLogging_ServerLogger.logInformation('Tick Server Ready.', []);
		this.tickPubSub.onMessage = ss.delegateCombine(this.tickPubSub.onMessage, ss.mkdel(this, this.$pubSubMessage));
	},
	$pubSubMessage: function(message) {
		switch (message.type) {
			case 'ping': {
				$Pather_Servers_Common_ServerLogging_ServerLogger.logInformation('Received Ping', [message]);
				var pingMessage = message;
				if (!ss.keyExists(this.$recievedOriginHash, pingMessage.origin)) {
					this.tickManager.forceOnNextTick();
					this.$recievedOriginHash[pingMessage.origin] = true;
				}
				var returnMessage;
				switch (pingMessage.originType) {
					case 0: {
						returnMessage = Pather.Common.Models.GameSegment.Pong_Tick_GameSegment_PubSub_Message.$ctor();
						break;
					}
					case 1: {
						returnMessage = Pather.Common.Models.GameWorld.Tick.Pong_Tick_GameWorld_PubSub_Message.$ctor();
						break;
					}
					case 2: {
						returnMessage = Pather.Common.Models.Gateway.PubSub.Pong_Tick_Gateway_PubSub_Message.$ctor();
						break;
					}
					default: {
						throw new ss.ArgumentOutOfRangeException();
					}
				}
				this.tickPubSub.publishToOrigin(pingMessage.origin, returnMessage);
				break;
			}
			default: {
				throw new ss.ArgumentOutOfRangeException();
			}
		}
	}
});
ss.initClass($Pather_Servers_TickServer_TickServerTickManager, $asm, {
	$onProcessLockstep: function(lockstepTickNumber) {
		if (lockstepTickNumber % 15 === 0 || this.$forceOnNextTick) {
			this.$forceOnNextTick = false;
			$Pather_Servers_Common_ServerLogging_ServerLogger.logInformation('Pushed Lockstep Tick', [lockstepTickNumber]);
			this.tickPubSub.publishToAllGameSegments(Pather.Common.Models.GameSegment.TickSync_GameSegment_PubSub_AllMessage.$ctor(lockstepTickNumber));
			this.tickPubSub.publishToAllGateways(Pather.Common.Models.Gateway.PubSub.TickSync_Tick_Gateway_PubSub_AllMessage.$ctor(lockstepTickNumber));
			this.tickPubSub.publishToGameWorld(Pather.Common.Models.GameWorld.Tick.TickSync_Tick_GameWorld_PubSub_Message.$ctor(lockstepTickNumber));
		}
	},
	forceOnNextTick: function() {
		this.$forceOnNextTick = true;
	}
}, Pather.Common.Utils.TickManager);
ss.initClass($Pather_Servers_Utils_ServerHelper, $asm, {});
ss.setMetadata($Pather_Servers_ClusterManager_Tests_ClusterManagerTest, { attr: [new Pather.Common.TestFramework.TestClassAttribute(false)] });
ss.setMetadata($Pather_Servers_GameWorldServer_Tests_GameWorldServerTests, { attr: [new Pather.Common.TestFramework.TestClassAttribute(false)], members: [{ attr: [new Pather.Common.TestFramework.TestMethodAttribute(false)], name: 'UserShouldJoin', type: 8, sname: 'userShouldJoin', returnType: Object, params: [Pather.Common.Utils.Promises.Deferred] }] });
ss.setMetadata($Pather_Servers_GatewayServer_Tests_GatewayServerTests, { attr: [new Pather.Common.TestFramework.TestClassAttribute(false)], members: [{ attr: [new Pather.Common.TestFramework.TestMethodAttribute(false)], name: 'UserShouldJoinFromGateway', type: 8, sname: 'userShouldJoinFromGateway', returnType: Object, params: [Pather.Common.Utils.Promises.Deferred] }] });
(function() {
	$Pather_Servers_Common_PubSub_PubSubChannels.$tick = 'Tick';
	$Pather_Servers_Common_PubSub_PubSubChannels.$gameWorld = 'GameWorld';
	$Pather_Servers_Common_PubSub_PubSubChannels.$clusterManager = 'ClusterManager';
	$Pather_Servers_Common_PubSub_PubSubChannels.$serverLogger = 'ServerLogger';
	$Pather_Servers_Common_PubSub_PubSubChannels.$gameSegmentLogger = 'GameSegmentLogger';
	$Pather_Servers_Common_PubSub_PubSubChannels.$gameSegment = 'GameSegment';
	$Pather_Servers_Common_PubSub_PubSubChannels.$gateway = 'Gateway';
	$Pather_Servers_Common_PubSub_PubSubChannels.$headServer = 'Head';
	$Pather_Servers_Common_PubSub_PubSubChannels.$serverManager = 'ServerManager';
})();
(function() {
	$Pather_Servers_Common_ConnectionConstants.redisIP = '127.0.0.1';
})();
(function() {
	$Pather_Servers_Common_ServerLogging_ServerLogger.$pubsub = null;
	$Pather_Servers_Common_ServerLogging_ServerLogger.$serverType = null;
	$Pather_Servers_Common_ServerLogging_ServerLogger.$serverName = null;
})();
(function() {
	$Pather_Servers_Libraries_RTree_Rectangle.$DIMENSIONS = 3;
})();
(function() {
	$Pather_Servers_Libraries_RTree_RTreePoint.$DIMENSIONS = 3;
})();
(function() {
	$Pather_Servers_GameWorldServer_ReorganizeManager.$maxClusterSize = 200;
})();
$Pather_Servers_ServerStarter.main();
