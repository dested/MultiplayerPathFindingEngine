(function() {
	'use strict';
	var $asm = {};
	global.Pather = global.Pather || {};
	global.Pather.Common = global.Pather.Common || {};
	global.Pather.Common.Models = global.Pather.Common.Models || {};
	global.Pather.Common.Models.Game = global.Pather.Common.Models.Game || {};
	global.Pather.Common.Models.GameWorld = global.Pather.Common.Models.GameWorld || {};
	global.Pather.Common.Models.Gateway = global.Pather.Common.Models.Gateway || {};
	global.Pather.Common.TestFramework = global.Pather.Common.TestFramework || {};
	global.Pather.Common.Utils = global.Pather.Common.Utils || {};
	global.Pather.Common.Utils.Promises = global.Pather.Common.Utils.Promises || {};
	ss.initAssembly($asm, 'Pather.Common');
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.TestFramework.TestFramework.TestProgressCounter
	var $Pather_$Common_TestFramework_TestFramework$TestProgressCounter = function() {
		this.$passedCount = 0;
		this.$failedCount = 0;
	};
	$Pather_$Common_TestFramework_TestFramework$TestProgressCounter.__typeName = 'Pather.$Common.TestFramework.TestFramework$TestProgressCounter';
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.ActionType
	var $Pather_Common_ActionType = function() {
	};
	$Pather_Common_ActionType.__typeName = 'Pather.Common.ActionType';
	global.Pather.Common.ActionType = $Pather_Common_ActionType;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Common
	var $Pather_Common_Common = function() {
	};
	$Pather_Common_Common.__typeName = 'Pather.Common.Common';
	$Pather_Common_Common.shortDate = function() {
		var sb = '';
		var dt = new Date();
		//
		//                        sb += dt.Day;
		//
		//                        sb += (dt.Month );
		//
		//                        sb += dt.Year;
		sb += dt.getHours() + ':';
		sb += dt.getMinutes() + ':';
		sb += dt.getSeconds();
		return sb;
	};
	$Pather_Common_Common.longDate = function() {
		var sb = '';
		var dt = new Date();
		sb += dt.getDate() + '-';
		sb += dt.getMonth() + 1 + '-';
		sb += dt.getFullYear() + '-';
		sb += dt.getHours() + '-';
		sb += dt.getMinutes() + '-';
		sb += dt.getSeconds();
		return sb;
	};
	$Pather_Common_Common.uniqueId = function() {
		return ss.Guid.newGuid().toString();
	};
	global.Pather.Common.Common = $Pather_Common_Common;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Constants
	var $Pather_Common_Constants = function() {
	};
	$Pather_Common_Constants.__typeName = 'Pather.Common.Constants';
	$Pather_Common_Constants.get_testServer = function() {
		return !!window.window.TestServer;
	};
	global.Pather.Common.Constants = $Pather_Common_Constants;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Entity
	var $Pather_Common_Entity = function(game, playerId) {
		this.x = 0;
		this.y = 0;
		this.squareX = 0;
		this.squareY = 0;
		this.speed = 0;
		this.playerId = null;
		this.path = null;
		this.animations = null;
		this.$game = null;
		this.$game = game;
		this.playerId = playerId;
		this.x = 0;
		this.y = 0;
		this.squareX = 0;
		this.squareY = 0;
		this.speed = 40;
		this.path = [];
		this.animations = [];
	};
	$Pather_Common_Entity.__typeName = 'Pather.Common.Entity';
	global.Pather.Common.Entity = $Pather_Common_Entity;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Game
	var $Pather_Common_Game = function() {
		this.grid = null;
		this.players = null;
		this.curLockstepTime = 0;
		this.curTickTime = 0;
		this.stepManager = null;
		this.tickNumber = 0;
		this.lockstepTickNumber = 0;
		this.ready = false;
		this.curGameTime = 0;
		this.nextGameTime = 0;
		this.serverLatency = 0;
		this.trackTickNumber = 0;
		this.trackLockstepTickNumber = 0;
		this.aStarGraph = null;
		this.players = [];
		this.nextGameTime = (new Date()).getTime();
	};
	$Pather_Common_Game.__typeName = 'Pather.Common.Game';
	global.Pather.Common.Game = $Pather_Common_Game;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.IAction
	var $Pather_Common_IAction = function() {
	};
	$Pather_Common_IAction.__typeName = 'Pather.Common.IAction';
	global.Pather.Common.IAction = $Pather_Common_IAction;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Lerper
	var $Pather_Common_Lerper = function() {
	};
	$Pather_Common_Lerper.__typeName = 'Pather.Common.Lerper';
	$Pather_Common_Lerper.lerp = function(start, end, duration) {
		return start + (end - start) * duration;
	};
	$Pather_Common_Lerper.moveTowards = function(start, end, amount) {
		if (Math.abs(start - end) < amount) {
			return end;
		}
		if (start < end) {
			return start + amount;
		}
		if (start > end) {
			return start - amount;
		}
		return start;
	};
	global.Pather.Common.Lerper = $Pather_Common_Lerper;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Logger
	var $Pather_Common_Logger = function() {
	};
	$Pather_Common_Logger.__typeName = 'Pather.Common.Logger';
	$Pather_Common_Logger.start = function(key) {
		console.log(key + ' - ' + $Pather_Common_Common.longDate());
		$Pather_Common_Logger.log('Start: ' + key, 'information');
	};
	$Pather_Common_Logger.log = function(item, level) {
		item = ss.formatString('{0} - {1}', $Pather_Common_Common.shortDate(), item);
		switch (level) {
			case 'error': {
				console.log(item);
				break;
			}
			case 'debugInformation': {
				break;
			}
			case 'information': {
				break;
			}
			case 'transportInfo': {
				break;
			}
			case 'dataInfo': {
				break;
			}
			case 'keepAlive': {
				return item;
			}
		}
		return item;
	};
	global.Pather.Common.Logger = $Pather_Common_Logger;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.LogLevel
	var $Pather_Common_LogLevel = function() {
	};
	$Pather_Common_LogLevel.__typeName = 'Pather.Common.LogLevel';
	global.Pather.Common.LogLevel = $Pather_Common_LogLevel;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.MoveAction
	var $Pather_Common_MoveAction = function(moveModel, lockstepTickNumber) {
		this.moveModel = null;
		this.$1$LockstepTickNumberField = 0;
		this.moveModel = moveModel;
		this.set_lockstepTickNumber(lockstepTickNumber);
	};
	$Pather_Common_MoveAction.__typeName = 'Pather.Common.MoveAction';
	global.Pather.Common.MoveAction = $Pather_Common_MoveAction;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.NoopAction
	var $Pather_Common_NoopAction = function(lockstepTickNumber) {
		this.$1$LockstepTickNumberField = 0;
		this.set_lockstepTickNumber(lockstepTickNumber);
	};
	$Pather_Common_NoopAction.__typeName = 'Pather.Common.NoopAction';
	global.Pather.Common.NoopAction = $Pather_Common_NoopAction;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.SerializableAction
	var $Pather_Common_SerializableAction = function() {
	};
	$Pather_Common_SerializableAction.__typeName = 'Pather.Common.SerializableAction';
	$Pather_Common_SerializableAction.createInstance = function() {
		return $Pather_Common_SerializableAction.$ctor();
	};
	$Pather_Common_SerializableAction.$ctor = function() {
		var $this = {};
		$this.data = null;
		$this.lockstepTickNumber = 0;
		$this.type = 0;
		return $this;
	};
	global.Pather.Common.SerializableAction = $Pather_Common_SerializableAction;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.SocketChannels
	var $Pather_Common_SocketChannels = function() {
	};
	$Pather_Common_SocketChannels.__typeName = 'Pather.Common.SocketChannels';
	$Pather_Common_SocketChannels.clientChannel = function(c) {
		return 'Client.' + c;
	};
	$Pather_Common_SocketChannels.serverChannel = function(c) {
		return 'Server.' + c;
	};
	global.Pather.Common.SocketChannels = $Pather_Common_SocketChannels;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.SocketChannels.Client
	var $Pather_Common_SocketChannels$Client = function() {
	};
	$Pather_Common_SocketChannels$Client.__typeName = 'Pather.Common.SocketChannels$Client';
	global.Pather.Common.SocketChannels$Client = $Pather_Common_SocketChannels$Client;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.SocketChannels.Server
	var $Pather_Common_SocketChannels$Server = function() {
	};
	$Pather_Common_SocketChannels$Server.__typeName = 'Pather.Common.SocketChannels$Server';
	global.Pather.Common.SocketChannels$Server = $Pather_Common_SocketChannels$Server;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.StepManager
	var $Pather_Common_StepManager = function(game) {
		this.lastTickProcessed = 0;
		this.game = null;
		this.stepActionsTicks = null;
		this.$misprocess = 0;
		this.game = game;
		this.stepActionsTicks = new (ss.makeGenericType(ss.Dictionary$2, [ss.Int32, Array]))();
		this.lastTickProcessed = 0;
	};
	$Pather_Common_StepManager.__typeName = 'Pather.Common.StepManager';
	global.Pather.Common.StepManager = $Pather_Common_StepManager;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.TickResult
	var $Pather_Common_TickResult = function() {
	};
	$Pather_Common_TickResult.__typeName = 'Pather.Common.TickResult';
	global.Pather.Common.TickResult = $Pather_Common_TickResult;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Game.ConnectedModel
	var $Pather_Common_Models_Game_ConnectedModel = function() {
	};
	$Pather_Common_Models_Game_ConnectedModel.__typeName = 'Pather.Common.Models.Game.ConnectedModel';
	$Pather_Common_Models_Game_ConnectedModel.createInstance = function() {
		return $Pather_Common_Models_Game_ConnectedModel.$ctor();
	};
	$Pather_Common_Models_Game_ConnectedModel.$ctor = function() {
		var $this = {};
		$this.grid = null;
		return $this;
	};
	global.Pather.Common.Models.Game.ConnectedModel = $Pather_Common_Models_Game_ConnectedModel;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Game.MoveModel
	var $Pather_Common_Models_Game_MoveModel = function() {
	};
	$Pather_Common_Models_Game_MoveModel.__typeName = 'Pather.Common.Models.Game.MoveModel';
	$Pather_Common_Models_Game_MoveModel.createInstance = function() {
		return $Pather_Common_Models_Game_MoveModel.$ctor();
	};
	$Pather_Common_Models_Game_MoveModel.$ctor = function() {
		var $this = {};
		$this.playerId = null;
		$this.x = 0;
		$this.y = 0;
		return $this;
	};
	global.Pather.Common.Models.Game.MoveModel = $Pather_Common_Models_Game_MoveModel;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Game.PingPongModel
	var $Pather_Common_Models_Game_PingPongModel = function() {
	};
	$Pather_Common_Models_Game_PingPongModel.__typeName = 'Pather.Common.Models.Game.PingPongModel';
	$Pather_Common_Models_Game_PingPongModel.createInstance = function() {
		return $Pather_Common_Models_Game_PingPongModel.$ctor();
	};
	$Pather_Common_Models_Game_PingPongModel.$ctor = function() {
		var $this = {};
		return $this;
	};
	global.Pather.Common.Models.Game.PingPongModel = $Pather_Common_Models_Game_PingPongModel;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Game.PlayerJoinModel
	var $Pather_Common_Models_Game_PlayerJoinModel = function() {
	};
	$Pather_Common_Models_Game_PlayerJoinModel.__typeName = 'Pather.Common.Models.Game.PlayerJoinModel';
	$Pather_Common_Models_Game_PlayerJoinModel.createInstance = function() {
		return $Pather_Common_Models_Game_PlayerJoinModel.$ctor();
	};
	$Pather_Common_Models_Game_PlayerJoinModel.$ctor = function() {
		var $this = {};
		$this.playerId = null;
		return $this;
	};
	global.Pather.Common.Models.Game.PlayerJoinModel = $Pather_Common_Models_Game_PlayerJoinModel;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Game.PlayerModel
	var $Pather_Common_Models_Game_PlayerModel = function() {
	};
	$Pather_Common_Models_Game_PlayerModel.__typeName = 'Pather.Common.Models.Game.PlayerModel';
	$Pather_Common_Models_Game_PlayerModel.createInstance = function() {
		return $Pather_Common_Models_Game_PlayerModel.$ctor();
	};
	$Pather_Common_Models_Game_PlayerModel.$ctor = function() {
		var $this = {};
		$this.playerId = null;
		$this.x = 0;
		$this.y = 0;
		return $this;
	};
	global.Pather.Common.Models.Game.PlayerModel = $Pather_Common_Models_Game_PlayerModel;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Game.PlayerSyncModel
	var $Pather_Common_Models_Game_PlayerSyncModel = function() {
	};
	$Pather_Common_Models_Game_PlayerSyncModel.__typeName = 'Pather.Common.Models.Game.PlayerSyncModel';
	$Pather_Common_Models_Game_PlayerSyncModel.createInstance = function() {
		return $Pather_Common_Models_Game_PlayerSyncModel.$ctor();
	};
	$Pather_Common_Models_Game_PlayerSyncModel.$ctor = function() {
		var $this = {};
		$this.joinedPlayers = null;
		$this.leftPlayers = null;
		return $this;
	};
	global.Pather.Common.Models.Game.PlayerSyncModel = $Pather_Common_Models_Game_PlayerSyncModel;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Game.SyncLockstepModel
	var $Pather_Common_Models_Game_SyncLockstepModel = function() {
	};
	$Pather_Common_Models_Game_SyncLockstepModel.__typeName = 'Pather.Common.Models.Game.SyncLockstepModel';
	$Pather_Common_Models_Game_SyncLockstepModel.createInstance = function() {
		return $Pather_Common_Models_Game_SyncLockstepModel.$ctor();
	};
	$Pather_Common_Models_Game_SyncLockstepModel.$ctor = function() {
		var $this = {};
		$this.lockstepTickNumber = 0;
		return $this;
	};
	global.Pather.Common.Models.Game.SyncLockstepModel = $Pather_Common_Models_Game_SyncLockstepModel;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.GameWorld.GameWorldMessageType
	var $Pather_Common_Models_GameWorld_GameWorldMessageType = function() {
	};
	$Pather_Common_Models_GameWorld_GameWorldMessageType.__typeName = 'Pather.Common.Models.GameWorld.GameWorldMessageType';
	global.Pather.Common.Models.GameWorld.GameWorldMessageType = $Pather_Common_Models_GameWorld_GameWorldMessageType;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.GameWorld.GameWorldPubSubMessage
	var $Pather_Common_Models_GameWorld_GameWorldPubSubMessage = function() {
	};
	$Pather_Common_Models_GameWorld_GameWorldPubSubMessage.__typeName = 'Pather.Common.Models.GameWorld.GameWorldPubSubMessage';
	$Pather_Common_Models_GameWorld_GameWorldPubSubMessage.createInstance = function() {
		return $Pather_Common_Models_GameWorld_GameWorldPubSubMessage.$ctor();
	};
	$Pather_Common_Models_GameWorld_GameWorldPubSubMessage.$ctor = function() {
		var $this = {};
		$this.type = 0;
		return $this;
	};
	global.Pather.Common.Models.GameWorld.GameWorldPubSubMessage = $Pather_Common_Models_GameWorld_GameWorldPubSubMessage;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.GameWorld.UserJoinedGameWorldPubSubMessage
	var $Pather_Common_Models_GameWorld_UserJoinedGameWorldPubSubMessage = function() {
	};
	$Pather_Common_Models_GameWorld_UserJoinedGameWorldPubSubMessage.__typeName = 'Pather.Common.Models.GameWorld.UserJoinedGameWorldPubSubMessage';
	$Pather_Common_Models_GameWorld_UserJoinedGameWorldPubSubMessage.createInstance = function() {
		return $Pather_Common_Models_GameWorld_UserJoinedGameWorldPubSubMessage.$ctor();
	};
	$Pather_Common_Models_GameWorld_UserJoinedGameWorldPubSubMessage.$ctor = function() {
		var $this = $Pather_Common_Models_GameWorld_GameWorldPubSubMessage.$ctor();
		$this.gatewayChannel = null;
		$this.userToken = null;
		return $this;
	};
	global.Pather.Common.Models.GameWorld.UserJoinedGameWorldPubSubMessage = $Pather_Common_Models_GameWorld_UserJoinedGameWorldPubSubMessage;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Gateway.GatewayJoinModel
	var $Pather_Common_Models_Gateway_GatewayJoinModel = function() {
		this.$1$UserNameField = null;
	};
	$Pather_Common_Models_Gateway_GatewayJoinModel.__typeName = 'Pather.Common.Models.Gateway.GatewayJoinModel';
	global.Pather.Common.Models.Gateway.GatewayJoinModel = $Pather_Common_Models_Gateway_GatewayJoinModel;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Gateway.GatewayMessageType
	var $Pather_Common_Models_Gateway_GatewayMessageType = function() {
	};
	$Pather_Common_Models_Gateway_GatewayMessageType.__typeName = 'Pather.Common.Models.Gateway.GatewayMessageType';
	global.Pather.Common.Models.Gateway.GatewayMessageType = $Pather_Common_Models_Gateway_GatewayMessageType;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Gateway.GatewayPubSubMessage
	var $Pather_Common_Models_Gateway_GatewayPubSubMessage = function() {
	};
	$Pather_Common_Models_Gateway_GatewayPubSubMessage.__typeName = 'Pather.Common.Models.Gateway.GatewayPubSubMessage';
	$Pather_Common_Models_Gateway_GatewayPubSubMessage.createInstance = function() {
		return $Pather_Common_Models_Gateway_GatewayPubSubMessage.$ctor();
	};
	$Pather_Common_Models_Gateway_GatewayPubSubMessage.$ctor = function() {
		var $this = {};
		$this.type = 0;
		return $this;
	};
	global.Pather.Common.Models.Gateway.GatewayPubSubMessage = $Pather_Common_Models_Gateway_GatewayPubSubMessage;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Gateway.GatewaySocketMessageModel
	var $Pather_Common_Models_Gateway_GatewaySocketMessageModel = function() {
		this.$1$ChannelField = null;
		this.$1$PayloadField = null;
	};
	$Pather_Common_Models_Gateway_GatewaySocketMessageModel.__typeName = 'Pather.Common.Models.Gateway.GatewaySocketMessageModel';
	global.Pather.Common.Models.Gateway.GatewaySocketMessageModel = $Pather_Common_Models_Gateway_GatewaySocketMessageModel;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Gateway.UserJoinedGatewayPubSubMessage
	var $Pather_Common_Models_Gateway_UserJoinedGatewayPubSubMessage = function() {
	};
	$Pather_Common_Models_Gateway_UserJoinedGatewayPubSubMessage.__typeName = 'Pather.Common.Models.Gateway.UserJoinedGatewayPubSubMessage';
	$Pather_Common_Models_Gateway_UserJoinedGatewayPubSubMessage.createInstance = function() {
		return $Pather_Common_Models_Gateway_UserJoinedGatewayPubSubMessage.$ctor();
	};
	$Pather_Common_Models_Gateway_UserJoinedGatewayPubSubMessage.$ctor = function() {
		var $this = $Pather_Common_Models_Gateway_GatewayPubSubMessage.$ctor();
		$this.gameServerId = null;
		$this.userId = null;
		return $this;
	};
	global.Pather.Common.Models.Gateway.UserJoinedGatewayPubSubMessage = $Pather_Common_Models_Gateway_UserJoinedGatewayPubSubMessage;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.TestFramework.Assert
	var $Pather_Common_TestFramework_Assert = function() {
	};
	$Pather_Common_TestFramework_Assert.__typeName = 'Pather.Common.TestFramework.Assert';
	$Pather_Common_TestFramework_Assert.that = function(o) {
		return new $Pather_Common_TestFramework_ThatObject(o, null);
	};
	global.Pather.Common.TestFramework.Assert = $Pather_Common_TestFramework_Assert;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.TestFramework.AssertException
	var $Pather_Common_TestFramework_AssertException = function() {
		ss.Exception.call(this);
	};
	$Pather_Common_TestFramework_AssertException.__typeName = 'Pather.Common.TestFramework.AssertException';
	global.Pather.Common.TestFramework.AssertException = $Pather_Common_TestFramework_AssertException;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.TestFramework.DeferredAssert
	var $Pather_Common_TestFramework_DeferredAssert = function() {
	};
	$Pather_Common_TestFramework_DeferredAssert.__typeName = 'Pather.Common.TestFramework.DeferredAssert';
	$Pather_Common_TestFramework_DeferredAssert.that = function(deferred, o) {
		return new $Pather_Common_TestFramework_ThatObject(o, deferred);
	};
	global.Pather.Common.TestFramework.DeferredAssert = $Pather_Common_TestFramework_DeferredAssert;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.TestFramework.Mocker
	var $Pather_Common_TestFramework_Mocker = function() {
	};
	$Pather_Common_TestFramework_Mocker.__typeName = 'Pather.Common.TestFramework.Mocker';
	global.Pather.Common.TestFramework.Mocker = $Pather_Common_TestFramework_Mocker;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.TestFramework.RightObject
	var $Pather_Common_TestFramework_RightObject = function(that) {
		this.$that = null;
		this.$that = that;
	};
	$Pather_Common_TestFramework_RightObject.__typeName = 'Pather.Common.TestFramework.RightObject';
	global.Pather.Common.TestFramework.RightObject = $Pather_Common_TestFramework_RightObject;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.TestFramework.TestClassAttribute
	var $Pather_Common_TestFramework_TestClassAttribute = function() {
	};
	$Pather_Common_TestFramework_TestClassAttribute.__typeName = 'Pather.Common.TestFramework.TestClassAttribute';
	global.Pather.Common.TestFramework.TestClassAttribute = $Pather_Common_TestFramework_TestClassAttribute;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.TestFramework.TestConstructorAttribute
	var $Pather_Common_TestFramework_TestConstructorAttribute = function() {
	};
	$Pather_Common_TestFramework_TestConstructorAttribute.__typeName = 'Pather.Common.TestFramework.TestConstructorAttribute';
	global.Pather.Common.TestFramework.TestConstructorAttribute = $Pather_Common_TestFramework_TestConstructorAttribute;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.TestFramework.TestFramework
	var $Pather_Common_TestFramework_TestFramework = function() {
	};
	$Pather_Common_TestFramework_TestFramework.__typeName = 'Pather.Common.TestFramework.TestFramework';
	$Pather_Common_TestFramework_TestFramework.runTests$1 = function(type) {
		var deferred = $Pather_Common_Utils_Promises_Q.defer();
		var methods = ss.getMembers(type, 8, 28);
		var testObject = ss.createAssemblyInstance(ss.getTypeAssembly(type), ss.getTypeFullName(type));
		console.log('Running tests for:', ss.getTypeFullName(type));
		var testMethods = [];
		for (var $t1 = 0; $t1 < methods.length; $t1++) {
			var methodInfo = methods[$t1];
			if ((methodInfo.attr || []).filter(function(a) {
				return ss.isInstanceOfType(a, $Pather_Common_TestFramework_TestMethodAttribute);
			}).length > 0) {
				testMethods.push(methodInfo);
			}
		}
		$Pather_Common_TestFramework_TestFramework.$processTestMethods(testObject, testMethods).then(function(testProgressCounter) {
			if (testProgressCounter.$failedCount > 0) {
				console.log('Passed', testProgressCounter.$passedCount, 'Failed', testProgressCounter.$failedCount);
			}
			else {
				console.log('Passed', testProgressCounter.$passedCount);
			}
			deferred.resolve();
		});
		return deferred.promise;
	};
	$Pather_Common_TestFramework_TestFramework.$processTestMethods = function(testObject, testMethods) {
		var progress = new $Pather_$Common_TestFramework_TestFramework$TestProgressCounter();
		var deferred = $Pather_Common_Utils_Promises_Q.defer$2($Pather_$Common_TestFramework_TestFramework$TestProgressCounter, Object).call(null);
		var promises = [];
		for (var $t1 = 0; $t1 < testMethods.length; $t1++) {
			var testMethod = testMethods[$t1];
			promises.push($Pather_Common_TestFramework_TestFramework.$processTestMethod(testObject, progress, testMethod));
		}
		$Pather_Common_Utils_Promises_Q.all(Array.prototype.slice.call(promises)).then(function() {
			deferred.resolve(progress);
		});
		return deferred.promise;
	};
	$Pather_Common_TestFramework_TestFramework.$processTestMethod = function(testObject, progress, testMethod) {
		var d = $Pather_Common_Utils_Promises_Q.defer();
		if (testMethod.params.length > 0) {
			var firstParam = testMethod.params[0];
			if (ss.referenceEquals(firstParam, $Pather_Common_Utils_Promises_Deferred)) {
				d.promise.then(function() {
					progress.$passedCount++;
					console.log('Running test:', testMethod.name, 'Passed');
				}).error(function() {
					progress.$failedCount++;
				});
				try {
					ss.midel(testMethod, testObject)(d);
					console.log('Deferring test:', testMethod.name);
				}
				catch ($t1) {
					var ex = ss.Exception.wrap($t1);
					console.log('Running test:', testMethod.name, 'Failed:', ex.get_message());
					d.reject();
				}
			}
			else {
				throw new ss.Exception('First test param either needs to be empty or Deferred.');
			}
		}
		else {
			try {
				ss.midel(testMethod, testObject)();
				console.log('Running test:', testMethod.name, 'Passed');
			}
			catch ($t2) {
				var ex1 = ss.Exception.wrap($t2);
				console.log('Running test:', testMethod.name, 'Failed:', ex1.get_message());
				progress.$failedCount++;
			}
			progress.$passedCount++;
			d.resolve();
		}
		return d.promise;
	};
	$Pather_Common_TestFramework_TestFramework.runTests = function() {
		var allAssemblies = ss.getAssemblies();
		var testClassesPromises = [];
		for (var $t1 = 0; $t1 < allAssemblies.length; $t1++) {
			var assembly = allAssemblies[$t1];
			var $t2 = ss.getAssemblyTypes(assembly);
			for (var $t3 = 0; $t3 < $t2.length; $t3++) {
				var type = $t2[$t3];
				if (ss.getAttributes(type, $Pather_Common_TestFramework_TestClassAttribute, true).length > 0) {
					testClassesPromises.push($Pather_Common_TestFramework_TestFramework.runTests$1(type));
				}
			}
		}
		$Pather_Common_Utils_Promises_Q.all(Array.prototype.slice.call(testClassesPromises)).then(function() {
			console.log('Done running tests.');
		});
	};
	global.Pather.Common.TestFramework.TestFramework = $Pather_Common_TestFramework_TestFramework;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.TestFramework.TestMethodAttribute
	var $Pather_Common_TestFramework_TestMethodAttribute = function() {
	};
	$Pather_Common_TestFramework_TestMethodAttribute.__typeName = 'Pather.Common.TestFramework.TestMethodAttribute';
	global.Pather.Common.TestFramework.TestMethodAttribute = $Pather_Common_TestFramework_TestMethodAttribute;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.TestFramework.ThatObject
	var $Pather_Common_TestFramework_ThatObject = function(that, deferred) {
		this.$that = null;
		this.$deferred = null;
		this.$that = that;
		this.$deferred = deferred;
	};
	$Pather_Common_TestFramework_ThatObject.__typeName = 'Pather.Common.TestFramework.ThatObject';
	global.Pather.Common.TestFramework.ThatObject = $Pather_Common_TestFramework_ThatObject;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Utils.AnimationPoint
	var $Pather_Common_Utils_AnimationPoint = function(fromX, fromY, x, y) {
		this.fromX = 0;
		this.fromY = 0;
		$Pather_Common_Utils_Point.call(this, x, y);
		this.fromX = fromX;
		this.fromY = fromY;
	};
	$Pather_Common_Utils_AnimationPoint.__typeName = 'Pather.Common.Utils.AnimationPoint';
	global.Pather.Common.Utils.AnimationPoint = $Pather_Common_Utils_AnimationPoint;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Utils.DataObject
	var $Pather_Common_Utils_DataObject$1 = function(T) {
		var $type = function() {
		};
		$type.$ctor = function(data) {
			var $this = {};
			$this.data = ss.getDefaultValue(T);
			$this.data = data;
			return $this;
		};
		ss.registerGenericClassInstance($type, $Pather_Common_Utils_DataObject$1, [T], {}, function() {
			return null;
		}, function() {
			return [];
		});
		return $type;
	};
	$Pather_Common_Utils_DataObject$1.__typeName = 'Pather.Common.Utils.DataObject$1';
	ss.initGenericClass($Pather_Common_Utils_DataObject$1, $asm, 1);
	global.Pather.Common.Utils.DataObject$1 = $Pather_Common_Utils_DataObject$1;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Utils.Point
	var $Pather_Common_Utils_Point = function(x, y) {
		this.x = 0;
		this.y = 0;
		this.x = x;
		this.y = y;
	};
	$Pather_Common_Utils_Point.__typeName = 'Pather.Common.Utils.Point';
	global.Pather.Common.Utils.Point = $Pather_Common_Utils_Point;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Utils.Promises.Deferred
	var $Pather_Common_Utils_Promises_Deferred = function() {
		this.promise = null;
		this.promise = new $Pather_Common_Utils_Promises_Promise();
	};
	$Pather_Common_Utils_Promises_Deferred.__typeName = 'Pather.Common.Utils.Promises.Deferred';
	global.Pather.Common.Utils.Promises.Deferred = $Pather_Common_Utils_Promises_Deferred;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Utils.Promises.Deferred
	var $Pather_Common_Utils_Promises_Deferred$2 = function(TResolve, TError) {
		var $type = function() {
			this.promise = null;
			this.promise = new (ss.makeGenericType($Pather_Common_Utils_Promises_Promise$2, [TResolve, TError]))();
		};
		ss.registerGenericClassInstance($type, $Pather_Common_Utils_Promises_Deferred$2, [TResolve, TError], {
			resolve: function(item) {
				this.promise.$resolve(item);
			},
			reject: function(item) {
				this.promise.$reject(item);
			},
			resolveInATick: function(item) {
				//todo basically a testmethod
				setTimeout(ss.mkdel(this, function() {
					this.promise.$resolve(item);
				}), 0);
			},
			passThrough: function(passThrough) {
				return passThrough.then(ss.mkdel(this.promise, this.promise.$resolve)).$error(ss.mkdel(this.promise, this.promise.$reject));
			}
		}, function() {
			return null;
		}, function() {
			return [];
		});
		return $type;
	};
	$Pather_Common_Utils_Promises_Deferred$2.__typeName = 'Pather.Common.Utils.Promises.Deferred$2';
	ss.initGenericClass($Pather_Common_Utils_Promises_Deferred$2, $asm, 2);
	global.Pather.Common.Utils.Promises.Deferred$2 = $Pather_Common_Utils_Promises_Deferred$2;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Utils.Promises.Promise
	var $Pather_Common_Utils_Promises_Promise = function() {
		this.$resolves = [];
		this.$rejects = [];
		this.$finallys = [];
		this.$isResolved = false;
		this.$isRejected = false;
		//            promsiedResolves = new List<Func<TResolve, Promise<TResolve, TError>>>();
		this.$resolves = [];
		this.$rejects = [];
		this.$finallys = [];
	};
	$Pather_Common_Utils_Promises_Promise.__typeName = 'Pather.Common.Utils.Promises.Promise';
	global.Pather.Common.Utils.Promises.Promise = $Pather_Common_Utils_Promises_Promise;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Utils.Promises.Promise
	var $Pather_Common_Utils_Promises_Promise$2 = function(TResolve, TError) {
		var $type = function() {
			this.$resolves = [];
			this.$rejects = [];
			this.$finallys = [];
			this.$isResolved = false;
			this.$isRejected = false;
			this.$resolvedValue = ss.getDefaultValue(TResolve);
			this.$rejectedValue = ss.getDefaultValue(TError);
			//            promsiedResolves = new List<Func<TResolve, Promise<TResolve, TError>>>();
			this.$resolves = [];
			this.$rejects = [];
			this.$finallys = [];
		};
		ss.registerGenericClassInstance($type, $Pather_Common_Utils_Promises_Promise$2, [TResolve, TError], {
			$resolve: function(item) {
				this.$isResolved = true;
				this.$resolvedValue = item;
				for (var $t1 = 0; $t1 < this.$resolves.length; $t1++) {
					var resolve = this.$resolves[$t1];
					resolve(item);
				}
				//      foreach (var resolve in promsiedResolves)
				//      {
				//      resolve(item).
				//      }
			},
			$reject: function(item) {
				this.$isRejected = true;
				this.$rejectedValue = item;
				for (var $t1 = 0; $t1 < this.$rejects.length; $t1++) {
					var reject = this.$rejects[$t1];
					reject(item);
				}
				for (var $t2 = 0; $t2 < this.$finallys.length; $t2++) {
					var finally1 = this.$finallys[$t2];
					finally1();
				}
			},
			$error: function(error) {
				if (this.$isRejected) {
					error(this.$rejectedValue);
				}
				else {
					this.$rejects.push(error);
				}
				return this;
			},
			$finally: function(finally1) {
				if (this.$isRejected || this.$isResolved) {
					finally1();
				}
				else {
					this.$finallys.push(finally1);
				}
				return this;
			},
			then: function(resolve) {
				if (this.$isRejected) {
					resolve(this.$resolvedValue);
				}
				else {
					this.$resolves.push(resolve);
				}
				return this;
			}
		}, function() {
			return null;
		}, function() {
			return [];
		});
		return $type;
	};
	$Pather_Common_Utils_Promises_Promise$2.__typeName = 'Pather.Common.Utils.Promises.Promise$2';
	ss.initGenericClass($Pather_Common_Utils_Promises_Promise$2, $asm, 2);
	global.Pather.Common.Utils.Promises.Promise$2 = $Pather_Common_Utils_Promises_Promise$2;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Utils.Promises.Q
	var $Pather_Common_Utils_Promises_Q = function() {
	};
	$Pather_Common_Utils_Promises_Q.__typeName = 'Pather.Common.Utils.Promises.Q';
	$Pather_Common_Utils_Promises_Q.defer$2 = function(TResolve, TError) {
		return function() {
			return new (ss.makeGenericType($Pather_Common_Utils_Promises_Deferred$2, [TResolve, TError]))();
		};
	};
	$Pather_Common_Utils_Promises_Q.defer$1 = function(TResolve) {
		return function() {
			return new (ss.makeGenericType($Pather_Common_Utils_Promises_Deferred$2, [TResolve, Object]))();
		};
	};
	$Pather_Common_Utils_Promises_Q.defer = function() {
		return new $Pather_Common_Utils_Promises_Deferred();
	};
	$Pather_Common_Utils_Promises_Q.all$1 = function(TResolve, TError) {
		return function(promises) {
			var deferred = $Pather_Common_Utils_Promises_Q.defer$2(Array, TError).call(null);
			var count = 0;
			var resolves = [];
			var resolveCallback = function(resolve) {
				count++;
				resolves.push(resolve);
				if (count === promises.length) {
					deferred.resolve(Array.prototype.slice.call(resolves));
				}
			};
			var rejectCallback = ss.mkdel(deferred, deferred.reject);
			for (var $t1 = 0; $t1 < promises.length; $t1++) {
				var promise = promises[$t1];
				promise.then(resolveCallback).$error(rejectCallback);
			}
			return deferred.promise;
		};
	};
	$Pather_Common_Utils_Promises_Q.all = function(promises) {
		var deferred = $Pather_Common_Utils_Promises_Q.defer();
		var count = 0;
		var resolveCallback = function() {
			count++;
			if (count === promises.length) {
				deferred.resolve();
			}
		};
		var rejectCallback = ss.mkdel(deferred, deferred.reject);
		for (var $t1 = 0; $t1 < promises.length; $t1++) {
			var promise = promises[$t1];
			promise.then(resolveCallback).error(rejectCallback);
		}
		return deferred.promise;
	};
	global.Pather.Common.Utils.Promises.Q = $Pather_Common_Utils_Promises_Q;
	ss.initClass($Pather_$Common_TestFramework_TestFramework$TestProgressCounter, $asm, {});
	ss.initEnum($Pather_Common_ActionType, $asm, { move: 0, noop: 1 });
	ss.initClass($Pather_Common_Common, $asm, {});
	ss.initClass($Pather_Common_Constants, $asm, {});
	ss.initClass($Pather_Common_Entity, $asm, {
		init: function(x, y) {
			this.x = x;
			this.y = y;
			this.squareX = ss.Int32.trunc(this.x / $Pather_Common_Constants.squareSize);
			this.squareY = ss.Int32.trunc(this.y / $Pather_Common_Constants.squareSize);
		},
		rePathFind: function(squareX, squareY) {
			var graph = this.$game.aStarGraph;
			var start = graph.grid[this.squareX][this.squareY];
			var end = graph.grid[squareX][squareY];
			this.path = ss.arrayClone(astar.search(graph, start, end));
		},
		tick: function() {
			var result = this.path[0];
			this.animations = [];
			var projectedX;
			var projectedY;
			var projectedSquareX;
			var projectedSquareY;
			projectedSquareX = (ss.isNullOrUndefined(result) ? this.squareX : result.x);
			projectedSquareY = (ss.isNullOrUndefined(result) ? this.squareY : result.y);
			for (var i = 0; i < $Pather_Common_Constants.animationSteps; i++) {
				this.squareX = ss.Int32.trunc(this.x / $Pather_Common_Constants.squareSize);
				this.squareY = ss.Int32.trunc(this.y / $Pather_Common_Constants.squareSize);
				var fromX = this.x;
				var fromY = this.y;
				if (ss.isValue(result) && (this.squareX === result.x && this.squareY === result.y)) {
					ss.removeAt(this.path, 0);
					result = this.path[0];
					projectedSquareX = (ss.isNullOrUndefined(result) ? this.squareX : result.x);
					projectedSquareY = (ss.isNullOrUndefined(result) ? this.squareY : result.y);
				}
				projectedX = projectedSquareX * $Pather_Common_Constants.squareSize + ss.Int32.div($Pather_Common_Constants.squareSize, 2);
				projectedY = projectedSquareY * $Pather_Common_Constants.squareSize + ss.Int32.div($Pather_Common_Constants.squareSize, 2);
				if (projectedX === ss.Int32.trunc(this.x) && projectedY === ss.Int32.trunc(this.y)) {
					return;
				}
				this.x = $Pather_Common_Lerper.moveTowards(this.x, projectedX, this.speed / $Pather_Common_Constants.animationSteps);
				this.y = $Pather_Common_Lerper.moveTowards(this.y, projectedY, this.speed / $Pather_Common_Constants.animationSteps);
				this.animations.push(new $Pather_Common_Utils_AnimationPoint(fromX, fromY, this.x, this.y));
			}
		}
	});
	ss.initClass($Pather_Common_Game, $asm, {
		createPlayer: function(playerId) {
			return new $Pather_Common_Entity(this, playerId);
		},
		constructGrid: function() {
			this.grid = new Array($Pather_Common_Constants.numberOfSquares);
			for (var x = 0; x < $Pather_Common_Constants.numberOfSquares; x++) {
				this.grid[x] = new Array($Pather_Common_Constants.numberOfSquares);
				for (var y = 0; y < $Pather_Common_Constants.numberOfSquares; y++) {
					this.grid[x][y] = ((Math.random() * 100 < 15) ? 0 : 1);
				}
			}
			this.aStarGraph = new Graph(this.grid);
		},
		init: function() {
			this.curGameTime = (new Date()).getTime();
			this.curLockstepTime = (new Date()).getTime();
			this.curTickTime = (new Date()).getTime();
			setTimeout(ss.mkdel(this, function() {
				this.tick();
			}), 1);
		},
		get_percentCompletedWithLockStep: function() {
			var vc = (new Date()).getTime();
			var l = vc - this.curLockstepTime;
			return l / $Pather_Common_Constants.lockstepTicks;
		},
		tick: function() {
			setTimeout(ss.mkdel(this, function() {
				this.tick();
			}), 1);
			var tickResult = 0;
			if (!this.ready) {
				return tickResult;
			}
			var vc = (new Date()).getTime();
			var l = vc - this.curLockstepTime;
			while (l > $Pather_Common_Constants.lockstepTicks) {
				l -= $Pather_Common_Constants.lockstepTicks;
				this.curLockstepTime += $Pather_Common_Constants.lockstepTicks;
				this.lockstepTickNumber++;
				console.log('Lockstep', this.lockstepTickNumber, (new Date()).getTime());
				this.stepManager.processAction(this.lockstepTickNumber);
				tickResult = 2;
			}
			var l2 = vc - this.curTickTime;
			var nextTickTime = ss.Int32.div(l2, $Pather_Common_Constants.gameTicks);
			while (nextTickTime > this.trackTickNumber) {
				this.trackTickNumber++;
				this.tickNumber++;
				for (var $t1 = 0; $t1 < this.players.length; $t1++) {
					var person = this.players[$t1];
					person.tick();
				}
				tickResult = ((tickResult === 2) ? 3 : 1);
				//todo probably should only happen once? and not in the loop
				var v = (new Date()).getTime();
				this.nextGameTime += v - this.curGameTime;
				this.curGameTime = v;
			}
			return tickResult;
		}
	});
	ss.initInterface($Pather_Common_IAction, $asm, { get_data: null, get_lockstepTickNumber: null, get_type: null, process: null });
	ss.initClass($Pather_Common_Lerper, $asm, {});
	ss.initClass($Pather_Common_Logger, $asm, {});
	ss.initEnum($Pather_Common_LogLevel, $asm, { error: 'error', debugInformation: 'debugInformation', information: 'information', transportInfo: 'transportInfo', dataInfo: 'dataInfo', keepAlive: 'keepAlive' }, true);
	ss.initClass($Pather_Common_MoveAction, $asm, {
		get_data: function() {
			return this.moveModel;
		},
		get_lockstepTickNumber: function() {
			return this.$1$LockstepTickNumberField;
		},
		set_lockstepTickNumber: function(value) {
			this.$1$LockstepTickNumberField = value;
		},
		process: function(game) {
			for (var $t1 = 0; $t1 < game.players.length; $t1++) {
				var person = game.players[$t1];
				if (ss.referenceEquals(person.playerId, this.moveModel.playerId)) {
					person.rePathFind(this.moveModel.x, this.moveModel.y);
				}
			}
		},
		get_type: function() {
			return 0;
		}
	}, null, [$Pather_Common_IAction]);
	ss.initClass($Pather_Common_NoopAction, $asm, {
		get_data: function() {
			return null;
		},
		get_lockstepTickNumber: function() {
			return this.$1$LockstepTickNumberField;
		},
		set_lockstepTickNumber: function(value) {
			this.$1$LockstepTickNumberField = value;
		},
		process: function(game) {
		},
		get_type: function() {
			return 1;
		}
	}, null, [$Pather_Common_IAction]);
	ss.initClass($Pather_Common_SerializableAction, $asm, {});
	ss.initClass($Pather_Common_SocketChannels, $asm, {});
	ss.initEnum($Pather_Common_SocketChannels$Client, $asm, { postAction: 'postAction', joinPlayer: 'joinPlayer', ping: 'ping' }, true);
	ss.initEnum($Pather_Common_SocketChannels$Server, $asm, { connect: 'connect', postAction: 'postAction', playerSync: 'playerSync', pong: 'pong', syncLockstep: 'syncLockstep' }, true);
	ss.initClass($Pather_Common_StepManager, $asm, {
		receiveAction: function(serAction) {
			var action;
			switch (serAction.type) {
				case 0: {
					action = new $Pather_Common_MoveAction(serAction.data, serAction.lockstepTickNumber);
					break;
				}
				case 1: {
					action = new $Pather_Common_NoopAction(serAction.lockstepTickNumber);
					break;
				}
				default: {
					throw new ss.ArgumentOutOfRangeException();
				}
			}
			if (!this.stepActionsTicks.containsKey(serAction.lockstepTickNumber)) {
				if (serAction.lockstepTickNumber <= this.game.lockstepTickNumber) {
					action.process(this.game);
					console.log('Misprocess of action count', ++this.$misprocess, this.game.lockstepTickNumber - serAction.lockstepTickNumber);
					return;
				}
				this.stepActionsTicks.set_item(serAction.lockstepTickNumber, []);
			}
			this.stepActionsTicks.get_item(serAction.lockstepTickNumber).push(action);
		},
		processAction: function(lockstepTickNumber) {
			if (!this.stepActionsTicks.containsKey(lockstepTickNumber)) {
				return;
			}
			var stepActions = this.stepActionsTicks.get_item(lockstepTickNumber);
			//            Global.Console.Log("Actions for", stepActions.Count, "Players");
			for (var $t1 = 0; $t1 < stepActions.length; $t1++) {
				var stepAction = stepActions[$t1];
				stepAction.process(this.game);
			}
			this.lastTickProcessed = lockstepTickNumber;
			this.stepActionsTicks.remove(lockstepTickNumber);
		},
		get_networkPlayers: null
	});
	ss.initEnum($Pather_Common_TickResult, $asm, { none: 0, game: 1, lockstep: 2, both: 3 });
	ss.initClass($Pather_Common_Models_Game_ConnectedModel, $asm, {});
	ss.initClass($Pather_Common_Models_Game_MoveModel, $asm, {});
	ss.initClass($Pather_Common_Models_Game_PingPongModel, $asm, {});
	ss.initClass($Pather_Common_Models_Game_PlayerJoinModel, $asm, {});
	ss.initClass($Pather_Common_Models_Game_PlayerModel, $asm, {});
	ss.initClass($Pather_Common_Models_Game_PlayerSyncModel, $asm, {});
	ss.initClass($Pather_Common_Models_Game_SyncLockstepModel, $asm, {});
	ss.initEnum($Pather_Common_Models_GameWorld_GameWorldMessageType, $asm, { userJoined: 0 });
	ss.initClass($Pather_Common_Models_GameWorld_GameWorldPubSubMessage, $asm, {});
	ss.initClass($Pather_Common_Models_GameWorld_UserJoinedGameWorldPubSubMessage, $asm, {}, $Pather_Common_Models_GameWorld_GameWorldPubSubMessage);
	ss.initClass($Pather_Common_Models_Gateway_GatewayJoinModel, $asm, {
		get_userName: function() {
			return this.$1$UserNameField;
		},
		set_userName: function(value) {
			this.$1$UserNameField = value;
		}
	});
	ss.initEnum($Pather_Common_Models_Gateway_GatewayMessageType, $asm, { userJoined: 0 });
	ss.initClass($Pather_Common_Models_Gateway_GatewayPubSubMessage, $asm, {});
	ss.initClass($Pather_Common_Models_Gateway_GatewaySocketMessageModel, $asm, {
		get_channel: function() {
			return this.$1$ChannelField;
		},
		set_channel: function(value) {
			this.$1$ChannelField = value;
		},
		get_payload: function() {
			return this.$1$PayloadField;
		},
		set_payload: function(value) {
			this.$1$PayloadField = value;
		}
	});
	ss.initClass($Pather_Common_Models_Gateway_UserJoinedGatewayPubSubMessage, $asm, {}, $Pather_Common_Models_Gateway_GatewayPubSubMessage);
	ss.initClass($Pather_Common_TestFramework_Assert, $asm, {});
	ss.initClass($Pather_Common_TestFramework_AssertException, $asm, {}, ss.Exception);
	ss.initClass($Pather_Common_TestFramework_DeferredAssert, $asm, {});
	ss.initClass($Pather_Common_TestFramework_Mocker, $asm, {});
	ss.initClass($Pather_Common_TestFramework_RightObject, $asm, {
		true$1: function() {
			if (!ss.unbox(ss.cast(this.$that.$that, Boolean))) {
				this.$fail();
			}
		},
		equal: function(right) {
			if (!ss.referenceEquals(this.$that.$that, right)) {
				this.$fail();
			}
		},
		$fail: function() {
			if (ss.isValue(this.$that.$deferred)) {
				this.$that.$deferred.reject();
			}
			else {
				throw new $Pather_Common_TestFramework_AssertException();
			}
		}
	});
	ss.initClass($Pather_Common_TestFramework_TestClassAttribute, $asm, {});
	ss.initClass($Pather_Common_TestFramework_TestConstructorAttribute, $asm, {});
	ss.initClass($Pather_Common_TestFramework_TestFramework, $asm, {});
	ss.initClass($Pather_Common_TestFramework_TestMethodAttribute, $asm, {});
	ss.initClass($Pather_Common_TestFramework_ThatObject, $asm, {
		get_is: function() {
			return new $Pather_Common_TestFramework_RightObject(this);
		},
		get_does: function() {
			return new $Pather_Common_TestFramework_RightObject(this);
		}
	});
	ss.initClass($Pather_Common_Utils_Point, $asm, {});
	ss.initClass($Pather_Common_Utils_AnimationPoint, $asm, {}, $Pather_Common_Utils_Point);
	ss.initClass($Pather_Common_Utils_Promises_Deferred, $asm, {
		resolve: function() {
			this.promise.resolve();
		},
		reject: function() {
			this.promise.reject();
		},
		resolveInATick: function() {
			//todo basically a testmethod
			setTimeout(ss.mkdel(this, function() {
				this.promise.resolve();
			}), 0);
		},
		passThrough: function(passThrough) {
			return passThrough.then(ss.mkdel(this.promise, this.promise.resolve)).error(ss.mkdel(this.promise, this.promise.reject));
		}
	});
	ss.initClass($Pather_Common_Utils_Promises_Promise, $asm, {
		resolve: function() {
			this.$isResolved = true;
			for (var $t1 = 0; $t1 < this.$resolves.length; $t1++) {
				var resolve = this.$resolves[$t1];
				resolve();
			}
			//      foreach (var resolve in promsiedResolves)
			//      {
			//      resolve(item).
			//      }
		},
		reject: function() {
			this.$isRejected = true;
			for (var $t1 = 0; $t1 < this.$rejects.length; $t1++) {
				var reject = this.$rejects[$t1];
				reject();
			}
			for (var $t2 = 0; $t2 < this.$finallys.length; $t2++) {
				var finally1 = this.$finallys[$t2];
				finally1();
			}
		},
		error: function(error) {
			if (this.$isRejected || this.$isResolved) {
				error();
			}
			else {
				this.$rejects.push(error);
			}
			return this;
		},
		finally$1: function(finally1) {
			if (this.$isResolved) {
				finally1();
			}
			else {
				this.$finallys.push(finally1);
			}
			return this;
		},
		then: function(resolve) {
			if (this.$isResolved) {
				resolve();
			}
			else {
				this.$resolves.push(resolve);
			}
			return this;
		}
	});
	ss.initClass($Pather_Common_Utils_Promises_Q, $asm, {});
	(function() {
		$Pather_Common_Constants.animationSteps = 0;
		$Pather_Common_Constants.gameFps = 0;
		$Pather_Common_Constants.drawTicks = 0;
		$Pather_Common_Constants.drawFps = 0;
		$Pather_Common_Constants.lockstepTicks = 0;
		$Pather_Common_Constants.lockstepFps = 0;
		$Pather_Common_Constants.squareSize = 0;
		$Pather_Common_Constants.numberOfSquares = 0;
		$Pather_Common_Constants.gameTicks = 0;
		$Pather_Common_Constants.neighborDistance = 0;
		$Pather_Common_Constants.squareSize = 8;
		$Pather_Common_Constants.numberOfSquares = 150;
		$Pather_Common_Constants.drawFps = 60;
		$Pather_Common_Constants.drawTicks = ss.Int32.div(1000, $Pather_Common_Constants.drawFps);
		$Pather_Common_Constants.gameFps = 10;
		$Pather_Common_Constants.gameTicks = ss.Int32.div(1000, $Pather_Common_Constants.gameFps);
		$Pather_Common_Constants.lockstepFps = 2;
		$Pather_Common_Constants.lockstepTicks = ss.Int32.div(1000, $Pather_Common_Constants.lockstepFps);
		$Pather_Common_Constants.animationSteps = 5;
		$Pather_Common_Constants.neighborDistance = 20;
	})();
	(function() {
		eval('\r\nglobal.$overwiteMethodCallForMocker$=function ($call$,$overwrite$) {\r\n    var $targets$=$call$._targets[0];\r\n    for(var m in $targets$) {\r\n        if($targets$[m]==$call$._targets[1]) {\r\n            $targets$[m]=$overwrite$;\r\n        }\r\n    }\r\n}');
		eval("\r\nglobal.$instantiateInterface$=function ($type$) {\r\n    var obj={};\r\n    for(var m in $type$.prototype) {\r\n        obj[m]=function(){throw new Error('Mock interface method '+m+' not overridden');};\r\n    }\r\n    return obj;\r\n}");
	})();
})();
