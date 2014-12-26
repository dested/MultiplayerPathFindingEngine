'use strict';

var socketio = require('socket.io');
var $asm = {};
global.Pather = global.Pather || {};
global.Pather.Servers = global.Pather.Servers || {};
global.Pather.Servers.AuthServer = global.Pather.Servers.AuthServer || {};
global.Pather.Servers.Common = global.Pather.Servers.Common || {};
global.Pather.Servers.Common.PubSub = global.Pather.Servers.Common.PubSub || {};
global.Pather.Servers.Common.PushPop = global.Pather.Servers.Common.PushPop || {};
global.Pather.Servers.Common.ServerLogging = global.Pather.Servers.Common.ServerLogging || {};
global.Pather.Servers.Common.SocketManager = global.Pather.Servers.Common.SocketManager || {};
global.Pather.Servers.Database = global.Pather.Servers.Database || {};
global.Pather.Servers.GameSegment = global.Pather.Servers.GameSegment || {};
global.Pather.Servers.GameSegment.Models = global.Pather.Servers.GameSegment.Models || {};
global.Pather.Servers.GameSegment.Old = global.Pather.Servers.GameSegment.Old || {};
global.Pather.Servers.GameSegmentCluster = global.Pather.Servers.GameSegmentCluster || {};
global.Pather.Servers.GameSegmentCluster.Tests = global.Pather.Servers.GameSegmentCluster.Tests || {};
global.Pather.Servers.GameWorldServer = global.Pather.Servers.GameWorldServer || {};
global.Pather.Servers.GameWorldServer.Models = global.Pather.Servers.GameWorldServer.Models || {};
global.Pather.Servers.GameWorldServer.Tests = global.Pather.Servers.GameWorldServer.Tests || {};
global.Pather.Servers.GatewayServer = global.Pather.Servers.GatewayServer || {};
global.Pather.Servers.GatewayServer.Tests = global.Pather.Servers.GatewayServer.Tests || {};
global.Pather.Servers.MonitorServer = global.Pather.Servers.MonitorServer || {};
global.Pather.Servers.TickServer = global.Pather.Servers.TickServer || {};
global.Pather.Servers.Utils = global.Pather.Servers.Utils || {};
ss.initAssembly($asm, 'Pather.Servers');
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.ServerManager
var $Pather_Servers_ServerManager = function() {
};
$Pather_Servers_ServerManager.__typeName = 'Pather.Servers.ServerManager';
$Pather_Servers_ServerManager.main = function() {
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
				$Pather_Servers_ServerManager.$createTickServer();
				$Pather_Servers_ServerManager.$createMonitorServer();
				$Pather_Servers_ServerManager.$createAuthServer();
				$Pather_Servers_ServerManager.$createGatewayServer('DEFAULTGATEWAYID', 1800);
				$Pather_Servers_ServerManager.$createGameClusterServer('TODO:DEFAULTGAMESEGMENTCLUSTER');
				$Pather_Servers_ServerManager.$createGameWorldServer();
				break;
			}
			case 'gt':
			case 'gateway': {
				$Pather_Servers_ServerManager.$createGatewayServer(global.process.argv[3], parseInt(global.process.argv[4]));
				break;
			}
			case 'au':
			case 'auth': {
				$Pather_Servers_ServerManager.$createAuthServer();
				break;
			}
			case 'm':
			case 'monitor': {
				$Pather_Servers_ServerManager.$createMonitorServer();
				break;
			}
			case 'gsc':
			case 'gamesegmentcluster': {
				$Pather_Servers_ServerManager.$createGameClusterServer('TODO:DEFAULTGAMESEGMENTCLUSTER');
				break;
			}
			case 'gs':
			case 'game': {
				$Pather_Servers_ServerManager.$createGameSegmentServer(global.process.argv[3]);
				break;
			}
			case 'gw':
			case 'gameworld': {
				$Pather_Servers_ServerManager.$createGameWorldServer();
				break;
			}
			case 't':
			case 'tick': {
				$Pather_Servers_ServerManager.$createTickServer();
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
$Pather_Servers_ServerManager.$createTickServer = function() {
	new $Pather_Servers_TickServer_TickServer(new $Pather_Servers_Common_PubSub_PubSub());
};
$Pather_Servers_ServerManager.$createGameWorldServer = function() {
	new $Pather_Servers_GameWorldServer_GameWorldServer(new $Pather_Servers_Common_PubSub_PubSub(), new $Pather_Servers_Database_DatabaseQueries());
};
$Pather_Servers_ServerManager.$createGameSegmentServer = function(gameSegmentId) {
	new $Pather_Servers_GameSegment_GameSegmentServer(new $Pather_Servers_Common_PubSub_PubSub(), new $Pather_Servers_Common_PushPop_PushPop(), gameSegmentId);
};
$Pather_Servers_ServerManager.$createGameClusterServer = function(gameSegmentClusterId) {
	new $Pather_Servers_GameSegmentCluster_GameSegmentCluster(new $Pather_Servers_Common_PubSub_PubSub(), new $Pather_Servers_Common_PushPop_PushPop(), gameSegmentClusterId);
};
$Pather_Servers_ServerManager.$createMonitorServer = function() {
	new $Pather_Servers_MonitorServer_MonitorServer();
};
$Pather_Servers_ServerManager.$createAuthServer = function() {
	new $Pather_Servers_AuthServer_AuthServer();
};
$Pather_Servers_ServerManager.$createGatewayServer = function(gatewayId, port) {
	new $Pather_Servers_GatewayServer_GatewayServer(new $Pather_Servers_Common_PubSub_PubSub(), new $Pather_Servers_Common_SocketManager_SocketIOManager(), gatewayId, port);
};
global.Pather.Servers.ServerManager = $Pather_Servers_ServerManager;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.AuthServer.AuthServer
var $Pather_Servers_AuthServer_AuthServer = function() {
	$Pather_Servers_Common_ServerLogging_ServerLogger.initLogger('Auth', '0');
};
$Pather_Servers_AuthServer_AuthServer.__typeName = 'Pather.Servers.AuthServer.AuthServer';
global.Pather.Servers.AuthServer.AuthServer = $Pather_Servers_AuthServer_AuthServer;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.Common.ClientTickManager
var $Pather_Servers_Common_ClientTickManager = function() {
	this.$lastPing = 0;
	this.$pingSent = null;
	this.$sendPing = null;
	this.$onTickManagerReady = null;
	this.$hasLockstep = false;
	this.$hasLatency = false;
	this.$tickManagerInitialized = false;
	$Pather_Servers_Common_TickManager.call(this);
};
$Pather_Servers_Common_ClientTickManager.__typeName = 'Pather.Servers.Common.ClientTickManager';
global.Pather.Servers.Common.ClientTickManager = $Pather_Servers_Common_ClientTickManager;
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
// Pather.Servers.Common.TickManager
var $Pather_Servers_Common_TickManager = function() {
	this.lockstepTickNumber = 0;
	this.$currentLockstepTime = 0;
	this.currentServerLatency = 0;
};
$Pather_Servers_Common_TickManager.__typeName = 'Pather.Servers.Common.TickManager';
global.Pather.Servers.Common.TickManager = $Pather_Servers_Common_TickManager;
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
$Pather_Servers_Common_PubSub_PubSubChannels.gameSegmentCluster$1 = function(gameSegmentClusterId) {
	return $Pather_Servers_Common_PubSub_PubSubChannels.$gameSegmentCluster + gameSegmentClusterId;
};
$Pather_Servers_Common_PubSub_PubSubChannels.gameSegmentCluster = function() {
	return $Pather_Servers_Common_PubSub_PubSubChannels.$gameSegmentCluster;
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
// Pather.Servers.Common.ServerLogging.ServerLogger
var $Pather_Servers_Common_ServerLogging_ServerLogger = function() {
};
$Pather_Servers_Common_ServerLogging_ServerLogger.__typeName = 'Pather.Servers.Common.ServerLogging.ServerLogger';
$Pather_Servers_Common_ServerLogging_ServerLogger.initLogger = function(serverType, serverName) {
	$Pather_Servers_Common_ServerLogging_ServerLogger.$serverName = serverName;
	$Pather_Servers_Common_ServerLogging_ServerLogger.$serverType = serverType;
	$Pather_Servers_Common_ServerLogging_ServerLogger.$pubsub = new $Pather_Servers_Common_PubSub_PubSub();
	$Pather_Servers_Common_ServerLogging_ServerLogger.$pubsub.dontLog();
	$Pather_Servers_Common_ServerLogging_ServerLogger.$pubsub.init().then(function() {
		setInterval(function() {
			$Pather_Servers_Common_ServerLogging_ServerLogger.logKeepAlive();
		}, 500);
	});
};
$Pather_Servers_Common_ServerLogging_ServerLogger.logInformation = function(item, jsonContent) {
	Pather.Common.Logger.log(item, 'information');
	$Pather_Servers_Common_ServerLogging_ServerLogger.$pubsub.publish($Pather_Servers_Common_PubSub_PubSubChannels.serverLogger($Pather_Servers_Common_ServerLogging_ServerLogger.$serverType), { serverType: $Pather_Servers_Common_ServerLogging_ServerLogger.$serverType, serverName: $Pather_Servers_Common_ServerLogging_ServerLogger.$serverName, message: item, content: jsonContent, logLevel: 'information', time: new Date() });
};
$Pather_Servers_Common_ServerLogging_ServerLogger.logDebug = function(item, jsonContent) {
	Pather.Common.Logger.log(item, 'debugInformation');
	$Pather_Servers_Common_ServerLogging_ServerLogger.$pubsub.publish($Pather_Servers_Common_PubSub_PubSubChannels.serverLogger($Pather_Servers_Common_ServerLogging_ServerLogger.$serverType), { serverType: $Pather_Servers_Common_ServerLogging_ServerLogger.$serverType, serverName: $Pather_Servers_Common_ServerLogging_ServerLogger.$serverName, message: item, content: jsonContent, logLevel: 'debugInformation', time: new Date() });
};
$Pather_Servers_Common_ServerLogging_ServerLogger.logKeepAlive = function() {
	$Pather_Servers_Common_ServerLogging_ServerLogger.$pubsub.publish($Pather_Servers_Common_PubSub_PubSubChannels.serverLogger($Pather_Servers_Common_ServerLogging_ServerLogger.$serverType), { serverType: $Pather_Servers_Common_ServerLogging_ServerLogger.$serverType, serverName: $Pather_Servers_Common_ServerLogging_ServerLogger.$serverName, message: null, content: null, logLevel: 'keepAlive', time: new Date() });
};
$Pather_Servers_Common_ServerLogging_ServerLogger.logError = function(item, jsonContent) {
	Pather.Common.Logger.log(item, 'error');
	$Pather_Servers_Common_ServerLogging_ServerLogger.$pubsub.publish($Pather_Servers_Common_PubSub_PubSubChannels.serverLogger($Pather_Servers_Common_ServerLogging_ServerLogger.$serverType), { serverType: $Pather_Servers_Common_ServerLogging_ServerLogger.$serverType, serverName: $Pather_Servers_Common_ServerLogging_ServerLogger.$serverName, message: item, content: jsonContent, logLevel: 'error', time: new Date() });
};
$Pather_Servers_Common_ServerLogging_ServerLogger.logTransport = function(item, jsonContent) {
	Pather.Common.Logger.log(item, 'transportInfo');
	$Pather_Servers_Common_ServerLogging_ServerLogger.$pubsub.publish($Pather_Servers_Common_PubSub_PubSubChannels.serverLogger($Pather_Servers_Common_ServerLogging_ServerLogger.$serverType), { serverType: $Pather_Servers_Common_ServerLogging_ServerLogger.$serverType, serverName: $Pather_Servers_Common_ServerLogging_ServerLogger.$serverName, message: item, content: jsonContent, logLevel: 'transportInfo', time: new Date() });
};
$Pather_Servers_Common_ServerLogging_ServerLogger.logData = function(item, jsonContent) {
	Pather.Common.Logger.log(item, 'dataInfo');
	$Pather_Servers_Common_ServerLogging_ServerLogger.$pubsub.publish($Pather_Servers_Common_PubSub_PubSubChannels.serverLogger($Pather_Servers_Common_ServerLogging_ServerLogger.$serverType), { serverType: $Pather_Servers_Common_ServerLogging_ServerLogger.$serverType, serverName: $Pather_Servers_Common_ServerLogging_ServerLogger.$serverName, message: item, content: jsonContent, logLevel: 'dataInfo', time: new Date() });
};
global.Pather.Servers.Common.ServerLogging.ServerLogger = $Pather_Servers_Common_ServerLogging_ServerLogger;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.Common.ServerLogging.ServerLogListener
var $Pather_Servers_Common_ServerLogging_ServerLogListener = function(serverType, callback) {
	this.$pubsub = null;
	this.$serverType = null;
	this.$serverType = serverType;
	this.$pubsub = new $Pather_Servers_Common_PubSub_PubSub();
	this.$pubsub.dontLog();
	this.$pubsub.init().then(ss.mkdel(this, function() {
		this.$pubsub.subscribe($Pather_Servers_Common_PubSub_PubSubChannels.serverLogger(this.$serverType), function(content) {
			callback(JSON.parse(content));
		});
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
var $Pather_Servers_GameSegment_GameSegment = function(gameSegmentId) {
	this.users = {};
	this.gameSegmentId = null;
	this.gameSegmentId = gameSegmentId;
};
$Pather_Servers_GameSegment_GameSegment.__typeName = 'Pather.Servers.GameSegment.GameSegment';
global.Pather.Servers.GameSegment.GameSegment = $Pather_Servers_GameSegment_GameSegment;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameSegment.GameSegmentPubSub
var $Pather_Servers_GameSegment_GameSegmentPubSub = function(pubSub, gameSegmentId) {
	this.gameSegmentId = null;
	this.pubSub = null;
	this.onMessage = null;
	this.onAllMessage = null;
	this.deferredMessages = new (ss.makeGenericType(ss.Dictionary$2, [String, ss.makeGenericType(Pather.Common.Utils.Promises.Deferred$2, [Object, Pather.Common.Utils.Promises.UndefinedPromiseError])]))();
	this.gameSegmentId = gameSegmentId;
	this.pubSub = pubSub;
};
$Pather_Servers_GameSegment_GameSegmentPubSub.__typeName = 'Pather.Servers.GameSegment.GameSegmentPubSub';
global.Pather.Servers.GameSegment.GameSegmentPubSub = $Pather_Servers_GameSegment_GameSegmentPubSub;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameSegment.GameSegmentServer
var $Pather_Servers_GameSegment_GameSegmentServer = function(pubsub, pushPop, gameSegmentId) {
	this.$clientTickManager = null;
	this.$pubsub = null;
	this.$pushPop = null;
	this.$gameSegmentId = null;
	this.myGameSegment = null;
	this.otherGameSegments = {};
	this.allUsers = null;
	this.allUsersDictionary = null;
	this.allUserGameSegments = null;
	this.allGameSegments = null;
	this.gameSegmentPubSub = null;
	$Pather_Servers_Common_ServerLogging_ServerLogger.initLogger('GameSegment', gameSegmentId);
	this.$pubsub = pubsub;
	this.$pushPop = pushPop;
	this.$gameSegmentId = gameSegmentId;
	//Global.SetInterval(() => { Global.Console.Log("keep alive " + new DateTime().ToString().Substring(17, 24)); }, 10 * 1000);
	//var game = new ServerGame(socketManager, gameServerName);
	//game.Init();
	Pather.Common.Utils.Promises.Q.all([pubsub.init(), pushPop.init()]).then(ss.mkdel(this, function() {
		this.gameSegmentPubSub = new $Pather_Servers_GameSegment_GameSegmentPubSub(this.$pubsub, this.$gameSegmentId);
		this.gameSegmentPubSub.onAllMessage = ss.delegateCombine(this.gameSegmentPubSub.onAllMessage, ss.mkdel(this, this.$onAllMessage));
		this.gameSegmentPubSub.onMessage = ss.delegateCombine(this.gameSegmentPubSub.onMessage, ss.mkdel(this, this.$onMessage));
		this.gameSegmentPubSub.init().then(ss.mkdel(this, this.$ready));
	}));
	this.allUsers = [];
	this.allUsersDictionary = {};
	setInterval(ss.mkdel(this, this.buildNeighbors), 3000);
};
$Pather_Servers_GameSegment_GameSegmentServer.__typeName = 'Pather.Servers.GameSegment.GameSegmentServer';
$Pather_Servers_GameSegment_GameSegmentServer.$pointDistance = function(pUser, cUser) {
	var mx = pUser.x;
	var my = pUser.y;
	var cx = cUser.x;
	var cy = cUser.y;
	var _x = cx - mx;
	var _y = cy - my;
	var dis = Math.sqrt(_x * _x + _y * _y);
	return dis;
};
global.Pather.Servers.GameSegment.GameSegmentServer = $Pather_Servers_GameSegment_GameSegmentServer;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameSegment.Models.GameSegmentNeighbor
var $Pather_Servers_GameSegment_Models_GameSegmentNeighbor = function(cUser, distance) {
	this.user = null;
	this.distance = 0;
	this.distance = distance;
	this.user = cUser;
};
$Pather_Servers_GameSegment_Models_GameSegmentNeighbor.__typeName = 'Pather.Servers.GameSegment.Models.GameSegmentNeighbor';
global.Pather.Servers.GameSegment.Models.GameSegmentNeighbor = $Pather_Servers_GameSegment_Models_GameSegmentNeighbor;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameSegment.Models.GameSegmentUser
var $Pather_Servers_GameSegment_Models_GameSegmentUser = function() {
	this.gameSegmentId = null;
	this.gatewayId = null;
	this.x = 0;
	this.y = 0;
	this.userId = null;
	this.neighbors = null;
	this.neighbors = [];
};
$Pather_Servers_GameSegment_Models_GameSegmentUser.__typeName = 'Pather.Servers.GameSegment.Models.GameSegmentUser';
global.Pather.Servers.GameSegment.Models.GameSegmentUser = $Pather_Servers_GameSegment_Models_GameSegmentUser;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameSegment.Old.ServerEntity
var $Pather_Servers_GameSegment_Old_ServerEntity = function(game, playerId) {
	this.socket = null;
	Pather.Common.Entity.call(this, game, playerId);
};
$Pather_Servers_GameSegment_Old_ServerEntity.__typeName = 'Pather.Servers.GameSegment.Old.ServerEntity';
global.Pather.Servers.GameSegment.Old.ServerEntity = $Pather_Servers_GameSegment_Old_ServerEntity;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameSegment.Old.ServerGame
var $Pather_Servers_GameSegment_Old_ServerGame = function(socketManager, gameServerName) {
	this.syncLockstep = null;
	Pather.Common.Game.call(this);
	console.log(gameServerName + ' Has come online');
	this.stepManager = new $Pather_Servers_GameSegment_Old_ServerStepManager(this, new $Pather_Servers_GameSegment_Old_ServerNetworkManager(this, socketManager));
	this.constructGrid();
	this.ready = true;
};
$Pather_Servers_GameSegment_Old_ServerGame.__typeName = 'Pather.Servers.GameSegment.Old.ServerGame';
global.Pather.Servers.GameSegment.Old.ServerGame = $Pather_Servers_GameSegment_Old_ServerGame;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameSegment.Old.ServerNetworkManager
var $Pather_Servers_GameSegment_Old_ServerNetworkManager = function(game, socketManager) {
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
$Pather_Servers_GameSegment_Old_ServerNetworkManager.__typeName = 'Pather.Servers.GameSegment.Old.ServerNetworkManager';
global.Pather.Servers.GameSegment.Old.ServerNetworkManager = $Pather_Servers_GameSegment_Old_ServerNetworkManager;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameSegment.Old.ServerStepManager
var $Pather_Servers_GameSegment_Old_ServerStepManager = function(game, serverNetworkManager) {
	this.serverNetworkManager = null;
	Pather.Common.StepManager.call(this, game);
	this.serverNetworkManager = serverNetworkManager;
	this.serverNetworkManager.onRecieveAction = ss.delegateCombine(this.serverNetworkManager.onRecieveAction, ss.mkdel(this, this.receiveAction));
};
$Pather_Servers_GameSegment_Old_ServerStepManager.__typeName = 'Pather.Servers.GameSegment.Old.ServerStepManager';
global.Pather.Servers.GameSegment.Old.ServerStepManager = $Pather_Servers_GameSegment_Old_ServerStepManager;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameSegmentCluster.GameSegmentCluster
var $Pather_Servers_GameSegmentCluster_GameSegmentCluster = function(pubsub, pushPop, gameSegmentClusterId) {
	this.pushPop = null;
	this.gameSegmentClusterPubSub = null;
	this.gameSegmentClusterId = null;
	this.$pubsub = null;
	$Pather_Servers_Common_ServerLogging_ServerLogger.initLogger('GameSegmentCluster', gameSegmentClusterId);
	this.pushPop = pushPop;
	this.gameSegmentClusterId = gameSegmentClusterId;
	this.$pubsub = pubsub;
	Pather.Common.Utils.Promises.Q.all([pubsub.init(), pushPop.init()]).then(ss.mkdel(this, this.$pubsubsConnected));
};
$Pather_Servers_GameSegmentCluster_GameSegmentCluster.__typeName = 'Pather.Servers.GameSegmentCluster.GameSegmentCluster';
global.Pather.Servers.GameSegmentCluster.GameSegmentCluster = $Pather_Servers_GameSegmentCluster_GameSegmentCluster;
////////////////////////////////////////////////////////////////////////////////
// Pather.Servers.GameSegmentCluster.GameSegmentClusterPubSub
var $Pather_Servers_GameSegmentCluster_GameSegmentClusterPubSub = function(pubSub, gameSegmentClusterId) {
	this.gameSegmentClusterId = null;
	this.pubSub = null;
	this.onMessage = null;
	this.gameSegmentClusterId = gameSegmentClusterId;
	this.pubSub = pubSub;
};
$Pather_Servers_GameSegmentCluster_GameSegmentClusterPubSub.__typeName = 'Pather.Servers.GameSegmentCluster.GameSegmentClusterPubSub';
global.Pather.Servers.GameSegmentCluster.GameSegmentClusterPubSub = $Pather_Servers_GameSegmentCluster_GameSegmentClusterPubSub;
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
var $Pather_Servers_GameWorldServer_GameSegment = function(gameWorld) {
	this.gameWorld = null;
	this.users = null;
	this.gameSegmentId = null;
	this.gameWorld = gameWorld;
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
	this.$gameSegmentClusterId = 'TODO:DEFAULTGAMESEGMENTCLUSTER';
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
	this.clientTickManager = null;
	this.$gameSegmentClusterPubSub = null;
	this.$usersWaitingToJoin = [];
	this.$currentlyJoiningUser = false;
	$Pather_Servers_Common_ServerLogging_ServerLogger.initLogger('GameWorld', 'GameWorld');
	this.$pubSub = pubSub;
	this.$databaseQueries = dbQueries;
	pubSub.init().then(ss.mkdel(this, this.$pubsubReady));
};
$Pather_Servers_GameWorldServer_GameWorldServer.__typeName = 'Pather.Servers.GameWorldServer.GameWorldServer';
global.Pather.Servers.GameWorldServer.GameWorldServer = $Pather_Servers_GameWorldServer_GameWorldServer;
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
	this.$1$SocketField = null;
	this.$1$UserIdField = null;
	this.$1$GameSegmentIdField = null;
};
$Pather_Servers_GatewayServer_$GatewayUser.__typeName = 'Pather.Servers.GatewayServer.$GatewayUser';
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
var $Pather_Servers_GatewayServer_GatewayServer = function(pubsub, socketManager, gatewayId, port_) {
	this.gatewayId = null;
	this.serverCommunicator = null;
	this.gatewayPubSub = null;
	this.clientTickManager = null;
	this.$users = [];
	this.gatewayId = gatewayId;
	$Pather_Servers_Common_ServerLogging_ServerLogger.initLogger('Gateway', this.gatewayId);
	console.log(this.gatewayId);
	var port = 1800 + (Math.random() * 4000 | 0);
	port = port_;
	this.serverCommunicator = new $Pather_Servers_Common_ServerCommunicator(socketManager, port);
	pubsub.init().then(ss.mkdel(this, function() {
		this.gatewayPubSub = new $Pather_Servers_GatewayServer_GatewayPubSub(pubsub, this.gatewayId);
		this.gatewayPubSub.onMessage = ss.delegateCombine(this.gatewayPubSub.onMessage, ss.mkdel(this, this.$onMessage));
		this.gatewayPubSub.onAllMessage = ss.delegateCombine(this.gatewayPubSub.onAllMessage, ss.mkdel(this, this.$onAllMessage));
		this.gatewayPubSub.init();
		this.clientTickManager = new $Pather_Servers_Common_ClientTickManager();
		this.clientTickManager.init$1(ss.mkdel(this, this.$sendPing), function() {
			console.log('Connected To Tick Server');
		});
		this.clientTickManager.startPing();
		this.$pubsubReady();
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
// Pather.Servers.MonitorServer.MonitorServer
var $Pather_Servers_MonitorServer_MonitorServer = function() {
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
	var serverTypes = ['GameSegment', 'GameSegmentCluster', 'GameWorld', 'Gateway', 'Chat', 'Tick', 'Auth'];
	var connections = [];
	for (var $t1 = 0; $t1 < serverTypes.length; $t1++) {
		var serverType = serverTypes[$t1];
		new $Pather_Servers_Common_ServerLogging_ServerLogListener(serverType, function(mess) {
			for (var $t2 = 0; $t2 < connections.length; $t2++) {
				var socketIoConnection = connections[$t2];
				socketIoConnection.emit(mess.serverType, mess);
			}
		});
	}
	io.sockets.on('connection', function(socket) {
		console.log('User Joined');
		connections.push(socket);
		socket.on('disconnect', function(data) {
			ss.remove(connections, socket);
		});
	});
};
$Pather_Servers_MonitorServer_MonitorServer.__typeName = 'Pather.Servers.MonitorServer.MonitorServer';
global.Pather.Servers.MonitorServer.MonitorServer = $Pather_Servers_MonitorServer_MonitorServer;
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
	pubSub.init().then(ss.mkdel(this, function() {
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
	$Pather_Servers_Common_TickManager.call(this);
	this.tickPubSub = tickPubSub;
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
ss.initClass($Pather_Servers_ServerManager, $asm, {});
ss.initClass($Pather_Servers_AuthServer_AuthServer, $asm, {});
ss.initClass($Pather_Servers_Common_TickManager, $asm, {
	init: function(currentLockstepTickNumber) {
		this.lockstepTickNumber = currentLockstepTickNumber;
		this.$currentLockstepTime = (new Date()).getTime();
		setTimeout(ss.mkdel(this, this.$tick), 1);
	},
	setLockStepTick: function(lockStepTickNumber) {
		//todo resolve if current > or < lockstep
		if (this.lockstepTickNumber > lockStepTickNumber) {
			this.lockstepTickNumber = lockStepTickNumber;
			console.log('Force Lockstep', lockStepTickNumber);
			//           TODO     Game.StepManager.ProcessAction(Game.LockstepTickNumber);
		}
		if (this.lockstepTickNumber < lockStepTickNumber) {
			console.log('Force Lockstep', lockStepTickNumber);
			while (this.lockstepTickNumber < lockStepTickNumber) {
				this.lockstepTickNumber++;
				//           TODO     Game.StepManager.ProcessAction(Game.LockstepTickNumber);
			}
		}
		this.$currentLockstepTime = (new Date()).getTime() - this.currentServerLatency;
	},
	setServerLatency: function(latency) {
		this.currentServerLatency = latency;
	},
	$tick: function() {
		setTimeout(ss.mkdel(this, this.$tick), 1);
		var vc = (new Date()).getTime();
		var l = vc - this.$currentLockstepTime;
		while (l > Pather.Common.Constants.lockstepTicks) {
			l -= Pather.Common.Constants.lockstepTicks;
			this.$currentLockstepTime += Pather.Common.Constants.lockstepTicks;
			this.lockstepTickNumber++;
			this.processLockstep(this.lockstepTickNumber);
		}
	},
	processLockstep: function(lockstepTickNumber) {
		//            ServerLogger.LogInformation("Lockstep", LockstepTickNumber, new DateTime().GetTime());
	}
});
ss.initClass($Pather_Servers_Common_ClientTickManager, $asm, {
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
		var cur = (new Date()).getTime();
		this.$pingSent.push(cur - this.$lastPing);
		this.$lastPing = cur;
		if (this.$pingSent.length < 6) {
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
		$Pather_Servers_Common_TickManager.prototype.setLockStepTick.call(this, lockStepTickNumber);
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
		$Pather_Servers_Common_TickManager.prototype.setServerLatency.call(this, latency);
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
}, $Pather_Servers_Common_TickManager);
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
		socket.emit(Pather.Common.Models.Gateway.Socket.Base.Socket_Message).call(socket, 'Gateway.Message', ss.makeGenericType(Pather.Common.Utils.DataObject$1, [Pather.Common.Models.Gateway.Socket.Base.Socket_Message]).$ctor(obj));
	},
	oldSendMessage: function(T) {
		return function(socket, channel, obj) {
			socket.emit(T).call(socket, channel, ss.makeGenericType(Pather.Common.Utils.DataObject$1, [T]).$ctor(obj));
		};
	}
});
ss.initInterface($Pather_Servers_Common_PubSub_IPubSub, $asm, { publish: null, subscribe: null, init: null, receivedMessage: null, dontLog: null });
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
		try {
			if (!this.$dontLog) {
				if (!ss.referenceEquals(channel, $Pather_Servers_Common_PubSub_PubSubChannels.tick()) && !(message.indexOf('pong') !== -1) && !(message.indexOf('tickSync') !== -1)) {
					$Pather_Servers_Common_ServerLogging_ServerLogger.logTransport('Pubsub Message Received', [channel, message]);
				}
			}
			var channelCallback = this.$subbed[channel];
			if (!ss.staticEquals(channelCallback, null)) {
				channelCallback(message);
			}
		}
		catch ($t1) {
			var e = ss.Exception.wrap($t1);
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
		var stringMessage = JSON.stringify(message);
		this.$pubClient.publish(channel, stringMessage);
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
ss.initClass($Pather_Servers_Common_ServerLogging_ServerLogger, $asm, {});
ss.initClass($Pather_Servers_Common_ServerLogging_ServerLogListener, $asm, {});
ss.initClass($Pather_Servers_Common_ServerLogging_ServerLogMessage, $asm, {});
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
		this.get_socket().on('disconnect', callback);
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
		//todo IMPLEMENT DATABASE FOOL
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
		this.users[gameSegmentUser.userId] = gameSegmentUser;
		$Pather_Servers_Common_ServerLogging_ServerLogger.logInformation('User Joined A Game Segment', []);
		console.log(this.gameSegmentId, 'User Joined A Game Segment');
	}
});
ss.initClass($Pather_Servers_GameSegment_GameSegmentPubSub, $asm, {
	init: function() {
		var deferred = Pather.Common.Utils.Promises.Q.defer();
		this.pubSub.subscribe($Pather_Servers_Common_PubSub_PubSubChannels.gameSegment(), ss.mkdel(this, function(message) {
			var gameSegmentPubSubMessage = JSON.parse(message);
			this.onAllMessage(gameSegmentPubSubMessage);
		}));
		this.pubSub.subscribe($Pather_Servers_Common_PubSub_PubSubChannels.gameSegment$1(this.gameSegmentId), ss.mkdel(this, function(message1) {
			var gameSegmentPubSubMessage1 = JSON.parse(message1);
			if (Pather.Common.Utilities.hasField(Pather.Common.Models.GameSegment.Base.GameSegment_PubSub_ReqRes_Message).call(null, gameSegmentPubSubMessage1, function(m) {
				return m.messageId;
			}) && gameSegmentPubSubMessage1.response) {
				var possibleMessageReqRes = gameSegmentPubSubMessage1;
				if (!this.deferredMessages.containsKey(possibleMessageReqRes.messageId)) {
					console.log('Received message that I didnt ask for.', message1);
					throw new ss.Exception('Received message that I didnt ask for.');
				}
				this.deferredMessages.get_item(possibleMessageReqRes.messageId).resolve(gameSegmentPubSubMessage1);
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
		this.pubSub.publish($Pather_Servers_Common_PubSub_PubSubChannels.gateway$1(gatewayId), message);
	},
	publishToGameWorld: function(message) {
		this.pubSub.publish($Pather_Servers_Common_PubSub_PubSubChannels.gameWorld(), message);
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
ss.initClass($Pather_Servers_GameSegment_GameSegmentServer, $asm, {
	$ready: function() {
		this.$clientTickManager = new $Pather_Servers_Common_ClientTickManager();
		this.$clientTickManager.init$1(ss.mkdel(this, this.$sendPing), ss.mkdel(this, this.$tickManagerReady));
		this.$clientTickManager.startPing();
	},
	$tickManagerReady: function() {
		var $t2 = this.gameSegmentPubSub;
		var $t1 = Pather.Common.Models.GameWorld.GameSegment.InitializeGameSegment_GameSegment_GameWorld_PubSub_ReqRes_Message.$ctor();
		$t1.originGameSegment = this.$gameSegmentId;
		$t2.publishToGameWorldWithCallback(Pather.Common.Models.GameSegment.InitializeGameSegment_Response_GameWorld_GameSegment_PubSub_ReqRes_Message).call($t2, $t1).then(ss.mkdel(this, function(message) {
			this.allUsers = [];
			this.allUsersDictionary = {};
			this.allUserGameSegments = {};
			this.allGameSegments = {};
			this.myGameSegment = new $Pather_Servers_GameSegment_GameSegment(this.$gameSegmentId);
			this.allGameSegments[this.myGameSegment.gameSegmentId] = this.myGameSegment;
			for (var $t3 = 0; $t3 < message.gameSegmentIds.length; $t3++) {
				var gameSegmentId = message.gameSegmentIds[$t3];
				this.allGameSegments[gameSegmentId] = new $Pather_Servers_GameSegment_GameSegment(gameSegmentId);
			}
			for (var $t4 = 0; $t4 < message.allUsers.length; $t4++) {
				var initialGameUser = message.allUsers[$t4];
				var $t5 = new $Pather_Servers_GameSegment_Models_GameSegmentUser();
				$t5.userId = initialGameUser.userId;
				$t5.gameSegmentId = initialGameUser.gameSegmentId;
				$t5.gatewayId = initialGameUser.gatewayId;
				$t5.x = initialGameUser.x;
				$t5.y = initialGameUser.y;
				var user = $t5;
				this.allUsers.push(user);
				this.allUsersDictionary[user.userId] = user;
				this.allUserGameSegments[user.userId] = this.allGameSegments[user.gameSegmentId];
				this.allGameSegments[user.gameSegmentId].userJoin(user);
			}
			console.log('Game Segment Initialized', this.$gameSegmentId);
			this.$registerGameSegmentWithCluster();
		}));
	},
	$sendPing: function() {
		var $t2 = this.gameSegmentPubSub;
		var $t1 = Pather.Common.Models.Tick.Ping_Tick_PubSub_Message.$ctor();
		$t1.origin = $Pather_Servers_Common_PubSub_PubSubChannels.gameSegment$1(this.$gameSegmentId);
		$t1.originType = 0;
		$t2.publishToTickServer($t1);
	},
	$registerGameSegmentWithCluster: function() {
		//register game segment
		this.$pushPop.push(this.$gameSegmentId, 1);
	},
	$onMessage: function(message) {
		switch (message.type) {
			case 'userJoin': {
				this.$onMessageUserJoin(message);
				break;
			}
			case 'userMoved': {
				this.$onMessageUserMoved(message);
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
			case 'pong': {
				this.$onMessagePong(message);
				break;
			}
			case 'tellUserMoved': {
				this.$onMessageTellUserMoved(message);
				break;
			}
			case 'userMovedCollection': {
				this.$onMessageUserMovedCollection(message);
				break;
			}
			default: {
				throw new ss.ArgumentOutOfRangeException();
			}
		}
	},
	$onMessagePong: function(message) {
		this.$clientTickManager.onPongReceived();
	},
	$onMessageUserLeft: function(message) {
		var user = this.allUsersDictionary[message.userId];
		this.myGameSegment.userLeft(message.userId);
		delete this.allUserGameSegments[message.userId];
		ss.remove(this.allUsers, user);
		delete this.allUsersDictionary[message.userId];
		//todo maybe shoudlnt be pubsub
		var $t2 = this.gameSegmentPubSub;
		var $t1 = Pather.Common.Models.GameWorld.GameSegment.UserLeft_Response_GameSegment_GameWorld_PubSub_ReqRes_Message.$ctor();
		$t1.messageId = message.messageId;
		$t2.publishToGameWorld($t1);
		this.buildNeighbors();
	},
	$onMessageTellUserLeft: function(message) {
		var gameSegment = this.allUserGameSegments[message.userId];
		gameSegment.userLeft(message.userId);
		delete this.allUserGameSegments[message.userId];
		var user = this.allUsersDictionary[message.userId];
		ss.remove(this.allUsers, user);
		delete this.allUsersDictionary[message.userId];
		var $t2 = this.gameSegmentPubSub;
		var $t1 = Pather.Common.Models.GameWorld.GameSegment.TellUserLeft_Response_GameSegment_GameWorld_PubSub_ReqRes_Message.$ctor();
		$t1.messageId = message.messageId;
		$t2.publishToGameWorld($t1);
		this.buildNeighbors();
	},
	$onMessageTellUserJoin: function(message) {
		var $t1 = new $Pather_Servers_GameSegment_Models_GameSegmentUser();
		$t1.userId = message.userId;
		$t1.gameSegmentId = message.gameSegmentId;
		$t1.gatewayId = message.gatewayId;
		$t1.x = message.x;
		$t1.y = message.y;
		var gameSegmentUser = $t1;
		var otherGameSegment = this.otherGameSegments[message.gameSegmentId];
		this.allUsers.push(gameSegmentUser);
		this.allUsersDictionary[gameSegmentUser.userId] = gameSegmentUser;
		this.allUserGameSegments[gameSegmentUser.userId] = otherGameSegment;
		otherGameSegment.userJoin(gameSegmentUser);
		var $t3 = this.gameSegmentPubSub;
		var $t2 = Pather.Common.Models.GameWorld.GameSegment.TellUserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message.$ctor();
		$t2.messageId = message.messageId;
		$t3.publishToGameWorld($t2);
		this.buildNeighbors();
	},
	$onMessageUserJoin: function(message) {
		var $t1 = new $Pather_Servers_GameSegment_Models_GameSegmentUser();
		$t1.userId = message.userId;
		$t1.gameSegmentId = this.$gameSegmentId;
		$t1.gatewayId = message.gatewayId;
		$t1.x = message.x;
		$t1.y = message.y;
		var gameSegmentUser = $t1;
		this.allUsers.push(gameSegmentUser);
		;
		this.allUsersDictionary[gameSegmentUser.userId] = gameSegmentUser;
		this.allUserGameSegments[gameSegmentUser.userId] = this.myGameSegment;
		this.myGameSegment.userJoin(gameSegmentUser);
		var $t3 = this.gameSegmentPubSub;
		var $t2 = Pather.Common.Models.GameWorld.GameSegment.UserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message.$ctor();
		$t2.messageId = message.messageId;
		$t3.publishToGameWorld($t2);
		this.buildNeighbors();
	},
	$onMessageUserMoved: function(message) {
		if (!ss.keyExists(this.myGameSegment.users, message.userId)) {
			throw new ss.Exception('This aint my user! ' + message.userId);
		}
		var user = this.myGameSegment.users[message.userId];
		if (user.moveTo(message.x, message.y, message.lockstepTick)) {
			var otherGameSegments = ss.mkdict([this.allGameSegments]);
			var gateways = Pather.Common.Utils.EnumerableExtensions.groupBy(String, $Pather_Servers_GameSegment_Models_GameSegmentNeighbor).call(null, user.neighbors, function(a) {
				return a.user.gatewayId;
			});
			var neighborGameSegments = Pather.Common.Utils.EnumerableExtensions.groupBy(String, $Pather_Servers_GameSegment_Models_GameSegmentNeighbor).call(null, user.neighbors, function(a1) {
				return a1.user.gatewayId;
			});
			var $t1 = new ss.ObjectEnumerator(this.allGameSegments);
			try {
				while ($t1.moveNext()) {
					var otherGameSegment = $t1.current();
					if (!ss.keyExists(neighborGameSegments, otherGameSegment.key)) {
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
					var $t3 = Pather.Common.Models.Gateway.PubSub.UserMovedCollection_GameSegment_Gateway_PubSub_Message.$ctor();
					$t3.items = Pather.Common.Utils.EnumerableExtensions.select($Pather_Servers_GameSegment_Models_GameSegmentNeighbor, Pather.Common.Models.Common.UserMovedMessage).call(null, gateway.value, function(a2) {
						var $t4 = Pather.Common.Models.Common.UserMovedMessage.$ctor();
						$t4.userId = user.userId;
						$t4.x = user.x;
						$t4.y = user.y;
						$t4.lockstepTick = message.lockstepTick;
						return $t4;
					});
					var userMovedCollection = $t3;
					this.gameSegmentPubSub.publishToGateway(gateway.key, userMovedCollection);
				}
			}
			finally {
				$t2.dispose();
			}
			var $t5 = new ss.ObjectEnumerator(neighborGameSegments);
			try {
				while ($t5.moveNext()) {
					var neighborGameSegment = $t5.current();
					var $t8 = this.gameSegmentPubSub;
					var $t9 = neighborGameSegment.key;
					var $t6 = Pather.Common.Models.GameSegment.UserMovedCollection_GameSegment_GameSegment_PubSub_Message.$ctor();
					$t6.items = Pather.Common.Utils.EnumerableExtensions.select($Pather_Servers_GameSegment_Models_GameSegmentNeighbor, Pather.Common.Models.Common.UserMovedMessage).call(null, neighborGameSegment.value, function(a3) {
						var $t7 = Pather.Common.Models.Common.UserMovedMessage.$ctor();
						$t7.userId = user.userId;
						$t7.x = user.x;
						$t7.y = user.y;
						$t7.lockstepTick = message.lockstepTick;
						return $t7;
					});
					$t8.publishToGameSegment($t9, $t6);
				}
			}
			finally {
				$t5.dispose();
			}
			var $t10 = Pather.Common.Models.GameSegment.TellUserMoved_GameSegment_GameSegment_PubSub_Message.$ctor();
			$t10.userId = user.userId;
			$t10.x = user.x;
			$t10.y = user.y;
			$t10.lockstepTick = message.lockstepTick;
			var tellUserMoved = $t10;
			var $t11 = new ss.ObjectEnumerator(otherGameSegments);
			try {
				while ($t11.moveNext()) {
					var otherGameSegment1 = $t11.current();
					this.gameSegmentPubSub.publishToGameSegment(otherGameSegment1.key, tellUserMoved);
				}
			}
			finally {
				$t11.dispose();
			}
		}
	},
	$onMessageUserMovedCollection: function(message) {
	},
	$onMessageTellUserMoved: function(message) {
	},
	buildNeighbors: function() {
		for (var index = 0; index < this.allUsers.length; index++) {
			var user = this.allUsers[index];
			ss.clear(user.neighbors);
			if (ss.keyExists(this.myGameSegment.users, user.userId)) {
				this.$buildNeighbors(user, index);
			}
		}
	},
	$buildNeighbors: function(pUser, i) {
		var count = this.allUsers.length;
		for (var c = i; c < count; c++) {
			var cUser = this.allUsers[c];
			var distance = $Pather_Servers_GameSegment_GameSegmentServer.$pointDistance(pUser, cUser);
			if (distance <= Pather.Common.Constants.neighborDistance) {
				pUser.neighbors.push(new $Pather_Servers_GameSegment_Models_GameSegmentNeighbor(cUser, distance));
				cUser.neighbors.push(new $Pather_Servers_GameSegment_Models_GameSegmentNeighbor(pUser, distance));
			}
		}
	},
	$onAllMessage: function(message) {
		switch (message.type) {
			case 'tickSync': {
				var tickSyncMessage = message;
				this.$clientTickManager.setLockStepTick(tickSyncMessage.lockstepTickNumber);
				break;
			}
			default: {
				throw new ss.ArgumentOutOfRangeException();
			}
		}
	}
});
ss.initClass($Pather_Servers_GameSegment_Models_GameSegmentNeighbor, $asm, {});
ss.initClass($Pather_Servers_GameSegment_Models_GameSegmentUser, $asm, {
	moveTo: function(x, y, lockstepTick) {
		//todo pathfind here
		this.x = x;
		this.y = y;
		return true;
	}
});
ss.initClass($Pather_Servers_GameSegment_Old_ServerEntity, $asm, {}, Pather.Common.Entity);
ss.initClass($Pather_Servers_GameSegment_Old_ServerGame, $asm, {
	createPlayer: function(playerId) {
		return new $Pather_Servers_GameSegment_Old_ServerEntity(this, playerId);
	},
	tick: function() {
		var tickResult = Pather.Common.Game.prototype.tick.call(this);
		if (tickResult === 2 || tickResult === 3) {
			this.syncLockstep(this.lockstepTickNumber);
		}
		return tickResult;
	}
}, Pather.Common.Game);
ss.initClass($Pather_Servers_GameSegment_Old_ServerNetworkManager, $asm, {
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
		this.serverCommunicator.oldListenOnChannel(Pather.Common.SerializableAction).call(this.serverCommunicator, socketIoConnection, Pather.Common.SocketChannels.clientChannel('postAction'), ss.mkdel(this, this.$postAction));
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
			this.serverCommunicator.oldSendMessage(Pather.Common.SerializableAction).call(this.serverCommunicator, player.socket, Pather.Common.SocketChannels.serverChannel('postAction'), action);
		}
	},
	$joinPlayer: function(socket, model) {
		var player = ss.cast(this.game.createPlayer(model.playerId), $Pather_Servers_GameSegment_Old_ServerEntity);
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
ss.initClass($Pather_Servers_GameSegment_Old_ServerStepManager, $asm, {
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
	$pubsubsConnected: function() {
		this.gameSegmentClusterPubSub = new $Pather_Servers_GameSegmentCluster_GameSegmentClusterPubSub(this.$pubsub, this.gameSegmentClusterId);
		this.gameSegmentClusterPubSub.onMessage = ss.delegateCombine(this.gameSegmentClusterPubSub.onMessage, ss.mkdel(this, this.$receiveMessage));
		this.gameSegmentClusterPubSub.init();
	},
	$receiveMessage: function(message) {
		switch (message.type) {
			case 'createGameSegment': {
				this.$createGameSegment(message);
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
		this.pushPop.blockingPop(createGameSegment.gameSegmentId, Pather.Common.Constants.gameSegmentCreationWait).then(ss.mkdel(this, function(content) {
			var $t2 = this.gameSegmentClusterPubSub;
			var $t1 = Pather.Common.Models.GameWorld.GameSegmentCluster.CreateGameSegment_Response_GameSegmentCluster_GameWorld_PubSub_Message.$ctor();
			$t1.gameSegmentId = createGameSegment.gameSegmentId;
			$t1.messageId = createGameSegment.messageId;
			$t2.publishToGameWorld($t1);
			console.log('Server Created!', createGameSegment.gameSegmentId);
		})).error(function(a) {
			console.log('Server Creation Failed!');
		});
		var child = spawn('node', ['app.js', 'gs', createGameSegment.gameSegmentId], { stdio: [m, out, err] });
		//            child.Unref();
	}
});
ss.initClass($Pather_Servers_GameSegmentCluster_GameSegmentClusterPubSub, $asm, {
	init: function() {
		this.pubSub.subscribe($Pather_Servers_Common_PubSub_PubSubChannels.gameSegmentCluster$1(this.gameSegmentClusterId), ss.mkdel(this, function(message) {
			var gameWorldPubSubMessage = JSON.parse(message);
			this.onMessage(gameWorldPubSubMessage);
		}));
	},
	publishToGameWorld: function(message) {
		this.pubSub.publish($Pather_Servers_Common_PubSub_PubSubChannels.gameWorld(), message);
	}
});
ss.initClass($Pather_Servers_GameSegmentCluster_Tests_GameSegmentClusterTest, $asm, {
	createGameSegment: function(testDeferred) {
		var gameSegmentClusterId = Pather.Common.Utilities.uniqueId();
		var pubSub = new $Pather_Servers_GameSegmentCluster_Tests_StubPubSub();
		var pushPop = new $Pather_Servers_Common_PushPop_PushPop();
		global.$overwiteMethodCallForMocker$(ss.mkdel(pubSub, pubSub.init), function() {
			return Pather.Common.Utils.Promises.Q.resolvedPromise();
		});
		global.$overwiteMethodCallForMocker$(ss.mkdel(pubSub, pubSub.publish), function(channel, data) {
		});
		var gts = new $Pather_Servers_GameSegmentCluster_GameSegmentCluster(pubSub, pushPop, gameSegmentClusterId);
		pubSub.receivedMessage($Pather_Servers_Common_PubSub_PubSubChannels.gameSegmentCluster$1(gameSegmentClusterId), JSON.stringify(Pather.Common.Models.GameSegmentCluster.CreateGameSegment_GameWorld_GameSegmentCluster_PubSub_ReqRes_Message.$ctor()));
		debugger;
		testDeferred.resolve();
	}
});
ss.initClass($Pather_Servers_GameSegmentCluster_Tests_StubPubSub, $asm, {
	publish: function(channel, content) {
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
	},
	dontLog: function() {
		throw new ss.NotImplementedException();
	}
}, null, [$Pather_Servers_Common_PubSub_IPubSub]);
ss.initClass($Pather_Servers_GameWorldServer_GameSegment, $asm, {
	canAcceptNewUsers: function() {
		return this.users.length < Pather.Common.Constants.usersPerGameSegment;
	},
	addUserToSegment: function(gwUser) {
		var deferred = Pather.Common.Utils.Promises.Q.defer();
		var $t1 = Pather.Common.Models.GameSegment.UserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message.$ctor();
		$t1.x = gwUser.x;
		$t1.y = gwUser.y;
		$t1.gatewayId = gwUser.gatewayId;
		$t1.userId = gwUser.userId;
		var userJoinGameWorldGameSegmentPubSubReqResMessage = $t1;
		this.gameWorld.gameWorldPubSub.publishToGameSegmentWithCallback(Pather.Common.Models.GameWorld.GameSegment.UserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message).call(this.gameWorld.gameWorldPubSub, this.gameSegmentId, userJoinGameWorldGameSegmentPubSubReqResMessage).then(ss.mkdel(this, function(userJoinResponse) {
			console.log('User joined!');
			this.users.push(gwUser);
			gwUser.gameSegment = this;
			deferred.resolve();
		}));
		return deferred.promise;
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
		var deferred = Pather.Common.Utils.Promises.Q.defer();
		var $t1 = Pather.Common.Models.GameSegment.TellUserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message.$ctor();
		$t1.x = gwUser.x;
		$t1.y = gwUser.y;
		$t1.gatewayId = gwUser.gatewayId;
		$t1.gameSegmentId = gwUser.gameSegment.gameSegmentId;
		$t1.userId = gwUser.userId;
		var tellUserJoin = $t1;
		this.gameWorld.gameWorldPubSub.publishToGameSegmentWithCallback(Pather.Common.Models.GameWorld.GameSegment.TellUserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message).call(this.gameWorld.gameWorldPubSub, this.gameSegmentId, tellUserJoin).then(function(userJoinResponse) {
			console.log(6, 'User joining: tell', gwUser);
			//todo IDK
			deferred.resolve();
		});
		return deferred.promise;
	},
	tellSegmentAboutRemoveUser: function(gwUser) {
		var deferred = Pather.Common.Utils.Promises.Q.defer();
		var $t1 = Pather.Common.Models.GameSegment.TellUserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message.$ctor();
		$t1.x = gwUser.x;
		$t1.y = gwUser.y;
		$t1.gatewayId = gwUser.gatewayId;
		$t1.userId = gwUser.userId;
		var userJoinGameWorldGameSegmentPubSubReqResMessage = $t1;
		this.gameWorld.gameWorldPubSub.publishToGameSegmentWithCallback(Pather.Common.Models.GameWorld.GameSegment.TellUserLeft_Response_GameSegment_GameWorld_PubSub_ReqRes_Message).call(this.gameWorld.gameWorldPubSub, this.gameSegmentId, userJoinGameWorldGameSegmentPubSubReqResMessage).then(function(userJoinResponse) {
			//todo IDK
			deferred.resolve();
		});
		return deferred.promise;
	}
});
ss.initClass($Pather_Servers_GameWorldServer_GameWorld, $asm, {
	userJoined: function(gatewayChannel, dbUser) {
		var defer = Pather.Common.Utils.Promises.Q.defer$2($Pather_Servers_GameWorldServer_Models_GameWorldUser, $Pather_Servers_GameWorldServer_Models_UserJoinError).call(null);
		var gwUser = new $Pather_Servers_GameWorldServer_Models_GameWorldUser();
		gwUser.userId = dbUser.userId;
		gwUser.x = dbUser.x;
		gwUser.y = dbUser.y;
		gwUser.set_neighbors([]);
		gwUser.gatewayId = gatewayChannel;
		this.$buildNeighbors(gwUser, 0);
		this.$determineGameSegment(gwUser).then(ss.mkdel(this, function(gameSegment) {
			gameSegment.addUserToSegment(gwUser).then(ss.mkdel(this, function() {
				var promises = Pather.Common.Utils.EnumerableExtensions.select$1($Pather_Servers_GameWorldServer_GameSegment, Pather.Common.Utils.Promises.Promise).call(null, Pather.Common.Utils.EnumerableExtensions.where($Pather_Servers_GameWorldServer_GameSegment).call(null, this.gameSegments, function(seg) {
					return !ss.referenceEquals(seg, gameSegment);
				}), function(seg1) {
					return seg1.tellSegmentAboutUser(gwUser);
				});
				Pather.Common.Utils.Promises.Q.all$2(promises).then(ss.mkdel(this, function() {
					this.users.push(gwUser);
					console.log('', 'Gameworld added user to game segment', gameSegment.gameSegmentId, 'Total Players:', this.users.length, 'Game Segment Players:', gameSegment.users.length);
					defer.resolve(gwUser);
				}));
			}));
		}));
		return defer.promise;
	},
	userLeft: function(dbUser) {
		var deferred = Pather.Common.Utils.Promises.Q.defer();
		var gwUser = Pather.Common.Utils.EnumerableExtensions.first($Pather_Servers_GameWorldServer_Models_GameWorldUser).call(null, this.users, function(a) {
			return ss.referenceEquals(a.userId, dbUser.userId);
		});
		if (ss.isNullOrUndefined(gwUser)) {
			throw new ss.Exception('IDK WHO THIS USER IS');
		}
		var promises = Pather.Common.Utils.EnumerableExtensions.select$1($Pather_Servers_GameWorldServer_GameSegment, Pather.Common.Utils.Promises.Promise).call(null, Pather.Common.Utils.EnumerableExtensions.where($Pather_Servers_GameWorldServer_GameSegment).call(null, this.gameSegments, function(seg) {
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
		var $t1 = Pather.Common.Models.GameSegmentCluster.CreateGameSegment_GameWorld_GameSegmentCluster_PubSub_ReqRes_Message.$ctor();
		$t1.gameSegmentId = Pather.Common.Utilities.uniqueId();
		var createGameMessage = $t1;
		this.gameWorldPubSub.publishToGameSegmentClusterWithCallback(Pather.Common.Models.GameWorld.GameSegmentCluster.CreateGameSegment_Response_GameSegmentCluster_GameWorld_PubSub_Message).call(this.gameWorldPubSub, this.$gameSegmentClusterId, createGameMessage).then(ss.mkdel(this, function(createGameMessageResponse) {
			var gs = new $Pather_Servers_GameWorldServer_GameSegment(this);
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
	}
});
ss.initClass($Pather_Servers_GameWorldServer_GameWorldPubSub, $asm, {
	init: function() {
		this.pubSub.subscribe($Pather_Servers_Common_PubSub_PubSubChannels.gameWorld(), ss.mkdel(this, function(message) {
			var gameWorldPubSubMessage = JSON.parse(message);
			if (Pather.Common.Utilities.hasField(Pather.Common.Models.GameWorld.Base.GameWorld_PubSub_ReqRes_Message).call(null, gameWorldPubSubMessage, function(m) {
				return m.messageId;
			}) && gameWorldPubSubMessage.response) {
				console.log('message', message);
				var possibleMessageReqRes = gameWorldPubSubMessage;
				if (!this.deferredMessages.containsKey(possibleMessageReqRes.messageId)) {
					console.log('Received message that I didnt ask for.', message);
					throw new ss.Exception('Received message that I didnt ask for.');
				}
				this.deferredMessages.get_item(possibleMessageReqRes.messageId).resolve(gameWorldPubSubMessage);
				return;
			}
			this.message(gameWorldPubSubMessage);
		}));
	},
	publishToGameSegmentCluster: function(gameSegmentClusterId, message) {
		this.pubSub.publish($Pather_Servers_Common_PubSub_PubSubChannels.gameSegmentCluster$1(gameSegmentClusterId), message);
	},
	publishToGameSegment: function(gameSegmentId, message) {
		this.pubSub.publish($Pather_Servers_Common_PubSub_PubSubChannels.gameSegment$1(gameSegmentId), message);
	},
	publishToGameSegmentWithCallback: function(T) {
		return function(gameSegmentId, message) {
			var deferred = Pather.Common.Utils.Promises.Q.defer$2(T, Pather.Common.Utils.Promises.UndefinedPromiseError).call(null);
			this.pubSub.publish($Pather_Servers_Common_PubSub_PubSubChannels.gameSegment$1(gameSegmentId), message);
			this.deferredMessages.add(message.messageId, deferred);
			return deferred.promise;
		};
	},
	publishToTickServer: function(message) {
		this.pubSub.publish($Pather_Servers_Common_PubSub_PubSubChannels.tick(), message);
	},
	publishToGameSegmentClusterWithCallback: function(T) {
		return function(gameSegmentClusterId, message) {
			var deferred = Pather.Common.Utils.Promises.Q.defer$2(T, Pather.Common.Utils.Promises.UndefinedPromiseError).call(null);
			this.pubSub.publish($Pather_Servers_Common_PubSub_PubSubChannels.gameSegmentCluster$1(gameSegmentClusterId), message);
			this.deferredMessages.add(message.messageId, deferred);
			return deferred.promise;
		};
	},
	publishToGatewayServer: function(gatewayId, message) {
		this.pubSub.publish(gatewayId, message);
	}
});
ss.initClass($Pather_Servers_GameWorldServer_GameWorldServer, $asm, {
	$pubsubReady: function() {
		this.$gameSegmentClusterPubSub = new $Pather_Servers_GameWorldServer_GameWorldPubSub(this.$pubSub);
		this.$gameSegmentClusterPubSub.init();
		this.$gameSegmentClusterPubSub.message = ss.delegateCombine(this.$gameSegmentClusterPubSub.message, ss.mkdel(this, this.$gameWorldMessage));
		this.gameWorld = new $Pather_Servers_GameWorldServer_GameWorld(this.$gameSegmentClusterPubSub);
		this.clientTickManager = new $Pather_Servers_Common_ClientTickManager();
		this.clientTickManager.init$1(ss.mkdel(this, this.$sendPing), function() {
			console.log('Connected To Tick Server');
		});
		this.clientTickManager.startPing();
	},
	$sendPing: function() {
		var $t2 = this.$gameSegmentClusterPubSub;
		var $t1 = Pather.Common.Models.Tick.Ping_Tick_PubSub_Message.$ctor();
		$t1.origin = $Pather_Servers_Common_PubSub_PubSubChannels.gameWorld();
		$t1.originType = 1;
		$t2.publishToTickServer($t1);
	},
	$gameWorldMessage: function(message) {
		switch (message.type) {
			case 'userJoined': {
				this.$userJoined(message).then(ss.mkdel(this, function(gwUser) {
					var $t2 = this.$gameSegmentClusterPubSub;
					var $t3 = $Pather_Servers_Common_PubSub_PubSubChannels.gateway$1(gwUser.gatewayId);
					var $t1 = Pather.Common.Models.Gateway.PubSub.UserJoined_GameWorld_Gateway_PubSub_Message.$ctor();
					$t1.gameSegmentId = gwUser.gameSegment.gameSegmentId;
					$t1.userId = gwUser.userId;
					$t2.publishToGatewayServer($t3, $t1);
				}));
				break;
			}
			case 'userLeft': {
				this.$userLeft(message).then(function() {
					//todo idk
				});
				break;
			}
			case 'pong': {
				var pongMessage = message;
				this.clientTickManager.onPongReceived();
				break;
			}
			case 'tickSync': {
				var tickSyncMessage = message;
				this.clientTickManager.setLockStepTick(tickSyncMessage.lockstepTickNumber);
				break;
			}
			case 'createGameSegmentResponse': {
				break;
			}
			case 'userJoinResponse': {
				break;
			}
			case 'tellUserJoinResponse': {
				break;
			}
			case 'tellUserLeftResponse': {
				break;
			}
			case 'initializeGameSegment': {
				var getAllGameSegments = message;
				var $t6 = this.$gameSegmentClusterPubSub;
				var $t7 = getAllGameSegments.originGameSegment;
				var $t4 = Pather.Common.Models.GameSegment.InitializeGameSegment_Response_GameWorld_GameSegment_PubSub_ReqRes_Message.$ctor();
				$t4.messageId = getAllGameSegments.messageId;
				$t4.gameSegmentIds = Pather.Common.Utils.EnumerableExtensions.select($Pather_Servers_GameWorldServer_GameSegment, String).call(null, this.gameWorld.gameSegments, function(a) {
					return a.gameSegmentId;
				});
				$t4.allUsers = Pather.Common.Utils.EnumerableExtensions.select($Pather_Servers_GameWorldServer_Models_GameWorldUser, Pather.Common.Models.GameSegment.InitialGameUser).call(null, this.gameWorld.users, function(user) {
					var $t5 = Pather.Common.Models.GameSegment.InitialGameUser.$ctor();
					$t5.gameSegmentId = user.gameSegment.gameSegmentId;
					$t5.userId = user.userId;
					$t5.gatewayId = user.gatewayId;
					$t5.x = user.x;
					$t5.y = user.y;
					return $t5;
				});
				$t6.publishToGameSegment($t7, $t4);
				break;
			}
			default: {
				throw new ss.ArgumentOutOfRangeException();
			}
		}
	},
	$userJoined: function(message) {
		var deferred = Pather.Common.Utils.Promises.Q.defer$2($Pather_Servers_GameWorldServer_Models_GameWorldUser, $Pather_Servers_GameWorldServer_Models_UserJoinError).call(null);
		var meWaitingToJoin = { item1: message, item2: deferred.promise };
		if (!this.$currentlyJoiningUser) {
			this.$currentlyJoiningUser = true;
			this.$databaseQueries.getUserByToken(message.userToken).then(ss.mkdel(this, function(dbUser) {
				this.gameWorld.userJoined(message.gatewayChannel, dbUser).passThrough(deferred.promise).finally$1(ss.mkdel(this, this.$queueNextJoiningUser));
				//TODO THEN ADD USER TO TABLE OSMETHING IDK
			}));
		}
		else {
			console.log('Adding user to pending');
			this.$usersWaitingToJoin.push(meWaitingToJoin);
		}
		return deferred.promise;
	},
	$queueNextJoiningUser: function() {
		this.$currentlyJoiningUser = false;
		if (this.$usersWaitingToJoin.length > 0) {
			var nextUserWaitingToJoin = this.$usersWaitingToJoin[0];
			ss.remove(this.$usersWaitingToJoin, nextUserWaitingToJoin);
			console.log('Joining next user', this.$usersWaitingToJoin.length, 'still waiting');
			this.$userJoined(nextUserWaitingToJoin.item1).passThrough(nextUserWaitingToJoin.item2);
		}
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
		global.$overwiteMethodCallForMocker$(ss.mkdel(pubSubTest, pubSubTest.init), function() {
			return Pather.Common.Utils.Promises.Q.resolvedPromise();
		});
		global.$overwiteMethodCallForMocker$(ss.mkdel(pubSubTest, pubSubTest.subscribe), function(channel, callback) {
			Pather.Common.TestFramework.DeferredAssert.that(testDeferred, channel).get_does().equal($Pather_Servers_Common_PubSub_PubSubChannels.gameWorld());
			var userJoinedGameWorldPubSubMessage = Pather.Common.Models.GameWorld.Gateway.UserJoined_Gateway_GameWorld_PubSub_Message.$ctor();
			userJoinedGameWorldPubSubMessage.type = 'userJoined';
			userJoinedGameWorldPubSubMessage.userToken = 'abcd';
			userJoinedGameWorldPubSubMessage.gatewayChannel = 'Gateway 1';
			callback(JSON.stringify(userJoinedGameWorldPubSubMessage));
		});
		global.$overwiteMethodCallForMocker$(ss.mkdel(pubSubTest, pubSubTest.publish), function(channel1, data) {
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
	get_$userId: function() {
		return this.$1$UserIdField;
	},
	set_$userId: function(value) {
		this.$1$UserIdField = value;
	},
	get_$gameSegmentId: function() {
		return this.$1$GameSegmentIdField;
	},
	set_$gameSegmentId: function(value) {
		this.$1$GameSegmentIdField = value;
	}
});
ss.initClass($Pather_Servers_GatewayServer_GatewayPubSub, $asm, {
	get_gatewayId: function() {
		return this.$1$GatewayIdField;
	},
	set_gatewayId: function(value) {
		this.$1$GatewayIdField = value;
	},
	init: function() {
		this.pubSub.subscribe($Pather_Servers_Common_PubSub_PubSubChannels.gateway(), ss.mkdel(this, function(message) {
			var gameWorldPubSubAllMessage = JSON.parse(message);
			this.onAllMessage(gameWorldPubSubAllMessage);
		}));
		this.pubSub.subscribe($Pather_Servers_Common_PubSub_PubSubChannels.gateway$1(this.get_gatewayId()), ss.mkdel(this, function(message1) {
			var gameWorldPubSubMessage = JSON.parse(message1);
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
	}
});
ss.initClass($Pather_Servers_GatewayServer_GatewayServer, $asm, {
	$sendPing: function() {
		var $t2 = this.gatewayPubSub;
		var $t1 = Pather.Common.Models.Tick.Ping_Tick_PubSub_Message.$ctor();
		$t1.origin = $Pather_Servers_Common_PubSub_PubSubChannels.gateway$1(this.gatewayId);
		$t1.originType = 1;
		$t2.publishToTickServer($t1);
	},
	$onAllMessage: function(message) {
		switch (message.type) {
			case 'tickSync': {
				var tickSyncMessage = message;
				this.clientTickManager.setLockStepTick(tickSyncMessage.lockstepTickNumber);
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
				gatewayUser = Pather.Common.Utils.EnumerableExtensions.first($Pather_Servers_GatewayServer_$GatewayUser).call(null, this.$users, function(user) {
					return ss.referenceEquals(user.get_$userId(), userJoinedMessage.userId);
				});
				gatewayUser.set_$gameSegmentId(userJoinedMessage.gameSegmentId);
				var $t2 = this.serverCommunicator;
				var $t3 = gatewayUser.get_$socket();
				var $t1 = Pather.Common.Models.Gateway.Socket.Base.UserJoined_Gateway_User_Socket_Message.$ctor();
				$t1.gameSegmentId = userJoinedMessage.gameSegmentId;
				$t1.userId = userJoinedMessage.userId;
				$t2.sendMessage($t3, $t1);
				break;
			}
			case 'pong': {
				var pongMessage = message;
				this.clientTickManager.onPongReceived();
				break;
			}
			case 'userMovedCollection': {
				var userMovedCollectionMessage = message;
				for (var $t4 = 0; $t4 < userMovedCollectionMessage.items.length; $t4++) {
					var userMovedMessage = { $: userMovedCollectionMessage.items[$t4] };
					gatewayUser = Pather.Common.Utils.EnumerableExtensions.first($Pather_Servers_GatewayServer_$GatewayUser).call(null, this.$users, ss.mkdel({ userMovedMessage: userMovedMessage }, function(user1) {
						return ss.referenceEquals(user1.get_$userId(), this.userMovedMessage.$.userId);
					}));
					var $t6 = this.serverCommunicator;
					var $t7 = gatewayUser.get_$socket();
					var $t5 = Pather.Common.Models.Gateway.Socket.Base.MoveToLocation_Gateway_User_Socket_Message.$ctor();
					$t5.lockstepTick = userMovedMessage.$.lockstepTick;
					$t5.x = userMovedMessage.$.x;
					$t5.y = userMovedMessage.$.y;
					$t6.sendMessage($t7, $t5);
				}
				break;
			}
			default: {
				throw new ss.ArgumentOutOfRangeException();
			}
		}
	},
	$pubsubReady: function() {
		console.log('pubsub ready');
		this.serverCommunicator.onDisconnectConnection = ss.delegateCombine(this.serverCommunicator.onDisconnectConnection, ss.mkdel(this, function(socket) {
			var gatewayUser = Pather.Common.Utils.EnumerableExtensions.first($Pather_Servers_GatewayServer_$GatewayUser).call(null, this.$users, function(a) {
				return ss.referenceEquals(a.get_$socket(), socket);
			});
			if (ss.isValue(gatewayUser)) {
				var $t2 = this.gatewayPubSub;
				var $t1 = Pather.Common.Models.GameWorld.Gateway.UserLeft_Gateway_GameWorld_PubSub_Message.$ctor();
				$t1.userId = gatewayUser.get_$userId();
				$t2.publishToGameWorld($t1);
				ss.remove(this.$users, gatewayUser);
				console.log('Left', this.$users.length);
			}
		}));
		this.serverCommunicator.onNewConnection = ss.delegateCombine(this.serverCommunicator.onNewConnection, ss.mkdel(this, function(socket1) {
			var $t3 = new $Pather_Servers_GatewayServer_$GatewayUser();
			$t3.set_$socket(socket1);
			var user = $t3;
			this.$users.push(user);
			console.log('Joined', this.$users.length);
			this.serverCommunicator.listenOnChannel(Pather.Common.Models.Gateway.Socket.Base.Gateway_Socket_Message).call(this.serverCommunicator, socket1, 'Gateway.Message', ss.mkdel(this, function(cSocket, message) {
				if (Pather.Common.Utilities.hasField(Pather.Common.Models.Gateway.Socket.Base.User_Gateway_Socket_Message).call(null, message, function(m) {
					return m.userGatewayMessageType;
				})) {
					console.log('Socket message ', message);
					this.$handleUserMessage(user, message);
				}
			}));
		}));
	},
	$handleUserMessage: function(user, message) {
		switch (message.userGatewayMessageType) {
			case 'move': {
				var moveToLocationMessage = message;
				var $t2 = this.gatewayPubSub;
				var $t3 = user.get_$gameSegmentId();
				var $t1 = Pather.Common.Models.GameSegment.Base.UserMoved_Gateway_GameSegment_PubSub_Message.$ctor();
				$t1.userId = user.get_$userId();
				$t1.lockstepTick = moveToLocationMessage.lockstepTick;
				$t1.x = moveToLocationMessage.x;
				$t1.y = moveToLocationMessage.y;
				$t2.publishToGameSegment($t3, $t1);
				break;
			}
			case 'join': {
				var userJoinedMessage = message;
				user.set_$userId(userJoinedMessage.userToken);
				var $t5 = this.gatewayPubSub;
				var $t4 = Pather.Common.Models.GameWorld.Gateway.UserJoined_Gateway_GameWorld_PubSub_Message.$ctor();
				$t4.gatewayChannel = this.gatewayId;
				$t4.userToken = userJoinedMessage.userToken;
				$t5.publishToGameWorld($t4);
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
		global.$overwiteMethodCallForMocker$(ss.mkdel(pubSub, pubSub.init), function() {
			return Pather.Common.Utils.Promises.Q.resolvedPromise();
		});
		global.$overwiteMethodCallForMocker$(ss.mkdel(pubSub, pubSub.subscribe), function(channel1, callback1) {
			publishData = ss.delegateCombine(publishData, function(pchannel, pmessage) {
				pubSub.receivedMessage(channel1, JSON.stringify(pmessage));
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
				var userJoined = JSON.parse(message);
				Pather.Common.TestFramework.DeferredAssert.that(testDeferred, userJoined.userId).get_does().equal(userToken);
				testDeferred.resolve();
			}
		});
		var gts = new $Pather_Servers_GatewayServer_GatewayServer(pubSub, socketManager, 'gatewayServer1', 1800);
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
		global.$overwiteMethodCallForMocker$(ss.mkdel(pubSub, pubSub.init), function() {
			return Pather.Common.Utils.Promises.Q.resolvedPromise();
		});
		global.$overwiteMethodCallForMocker$(ss.mkdel(pubSubTest, pubSubTest.subscribe), function(channel4, callback2) {
			sendMessageToGameWorld = ss.delegateCombine(sendMessageToGameWorld, function(data1) {
				callback2(JSON.stringify(data1));
			});
		});
		global.$overwiteMethodCallForMocker$(ss.mkdel(pubSubTest, pubSubTest.publish), function(channel5, data2) {
			Pather.Common.TestFramework.DeferredAssert.that(testDeferred, data2.userId).get_does().equal(userToken);
			publishData(channel5, data2);
		});
		var gws = new $Pather_Servers_GameWorldServer_GameWorldServer(pubSubTest, databaseQueriesTest);
	}
});
ss.initClass($Pather_Servers_MonitorServer_MonitorServer, $asm, {});
ss.initClass($Pather_Servers_TickServer_TickPubSub, $asm, {
	init: function() {
		var deferred = Pather.Common.Utils.Promises.Q.defer();
		this.pubSub.subscribe($Pather_Servers_Common_PubSub_PubSubChannels.tick(), ss.mkdel(this, function(message) {
			var tickPubSubMessage = JSON.parse(message);
			this.onMessage(tickPubSubMessage);
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
	processLockstep: function(lockstepTickNumber) {
		$Pather_Servers_Common_TickManager.prototype.processLockstep.call(this, lockstepTickNumber);
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
}, $Pather_Servers_Common_TickManager);
ss.initClass($Pather_Servers_Utils_ServerHelper, $asm, {});
ss.setMetadata($Pather_Servers_GameSegmentCluster_Tests_GameSegmentClusterTest, { attr: [new Pather.Common.TestFramework.TestClassAttribute(false)], members: [{ attr: [new Pather.Common.TestFramework.TestMethodAttribute(false)], name: 'CreateGameSegment', type: 8, sname: 'createGameSegment', returnType: Object, params: [Pather.Common.Utils.Promises.Deferred] }] });
ss.setMetadata($Pather_Servers_GameWorldServer_Tests_GameWorldServerTests, { attr: [new Pather.Common.TestFramework.TestClassAttribute(false)], members: [{ attr: [new Pather.Common.TestFramework.TestMethodAttribute(false)], name: 'UserShouldJoin', type: 8, sname: 'userShouldJoin', returnType: Object, params: [Pather.Common.Utils.Promises.Deferred] }] });
ss.setMetadata($Pather_Servers_GatewayServer_Tests_GatewayServerTests, { attr: [new Pather.Common.TestFramework.TestClassAttribute(false)], members: [{ attr: [new Pather.Common.TestFramework.TestMethodAttribute(false)], name: 'UserShouldJoinFromGateway', type: 8, sname: 'userShouldJoinFromGateway', returnType: Object, params: [Pather.Common.Utils.Promises.Deferred] }] });
(function() {
	$Pather_Servers_Common_ConnectionConstants.redisIP = '127.0.0.1';
})();
(function() {
	$Pather_Servers_Common_PubSub_PubSubChannels.$tick = 'Tick';
	$Pather_Servers_Common_PubSub_PubSubChannels.$gameWorld = 'GameWorld';
	$Pather_Servers_Common_PubSub_PubSubChannels.$gameSegmentCluster = 'GameSegmentCluster';
	$Pather_Servers_Common_PubSub_PubSubChannels.$serverLogger = 'ServerLogger';
	$Pather_Servers_Common_PubSub_PubSubChannels.$gameSegment = 'GameSegment';
	$Pather_Servers_Common_PubSub_PubSubChannels.$gateway = 'Gateway';
})();
(function() {
	$Pather_Servers_Common_ServerLogging_ServerLogger.$pubsub = null;
	$Pather_Servers_Common_ServerLogging_ServerLogger.$serverType = null;
	$Pather_Servers_Common_ServerLogging_ServerLogger.$serverName = null;
})();
$Pather_Servers_ServerManager.main();
