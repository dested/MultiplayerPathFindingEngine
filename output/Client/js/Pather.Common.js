(function() {
	'use strict';
	var $asm = {};
	global.Pather = global.Pather || {};
	global.Pather.Common = global.Pather.Common || {};
	global.Pather.Common.Models = global.Pather.Common.Models || {};
	global.Pather.Common.Models.ClusterManager = global.Pather.Common.Models.ClusterManager || {};
	global.Pather.Common.Models.ClusterManager.Base = global.Pather.Common.Models.ClusterManager.Base || {};
	global.Pather.Common.Models.Common = global.Pather.Common.Models.Common || {};
	global.Pather.Common.Models.Game = global.Pather.Common.Models.Game || {};
	global.Pather.Common.Models.Game.Old = global.Pather.Common.Models.Game.Old || {};
	global.Pather.Common.Models.GameSegment = global.Pather.Common.Models.GameSegment || {};
	global.Pather.Common.Models.GameSegment.Base = global.Pather.Common.Models.GameSegment.Base || {};
	global.Pather.Common.Models.GameWorld = global.Pather.Common.Models.GameWorld || {};
	global.Pather.Common.Models.GameWorld.Base = global.Pather.Common.Models.GameWorld.Base || {};
	global.Pather.Common.Models.GameWorld.GameSegment = global.Pather.Common.Models.GameWorld.GameSegment || {};
	global.Pather.Common.Models.GameWorld.Gateway = global.Pather.Common.Models.GameWorld.Gateway || {};
	global.Pather.Common.Models.GameWorld.ServerManager = global.Pather.Common.Models.GameWorld.ServerManager || {};
	global.Pather.Common.Models.GameWorld.Tick = global.Pather.Common.Models.GameWorld.Tick || {};
	global.Pather.Common.Models.Gateway = global.Pather.Common.Models.Gateway || {};
	global.Pather.Common.Models.Gateway.PubSub = global.Pather.Common.Models.Gateway.PubSub || {};
	global.Pather.Common.Models.Gateway.PubSub.Base = global.Pather.Common.Models.Gateway.PubSub.Base || {};
	global.Pather.Common.Models.Gateway.Socket = global.Pather.Common.Models.Gateway.Socket || {};
	global.Pather.Common.Models.Gateway.Socket.Base = global.Pather.Common.Models.Gateway.Socket.Base || {};
	global.Pather.Common.Models.Head = global.Pather.Common.Models.Head || {};
	global.Pather.Common.Models.Head.Base = global.Pather.Common.Models.Head.Base || {};
	global.Pather.Common.Models.ServerManager = global.Pather.Common.Models.ServerManager || {};
	global.Pather.Common.Models.ServerManager.Base = global.Pather.Common.Models.ServerManager.Base || {};
	global.Pather.Common.Models.Tick = global.Pather.Common.Models.Tick || {};
	global.Pather.Common.Models.Tick.Base = global.Pather.Common.Models.Tick.Base || {};
	global.Pather.Common.old = global.Pather.Common.old || {};
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
	// Pather.Common.Constants
	var $Pather_Common_Constants = function() {
	};
	$Pather_Common_Constants.__typeName = 'Pather.Common.Constants';
	$Pather_Common_Constants.get_testServer = function() {
		return !!window.window.TestServer;
	};
	global.Pather.Common.Constants = $Pather_Common_Constants;
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
	// Pather.Common.Models.ClusterManager.CreateGameSegment_ServerManager_ClusterManager_PubSub_ReqRes_Message
	var $Pather_Common_Models_ClusterManager_CreateGameSegment_ServerManager_ClusterManager_PubSub_ReqRes_Message = function() {
	};
	$Pather_Common_Models_ClusterManager_CreateGameSegment_ServerManager_ClusterManager_PubSub_ReqRes_Message.__typeName = 'Pather.Common.Models.ClusterManager.CreateGameSegment_ServerManager_ClusterManager_PubSub_ReqRes_Message';
	$Pather_Common_Models_ClusterManager_CreateGameSegment_ServerManager_ClusterManager_PubSub_ReqRes_Message.createInstance = function() {
		return $Pather_Common_Models_ClusterManager_CreateGameSegment_ServerManager_ClusterManager_PubSub_ReqRes_Message.$ctor();
	};
	$Pather_Common_Models_ClusterManager_CreateGameSegment_ServerManager_ClusterManager_PubSub_ReqRes_Message.$ctor = function() {
		var $this = $Pather_Common_Models_ClusterManager_Base_ClusterManager_PubSub_ReqRes_Message.$ctor();
		$this.gameSegmentId = null;
		$this.type = 'createGameSegment';
		return $this;
	};
	global.Pather.Common.Models.ClusterManager.CreateGameSegment_ServerManager_ClusterManager_PubSub_ReqRes_Message = $Pather_Common_Models_ClusterManager_CreateGameSegment_ServerManager_ClusterManager_PubSub_ReqRes_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.ClusterManager.CreateGateway_ServerManager_ClusterManager_PubSub_ReqRes_Message
	var $Pather_Common_Models_ClusterManager_CreateGateway_ServerManager_ClusterManager_PubSub_ReqRes_Message = function() {
	};
	$Pather_Common_Models_ClusterManager_CreateGateway_ServerManager_ClusterManager_PubSub_ReqRes_Message.__typeName = 'Pather.Common.Models.ClusterManager.CreateGateway_ServerManager_ClusterManager_PubSub_ReqRes_Message';
	$Pather_Common_Models_ClusterManager_CreateGateway_ServerManager_ClusterManager_PubSub_ReqRes_Message.createInstance = function() {
		return $Pather_Common_Models_ClusterManager_CreateGateway_ServerManager_ClusterManager_PubSub_ReqRes_Message.$ctor();
	};
	$Pather_Common_Models_ClusterManager_CreateGateway_ServerManager_ClusterManager_PubSub_ReqRes_Message.$ctor = function() {
		var $this = $Pather_Common_Models_ClusterManager_Base_ClusterManager_PubSub_ReqRes_Message.$ctor();
		$this.gatewayId = null;
		$this.port = 0;
		$this.type = 'createGateway';
		return $this;
	};
	global.Pather.Common.Models.ClusterManager.CreateGateway_ServerManager_ClusterManager_PubSub_ReqRes_Message = $Pather_Common_Models_ClusterManager_CreateGateway_ServerManager_ClusterManager_PubSub_ReqRes_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.ClusterManager.Base.ClusterManager_PubSub_Message
	var $Pather_Common_Models_ClusterManager_Base_ClusterManager_PubSub_Message = function() {
	};
	$Pather_Common_Models_ClusterManager_Base_ClusterManager_PubSub_Message.__typeName = 'Pather.Common.Models.ClusterManager.Base.ClusterManager_PubSub_Message';
	$Pather_Common_Models_ClusterManager_Base_ClusterManager_PubSub_Message.$ctor = function() {
		var $this = {};
		$this.type = null;
		return $this;
	};
	global.Pather.Common.Models.ClusterManager.Base.ClusterManager_PubSub_Message = $Pather_Common_Models_ClusterManager_Base_ClusterManager_PubSub_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.ClusterManager.Base.ClusterManager_PubSub_MessageType
	var $Pather_Common_Models_ClusterManager_Base_ClusterManager_PubSub_MessageType = function() {
	};
	$Pather_Common_Models_ClusterManager_Base_ClusterManager_PubSub_MessageType.__typeName = 'Pather.Common.Models.ClusterManager.Base.ClusterManager_PubSub_MessageType';
	global.Pather.Common.Models.ClusterManager.Base.ClusterManager_PubSub_MessageType = $Pather_Common_Models_ClusterManager_Base_ClusterManager_PubSub_MessageType;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.ClusterManager.Base.ClusterManager_PubSub_ReqRes_Message
	var $Pather_Common_Models_ClusterManager_Base_ClusterManager_PubSub_ReqRes_Message = function() {
	};
	$Pather_Common_Models_ClusterManager_Base_ClusterManager_PubSub_ReqRes_Message.__typeName = 'Pather.Common.Models.ClusterManager.Base.ClusterManager_PubSub_ReqRes_Message';
	$Pather_Common_Models_ClusterManager_Base_ClusterManager_PubSub_ReqRes_Message.createInstance = function() {
		return $Pather_Common_Models_ClusterManager_Base_ClusterManager_PubSub_ReqRes_Message.$ctor();
	};
	$Pather_Common_Models_ClusterManager_Base_ClusterManager_PubSub_ReqRes_Message.$ctor = function() {
		var $this = $Pather_Common_Models_ClusterManager_Base_ClusterManager_PubSub_Message.$ctor();
		$this.messageId = null;
		$this.response = false;
		$this.messageId = $Pather_Common_Utils_Utilities.uniqueId();
		return $this;
	};
	global.Pather.Common.Models.ClusterManager.Base.ClusterManager_PubSub_ReqRes_Message = $Pather_Common_Models_ClusterManager_Base_ClusterManager_PubSub_ReqRes_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Common.IPubSub_Message
	var $Pather_Common_Models_Common_IPubSub_Message = function() {
	};
	$Pather_Common_Models_Common_IPubSub_Message.__typeName = 'Pather.Common.Models.Common.IPubSub_Message';
	global.Pather.Common.Models.Common.IPubSub_Message = $Pather_Common_Models_Common_IPubSub_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Common.IPubSub_ReqRes_Message
	var $Pather_Common_Models_Common_IPubSub_ReqRes_Message = function() {
	};
	$Pather_Common_Models_Common_IPubSub_ReqRes_Message.__typeName = 'Pather.Common.Models.Common.IPubSub_ReqRes_Message';
	global.Pather.Common.Models.Common.IPubSub_ReqRes_Message = $Pather_Common_Models_Common_IPubSub_ReqRes_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Common.PubSub_Message_Collection
	var $Pather_Common_Models_Common_PubSub_Message_Collection = function() {
	};
	$Pather_Common_Models_Common_PubSub_Message_Collection.__typeName = 'Pather.Common.Models.Common.PubSub_Message_Collection';
	$Pather_Common_Models_Common_PubSub_Message_Collection.createInstance = function() {
		return $Pather_Common_Models_Common_PubSub_Message_Collection.$ctor();
	};
	$Pather_Common_Models_Common_PubSub_Message_Collection.$ctor = function() {
		var $this = {};
		$this.collection = null;
		return $this;
	};
	global.Pather.Common.Models.Common.PubSub_Message_Collection = $Pather_Common_Models_Common_PubSub_Message_Collection;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Common.UpdatedNeighbor
	var $Pather_Common_Models_Common_UpdatedNeighbor = function() {
	};
	$Pather_Common_Models_Common_UpdatedNeighbor.__typeName = 'Pather.Common.Models.Common.UpdatedNeighbor';
	$Pather_Common_Models_Common_UpdatedNeighbor.createInstance = function() {
		return $Pather_Common_Models_Common_UpdatedNeighbor.$ctor();
	};
	$Pather_Common_Models_Common_UpdatedNeighbor.$ctor = function() {
		var $this = {};
		$this.userId = null;
		$this.x = 0;
		$this.y = 0;
		return $this;
	};
	global.Pather.Common.Models.Common.UpdatedNeighbor = $Pather_Common_Models_Common_UpdatedNeighbor;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Common.UserMovedMessage
	var $Pather_Common_Models_Common_UserMovedMessage = function() {
	};
	$Pather_Common_Models_Common_UserMovedMessage.__typeName = 'Pather.Common.Models.Common.UserMovedMessage';
	$Pather_Common_Models_Common_UserMovedMessage.createInstance = function() {
		return $Pather_Common_Models_Common_UserMovedMessage.$ctor();
	};
	$Pather_Common_Models_Common_UserMovedMessage.$ctor = function() {
		var $this = {};
		$this.x = 0;
		$this.y = 0;
		$this.lockstepTick = 0;
		$this.userThatMovedId = null;
		$this.userId = null;
		return $this;
	};
	global.Pather.Common.Models.Common.UserMovedMessage = $Pather_Common_Models_Common_UserMovedMessage;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Game.Old.ConnectedModel
	var $Pather_Common_Models_Game_Old_ConnectedModel = function() {
	};
	$Pather_Common_Models_Game_Old_ConnectedModel.__typeName = 'Pather.Common.Models.Game.Old.ConnectedModel';
	$Pather_Common_Models_Game_Old_ConnectedModel.createInstance = function() {
		return $Pather_Common_Models_Game_Old_ConnectedModel.$ctor();
	};
	$Pather_Common_Models_Game_Old_ConnectedModel.$ctor = function() {
		var $this = {};
		$this.grid = null;
		return $this;
	};
	global.Pather.Common.Models.Game.Old.ConnectedModel = $Pather_Common_Models_Game_Old_ConnectedModel;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Game.Old.MoveModel
	var $Pather_Common_Models_Game_Old_MoveModel = function() {
	};
	$Pather_Common_Models_Game_Old_MoveModel.__typeName = 'Pather.Common.Models.Game.Old.MoveModel';
	$Pather_Common_Models_Game_Old_MoveModel.createInstance = function() {
		return $Pather_Common_Models_Game_Old_MoveModel.$ctor();
	};
	$Pather_Common_Models_Game_Old_MoveModel.$ctor = function() {
		var $this = {};
		$this.playerId = null;
		$this.x = 0;
		$this.y = 0;
		return $this;
	};
	global.Pather.Common.Models.Game.Old.MoveModel = $Pather_Common_Models_Game_Old_MoveModel;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Game.Old.PingPongModel
	var $Pather_Common_Models_Game_Old_PingPongModel = function() {
	};
	$Pather_Common_Models_Game_Old_PingPongModel.__typeName = 'Pather.Common.Models.Game.Old.PingPongModel';
	$Pather_Common_Models_Game_Old_PingPongModel.createInstance = function() {
		return $Pather_Common_Models_Game_Old_PingPongModel.$ctor();
	};
	$Pather_Common_Models_Game_Old_PingPongModel.$ctor = function() {
		var $this = {};
		return $this;
	};
	global.Pather.Common.Models.Game.Old.PingPongModel = $Pather_Common_Models_Game_Old_PingPongModel;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Game.Old.PlayerJoinModel
	var $Pather_Common_Models_Game_Old_PlayerJoinModel = function() {
	};
	$Pather_Common_Models_Game_Old_PlayerJoinModel.__typeName = 'Pather.Common.Models.Game.Old.PlayerJoinModel';
	$Pather_Common_Models_Game_Old_PlayerJoinModel.createInstance = function() {
		return $Pather_Common_Models_Game_Old_PlayerJoinModel.$ctor();
	};
	$Pather_Common_Models_Game_Old_PlayerJoinModel.$ctor = function() {
		var $this = {};
		$this.playerId = null;
		return $this;
	};
	global.Pather.Common.Models.Game.Old.PlayerJoinModel = $Pather_Common_Models_Game_Old_PlayerJoinModel;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Game.Old.PlayerModel
	var $Pather_Common_Models_Game_Old_PlayerModel = function() {
	};
	$Pather_Common_Models_Game_Old_PlayerModel.__typeName = 'Pather.Common.Models.Game.Old.PlayerModel';
	$Pather_Common_Models_Game_Old_PlayerModel.createInstance = function() {
		return $Pather_Common_Models_Game_Old_PlayerModel.$ctor();
	};
	$Pather_Common_Models_Game_Old_PlayerModel.$ctor = function() {
		var $this = {};
		$this.playerId = null;
		$this.x = 0;
		$this.y = 0;
		return $this;
	};
	global.Pather.Common.Models.Game.Old.PlayerModel = $Pather_Common_Models_Game_Old_PlayerModel;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Game.Old.PlayerSyncModel
	var $Pather_Common_Models_Game_Old_PlayerSyncModel = function() {
	};
	$Pather_Common_Models_Game_Old_PlayerSyncModel.__typeName = 'Pather.Common.Models.Game.Old.PlayerSyncModel';
	$Pather_Common_Models_Game_Old_PlayerSyncModel.createInstance = function() {
		return $Pather_Common_Models_Game_Old_PlayerSyncModel.$ctor();
	};
	$Pather_Common_Models_Game_Old_PlayerSyncModel.$ctor = function() {
		var $this = {};
		$this.joinedPlayers = null;
		$this.leftPlayers = null;
		return $this;
	};
	global.Pather.Common.Models.Game.Old.PlayerSyncModel = $Pather_Common_Models_Game_Old_PlayerSyncModel;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Game.Old.SyncLockstepModel
	var $Pather_Common_Models_Game_Old_SyncLockstepModel = function() {
	};
	$Pather_Common_Models_Game_Old_SyncLockstepModel.__typeName = 'Pather.Common.Models.Game.Old.SyncLockstepModel';
	$Pather_Common_Models_Game_Old_SyncLockstepModel.createInstance = function() {
		return $Pather_Common_Models_Game_Old_SyncLockstepModel.$ctor();
	};
	$Pather_Common_Models_Game_Old_SyncLockstepModel.$ctor = function() {
		var $this = {};
		$this.lockstepTickNumber = 0;
		return $this;
	};
	global.Pather.Common.Models.Game.Old.SyncLockstepModel = $Pather_Common_Models_Game_Old_SyncLockstepModel;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.GameSegment.InitialGameUser
	var $Pather_Common_Models_GameSegment_InitialGameUser = function() {
	};
	$Pather_Common_Models_GameSegment_InitialGameUser.__typeName = 'Pather.Common.Models.GameSegment.InitialGameUser';
	$Pather_Common_Models_GameSegment_InitialGameUser.createInstance = function() {
		return $Pather_Common_Models_GameSegment_InitialGameUser.$ctor();
	};
	$Pather_Common_Models_GameSegment_InitialGameUser.$ctor = function() {
		var $this = {};
		$this.userId = null;
		$this.x = 0;
		$this.y = 0;
		$this.gatewayId = null;
		$this.gameSegmentId = null;
		return $this;
	};
	global.Pather.Common.Models.GameSegment.InitialGameUser = $Pather_Common_Models_GameSegment_InitialGameUser;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.GameSegment.InitializeGameSegment_Response_GameWorld_GameSegment_PubSub_ReqRes_Message
	var $Pather_Common_Models_GameSegment_InitializeGameSegment_Response_GameWorld_GameSegment_PubSub_ReqRes_Message = function() {
	};
	$Pather_Common_Models_GameSegment_InitializeGameSegment_Response_GameWorld_GameSegment_PubSub_ReqRes_Message.__typeName = 'Pather.Common.Models.GameSegment.InitializeGameSegment_Response_GameWorld_GameSegment_PubSub_ReqRes_Message';
	$Pather_Common_Models_GameSegment_InitializeGameSegment_Response_GameWorld_GameSegment_PubSub_ReqRes_Message.createInstance = function() {
		return $Pather_Common_Models_GameSegment_InitializeGameSegment_Response_GameWorld_GameSegment_PubSub_ReqRes_Message.$ctor();
	};
	$Pather_Common_Models_GameSegment_InitializeGameSegment_Response_GameWorld_GameSegment_PubSub_ReqRes_Message.$ctor = function() {
		var $this = $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_ReqRes_Message.$ctor();
		$this.gameSegmentIds = null;
		$this.allUsers = null;
		$this.type = 'initializeGameSegmentResponse';
		$this.response = true;
		return $this;
	};
	global.Pather.Common.Models.GameSegment.InitializeGameSegment_Response_GameWorld_GameSegment_PubSub_ReqRes_Message = $Pather_Common_Models_GameSegment_InitializeGameSegment_Response_GameWorld_GameSegment_PubSub_ReqRes_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.GameSegment.NewGameSegment_GameWorld_GameSegment_PubSub_Message
	var $Pather_Common_Models_GameSegment_NewGameSegment_GameWorld_GameSegment_PubSub_Message = function() {
	};
	$Pather_Common_Models_GameSegment_NewGameSegment_GameWorld_GameSegment_PubSub_Message.__typeName = 'Pather.Common.Models.GameSegment.NewGameSegment_GameWorld_GameSegment_PubSub_Message';
	$Pather_Common_Models_GameSegment_NewGameSegment_GameWorld_GameSegment_PubSub_Message.createInstance = function() {
		return $Pather_Common_Models_GameSegment_NewGameSegment_GameWorld_GameSegment_PubSub_Message.$ctor();
	};
	$Pather_Common_Models_GameSegment_NewGameSegment_GameWorld_GameSegment_PubSub_Message.$ctor = function() {
		var $this = $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_Message.$ctor();
		$this.gameSegmentId = null;
		$this.type = 'newGameSegment';
		return $this;
	};
	global.Pather.Common.Models.GameSegment.NewGameSegment_GameWorld_GameSegment_PubSub_Message = $Pather_Common_Models_GameSegment_NewGameSegment_GameWorld_GameSegment_PubSub_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.GameSegment.Pong_Tick_GameSegment_PubSub_Message
	var $Pather_Common_Models_GameSegment_Pong_Tick_GameSegment_PubSub_Message = function() {
	};
	$Pather_Common_Models_GameSegment_Pong_Tick_GameSegment_PubSub_Message.__typeName = 'Pather.Common.Models.GameSegment.Pong_Tick_GameSegment_PubSub_Message';
	$Pather_Common_Models_GameSegment_Pong_Tick_GameSegment_PubSub_Message.createInstance = function() {
		return $Pather_Common_Models_GameSegment_Pong_Tick_GameSegment_PubSub_Message.$ctor();
	};
	$Pather_Common_Models_GameSegment_Pong_Tick_GameSegment_PubSub_Message.$ctor = function() {
		var $this = $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_Message.$ctor();
		$this.type = 'pong';
		return $this;
	};
	global.Pather.Common.Models.GameSegment.Pong_Tick_GameSegment_PubSub_Message = $Pather_Common_Models_GameSegment_Pong_Tick_GameSegment_PubSub_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.GameSegment.TellUserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message
	var $Pather_Common_Models_GameSegment_TellUserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message = function() {
	};
	$Pather_Common_Models_GameSegment_TellUserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message.__typeName = 'Pather.Common.Models.GameSegment.TellUserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message';
	$Pather_Common_Models_GameSegment_TellUserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message.createInstance = function() {
		return $Pather_Common_Models_GameSegment_TellUserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message.$ctor();
	};
	$Pather_Common_Models_GameSegment_TellUserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message.$ctor = function() {
		var $this = $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_ReqRes_Message.$ctor();
		$this.userId = null;
		$this.x = 0;
		$this.y = 0;
		$this.gatewayId = null;
		$this.gameSegmentId = null;
		$this.type = 'tellUserJoin';
		return $this;
	};
	global.Pather.Common.Models.GameSegment.TellUserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message = $Pather_Common_Models_GameSegment_TellUserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.GameSegment.TellUserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message
	var $Pather_Common_Models_GameSegment_TellUserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message = function() {
	};
	$Pather_Common_Models_GameSegment_TellUserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message.__typeName = 'Pather.Common.Models.GameSegment.TellUserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message';
	$Pather_Common_Models_GameSegment_TellUserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message.createInstance = function() {
		return $Pather_Common_Models_GameSegment_TellUserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message.$ctor();
	};
	$Pather_Common_Models_GameSegment_TellUserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message.$ctor = function() {
		var $this = $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_ReqRes_Message.$ctor();
		$this.userId = null;
		$this.type = 'tellUserLeft';
		return $this;
	};
	global.Pather.Common.Models.GameSegment.TellUserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message = $Pather_Common_Models_GameSegment_TellUserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.GameSegment.TellUserMoved_GameSegment_GameSegment_PubSub_Message
	var $Pather_Common_Models_GameSegment_TellUserMoved_GameSegment_GameSegment_PubSub_Message = function() {
	};
	$Pather_Common_Models_GameSegment_TellUserMoved_GameSegment_GameSegment_PubSub_Message.__typeName = 'Pather.Common.Models.GameSegment.TellUserMoved_GameSegment_GameSegment_PubSub_Message';
	$Pather_Common_Models_GameSegment_TellUserMoved_GameSegment_GameSegment_PubSub_Message.createInstance = function() {
		return $Pather_Common_Models_GameSegment_TellUserMoved_GameSegment_GameSegment_PubSub_Message.$ctor();
	};
	$Pather_Common_Models_GameSegment_TellUserMoved_GameSegment_GameSegment_PubSub_Message.$ctor = function() {
		var $this = $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_Message.$ctor();
		$this.userId = null;
		$this.x = 0;
		$this.y = 0;
		$this.lockstepTick = 0;
		$this.type = 'tellUserMoved';
		return $this;
	};
	global.Pather.Common.Models.GameSegment.TellUserMoved_GameSegment_GameSegment_PubSub_Message = $Pather_Common_Models_GameSegment_TellUserMoved_GameSegment_GameSegment_PubSub_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.GameSegment.TickSync_GameSegment_PubSub_AllMessage
	var $Pather_Common_Models_GameSegment_TickSync_GameSegment_PubSub_AllMessage = function() {
	};
	$Pather_Common_Models_GameSegment_TickSync_GameSegment_PubSub_AllMessage.__typeName = 'Pather.Common.Models.GameSegment.TickSync_GameSegment_PubSub_AllMessage';
	$Pather_Common_Models_GameSegment_TickSync_GameSegment_PubSub_AllMessage.$ctor = function(lockstepTickNumber) {
		var $this = $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_AllMessage.$ctor();
		$this.lockstepTickNumber = 0;
		$this.type = 'tickSync';
		$this.lockstepTickNumber = lockstepTickNumber;
		return $this;
	};
	global.Pather.Common.Models.GameSegment.TickSync_GameSegment_PubSub_AllMessage = $Pather_Common_Models_GameSegment_TickSync_GameSegment_PubSub_AllMessage;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.GameSegment.UserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message
	var $Pather_Common_Models_GameSegment_UserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message = function() {
	};
	$Pather_Common_Models_GameSegment_UserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message.__typeName = 'Pather.Common.Models.GameSegment.UserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message';
	$Pather_Common_Models_GameSegment_UserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message.createInstance = function() {
		return $Pather_Common_Models_GameSegment_UserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message.$ctor();
	};
	$Pather_Common_Models_GameSegment_UserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message.$ctor = function() {
		var $this = $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_ReqRes_Message.$ctor();
		$this.collection = null;
		$this.type = 'userJoin';
		return $this;
	};
	global.Pather.Common.Models.GameSegment.UserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message = $Pather_Common_Models_GameSegment_UserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.GameSegment.UserJoinGameUser
	var $Pather_Common_Models_GameSegment_UserJoinGameUser = function() {
	};
	$Pather_Common_Models_GameSegment_UserJoinGameUser.__typeName = 'Pather.Common.Models.GameSegment.UserJoinGameUser';
	$Pather_Common_Models_GameSegment_UserJoinGameUser.createInstance = function() {
		return $Pather_Common_Models_GameSegment_UserJoinGameUser.$ctor();
	};
	$Pather_Common_Models_GameSegment_UserJoinGameUser.$ctor = function() {
		var $this = {};
		$this.userId = null;
		$this.x = 0;
		$this.y = 0;
		$this.gatewayId = null;
		return $this;
	};
	global.Pather.Common.Models.GameSegment.UserJoinGameUser = $Pather_Common_Models_GameSegment_UserJoinGameUser;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.GameSegment.UserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message
	var $Pather_Common_Models_GameSegment_UserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message = function() {
	};
	$Pather_Common_Models_GameSegment_UserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message.__typeName = 'Pather.Common.Models.GameSegment.UserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message';
	$Pather_Common_Models_GameSegment_UserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message.createInstance = function() {
		return $Pather_Common_Models_GameSegment_UserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message.$ctor();
	};
	$Pather_Common_Models_GameSegment_UserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message.$ctor = function() {
		var $this = $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_ReqRes_Message.$ctor();
		$this.userId = null;
		$this.type = 'userLeft';
		return $this;
	};
	global.Pather.Common.Models.GameSegment.UserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message = $Pather_Common_Models_GameSegment_UserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.GameSegment.UserMoved_GameSegment_GameSegment_PubSub_Message
	var $Pather_Common_Models_GameSegment_UserMoved_GameSegment_GameSegment_PubSub_Message = function() {
	};
	$Pather_Common_Models_GameSegment_UserMoved_GameSegment_GameSegment_PubSub_Message.__typeName = 'Pather.Common.Models.GameSegment.UserMoved_GameSegment_GameSegment_PubSub_Message';
	$Pather_Common_Models_GameSegment_UserMoved_GameSegment_GameSegment_PubSub_Message.createInstance = function() {
		return $Pather_Common_Models_GameSegment_UserMoved_GameSegment_GameSegment_PubSub_Message.$ctor();
	};
	$Pather_Common_Models_GameSegment_UserMoved_GameSegment_GameSegment_PubSub_Message.$ctor = function() {
		var $this = $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_Message.$ctor();
		$this.x = 0;
		$this.y = 0;
		$this.lockstepTick = 0;
		$this.userId = null;
		$this.type = 'userMovedFromGameSegment';
		return $this;
	};
	global.Pather.Common.Models.GameSegment.UserMoved_GameSegment_GameSegment_PubSub_Message = $Pather_Common_Models_GameSegment_UserMoved_GameSegment_GameSegment_PubSub_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.GameSegment.Base.GameSegment_PubSub_AllMessage
	var $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_AllMessage = function() {
	};
	$Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_AllMessage.__typeName = 'Pather.Common.Models.GameSegment.Base.GameSegment_PubSub_AllMessage';
	$Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_AllMessage.$ctor = function() {
		var $this = {};
		$this.type = null;
		return $this;
	};
	global.Pather.Common.Models.GameSegment.Base.GameSegment_PubSub_AllMessage = $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_AllMessage;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.GameSegment.Base.GameSegment_PubSub_AllMessageType
	var $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_AllMessageType = function() {
	};
	$Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_AllMessageType.__typeName = 'Pather.Common.Models.GameSegment.Base.GameSegment_PubSub_AllMessageType';
	global.Pather.Common.Models.GameSegment.Base.GameSegment_PubSub_AllMessageType = $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_AllMessageType;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.GameSegment.Base.GameSegment_PubSub_Message
	var $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_Message = function() {
	};
	$Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_Message.__typeName = 'Pather.Common.Models.GameSegment.Base.GameSegment_PubSub_Message';
	$Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_Message.$ctor = function() {
		var $this = {};
		$this.type = null;
		return $this;
	};
	global.Pather.Common.Models.GameSegment.Base.GameSegment_PubSub_Message = $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.GameSegment.Base.GameSegment_PubSub_MessageType
	var $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_MessageType = function() {
	};
	$Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_MessageType.__typeName = 'Pather.Common.Models.GameSegment.Base.GameSegment_PubSub_MessageType';
	global.Pather.Common.Models.GameSegment.Base.GameSegment_PubSub_MessageType = $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_MessageType;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.GameSegment.Base.GameSegment_PubSub_ReqRes_Message
	var $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_ReqRes_Message = function() {
	};
	$Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_ReqRes_Message.__typeName = 'Pather.Common.Models.GameSegment.Base.GameSegment_PubSub_ReqRes_Message';
	$Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_ReqRes_Message.createInstance = function() {
		return $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_ReqRes_Message.$ctor();
	};
	$Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_ReqRes_Message.$ctor = function() {
		var $this = $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_Message.$ctor();
		$this.messageId = null;
		$this.response = false;
		$this.messageId = $Pather_Common_Utils_Utilities.uniqueId();
		return $this;
	};
	global.Pather.Common.Models.GameSegment.Base.GameSegment_PubSub_ReqRes_Message = $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_ReqRes_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.GameSegment.Base.UserMoved_Gateway_GameSegment_PubSub_Message
	var $Pather_Common_Models_GameSegment_Base_UserMoved_Gateway_GameSegment_PubSub_Message = function() {
	};
	$Pather_Common_Models_GameSegment_Base_UserMoved_Gateway_GameSegment_PubSub_Message.__typeName = 'Pather.Common.Models.GameSegment.Base.UserMoved_Gateway_GameSegment_PubSub_Message';
	$Pather_Common_Models_GameSegment_Base_UserMoved_Gateway_GameSegment_PubSub_Message.createInstance = function() {
		return $Pather_Common_Models_GameSegment_Base_UserMoved_Gateway_GameSegment_PubSub_Message.$ctor();
	};
	$Pather_Common_Models_GameSegment_Base_UserMoved_Gateway_GameSegment_PubSub_Message.$ctor = function() {
		var $this = $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_Message.$ctor();
		$this.userId = null;
		$this.x = 0;
		$this.y = 0;
		$this.lockstepTick = 0;
		$this.type = 'userMoved';
		return $this;
	};
	global.Pather.Common.Models.GameSegment.Base.UserMoved_Gateway_GameSegment_PubSub_Message = $Pather_Common_Models_GameSegment_Base_UserMoved_Gateway_GameSegment_PubSub_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.GameWorld.Base.GameWorld_PubSub_Message
	var $Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_Message = function() {
	};
	$Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_Message.__typeName = 'Pather.Common.Models.GameWorld.Base.GameWorld_PubSub_Message';
	$Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_Message.$ctor = function() {
		var $this = {};
		$this.type = null;
		return $this;
	};
	global.Pather.Common.Models.GameWorld.Base.GameWorld_PubSub_Message = $Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.GameWorld.Base.GameWorld_PubSub_MessageType
	var $Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_MessageType = function() {
	};
	$Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_MessageType.__typeName = 'Pather.Common.Models.GameWorld.Base.GameWorld_PubSub_MessageType';
	global.Pather.Common.Models.GameWorld.Base.GameWorld_PubSub_MessageType = $Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_MessageType;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.GameWorld.Base.GameWorld_PubSub_ReqRes_Message
	var $Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_ReqRes_Message = function() {
	};
	$Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_ReqRes_Message.__typeName = 'Pather.Common.Models.GameWorld.Base.GameWorld_PubSub_ReqRes_Message';
	$Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_ReqRes_Message.createInstance = function() {
		return $Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_ReqRes_Message.$ctor();
	};
	$Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_ReqRes_Message.$ctor = function() {
		var $this = $Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_Message.$ctor();
		$this.response = false;
		$this.messageId = null;
		$this.messageId = $Pather_Common_Utils_Utilities.uniqueId();
		return $this;
	};
	global.Pather.Common.Models.GameWorld.Base.GameWorld_PubSub_ReqRes_Message = $Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_ReqRes_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.GameWorld.GameSegment.InitializeGameSegment_GameSegment_GameWorld_PubSub_ReqRes_Message
	var $Pather_Common_Models_GameWorld_GameSegment_InitializeGameSegment_GameSegment_GameWorld_PubSub_ReqRes_Message = function() {
	};
	$Pather_Common_Models_GameWorld_GameSegment_InitializeGameSegment_GameSegment_GameWorld_PubSub_ReqRes_Message.__typeName = 'Pather.Common.Models.GameWorld.GameSegment.InitializeGameSegment_GameSegment_GameWorld_PubSub_ReqRes_Message';
	$Pather_Common_Models_GameWorld_GameSegment_InitializeGameSegment_GameSegment_GameWorld_PubSub_ReqRes_Message.createInstance = function() {
		return $Pather_Common_Models_GameWorld_GameSegment_InitializeGameSegment_GameSegment_GameWorld_PubSub_ReqRes_Message.$ctor();
	};
	$Pather_Common_Models_GameWorld_GameSegment_InitializeGameSegment_GameSegment_GameWorld_PubSub_ReqRes_Message.$ctor = function() {
		var $this = $Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_ReqRes_Message.$ctor();
		$this.originGameSegment = null;
		$this.type = 'initializeGameSegment';
		$this.response = false;
		return $this;
	};
	global.Pather.Common.Models.GameWorld.GameSegment.InitializeGameSegment_GameSegment_GameWorld_PubSub_ReqRes_Message = $Pather_Common_Models_GameWorld_GameSegment_InitializeGameSegment_GameSegment_GameWorld_PubSub_ReqRes_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.GameWorld.GameSegment.TellUserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message
	var $Pather_Common_Models_GameWorld_GameSegment_TellUserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message = function() {
	};
	$Pather_Common_Models_GameWorld_GameSegment_TellUserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message.__typeName = 'Pather.Common.Models.GameWorld.GameSegment.TellUserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message';
	$Pather_Common_Models_GameWorld_GameSegment_TellUserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message.createInstance = function() {
		return $Pather_Common_Models_GameWorld_GameSegment_TellUserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message.$ctor();
	};
	$Pather_Common_Models_GameWorld_GameSegment_TellUserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message.$ctor = function() {
		var $this = $Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_ReqRes_Message.$ctor();
		$this.type = 'tellUserJoinResponse';
		$this.response = true;
		return $this;
	};
	global.Pather.Common.Models.GameWorld.GameSegment.TellUserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message = $Pather_Common_Models_GameWorld_GameSegment_TellUserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.GameWorld.GameSegment.TellUserLeft_Response_GameSegment_GameWorld_PubSub_ReqRes_Message
	var $Pather_Common_Models_GameWorld_GameSegment_TellUserLeft_Response_GameSegment_GameWorld_PubSub_ReqRes_Message = function() {
	};
	$Pather_Common_Models_GameWorld_GameSegment_TellUserLeft_Response_GameSegment_GameWorld_PubSub_ReqRes_Message.__typeName = 'Pather.Common.Models.GameWorld.GameSegment.TellUserLeft_Response_GameSegment_GameWorld_PubSub_ReqRes_Message';
	$Pather_Common_Models_GameWorld_GameSegment_TellUserLeft_Response_GameSegment_GameWorld_PubSub_ReqRes_Message.createInstance = function() {
		return $Pather_Common_Models_GameWorld_GameSegment_TellUserLeft_Response_GameSegment_GameWorld_PubSub_ReqRes_Message.$ctor();
	};
	$Pather_Common_Models_GameWorld_GameSegment_TellUserLeft_Response_GameSegment_GameWorld_PubSub_ReqRes_Message.$ctor = function() {
		var $this = $Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_ReqRes_Message.$ctor();
		$this.type = 'tellUserLeftResponse';
		$this.response = true;
		return $this;
	};
	global.Pather.Common.Models.GameWorld.GameSegment.TellUserLeft_Response_GameSegment_GameWorld_PubSub_ReqRes_Message = $Pather_Common_Models_GameWorld_GameSegment_TellUserLeft_Response_GameSegment_GameWorld_PubSub_ReqRes_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.GameWorld.GameSegment.UserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message
	var $Pather_Common_Models_GameWorld_GameSegment_UserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message = function() {
	};
	$Pather_Common_Models_GameWorld_GameSegment_UserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message.__typeName = 'Pather.Common.Models.GameWorld.GameSegment.UserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message';
	$Pather_Common_Models_GameWorld_GameSegment_UserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message.createInstance = function() {
		return $Pather_Common_Models_GameWorld_GameSegment_UserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message.$ctor();
	};
	$Pather_Common_Models_GameWorld_GameSegment_UserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message.$ctor = function() {
		var $this = $Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_ReqRes_Message.$ctor();
		$this.type = 'userJoinResponse';
		$this.response = true;
		return $this;
	};
	global.Pather.Common.Models.GameWorld.GameSegment.UserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message = $Pather_Common_Models_GameWorld_GameSegment_UserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.GameWorld.GameSegment.UserLeft_Response_GameSegment_GameWorld_PubSub_ReqRes_Message
	var $Pather_Common_Models_GameWorld_GameSegment_UserLeft_Response_GameSegment_GameWorld_PubSub_ReqRes_Message = function() {
	};
	$Pather_Common_Models_GameWorld_GameSegment_UserLeft_Response_GameSegment_GameWorld_PubSub_ReqRes_Message.__typeName = 'Pather.Common.Models.GameWorld.GameSegment.UserLeft_Response_GameSegment_GameWorld_PubSub_ReqRes_Message';
	$Pather_Common_Models_GameWorld_GameSegment_UserLeft_Response_GameSegment_GameWorld_PubSub_ReqRes_Message.createInstance = function() {
		return $Pather_Common_Models_GameWorld_GameSegment_UserLeft_Response_GameSegment_GameWorld_PubSub_ReqRes_Message.$ctor();
	};
	$Pather_Common_Models_GameWorld_GameSegment_UserLeft_Response_GameSegment_GameWorld_PubSub_ReqRes_Message.$ctor = function() {
		var $this = $Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_ReqRes_Message.$ctor();
		$this.userId = null;
		$this.type = 'userLeft';
		$this.response = true;
		return $this;
	};
	global.Pather.Common.Models.GameWorld.GameSegment.UserLeft_Response_GameSegment_GameWorld_PubSub_ReqRes_Message = $Pather_Common_Models_GameWorld_GameSegment_UserLeft_Response_GameSegment_GameWorld_PubSub_ReqRes_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.GameWorld.Gateway.TellUserMoved_GameSegment_GameWorld_PubSub_Message
	var $Pather_Common_Models_GameWorld_Gateway_TellUserMoved_GameSegment_GameWorld_PubSub_Message = function() {
	};
	$Pather_Common_Models_GameWorld_Gateway_TellUserMoved_GameSegment_GameWorld_PubSub_Message.__typeName = 'Pather.Common.Models.GameWorld.Gateway.TellUserMoved_GameSegment_GameWorld_PubSub_Message';
	$Pather_Common_Models_GameWorld_Gateway_TellUserMoved_GameSegment_GameWorld_PubSub_Message.createInstance = function() {
		return $Pather_Common_Models_GameWorld_Gateway_TellUserMoved_GameSegment_GameWorld_PubSub_Message.$ctor();
	};
	$Pather_Common_Models_GameWorld_Gateway_TellUserMoved_GameSegment_GameWorld_PubSub_Message.$ctor = function() {
		var $this = $Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_Message.$ctor();
		$this.userId = null;
		$this.x = 0;
		$this.y = 0;
		$this.lockstepTick = 0;
		$this.type = 'tellUserMoved';
		return $this;
	};
	global.Pather.Common.Models.GameWorld.Gateway.TellUserMoved_GameSegment_GameWorld_PubSub_Message = $Pather_Common_Models_GameWorld_Gateway_TellUserMoved_GameSegment_GameWorld_PubSub_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.GameWorld.Gateway.UserJoined_Gateway_GameWorld_PubSub_Message
	var $Pather_Common_Models_GameWorld_Gateway_UserJoined_Gateway_GameWorld_PubSub_Message = function() {
	};
	$Pather_Common_Models_GameWorld_Gateway_UserJoined_Gateway_GameWorld_PubSub_Message.__typeName = 'Pather.Common.Models.GameWorld.Gateway.UserJoined_Gateway_GameWorld_PubSub_Message';
	$Pather_Common_Models_GameWorld_Gateway_UserJoined_Gateway_GameWorld_PubSub_Message.createInstance = function() {
		return $Pather_Common_Models_GameWorld_Gateway_UserJoined_Gateway_GameWorld_PubSub_Message.$ctor();
	};
	$Pather_Common_Models_GameWorld_Gateway_UserJoined_Gateway_GameWorld_PubSub_Message.$ctor = function() {
		var $this = $Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_Message.$ctor();
		$this.gatewayId = null;
		$this.userToken = null;
		$this.type = 'userJoined';
		return $this;
	};
	global.Pather.Common.Models.GameWorld.Gateway.UserJoined_Gateway_GameWorld_PubSub_Message = $Pather_Common_Models_GameWorld_Gateway_UserJoined_Gateway_GameWorld_PubSub_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.GameWorld.Gateway.UserLeft_Gateway_GameWorld_PubSub_Message
	var $Pather_Common_Models_GameWorld_Gateway_UserLeft_Gateway_GameWorld_PubSub_Message = function() {
	};
	$Pather_Common_Models_GameWorld_Gateway_UserLeft_Gateway_GameWorld_PubSub_Message.__typeName = 'Pather.Common.Models.GameWorld.Gateway.UserLeft_Gateway_GameWorld_PubSub_Message';
	$Pather_Common_Models_GameWorld_Gateway_UserLeft_Gateway_GameWorld_PubSub_Message.createInstance = function() {
		return $Pather_Common_Models_GameWorld_Gateway_UserLeft_Gateway_GameWorld_PubSub_Message.$ctor();
	};
	$Pather_Common_Models_GameWorld_Gateway_UserLeft_Gateway_GameWorld_PubSub_Message.$ctor = function() {
		var $this = $Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_Message.$ctor();
		$this.userId = null;
		$this.type = 'userLeft';
		return $this;
	};
	global.Pather.Common.Models.GameWorld.Gateway.UserLeft_Gateway_GameWorld_PubSub_Message = $Pather_Common_Models_GameWorld_Gateway_UserLeft_Gateway_GameWorld_PubSub_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.GameWorld.ServerManager.CreateGameSegment_Response_ServerManager_GameWorld_PubSub_ReqRes_Message
	var $Pather_Common_Models_GameWorld_ServerManager_CreateGameSegment_Response_ServerManager_GameWorld_PubSub_ReqRes_Message = function() {
	};
	$Pather_Common_Models_GameWorld_ServerManager_CreateGameSegment_Response_ServerManager_GameWorld_PubSub_ReqRes_Message.__typeName = 'Pather.Common.Models.GameWorld.ServerManager.CreateGameSegment_Response_ServerManager_GameWorld_PubSub_ReqRes_Message';
	$Pather_Common_Models_GameWorld_ServerManager_CreateGameSegment_Response_ServerManager_GameWorld_PubSub_ReqRes_Message.createInstance = function() {
		return $Pather_Common_Models_GameWorld_ServerManager_CreateGameSegment_Response_ServerManager_GameWorld_PubSub_ReqRes_Message.$ctor();
	};
	$Pather_Common_Models_GameWorld_ServerManager_CreateGameSegment_Response_ServerManager_GameWorld_PubSub_ReqRes_Message.$ctor = function() {
		var $this = $Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_ReqRes_Message.$ctor();
		$this.gameSegmentId = null;
		$this.type = 'createGameSegment';
		$this.response = true;
		return $this;
	};
	global.Pather.Common.Models.GameWorld.ServerManager.CreateGameSegment_Response_ServerManager_GameWorld_PubSub_ReqRes_Message = $Pather_Common_Models_GameWorld_ServerManager_CreateGameSegment_Response_ServerManager_GameWorld_PubSub_ReqRes_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.GameWorld.Tick.Pong_Tick_GameWorld_PubSub_Message
	var $Pather_Common_Models_GameWorld_Tick_Pong_Tick_GameWorld_PubSub_Message = function() {
	};
	$Pather_Common_Models_GameWorld_Tick_Pong_Tick_GameWorld_PubSub_Message.__typeName = 'Pather.Common.Models.GameWorld.Tick.Pong_Tick_GameWorld_PubSub_Message';
	$Pather_Common_Models_GameWorld_Tick_Pong_Tick_GameWorld_PubSub_Message.createInstance = function() {
		return $Pather_Common_Models_GameWorld_Tick_Pong_Tick_GameWorld_PubSub_Message.$ctor();
	};
	$Pather_Common_Models_GameWorld_Tick_Pong_Tick_GameWorld_PubSub_Message.$ctor = function() {
		var $this = $Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_Message.$ctor();
		$this.type = 'pong';
		return $this;
	};
	global.Pather.Common.Models.GameWorld.Tick.Pong_Tick_GameWorld_PubSub_Message = $Pather_Common_Models_GameWorld_Tick_Pong_Tick_GameWorld_PubSub_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.GameWorld.Tick.TickSync_Tick_GameWorld_PubSub_Message
	var $Pather_Common_Models_GameWorld_Tick_TickSync_Tick_GameWorld_PubSub_Message = function() {
	};
	$Pather_Common_Models_GameWorld_Tick_TickSync_Tick_GameWorld_PubSub_Message.__typeName = 'Pather.Common.Models.GameWorld.Tick.TickSync_Tick_GameWorld_PubSub_Message';
	$Pather_Common_Models_GameWorld_Tick_TickSync_Tick_GameWorld_PubSub_Message.$ctor = function(lockstepTickNumber) {
		var $this = $Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_Message.$ctor();
		$this.lockstepTickNumber = 0;
		$this.type = 'tickSync';
		$this.lockstepTickNumber = lockstepTickNumber;
		return $this;
	};
	global.Pather.Common.Models.GameWorld.Tick.TickSync_Tick_GameWorld_PubSub_Message = $Pather_Common_Models_GameWorld_Tick_TickSync_Tick_GameWorld_PubSub_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Gateway.PubSub.Ping_Head_Gateway_PubSub_AllMessage
	var $Pather_Common_Models_Gateway_PubSub_Ping_Head_Gateway_PubSub_AllMessage = function() {
	};
	$Pather_Common_Models_Gateway_PubSub_Ping_Head_Gateway_PubSub_AllMessage.__typeName = 'Pather.Common.Models.Gateway.PubSub.Ping_Head_Gateway_PubSub_AllMessage';
	$Pather_Common_Models_Gateway_PubSub_Ping_Head_Gateway_PubSub_AllMessage.createInstance = function() {
		return $Pather_Common_Models_Gateway_PubSub_Ping_Head_Gateway_PubSub_AllMessage.$ctor();
	};
	$Pather_Common_Models_Gateway_PubSub_Ping_Head_Gateway_PubSub_AllMessage.$ctor = function() {
		var $this = $Pather_Common_Models_Gateway_PubSub_Base_Gateway_PubSub_AllMessage.$ctor();
		$this.type = 'ping';
		return $this;
	};
	global.Pather.Common.Models.Gateway.PubSub.Ping_Head_Gateway_PubSub_AllMessage = $Pather_Common_Models_Gateway_PubSub_Ping_Head_Gateway_PubSub_AllMessage;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Gateway.PubSub.Pong_Tick_Gateway_PubSub_Message
	var $Pather_Common_Models_Gateway_PubSub_Pong_Tick_Gateway_PubSub_Message = function() {
	};
	$Pather_Common_Models_Gateway_PubSub_Pong_Tick_Gateway_PubSub_Message.__typeName = 'Pather.Common.Models.Gateway.PubSub.Pong_Tick_Gateway_PubSub_Message';
	$Pather_Common_Models_Gateway_PubSub_Pong_Tick_Gateway_PubSub_Message.createInstance = function() {
		return $Pather_Common_Models_Gateway_PubSub_Pong_Tick_Gateway_PubSub_Message.$ctor();
	};
	$Pather_Common_Models_Gateway_PubSub_Pong_Tick_Gateway_PubSub_Message.$ctor = function() {
		var $this = $Pather_Common_Models_Gateway_PubSub_Base_Gateway_PubSub_Message.$ctor();
		$this.type = 'pong';
		return $this;
	};
	global.Pather.Common.Models.Gateway.PubSub.Pong_Tick_Gateway_PubSub_Message = $Pather_Common_Models_Gateway_PubSub_Pong_Tick_Gateway_PubSub_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Gateway.PubSub.TickSync_Tick_Gateway_PubSub_AllMessage
	var $Pather_Common_Models_Gateway_PubSub_TickSync_Tick_Gateway_PubSub_AllMessage = function() {
	};
	$Pather_Common_Models_Gateway_PubSub_TickSync_Tick_Gateway_PubSub_AllMessage.__typeName = 'Pather.Common.Models.Gateway.PubSub.TickSync_Tick_Gateway_PubSub_AllMessage';
	$Pather_Common_Models_Gateway_PubSub_TickSync_Tick_Gateway_PubSub_AllMessage.$ctor = function(lockstepTickNumber) {
		var $this = $Pather_Common_Models_Gateway_PubSub_Base_Gateway_PubSub_AllMessage.$ctor();
		$this.lockstepTickNumber = 0;
		$this.type = 'tickSync';
		$this.lockstepTickNumber = lockstepTickNumber;
		return $this;
	};
	global.Pather.Common.Models.Gateway.PubSub.TickSync_Tick_Gateway_PubSub_AllMessage = $Pather_Common_Models_Gateway_PubSub_TickSync_Tick_Gateway_PubSub_AllMessage;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Gateway.PubSub.UpdateNeighbors_GameSegment_Gateway_PubSub_Message
	var $Pather_Common_Models_Gateway_PubSub_UpdateNeighbors_GameSegment_Gateway_PubSub_Message = function() {
	};
	$Pather_Common_Models_Gateway_PubSub_UpdateNeighbors_GameSegment_Gateway_PubSub_Message.__typeName = 'Pather.Common.Models.Gateway.PubSub.UpdateNeighbors_GameSegment_Gateway_PubSub_Message';
	$Pather_Common_Models_Gateway_PubSub_UpdateNeighbors_GameSegment_Gateway_PubSub_Message.createInstance = function() {
		return $Pather_Common_Models_Gateway_PubSub_UpdateNeighbors_GameSegment_Gateway_PubSub_Message.$ctor();
	};
	$Pather_Common_Models_Gateway_PubSub_UpdateNeighbors_GameSegment_Gateway_PubSub_Message.$ctor = function() {
		var $this = $Pather_Common_Models_Gateway_PubSub_Base_Gateway_PubSub_Message.$ctor();
		$this.added = null;
		$this.removed = null;
		$this.userId = null;
		$this.type = 'updateNeighbors';
		return $this;
	};
	global.Pather.Common.Models.Gateway.PubSub.UpdateNeighbors_GameSegment_Gateway_PubSub_Message = $Pather_Common_Models_Gateway_PubSub_UpdateNeighbors_GameSegment_Gateway_PubSub_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Gateway.PubSub.UserJoined_GameWorld_Gateway_PubSub_Message
	var $Pather_Common_Models_Gateway_PubSub_UserJoined_GameWorld_Gateway_PubSub_Message = function() {
	};
	$Pather_Common_Models_Gateway_PubSub_UserJoined_GameWorld_Gateway_PubSub_Message.__typeName = 'Pather.Common.Models.Gateway.PubSub.UserJoined_GameWorld_Gateway_PubSub_Message';
	$Pather_Common_Models_Gateway_PubSub_UserJoined_GameWorld_Gateway_PubSub_Message.createInstance = function() {
		return $Pather_Common_Models_Gateway_PubSub_UserJoined_GameWorld_Gateway_PubSub_Message.$ctor();
	};
	$Pather_Common_Models_Gateway_PubSub_UserJoined_GameWorld_Gateway_PubSub_Message.$ctor = function() {
		var $this = $Pather_Common_Models_Gateway_PubSub_Base_Gateway_PubSub_Message.$ctor();
		$this.gameSegmentId = null;
		$this.userId = null;
		$this.x = 0;
		$this.y = 0;
		$this.type = 'userJoined';
		return $this;
	};
	global.Pather.Common.Models.Gateway.PubSub.UserJoined_GameWorld_Gateway_PubSub_Message = $Pather_Common_Models_Gateway_PubSub_UserJoined_GameWorld_Gateway_PubSub_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Gateway.PubSub.UserMovedCollection_GameSegment_Gateway_PubSub_Message
	var $Pather_Common_Models_Gateway_PubSub_UserMovedCollection_GameSegment_Gateway_PubSub_Message = function() {
	};
	$Pather_Common_Models_Gateway_PubSub_UserMovedCollection_GameSegment_Gateway_PubSub_Message.__typeName = 'Pather.Common.Models.Gateway.PubSub.UserMovedCollection_GameSegment_Gateway_PubSub_Message';
	$Pather_Common_Models_Gateway_PubSub_UserMovedCollection_GameSegment_Gateway_PubSub_Message.createInstance = function() {
		return $Pather_Common_Models_Gateway_PubSub_UserMovedCollection_GameSegment_Gateway_PubSub_Message.$ctor();
	};
	$Pather_Common_Models_Gateway_PubSub_UserMovedCollection_GameSegment_Gateway_PubSub_Message.$ctor = function() {
		var $this = $Pather_Common_Models_Gateway_PubSub_Base_Gateway_PubSub_Message.$ctor();
		$this.x = 0;
		$this.y = 0;
		$this.lockstepTick = 0;
		$this.userThatMovedId = null;
		$this.users = null;
		$this.type = 'userMovedCollection';
		return $this;
	};
	global.Pather.Common.Models.Gateway.PubSub.UserMovedCollection_GameSegment_Gateway_PubSub_Message = $Pather_Common_Models_Gateway_PubSub_UserMovedCollection_GameSegment_Gateway_PubSub_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Gateway.PubSub.Base.Gateway_PubSub_AllMessage
	var $Pather_Common_Models_Gateway_PubSub_Base_Gateway_PubSub_AllMessage = function() {
	};
	$Pather_Common_Models_Gateway_PubSub_Base_Gateway_PubSub_AllMessage.__typeName = 'Pather.Common.Models.Gateway.PubSub.Base.Gateway_PubSub_AllMessage';
	$Pather_Common_Models_Gateway_PubSub_Base_Gateway_PubSub_AllMessage.createInstance = function() {
		return $Pather_Common_Models_Gateway_PubSub_Base_Gateway_PubSub_AllMessage.$ctor();
	};
	$Pather_Common_Models_Gateway_PubSub_Base_Gateway_PubSub_AllMessage.$ctor = function() {
		var $this = {};
		$this.type = null;
		return $this;
	};
	global.Pather.Common.Models.Gateway.PubSub.Base.Gateway_PubSub_AllMessage = $Pather_Common_Models_Gateway_PubSub_Base_Gateway_PubSub_AllMessage;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Gateway.PubSub.Base.Gateway_PubSub_AllMessageType
	var $Pather_Common_Models_Gateway_PubSub_Base_Gateway_PubSub_AllMessageType = function() {
	};
	$Pather_Common_Models_Gateway_PubSub_Base_Gateway_PubSub_AllMessageType.__typeName = 'Pather.Common.Models.Gateway.PubSub.Base.Gateway_PubSub_AllMessageType';
	global.Pather.Common.Models.Gateway.PubSub.Base.Gateway_PubSub_AllMessageType = $Pather_Common_Models_Gateway_PubSub_Base_Gateway_PubSub_AllMessageType;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Gateway.PubSub.Base.Gateway_PubSub_Message
	var $Pather_Common_Models_Gateway_PubSub_Base_Gateway_PubSub_Message = function() {
	};
	$Pather_Common_Models_Gateway_PubSub_Base_Gateway_PubSub_Message.__typeName = 'Pather.Common.Models.Gateway.PubSub.Base.Gateway_PubSub_Message';
	$Pather_Common_Models_Gateway_PubSub_Base_Gateway_PubSub_Message.$ctor = function() {
		var $this = {};
		$this.type = null;
		return $this;
	};
	global.Pather.Common.Models.Gateway.PubSub.Base.Gateway_PubSub_Message = $Pather_Common_Models_Gateway_PubSub_Base_Gateway_PubSub_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Gateway.PubSub.Base.Gateway_PubSub_MessageType
	var $Pather_Common_Models_Gateway_PubSub_Base_Gateway_PubSub_MessageType = function() {
	};
	$Pather_Common_Models_Gateway_PubSub_Base_Gateway_PubSub_MessageType.__typeName = 'Pather.Common.Models.Gateway.PubSub.Base.Gateway_PubSub_MessageType';
	global.Pather.Common.Models.Gateway.PubSub.Base.Gateway_PubSub_MessageType = $Pather_Common_Models_Gateway_PubSub_Base_Gateway_PubSub_MessageType;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Gateway.Socket.Base.Gateway_Socket_Message
	var $Pather_Common_Models_Gateway_Socket_Base_Gateway_Socket_Message = function() {
	};
	$Pather_Common_Models_Gateway_Socket_Base_Gateway_Socket_Message.__typeName = 'Pather.Common.Models.Gateway.Socket.Base.Gateway_Socket_Message';
	$Pather_Common_Models_Gateway_Socket_Base_Gateway_Socket_Message.$ctor = function() {
		var $this = $Pather_Common_Models_Gateway_Socket_Base_Socket_Message.$ctor();
		return $this;
	};
	global.Pather.Common.Models.Gateway.Socket.Base.Gateway_Socket_Message = $Pather_Common_Models_Gateway_Socket_Base_Gateway_Socket_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Gateway.Socket.Base.Gateway_User_Socket_Message
	var $Pather_Common_Models_Gateway_Socket_Base_Gateway_User_Socket_Message = function() {
	};
	$Pather_Common_Models_Gateway_Socket_Base_Gateway_User_Socket_Message.__typeName = 'Pather.Common.Models.Gateway.Socket.Base.Gateway_User_Socket_Message';
	$Pather_Common_Models_Gateway_Socket_Base_Gateway_User_Socket_Message.$ctor = function() {
		var $this = $Pather_Common_Models_Gateway_Socket_Base_User_Socket_Message.$ctor();
		$this.gatewayUserMessageType = null;
		return $this;
	};
	global.Pather.Common.Models.Gateway.Socket.Base.Gateway_User_Socket_Message = $Pather_Common_Models_Gateway_Socket_Base_Gateway_User_Socket_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Gateway.Socket.Base.Gateway_User_Socket_MessageType
	var $Pather_Common_Models_Gateway_Socket_Base_Gateway_User_Socket_MessageType = function() {
	};
	$Pather_Common_Models_Gateway_Socket_Base_Gateway_User_Socket_MessageType.__typeName = 'Pather.Common.Models.Gateway.Socket.Base.Gateway_User_Socket_MessageType';
	global.Pather.Common.Models.Gateway.Socket.Base.Gateway_User_Socket_MessageType = $Pather_Common_Models_Gateway_Socket_Base_Gateway_User_Socket_MessageType;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Gateway.Socket.Base.MoveToLocation_Gateway_User_Socket_Message
	var $Pather_Common_Models_Gateway_Socket_Base_MoveToLocation_Gateway_User_Socket_Message = function() {
	};
	$Pather_Common_Models_Gateway_Socket_Base_MoveToLocation_Gateway_User_Socket_Message.__typeName = 'Pather.Common.Models.Gateway.Socket.Base.MoveToLocation_Gateway_User_Socket_Message';
	$Pather_Common_Models_Gateway_Socket_Base_MoveToLocation_Gateway_User_Socket_Message.createInstance = function() {
		return $Pather_Common_Models_Gateway_Socket_Base_MoveToLocation_Gateway_User_Socket_Message.$ctor();
	};
	$Pather_Common_Models_Gateway_Socket_Base_MoveToLocation_Gateway_User_Socket_Message.$ctor = function() {
		var $this = $Pather_Common_Models_Gateway_Socket_Base_Gateway_User_Socket_Message.$ctor();
		$this.x = 0;
		$this.y = 0;
		$this.lockstepTick = 0;
		$this.userId = null;
		$this.gatewayUserMessageType = 'move';
		return $this;
	};
	global.Pather.Common.Models.Gateway.Socket.Base.MoveToLocation_Gateway_User_Socket_Message = $Pather_Common_Models_Gateway_Socket_Base_MoveToLocation_Gateway_User_Socket_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Gateway.Socket.Base.MoveToLocation_User_Gateway_Socket_Message
	var $Pather_Common_Models_Gateway_Socket_Base_MoveToLocation_User_Gateway_Socket_Message = function() {
	};
	$Pather_Common_Models_Gateway_Socket_Base_MoveToLocation_User_Gateway_Socket_Message.__typeName = 'Pather.Common.Models.Gateway.Socket.Base.MoveToLocation_User_Gateway_Socket_Message';
	$Pather_Common_Models_Gateway_Socket_Base_MoveToLocation_User_Gateway_Socket_Message.createInstance = function() {
		return $Pather_Common_Models_Gateway_Socket_Base_MoveToLocation_User_Gateway_Socket_Message.$ctor();
	};
	$Pather_Common_Models_Gateway_Socket_Base_MoveToLocation_User_Gateway_Socket_Message.$ctor = function() {
		var $this = $Pather_Common_Models_Gateway_Socket_Base_User_Gateway_Socket_Message.$ctor();
		$this.x = 0;
		$this.y = 0;
		$this.lockstepTick = 0;
		$this.userGatewayMessageType = 'move';
		return $this;
	};
	global.Pather.Common.Models.Gateway.Socket.Base.MoveToLocation_User_Gateway_Socket_Message = $Pather_Common_Models_Gateway_Socket_Base_MoveToLocation_User_Gateway_Socket_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Gateway.Socket.Base.Ping_User_Gateway_Socket_Message
	var $Pather_Common_Models_Gateway_Socket_Base_Ping_User_Gateway_Socket_Message = function() {
	};
	$Pather_Common_Models_Gateway_Socket_Base_Ping_User_Gateway_Socket_Message.__typeName = 'Pather.Common.Models.Gateway.Socket.Base.Ping_User_Gateway_Socket_Message';
	$Pather_Common_Models_Gateway_Socket_Base_Ping_User_Gateway_Socket_Message.createInstance = function() {
		return $Pather_Common_Models_Gateway_Socket_Base_Ping_User_Gateway_Socket_Message.$ctor();
	};
	$Pather_Common_Models_Gateway_Socket_Base_Ping_User_Gateway_Socket_Message.$ctor = function() {
		var $this = $Pather_Common_Models_Gateway_Socket_Base_User_Gateway_Socket_Message.$ctor();
		$this.userGatewayMessageType = 'ping';
		return $this;
	};
	global.Pather.Common.Models.Gateway.Socket.Base.Ping_User_Gateway_Socket_Message = $Pather_Common_Models_Gateway_Socket_Base_Ping_User_Gateway_Socket_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Gateway.Socket.Base.Pong_Gateway_User_PubSub_Message
	var $Pather_Common_Models_Gateway_Socket_Base_Pong_Gateway_User_PubSub_Message = function() {
	};
	$Pather_Common_Models_Gateway_Socket_Base_Pong_Gateway_User_PubSub_Message.__typeName = 'Pather.Common.Models.Gateway.Socket.Base.Pong_Gateway_User_PubSub_Message';
	$Pather_Common_Models_Gateway_Socket_Base_Pong_Gateway_User_PubSub_Message.createInstance = function() {
		return $Pather_Common_Models_Gateway_Socket_Base_Pong_Gateway_User_PubSub_Message.$ctor();
	};
	$Pather_Common_Models_Gateway_Socket_Base_Pong_Gateway_User_PubSub_Message.$ctor = function() {
		var $this = $Pather_Common_Models_Gateway_Socket_Base_Gateway_User_Socket_Message.$ctor();
		$this.gatewayLatency = 0;
		$this.gatewayUserMessageType = 'pong';
		return $this;
	};
	global.Pather.Common.Models.Gateway.Socket.Base.Pong_Gateway_User_PubSub_Message = $Pather_Common_Models_Gateway_Socket_Base_Pong_Gateway_User_PubSub_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Gateway.Socket.Base.Socket_Message
	var $Pather_Common_Models_Gateway_Socket_Base_Socket_Message = function() {
	};
	$Pather_Common_Models_Gateway_Socket_Base_Socket_Message.__typeName = 'Pather.Common.Models.Gateway.Socket.Base.Socket_Message';
	$Pather_Common_Models_Gateway_Socket_Base_Socket_Message.$ctor = function() {
		var $this = {};
		return $this;
	};
	global.Pather.Common.Models.Gateway.Socket.Base.Socket_Message = $Pather_Common_Models_Gateway_Socket_Base_Socket_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Gateway.Socket.Base.TickSync_Gateway_User_Socket_Message
	var $Pather_Common_Models_Gateway_Socket_Base_TickSync_Gateway_User_Socket_Message = function() {
	};
	$Pather_Common_Models_Gateway_Socket_Base_TickSync_Gateway_User_Socket_Message.__typeName = 'Pather.Common.Models.Gateway.Socket.Base.TickSync_Gateway_User_Socket_Message';
	$Pather_Common_Models_Gateway_Socket_Base_TickSync_Gateway_User_Socket_Message.createInstance = function() {
		return $Pather_Common_Models_Gateway_Socket_Base_TickSync_Gateway_User_Socket_Message.$ctor();
	};
	$Pather_Common_Models_Gateway_Socket_Base_TickSync_Gateway_User_Socket_Message.$ctor = function() {
		var $this = $Pather_Common_Models_Gateway_Socket_Base_Gateway_User_Socket_Message.$ctor();
		$this.lockstepTickNumber = 0;
		$this.gatewayUserMessageType = 'tickSync';
		return $this;
	};
	global.Pather.Common.Models.Gateway.Socket.Base.TickSync_Gateway_User_Socket_Message = $Pather_Common_Models_Gateway_Socket_Base_TickSync_Gateway_User_Socket_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Gateway.Socket.Base.UpdateNeighbors_Gateway_User_Socket_Message
	var $Pather_Common_Models_Gateway_Socket_Base_UpdateNeighbors_Gateway_User_Socket_Message = function() {
	};
	$Pather_Common_Models_Gateway_Socket_Base_UpdateNeighbors_Gateway_User_Socket_Message.__typeName = 'Pather.Common.Models.Gateway.Socket.Base.UpdateNeighbors_Gateway_User_Socket_Message';
	$Pather_Common_Models_Gateway_Socket_Base_UpdateNeighbors_Gateway_User_Socket_Message.createInstance = function() {
		return $Pather_Common_Models_Gateway_Socket_Base_UpdateNeighbors_Gateway_User_Socket_Message.$ctor();
	};
	$Pather_Common_Models_Gateway_Socket_Base_UpdateNeighbors_Gateway_User_Socket_Message.$ctor = function() {
		var $this = $Pather_Common_Models_Gateway_Socket_Base_Gateway_User_Socket_Message.$ctor();
		$this.removed = null;
		$this.added = null;
		$this.gatewayUserMessageType = 'updateNeighbors';
		return $this;
	};
	global.Pather.Common.Models.Gateway.Socket.Base.UpdateNeighbors_Gateway_User_Socket_Message = $Pather_Common_Models_Gateway_Socket_Base_UpdateNeighbors_Gateway_User_Socket_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Gateway.Socket.Base.User_Gateway_Socket_Message
	var $Pather_Common_Models_Gateway_Socket_Base_User_Gateway_Socket_Message = function() {
	};
	$Pather_Common_Models_Gateway_Socket_Base_User_Gateway_Socket_Message.__typeName = 'Pather.Common.Models.Gateway.Socket.Base.User_Gateway_Socket_Message';
	$Pather_Common_Models_Gateway_Socket_Base_User_Gateway_Socket_Message.$ctor = function() {
		var $this = $Pather_Common_Models_Gateway_Socket_Base_Gateway_Socket_Message.$ctor();
		$this.userGatewayMessageType = null;
		return $this;
	};
	global.Pather.Common.Models.Gateway.Socket.Base.User_Gateway_Socket_Message = $Pather_Common_Models_Gateway_Socket_Base_User_Gateway_Socket_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Gateway.Socket.Base.User_Gateway_Socket_MessageType
	var $Pather_Common_Models_Gateway_Socket_Base_User_Gateway_Socket_MessageType = function() {
	};
	$Pather_Common_Models_Gateway_Socket_Base_User_Gateway_Socket_MessageType.__typeName = 'Pather.Common.Models.Gateway.Socket.Base.User_Gateway_Socket_MessageType';
	global.Pather.Common.Models.Gateway.Socket.Base.User_Gateway_Socket_MessageType = $Pather_Common_Models_Gateway_Socket_Base_User_Gateway_Socket_MessageType;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Gateway.Socket.Base.User_Socket_Message
	var $Pather_Common_Models_Gateway_Socket_Base_User_Socket_Message = function() {
	};
	$Pather_Common_Models_Gateway_Socket_Base_User_Socket_Message.__typeName = 'Pather.Common.Models.Gateway.Socket.Base.User_Socket_Message';
	$Pather_Common_Models_Gateway_Socket_Base_User_Socket_Message.$ctor = function() {
		var $this = $Pather_Common_Models_Gateway_Socket_Base_Socket_Message.$ctor();
		return $this;
	};
	global.Pather.Common.Models.Gateway.Socket.Base.User_Socket_Message = $Pather_Common_Models_Gateway_Socket_Base_User_Socket_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Gateway.Socket.Base.UserJoined_Gateway_User_Socket_Message
	var $Pather_Common_Models_Gateway_Socket_Base_UserJoined_Gateway_User_Socket_Message = function() {
	};
	$Pather_Common_Models_Gateway_Socket_Base_UserJoined_Gateway_User_Socket_Message.__typeName = 'Pather.Common.Models.Gateway.Socket.Base.UserJoined_Gateway_User_Socket_Message';
	$Pather_Common_Models_Gateway_Socket_Base_UserJoined_Gateway_User_Socket_Message.createInstance = function() {
		return $Pather_Common_Models_Gateway_Socket_Base_UserJoined_Gateway_User_Socket_Message.$ctor();
	};
	$Pather_Common_Models_Gateway_Socket_Base_UserJoined_Gateway_User_Socket_Message.$ctor = function() {
		var $this = $Pather_Common_Models_Gateway_Socket_Base_Gateway_User_Socket_Message.$ctor();
		$this.gameSegmentId = null;
		$this.userId = null;
		$this.x = 0;
		$this.y = 0;
		$this.gatewayUserMessageType = 'userJoined';
		return $this;
	};
	global.Pather.Common.Models.Gateway.Socket.Base.UserJoined_Gateway_User_Socket_Message = $Pather_Common_Models_Gateway_Socket_Base_UserJoined_Gateway_User_Socket_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Gateway.Socket.Base.UserJoined_User_Gateway_Socket_Message
	var $Pather_Common_Models_Gateway_Socket_Base_UserJoined_User_Gateway_Socket_Message = function() {
	};
	$Pather_Common_Models_Gateway_Socket_Base_UserJoined_User_Gateway_Socket_Message.__typeName = 'Pather.Common.Models.Gateway.Socket.Base.UserJoined_User_Gateway_Socket_Message';
	$Pather_Common_Models_Gateway_Socket_Base_UserJoined_User_Gateway_Socket_Message.createInstance = function() {
		return $Pather_Common_Models_Gateway_Socket_Base_UserJoined_User_Gateway_Socket_Message.$ctor();
	};
	$Pather_Common_Models_Gateway_Socket_Base_UserJoined_User_Gateway_Socket_Message.$ctor = function() {
		var $this = $Pather_Common_Models_Gateway_Socket_Base_User_Gateway_Socket_Message.$ctor();
		$this.userToken = null;
		$this.userGatewayMessageType = 'join';
		return $this;
	};
	global.Pather.Common.Models.Gateway.Socket.Base.UserJoined_User_Gateway_Socket_Message = $Pather_Common_Models_Gateway_Socket_Base_UserJoined_User_Gateway_Socket_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Head.CreateGateway_Response_ServerManager_Head_PubSub_ReqRes_Message
	var $Pather_Common_Models_Head_CreateGateway_Response_ServerManager_Head_PubSub_ReqRes_Message = function() {
	};
	$Pather_Common_Models_Head_CreateGateway_Response_ServerManager_Head_PubSub_ReqRes_Message.__typeName = 'Pather.Common.Models.Head.CreateGateway_Response_ServerManager_Head_PubSub_ReqRes_Message';
	$Pather_Common_Models_Head_CreateGateway_Response_ServerManager_Head_PubSub_ReqRes_Message.createInstance = function() {
		return $Pather_Common_Models_Head_CreateGateway_Response_ServerManager_Head_PubSub_ReqRes_Message.$ctor();
	};
	$Pather_Common_Models_Head_CreateGateway_Response_ServerManager_Head_PubSub_ReqRes_Message.$ctor = function() {
		var $this = $Pather_Common_Models_Head_Base_Head_PubSub_ReqRes_Message.$ctor();
		$this.gatewayId = null;
		$this.type = 'ping';
		$this.response = true;
		return $this;
	};
	global.Pather.Common.Models.Head.CreateGateway_Response_ServerManager_Head_PubSub_ReqRes_Message = $Pather_Common_Models_Head_CreateGateway_Response_ServerManager_Head_PubSub_ReqRes_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Head.Ping_Response_Gateway_Head_PubSub_Message
	var $Pather_Common_Models_Head_Ping_Response_Gateway_Head_PubSub_Message = function() {
	};
	$Pather_Common_Models_Head_Ping_Response_Gateway_Head_PubSub_Message.__typeName = 'Pather.Common.Models.Head.Ping_Response_Gateway_Head_PubSub_Message';
	$Pather_Common_Models_Head_Ping_Response_Gateway_Head_PubSub_Message.createInstance = function() {
		return $Pather_Common_Models_Head_Ping_Response_Gateway_Head_PubSub_Message.$ctor();
	};
	$Pather_Common_Models_Head_Ping_Response_Gateway_Head_PubSub_Message.$ctor = function() {
		var $this = $Pather_Common_Models_Head_Base_Head_PubSub_Message.$ctor();
		$this.address = null;
		$this.liveConnections = 0;
		$this.gatewayId = null;
		$this.type = 'ping';
		return $this;
	};
	global.Pather.Common.Models.Head.Ping_Response_Gateway_Head_PubSub_Message = $Pather_Common_Models_Head_Ping_Response_Gateway_Head_PubSub_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Head.Base.Head_PubSub_Message
	var $Pather_Common_Models_Head_Base_Head_PubSub_Message = function() {
	};
	$Pather_Common_Models_Head_Base_Head_PubSub_Message.__typeName = 'Pather.Common.Models.Head.Base.Head_PubSub_Message';
	$Pather_Common_Models_Head_Base_Head_PubSub_Message.$ctor = function() {
		var $this = {};
		$this.type = null;
		return $this;
	};
	global.Pather.Common.Models.Head.Base.Head_PubSub_Message = $Pather_Common_Models_Head_Base_Head_PubSub_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Head.Base.Head_PubSub_MessageType
	var $Pather_Common_Models_Head_Base_Head_PubSub_MessageType = function() {
	};
	$Pather_Common_Models_Head_Base_Head_PubSub_MessageType.__typeName = 'Pather.Common.Models.Head.Base.Head_PubSub_MessageType';
	global.Pather.Common.Models.Head.Base.Head_PubSub_MessageType = $Pather_Common_Models_Head_Base_Head_PubSub_MessageType;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Head.Base.Head_PubSub_ReqRes_Message
	var $Pather_Common_Models_Head_Base_Head_PubSub_ReqRes_Message = function() {
	};
	$Pather_Common_Models_Head_Base_Head_PubSub_ReqRes_Message.__typeName = 'Pather.Common.Models.Head.Base.Head_PubSub_ReqRes_Message';
	$Pather_Common_Models_Head_Base_Head_PubSub_ReqRes_Message.createInstance = function() {
		return $Pather_Common_Models_Head_Base_Head_PubSub_ReqRes_Message.$ctor();
	};
	$Pather_Common_Models_Head_Base_Head_PubSub_ReqRes_Message.$ctor = function() {
		var $this = $Pather_Common_Models_Head_Base_Head_PubSub_Message.$ctor();
		$this.response = false;
		$this.messageId = null;
		$this.messageId = $Pather_Common_Utils_Utilities.uniqueId();
		return $this;
	};
	global.Pather.Common.Models.Head.Base.Head_PubSub_ReqRes_Message = $Pather_Common_Models_Head_Base_Head_PubSub_ReqRes_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.ServerManager.CreateGameSegment_Response_ClusterManager_ServerManager_PubSub_ReqRes_Message
	var $Pather_Common_Models_ServerManager_CreateGameSegment_Response_ClusterManager_ServerManager_PubSub_ReqRes_Message = function() {
	};
	$Pather_Common_Models_ServerManager_CreateGameSegment_Response_ClusterManager_ServerManager_PubSub_ReqRes_Message.__typeName = 'Pather.Common.Models.ServerManager.CreateGameSegment_Response_ClusterManager_ServerManager_PubSub_ReqRes_Message';
	$Pather_Common_Models_ServerManager_CreateGameSegment_Response_ClusterManager_ServerManager_PubSub_ReqRes_Message.createInstance = function() {
		return $Pather_Common_Models_ServerManager_CreateGameSegment_Response_ClusterManager_ServerManager_PubSub_ReqRes_Message.$ctor();
	};
	$Pather_Common_Models_ServerManager_CreateGameSegment_Response_ClusterManager_ServerManager_PubSub_ReqRes_Message.$ctor = function() {
		var $this = $Pather_Common_Models_ServerManager_Base_ServerManager_PubSub_ReqRes_Message.$ctor();
		$this.gameSegmentId = null;
		$this.type = 'createGameSegment';
		$this.response = true;
		return $this;
	};
	global.Pather.Common.Models.ServerManager.CreateGameSegment_Response_ClusterManager_ServerManager_PubSub_ReqRes_Message = $Pather_Common_Models_ServerManager_CreateGameSegment_Response_ClusterManager_ServerManager_PubSub_ReqRes_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.ServerManager.CreateGateway_Response_ClusterManager_ServerManager_PubSub_ReqRes_Message
	var $Pather_Common_Models_ServerManager_CreateGateway_Response_ClusterManager_ServerManager_PubSub_ReqRes_Message = function() {
	};
	$Pather_Common_Models_ServerManager_CreateGateway_Response_ClusterManager_ServerManager_PubSub_ReqRes_Message.__typeName = 'Pather.Common.Models.ServerManager.CreateGateway_Response_ClusterManager_ServerManager_PubSub_ReqRes_Message';
	$Pather_Common_Models_ServerManager_CreateGateway_Response_ClusterManager_ServerManager_PubSub_ReqRes_Message.createInstance = function() {
		return $Pather_Common_Models_ServerManager_CreateGateway_Response_ClusterManager_ServerManager_PubSub_ReqRes_Message.$ctor();
	};
	$Pather_Common_Models_ServerManager_CreateGateway_Response_ClusterManager_ServerManager_PubSub_ReqRes_Message.$ctor = function() {
		var $this = $Pather_Common_Models_ServerManager_Base_ServerManager_PubSub_ReqRes_Message.$ctor();
		$this.gatewayId = null;
		$this.type = 'createGateway';
		$this.response = true;
		return $this;
	};
	global.Pather.Common.Models.ServerManager.CreateGateway_Response_ClusterManager_ServerManager_PubSub_ReqRes_Message = $Pather_Common_Models_ServerManager_CreateGateway_Response_ClusterManager_ServerManager_PubSub_ReqRes_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.ServerManager.Base.CreateGameSegment_GameWorld_ServerManager_PubSub_ReqRes_Message
	var $Pather_Common_Models_ServerManager_Base_CreateGameSegment_GameWorld_ServerManager_PubSub_ReqRes_Message = function() {
	};
	$Pather_Common_Models_ServerManager_Base_CreateGameSegment_GameWorld_ServerManager_PubSub_ReqRes_Message.__typeName = 'Pather.Common.Models.ServerManager.Base.CreateGameSegment_GameWorld_ServerManager_PubSub_ReqRes_Message';
	$Pather_Common_Models_ServerManager_Base_CreateGameSegment_GameWorld_ServerManager_PubSub_ReqRes_Message.createInstance = function() {
		return $Pather_Common_Models_ServerManager_Base_CreateGameSegment_GameWorld_ServerManager_PubSub_ReqRes_Message.$ctor();
	};
	$Pather_Common_Models_ServerManager_Base_CreateGameSegment_GameWorld_ServerManager_PubSub_ReqRes_Message.$ctor = function() {
		var $this = $Pather_Common_Models_ServerManager_Base_ServerManager_PubSub_ReqRes_Message.$ctor();
		$this.type = 'createGameSegment';
		return $this;
	};
	global.Pather.Common.Models.ServerManager.Base.CreateGameSegment_GameWorld_ServerManager_PubSub_ReqRes_Message = $Pather_Common_Models_ServerManager_Base_CreateGameSegment_GameWorld_ServerManager_PubSub_ReqRes_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.ServerManager.Base.CreateGateway_Head_ServerManager_PubSub_ReqRes_Message
	var $Pather_Common_Models_ServerManager_Base_CreateGateway_Head_ServerManager_PubSub_ReqRes_Message = function() {
	};
	$Pather_Common_Models_ServerManager_Base_CreateGateway_Head_ServerManager_PubSub_ReqRes_Message.__typeName = 'Pather.Common.Models.ServerManager.Base.CreateGateway_Head_ServerManager_PubSub_ReqRes_Message';
	$Pather_Common_Models_ServerManager_Base_CreateGateway_Head_ServerManager_PubSub_ReqRes_Message.createInstance = function() {
		return $Pather_Common_Models_ServerManager_Base_CreateGateway_Head_ServerManager_PubSub_ReqRes_Message.$ctor();
	};
	$Pather_Common_Models_ServerManager_Base_CreateGateway_Head_ServerManager_PubSub_ReqRes_Message.$ctor = function() {
		var $this = $Pather_Common_Models_ServerManager_Base_ServerManager_PubSub_ReqRes_Message.$ctor();
		$this.type = 'createGateway';
		return $this;
	};
	global.Pather.Common.Models.ServerManager.Base.CreateGateway_Head_ServerManager_PubSub_ReqRes_Message = $Pather_Common_Models_ServerManager_Base_CreateGateway_Head_ServerManager_PubSub_ReqRes_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.ServerManager.Base.ServerManager_PubSub_Message
	var $Pather_Common_Models_ServerManager_Base_ServerManager_PubSub_Message = function() {
	};
	$Pather_Common_Models_ServerManager_Base_ServerManager_PubSub_Message.__typeName = 'Pather.Common.Models.ServerManager.Base.ServerManager_PubSub_Message';
	$Pather_Common_Models_ServerManager_Base_ServerManager_PubSub_Message.$ctor = function() {
		var $this = {};
		$this.type = null;
		return $this;
	};
	global.Pather.Common.Models.ServerManager.Base.ServerManager_PubSub_Message = $Pather_Common_Models_ServerManager_Base_ServerManager_PubSub_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.ServerManager.Base.ServerManager_PubSub_MessageType
	var $Pather_Common_Models_ServerManager_Base_ServerManager_PubSub_MessageType = function() {
	};
	$Pather_Common_Models_ServerManager_Base_ServerManager_PubSub_MessageType.__typeName = 'Pather.Common.Models.ServerManager.Base.ServerManager_PubSub_MessageType';
	global.Pather.Common.Models.ServerManager.Base.ServerManager_PubSub_MessageType = $Pather_Common_Models_ServerManager_Base_ServerManager_PubSub_MessageType;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.ServerManager.Base.ServerManager_PubSub_ReqRes_Message
	var $Pather_Common_Models_ServerManager_Base_ServerManager_PubSub_ReqRes_Message = function() {
	};
	$Pather_Common_Models_ServerManager_Base_ServerManager_PubSub_ReqRes_Message.__typeName = 'Pather.Common.Models.ServerManager.Base.ServerManager_PubSub_ReqRes_Message';
	$Pather_Common_Models_ServerManager_Base_ServerManager_PubSub_ReqRes_Message.createInstance = function() {
		return $Pather_Common_Models_ServerManager_Base_ServerManager_PubSub_ReqRes_Message.$ctor();
	};
	$Pather_Common_Models_ServerManager_Base_ServerManager_PubSub_ReqRes_Message.$ctor = function() {
		var $this = $Pather_Common_Models_ServerManager_Base_ServerManager_PubSub_Message.$ctor();
		$this.response = false;
		$this.messageId = null;
		$this.messageId = $Pather_Common_Utils_Utilities.uniqueId();
		return $this;
	};
	global.Pather.Common.Models.ServerManager.Base.ServerManager_PubSub_ReqRes_Message = $Pather_Common_Models_ServerManager_Base_ServerManager_PubSub_ReqRes_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Tick.Ping_Tick_PubSub_Message
	var $Pather_Common_Models_Tick_Ping_Tick_PubSub_Message = function() {
	};
	$Pather_Common_Models_Tick_Ping_Tick_PubSub_Message.__typeName = 'Pather.Common.Models.Tick.Ping_Tick_PubSub_Message';
	$Pather_Common_Models_Tick_Ping_Tick_PubSub_Message.createInstance = function() {
		return $Pather_Common_Models_Tick_Ping_Tick_PubSub_Message.$ctor();
	};
	$Pather_Common_Models_Tick_Ping_Tick_PubSub_Message.$ctor = function() {
		var $this = $Pather_Common_Models_Tick_Base_Tick_PubSub_Message.$ctor();
		$this.origin = null;
		$this.originType = 0;
		$this.type = 'ping';
		return $this;
	};
	global.Pather.Common.Models.Tick.Ping_Tick_PubSub_Message = $Pather_Common_Models_Tick_Ping_Tick_PubSub_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Tick.Ping_Tick_PubSub_Message_OriginType
	var $Pather_Common_Models_Tick_Ping_Tick_PubSub_Message_OriginType = function() {
	};
	$Pather_Common_Models_Tick_Ping_Tick_PubSub_Message_OriginType.__typeName = 'Pather.Common.Models.Tick.Ping_Tick_PubSub_Message_OriginType';
	global.Pather.Common.Models.Tick.Ping_Tick_PubSub_Message_OriginType = $Pather_Common_Models_Tick_Ping_Tick_PubSub_Message_OriginType;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Tick.Base.Tick_PubSub_Message
	var $Pather_Common_Models_Tick_Base_Tick_PubSub_Message = function() {
	};
	$Pather_Common_Models_Tick_Base_Tick_PubSub_Message.__typeName = 'Pather.Common.Models.Tick.Base.Tick_PubSub_Message';
	$Pather_Common_Models_Tick_Base_Tick_PubSub_Message.$ctor = function() {
		var $this = {};
		$this.type = null;
		return $this;
	};
	global.Pather.Common.Models.Tick.Base.Tick_PubSub_Message = $Pather_Common_Models_Tick_Base_Tick_PubSub_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Tick.Base.Tick_PubSub_MessageType
	var $Pather_Common_Models_Tick_Base_Tick_PubSub_MessageType = function() {
	};
	$Pather_Common_Models_Tick_Base_Tick_PubSub_MessageType.__typeName = 'Pather.Common.Models.Tick.Base.Tick_PubSub_MessageType';
	global.Pather.Common.Models.Tick.Base.Tick_PubSub_MessageType = $Pather_Common_Models_Tick_Base_Tick_PubSub_MessageType;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.old.ActionType
	var $Pather_Common_old_ActionType = function() {
	};
	$Pather_Common_old_ActionType.__typeName = 'Pather.Common.old.ActionType';
	global.Pather.Common.old.ActionType = $Pather_Common_old_ActionType;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.old.Entity
	var $Pather_Common_old_Entity = function(game, playerId) {
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
	$Pather_Common_old_Entity.__typeName = 'Pather.Common.old.Entity';
	global.Pather.Common.old.Entity = $Pather_Common_old_Entity;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.old.Game
	var $Pather_Common_old_Game = function() {
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
	$Pather_Common_old_Game.__typeName = 'Pather.Common.old.Game';
	global.Pather.Common.old.Game = $Pather_Common_old_Game;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.old.IAction
	var $Pather_Common_old_IAction = function() {
	};
	$Pather_Common_old_IAction.__typeName = 'Pather.Common.old.IAction';
	global.Pather.Common.old.IAction = $Pather_Common_old_IAction;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.old.MoveAction
	var $Pather_Common_old_MoveAction = function(moveModel, lockstepTickNumber) {
		this.moveModel = null;
		this.$1$LockstepTickNumberField = 0;
		this.moveModel = moveModel;
		this.set_lockstepTickNumber(lockstepTickNumber);
	};
	$Pather_Common_old_MoveAction.__typeName = 'Pather.Common.old.MoveAction';
	global.Pather.Common.old.MoveAction = $Pather_Common_old_MoveAction;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.old.NoopAction
	var $Pather_Common_old_NoopAction = function(lockstepTickNumber) {
		this.$1$LockstepTickNumberField = 0;
		this.set_lockstepTickNumber(lockstepTickNumber);
	};
	$Pather_Common_old_NoopAction.__typeName = 'Pather.Common.old.NoopAction';
	global.Pather.Common.old.NoopAction = $Pather_Common_old_NoopAction;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.old.SerializableAction
	var $Pather_Common_old_SerializableAction = function() {
	};
	$Pather_Common_old_SerializableAction.__typeName = 'Pather.Common.old.SerializableAction';
	$Pather_Common_old_SerializableAction.createInstance = function() {
		return $Pather_Common_old_SerializableAction.$ctor();
	};
	$Pather_Common_old_SerializableAction.$ctor = function() {
		var $this = {};
		$this.data = null;
		$this.lockstepTickNumber = 0;
		$this.type = 0;
		return $this;
	};
	global.Pather.Common.old.SerializableAction = $Pather_Common_old_SerializableAction;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.old.StepManager
	var $Pather_Common_old_StepManager = function(game) {
		this.lastTickProcessed = 0;
		this.game = null;
		this.stepActionsTicks = null;
		this.$misprocess = 0;
		this.game = game;
		this.stepActionsTicks = new (ss.makeGenericType(ss.Dictionary$2, [ss.Int32, Array]))();
		this.lastTickProcessed = 0;
	};
	$Pather_Common_old_StepManager.__typeName = 'Pather.Common.old.StepManager';
	global.Pather.Common.old.StepManager = $Pather_Common_old_StepManager;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.old.TickResult
	var $Pather_Common_old_TickResult = function() {
	};
	$Pather_Common_old_TickResult.__typeName = 'Pather.Common.old.TickResult';
	global.Pather.Common.old.TickResult = $Pather_Common_old_TickResult;
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
	var $Pather_Common_TestFramework_AssertException = function(failedAssertion) {
		this.$2$FailedAssertionField = null;
		ss.Exception.call(this);
		this.set_failedAssertion(failedAssertion);
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
	var $Pather_Common_TestFramework_TestClassAttribute = function(disable) {
		this.$2$DisableField = false;
		this.set_disable(disable);
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
			var customAttributes = (methodInfo.attr || []).filter(function(a) {
				return ss.isInstanceOfType(a, $Pather_Common_TestFramework_TestMethodAttribute);
			});
			if (customAttributes.length > 0 && !ss.cast(customAttributes[0], $Pather_Common_TestFramework_TestMethodAttribute).get_disable()) {
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
					console.log('', 'Running test:', testMethod.name, 'Passed');
				}).error(function() {
					progress.$failedCount++;
				});
				try {
					console.log('Deferring test:', testMethod.name);
					ss.midel(testMethod, testObject)(d);
				}
				catch ($t1) {
					$t1 = ss.Exception.wrap($t1);
					if (ss.isInstanceOfType($t1, $Pather_Common_TestFramework_AssertException)) {
						var ex = ss.cast($t1, $Pather_Common_TestFramework_AssertException);
						console.log('', 'Assert Failed', testMethod.name, 'Failed:', ex.get_failedAssertion());
						d.reject();
					}
					else {
						var ex1 = $t1;
						console.log('', 'Exception', 'Test:', testMethod.name, 'Failed:', ex1.get_message());
						d.reject();
					}
				}
			}
			else {
				throw new ss.Exception('First test param either needs to be empty or Deferred.');
			}
		}
		else {
			try {
				console.log('Running test:', testMethod.name, 'Passed');
				ss.midel(testMethod, testObject)();
				console.log('', 'Test:', testMethod.name, 'Passed');
			}
			catch ($t2) {
				$t2 = ss.Exception.wrap($t2);
				if (ss.isInstanceOfType($t2, $Pather_Common_TestFramework_AssertException)) {
					var ex2 = ss.cast($t2, $Pather_Common_TestFramework_AssertException);
					console.log('', 'Assert Failed', testMethod.name, 'Failed:', ex2.get_failedAssertion());
					d.reject();
				}
				else {
					var ex3 = $t2;
					console.log('', 'Exception', 'Test:', testMethod.name, 'Failed:', ex3.get_message());
					progress.$failedCount++;
				}
			}
			progress.$passedCount++;
			d.resolve();
		}
		return d.promise;
	};
	$Pather_Common_TestFramework_TestFramework.runTests = function(testClass) {
		var allAssemblies = ss.getAssemblies();
		var testClassesPromises = [];
		for (var $t1 = 0; $t1 < allAssemblies.length; $t1++) {
			var assembly = allAssemblies[$t1];
			var $t2 = ss.getAssemblyTypes(assembly);
			for (var $t3 = 0; $t3 < $t2.length; $t3++) {
				var type = $t2[$t3];
				var customAttributes = ss.getAttributes(type, $Pather_Common_TestFramework_TestClassAttribute, true);
				if (customAttributes.length > 0 && !ss.cast(customAttributes[0], $Pather_Common_TestFramework_TestClassAttribute).get_disable()) {
					if (ss.isNullOrEmptyString(testClass) || ss.referenceEquals(ss.getTypeName(type), testClass)) {
						testClassesPromises.push($Pather_Common_TestFramework_TestFramework.runTests$1(type));
					}
				}
			}
		}
		$Pather_Common_Utils_Promises_Q.all(Array.prototype.slice.call(testClassesPromises)).then(function() {
			console.log('Done running tests.');
			if (ss.isValue(global.process)) {
				global.process.exit();
			}
		});
	};
	global.Pather.Common.TestFramework.TestFramework = $Pather_Common_TestFramework_TestFramework;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.TestFramework.TestMethodAttribute
	var $Pather_Common_TestFramework_TestMethodAttribute = function(disable) {
		this.$2$DisableField = false;
		this.set_disable(disable);
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
	// Pather.Common.Utils.DictionaryList
	var $Pather_Common_Utils_DictionaryList$2 = function(TKey, T) {
		var $type = function(setKeyCallback) {
			this.dictionary = {};
			this.list = [];
			this.keys = [];
			this.$setKeyCallback = null;
			this.$setKeyCallback = setKeyCallback;
		};
		ss.registerGenericClassInstance($type, $Pather_Common_Utils_DictionaryList$2, [TKey, T], {
			get_count: function() {
				return this.list.length;
			},
			add: function(t) {
				this.list.push(t);
				var key = this.$setKeyCallback(t);
				this.keys.push(key);
				this.dictionary[key] = t;
			},
			remove: function(t) {
				ss.remove(this.list, t);
				var key = this.$setKeyCallback(t);
				this.keys.push(key);
				delete this.dictionary[key];
			},
			get: function(index) {
				return this.list[index];
			},
			get$1: function(key) {
				return this.dictionary[key];
			},
			clear: function() {
				ss.clear(this.keys);
				ss.clearKeys(this.dictionary);
				ss.clear(this.list);
			},
			contains$1: function(key) {
				return ss.keyExists(this.dictionary, key);
			},
			contains: function(item) {
				return ss.contains(this.list, item);
			},
			get_item: function(key) {
				return this.dictionary[key];
			},
			get_item$1: function(index) {
				return this.list[index];
			},
			updateKey: function(user) {
				throw new ss.NotImplementedException();
			}
		}, function() {
			return null;
		}, function() {
			return [];
		});
		return $type;
	};
	$Pather_Common_Utils_DictionaryList$2.__typeName = 'Pather.Common.Utils.DictionaryList$2';
	ss.initGenericClass($Pather_Common_Utils_DictionaryList$2, $asm, 2);
	global.Pather.Common.Utils.DictionaryList$2 = $Pather_Common_Utils_DictionaryList$2;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Utils.EnumerableExtensions
	var $Pather_Common_Utils_EnumerableExtensions = function() {
	};
	$Pather_Common_Utils_EnumerableExtensions.__typeName = 'Pather.Common.Utils.EnumerableExtensions';
	$Pather_Common_Utils_EnumerableExtensions.toDictionary = function(T, T2) {
		return function(items, clause) {
			var items2 = {};
			for (var $t1 = 0; $t1 < items.length; $t1++) {
				var item = items[$t1];
				items2[clause(item)] = item;
			}
			return items2;
		};
	};
	$Pather_Common_Utils_EnumerableExtensions.indexOfFast = function(items, ind) {
		for (var index = 0; index < items.length; index++) {
			var item = items[index];
			if (item === ind) {
				return index;
			}
		}
		return -1;
	};
	$Pather_Common_Utils_EnumerableExtensions.groupBy = function(items, callback) {
		var kitems = {};
		for (var $t1 = 0; $t1 < items.length; $t1++) {
			var item = items[$t1];
			var k = callback(item);
			if (!ss.keyExists(kitems, k)) {
				kitems[k] = [];
			}
			kitems[k].push(item);
		}
		return kitems;
	};
	$Pather_Common_Utils_EnumerableExtensions.indexOfFast$1 = function(items, ind) {
		for (var index = 0; index < items.length; index++) {
			var item = items[index];
			if (item === ind) {
				return index;
			}
		}
		return -1;
	};
	$Pather_Common_Utils_EnumerableExtensions.where$1 = function(items, clause) {
		var items2 = [];
		for (var $t1 = 0; $t1 < items.length; $t1++) {
			var item = items[$t1];
			if (clause(item)) {
				items2.push(item);
			}
		}
		return Array.prototype.slice.call(items2);
	};
	$Pather_Common_Utils_EnumerableExtensions.first$2 = function(T) {
		return function(items, clause) {
			for (var $t1 = 0; $t1 < items.length; $t1++) {
				var item = items[$t1];
				if (clause(item)) {
					return item;
				}
			}
			return ss.getDefaultValue(T);
		};
	};
	$Pather_Common_Utils_EnumerableExtensions.all$1 = function(items, clause) {
		for (var $t1 = 0; $t1 < items.length; $t1++) {
			var item = items[$t1];
			if (!clause(item)) {
				return false;
			}
		}
		return true;
	};
	$Pather_Common_Utils_EnumerableExtensions.first$1 = function(T) {
		return function(items, clause) {
			var $t1 = ss.getEnumerator(items);
			try {
				while ($t1.moveNext()) {
					var item = $t1.current();
					if (clause(item)) {
						return item;
					}
				}
			}
			finally {
				$t1.dispose();
			}
			return ss.getDefaultValue(T);
		};
	};
	$Pather_Common_Utils_EnumerableExtensions.first = function(T) {
		return function(items) {
			var $t1 = ss.getEnumerator(items);
			try {
				while ($t1.moveNext()) {
					var item = $t1.current();
					return item;
				}
			}
			finally {
				$t1.dispose();
			}
			return ss.getDefaultValue(T);
		};
	};
	$Pather_Common_Utils_EnumerableExtensions.average = function(items, clause) {
		var sum = 0;
		var count = 0;
		var $t1 = ss.getEnumerator(items);
		try {
			while ($t1.moveNext()) {
				var item = $t1.current();
				count++;
				sum += clause(item);
			}
		}
		finally {
			$t1.dispose();
		}
		return sum / count;
	};
	$Pather_Common_Utils_EnumerableExtensions.all = function(items, clause) {
		for (var $t1 = 0; $t1 < items.length; $t1++) {
			var item = items[$t1];
			if (!clause(item)) {
				return false;
			}
		}
		return true;
	};
	$Pather_Common_Utils_EnumerableExtensions.any = function(items, clause) {
		var $t1 = ss.getEnumerator(items);
		try {
			while ($t1.moveNext()) {
				var item = $t1.current();
				if (clause(item)) {
					return true;
				}
			}
		}
		finally {
			$t1.dispose();
		}
		return false;
	};
	$Pather_Common_Utils_EnumerableExtensions.any$1 = function(items, clause) {
		for (var $t1 = 0; $t1 < items.length; $t1++) {
			var item = items[$t1];
			if (clause(item)) {
				return true;
			}
		}
		return false;
	};
	$Pather_Common_Utils_EnumerableExtensions.orderBy$3 = function(items, clause) {
		var j = ss.arrayClone(items);
		j.sort(function(a, b) {
			return ss.compare(clause(a), clause(b));
		});
		return j;
	};
	$Pather_Common_Utils_EnumerableExtensions.orderBy = function(items, clause) {
		var j = ss.arrayClone(Array.prototype.slice.call(items));
		j.sort(function(a, b) {
			return ss.compare(clause(a), clause(b));
		});
		return j;
	};
	$Pather_Common_Utils_EnumerableExtensions.orderBy$4 = function(items, clause) {
		var j = ss.arrayClone(items);
		j.sort(function(a, b) {
			return ss.compare(clause(a), clause(b));
		});
		return j;
	};
	$Pather_Common_Utils_EnumerableExtensions.orderBy$1 = function(items, clause) {
		var j = ss.arrayClone(Array.prototype.slice.call(items));
		j.sort(function(a, b) {
			return ss.compare(clause(a), clause(b));
		});
		return j;
	};
	$Pather_Common_Utils_EnumerableExtensions.orderBy$5 = function(items, clause) {
		var j = ss.arrayClone(items);
		j.sort(function(a, b) {
			return ss.compare(clause(a), clause(b));
		});
		return j;
	};
	$Pather_Common_Utils_EnumerableExtensions.orderBy$2 = function(items, clause) {
		var j = ss.arrayClone(Array.prototype.slice.call(items));
		j.sort(function(a, b) {
			return ss.compare(clause(a), clause(b));
		});
		return j;
	};
	$Pather_Common_Utils_EnumerableExtensions.select$1 = function(items, clause) {
		var items2 = [];
		for (var $t1 = 0; $t1 < items.length; $t1++) {
			var item = items[$t1];
			items2.push(clause(item));
		}
		return items2;
	};
	$Pather_Common_Utils_EnumerableExtensions.selectMany = function(items, clause) {
		var items2 = [];
		for (var $t1 = 0; $t1 < items.length; $t1++) {
			var item = items[$t1];
			ss.arrayAddRange(items2, clause(item));
		}
		return items2;
	};
	$Pather_Common_Utils_EnumerableExtensions.take = function(items, count) {
		var items2 = [];
		var c = 0;
		for (var $t1 = 0; $t1 < items.length; $t1++) {
			var item = items[$t1];
			items2.push(item);
			c++;
			if (c === count) {
				return items2;
			}
		}
		return items2;
	};
	$Pather_Common_Utils_EnumerableExtensions.where = function(items, clause) {
		var items2 = [];
		var $t1 = ss.getEnumerator(items);
		try {
			while ($t1.moveNext()) {
				var item = $t1.current();
				if (clause(item)) {
					items2.push(item);
				}
			}
		}
		finally {
			$t1.dispose();
		}
		return Array.prototype.slice.call(items2);
	};
	$Pather_Common_Utils_EnumerableExtensions.select = function(items, clause) {
		var items2 = [];
		for (var $t1 = 0; $t1 < items.length; $t1++) {
			var item = items[$t1];
			items2.push(clause(item));
		}
		return items2;
	};
	global.Pather.Common.Utils.EnumerableExtensions = $Pather_Common_Utils_EnumerableExtensions;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Utils.Lerper
	var $Pather_Common_Utils_Lerper = function() {
	};
	$Pather_Common_Utils_Lerper.__typeName = 'Pather.Common.Utils.Lerper';
	$Pather_Common_Utils_Lerper.lerp = function(start, end, duration) {
		return start + (end - start) * duration;
	};
	$Pather_Common_Utils_Lerper.moveTowards = function(start, end, amount) {
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
	global.Pather.Common.Utils.Lerper = $Pather_Common_Utils_Lerper;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Utils.Logger
	var $Pather_Common_Utils_Logger = function() {
	};
	$Pather_Common_Utils_Logger.__typeName = 'Pather.Common.Utils.Logger';
	$Pather_Common_Utils_Logger.start = function(key) {
		console.log(key + ' - ' + $Pather_Common_Utils_Utilities.longDate());
		$Pather_Common_Utils_Logger.log('Start: ' + key, 'information');
	};
	$Pather_Common_Utils_Logger.log = function(item, level) {
		item = ss.formatString('{0} - {1}', $Pather_Common_Utils_Utilities.shortDate(), item);
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
	global.Pather.Common.Utils.Logger = $Pather_Common_Utils_Logger;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Utils.LogLevel
	var $Pather_Common_Utils_LogLevel = function() {
	};
	$Pather_Common_Utils_LogLevel.__typeName = 'Pather.Common.Utils.LogLevel';
	global.Pather.Common.Utils.LogLevel = $Pather_Common_Utils_LogLevel;
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
	// Pather.Common.Utils.TickManager
	var $Pather_Common_Utils_TickManager = function() {
		this.lockstepTickNumber = 0;
		this.$currentLockstepTime = 0;
		this.currentServerLatency = 0;
	};
	$Pather_Common_Utils_TickManager.__typeName = 'Pather.Common.Utils.TickManager';
	global.Pather.Common.Utils.TickManager = $Pather_Common_Utils_TickManager;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Utils.Utilities
	var $Pather_Common_Utils_Utilities = function() {
	};
	$Pather_Common_Utils_Utilities.__typeName = 'Pather.Common.Utils.Utilities';
	$Pather_Common_Utils_Utilities.shortDate = function() {
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
	$Pather_Common_Utils_Utilities.longDate = function() {
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
	$Pather_Common_Utils_Utilities.uniqueId = function() {
		return ss.Guid.format(ss.Guid.newGuid(), 'N');
	};
	$Pather_Common_Utils_Utilities.hasField = function(T) {
		return function(message, predicate) {
			var m = predicate(message);
			return !(typeof(m) === 'undefined');
		};
	};
	global.Pather.Common.Utils.Utilities = $Pather_Common_Utils_Utilities;
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
		this.isResolved = false;
		this.isRejected = false;
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
			this.isResolved = false;
			this.isRejected = false;
			this.$resolvedValue = ss.getDefaultValue(TResolve);
			this.$rejectedValue = ss.getDefaultValue(TError);
			this.$resolves = [];
			this.$rejects = [];
			this.$finallys = [];
		};
		ss.registerGenericClassInstance($type, $Pather_Common_Utils_Promises_Promise$2, [TResolve, TError], {
			$resolve: function(item) {
				if (this.isResolved || this.isRejected) {
					throw new ss.Exception('Can only resolve promise once.');
				}
				this.isResolved = true;
				this.$resolvedValue = item;
				for (var $t1 = 0; $t1 < this.$resolves.length; $t1++) {
					var resolve = this.$resolves[$t1];
					resolve(item);
				}
				for (var $t2 = 0; $t2 < this.$finallys.length; $t2++) {
					var finally1 = this.$finallys[$t2];
					finally1();
				}
			},
			$reject: function(item) {
				if (this.isResolved || this.isRejected) {
					throw new ss.Exception('Can only resolve promise once.');
				}
				this.isRejected = true;
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
			error: function(error) {
				if (this.isRejected) {
					error(this.$rejectedValue);
				}
				else {
					this.$rejects.push(error);
				}
				return this;
			},
			finally$1: function(finally1) {
				if (this.isRejected || this.isResolved) {
					finally1();
				}
				else {
					this.$finallys.push(finally1);
				}
				return this;
			},
			then: function(resolve) {
				if (this.isResolved) {
					resolve(this.$resolvedValue);
				}
				else {
					this.$resolves.push(resolve);
				}
				return this;
			},
			passThrough: function(passThrough) {
				this.then(ss.mkdel(passThrough, passThrough.$resolve)).error(ss.mkdel(passThrough, passThrough.$reject));
				return passThrough;
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
			if (promises.length === 0) {
				deferred.resolve([]);
			}
			else {
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
					promise.then(resolveCallback).error(rejectCallback);
				}
			}
			return deferred.promise;
		};
	};
	$Pather_Common_Utils_Promises_Q.allSequential$1 = function(TResolve, TError) {
		return function(promises) {
			var deferred = $Pather_Common_Utils_Promises_Q.defer$2(Array, TError).call(null);
			if (promises.length === 0) {
				deferred.resolve([]);
			}
			else {
				var count = 0;
				var resolves = [];
				var rejectCallback = ss.mkdel(deferred, deferred.reject);
				var resolveCallback = null;
				resolveCallback = function(resolve) {
					count++;
					resolves.push(resolve);
					if (count === promises.length) {
						deferred.resolve(Array.prototype.slice.call(resolves));
					}
					else {
						promises[count].then(resolveCallback).error(rejectCallback);
					}
				};
				promises[0].then(resolveCallback).error(rejectCallback);
			}
			return deferred.promise;
		};
	};
	$Pather_Common_Utils_Promises_Q.allSequential = function(promises) {
		var deferred = $Pather_Common_Utils_Promises_Q.defer();
		if (promises.length === 0) {
			deferred.resolve();
		}
		else {
			var count = 0;
			var rejectCallback = ss.mkdel(deferred, deferred.reject);
			var resolveCallback = null;
			resolveCallback = function() {
				count++;
				if (count === promises.length) {
					deferred.resolve();
				}
				else {
					promises[count].then(resolveCallback).error(rejectCallback);
				}
			};
			promises[0].then(resolveCallback).error(rejectCallback);
		}
		return deferred.promise;
	};
	$Pather_Common_Utils_Promises_Q.all = function(promises) {
		var deferred = $Pather_Common_Utils_Promises_Q.defer();
		if (promises.length === 0) {
			deferred.resolve();
		}
		else {
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
		}
		return deferred.promise;
	};
	$Pather_Common_Utils_Promises_Q.all$2 = function(promises) {
		return $Pather_Common_Utils_Promises_Q.all(Array.prototype.slice.call(promises));
	};
	$Pather_Common_Utils_Promises_Q.allSequential$2 = function(promises) {
		return $Pather_Common_Utils_Promises_Q.allSequential(Array.prototype.slice.call(promises));
	};
	$Pather_Common_Utils_Promises_Q.all$3 = function(TResolve, TError) {
		return function(promises) {
			return $Pather_Common_Utils_Promises_Q.all$1(TResolve, TError).call(null, Array.prototype.slice.call(promises));
		};
	};
	$Pather_Common_Utils_Promises_Q.allSequential$3 = function(TResolve, TError) {
		return function(promises) {
			return $Pather_Common_Utils_Promises_Q.allSequential$1(TResolve, TError).call(null, Array.prototype.slice.call(promises));
		};
	};
	$Pather_Common_Utils_Promises_Q.resolvedPromise = function() {
		var deferred = $Pather_Common_Utils_Promises_Q.defer();
		deferred.resolve();
		return deferred.promise;
	};
	$Pather_Common_Utils_Promises_Q.resolvedPromise$1 = function(TResolve, TError) {
		return function(resolve) {
			var deferred = $Pather_Common_Utils_Promises_Q.defer$2(TResolve, TError).call(null);
			deferred.resolve(resolve);
			return deferred.promise;
		};
	};
	$Pather_Common_Utils_Promises_Q.rejectedPromise = function() {
		var deferred = $Pather_Common_Utils_Promises_Q.defer();
		deferred.resolve();
		return deferred.promise;
	};
	$Pather_Common_Utils_Promises_Q.rejectedPromise$1 = function(TResolve, TError) {
		return function(error) {
			var deferred = $Pather_Common_Utils_Promises_Q.defer$2(TResolve, TError).call(null);
			deferred.reject(error);
			return deferred.promise;
		};
	};
	global.Pather.Common.Utils.Promises.Q = $Pather_Common_Utils_Promises_Q;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Utils.Promises.UndefinedPromiseError
	var $Pather_Common_Utils_Promises_UndefinedPromiseError = function() {
	};
	$Pather_Common_Utils_Promises_UndefinedPromiseError.__typeName = 'Pather.Common.Utils.Promises.UndefinedPromiseError';
	global.Pather.Common.Utils.Promises.UndefinedPromiseError = $Pather_Common_Utils_Promises_UndefinedPromiseError;
	ss.initClass($Pather_$Common_TestFramework_TestFramework$TestProgressCounter, $asm, {});
	ss.initClass($Pather_Common_Constants, $asm, {});
	ss.initClass($Pather_Common_SocketChannels, $asm, {});
	ss.initEnum($Pather_Common_SocketChannels$Client, $asm, { postAction: 'postAction', joinPlayer: 'joinPlayer', ping: 'ping' }, true);
	ss.initEnum($Pather_Common_SocketChannels$Server, $asm, { connect: 'connect', postAction: 'postAction', playerSync: 'playerSync', pong: 'pong', syncLockstep: 'syncLockstep' }, true);
	ss.initInterface($Pather_Common_Models_Common_IPubSub_Message, $asm, {});
	ss.initClass($Pather_Common_Models_ClusterManager_Base_ClusterManager_PubSub_Message, $asm, {}, null, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initInterface($Pather_Common_Models_Common_IPubSub_ReqRes_Message, $asm, {}, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initClass($Pather_Common_Models_ClusterManager_Base_ClusterManager_PubSub_ReqRes_Message, $asm, {}, $Pather_Common_Models_ClusterManager_Base_ClusterManager_PubSub_Message, [$Pather_Common_Models_Common_IPubSub_Message, $Pather_Common_Models_Common_IPubSub_ReqRes_Message]);
	ss.initClass($Pather_Common_Models_ClusterManager_CreateGameSegment_ServerManager_ClusterManager_PubSub_ReqRes_Message, $asm, {}, $Pather_Common_Models_ClusterManager_Base_ClusterManager_PubSub_ReqRes_Message, [$Pather_Common_Models_Common_IPubSub_Message, $Pather_Common_Models_Common_IPubSub_ReqRes_Message]);
	ss.initClass($Pather_Common_Models_ClusterManager_CreateGateway_ServerManager_ClusterManager_PubSub_ReqRes_Message, $asm, {}, $Pather_Common_Models_ClusterManager_Base_ClusterManager_PubSub_ReqRes_Message, [$Pather_Common_Models_Common_IPubSub_Message, $Pather_Common_Models_Common_IPubSub_ReqRes_Message]);
	ss.initEnum($Pather_Common_Models_ClusterManager_Base_ClusterManager_PubSub_MessageType, $asm, { createGameSegment: 'createGameSegment', createGateway: 'createGateway' }, true);
	ss.initClass($Pather_Common_Models_Common_PubSub_Message_Collection, $asm, {}, null, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initClass($Pather_Common_Models_Common_UpdatedNeighbor, $asm, {});
	ss.initClass($Pather_Common_Models_Common_UserMovedMessage, $asm, {});
	ss.initClass($Pather_Common_Models_Game_Old_ConnectedModel, $asm, {});
	ss.initClass($Pather_Common_Models_Game_Old_MoveModel, $asm, {});
	ss.initClass($Pather_Common_Models_Game_Old_PingPongModel, $asm, {});
	ss.initClass($Pather_Common_Models_Game_Old_PlayerJoinModel, $asm, {});
	ss.initClass($Pather_Common_Models_Game_Old_PlayerModel, $asm, {});
	ss.initClass($Pather_Common_Models_Game_Old_PlayerSyncModel, $asm, {});
	ss.initClass($Pather_Common_Models_Game_Old_SyncLockstepModel, $asm, {});
	ss.initClass($Pather_Common_Models_GameSegment_InitialGameUser, $asm, {});
	ss.initClass($Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_Message, $asm, {}, null, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initClass($Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_ReqRes_Message, $asm, {}, $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_Message, [$Pather_Common_Models_Common_IPubSub_Message, $Pather_Common_Models_Common_IPubSub_ReqRes_Message]);
	ss.initClass($Pather_Common_Models_GameSegment_InitializeGameSegment_Response_GameWorld_GameSegment_PubSub_ReqRes_Message, $asm, {}, $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_ReqRes_Message, [$Pather_Common_Models_Common_IPubSub_Message, $Pather_Common_Models_Common_IPubSub_ReqRes_Message]);
	ss.initClass($Pather_Common_Models_GameSegment_NewGameSegment_GameWorld_GameSegment_PubSub_Message, $asm, {}, $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_Message, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initClass($Pather_Common_Models_GameSegment_Pong_Tick_GameSegment_PubSub_Message, $asm, {}, $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_Message, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initClass($Pather_Common_Models_GameSegment_TellUserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message, $asm, {}, $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_ReqRes_Message, [$Pather_Common_Models_Common_IPubSub_Message, $Pather_Common_Models_Common_IPubSub_ReqRes_Message]);
	ss.initClass($Pather_Common_Models_GameSegment_TellUserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message, $asm, {}, $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_ReqRes_Message, [$Pather_Common_Models_Common_IPubSub_Message, $Pather_Common_Models_Common_IPubSub_ReqRes_Message]);
	ss.initClass($Pather_Common_Models_GameSegment_TellUserMoved_GameSegment_GameSegment_PubSub_Message, $asm, {}, $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_Message, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initClass($Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_AllMessage, $asm, {}, null, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initClass($Pather_Common_Models_GameSegment_TickSync_GameSegment_PubSub_AllMessage, $asm, {}, $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_AllMessage, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initClass($Pather_Common_Models_GameSegment_UserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message, $asm, {}, $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_ReqRes_Message, [$Pather_Common_Models_Common_IPubSub_Message, $Pather_Common_Models_Common_IPubSub_ReqRes_Message]);
	ss.initClass($Pather_Common_Models_GameSegment_UserJoinGameUser, $asm, {});
	ss.initClass($Pather_Common_Models_GameSegment_UserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message, $asm, {}, $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_ReqRes_Message, [$Pather_Common_Models_Common_IPubSub_Message, $Pather_Common_Models_Common_IPubSub_ReqRes_Message]);
	ss.initClass($Pather_Common_Models_GameSegment_UserMoved_GameSegment_GameSegment_PubSub_Message, $asm, {}, $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_Message, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initEnum($Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_AllMessageType, $asm, { tickSync: 'tickSync' }, true);
	ss.initEnum($Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_MessageType, $asm, { pong: 'pong', tellUserJoin: 'tellUserJoin', initializeGameSegmentResponse: 'initializeGameSegmentResponse', tellUserLeft: 'tellUserLeft', userJoin: 'userJoin', userLeft: 'userLeft', userMoved: 'userMoved', tellUserMoved: 'tellUserMoved', userMovedFromGameSegment: 'userMovedFromGameSegment', newGameSegment: 'newGameSegment' }, true);
	ss.initClass($Pather_Common_Models_GameSegment_Base_UserMoved_Gateway_GameSegment_PubSub_Message, $asm, {}, $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_Message, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initClass($Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_Message, $asm, {}, null, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initEnum($Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_MessageType, $asm, { userJoined: 'userJoined', userJoinResponse: 'userJoinResponse', tellUserJoinResponse: 'tellUserJoinResponse', tellUserLeftResponse: 'tellUserLeftResponse', tickSync: 'tickSync', userLeft: 'userLeft', pong: 'pong', initializeGameSegment: 'initializeGameSegment', tellUserMoved: 'tellUserMoved', createGameSegment: 'createGameSegment' }, true);
	ss.initClass($Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_ReqRes_Message, $asm, {}, $Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_Message, [$Pather_Common_Models_Common_IPubSub_Message, $Pather_Common_Models_Common_IPubSub_ReqRes_Message]);
	ss.initClass($Pather_Common_Models_GameWorld_GameSegment_InitializeGameSegment_GameSegment_GameWorld_PubSub_ReqRes_Message, $asm, {}, $Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_ReqRes_Message, [$Pather_Common_Models_Common_IPubSub_Message, $Pather_Common_Models_Common_IPubSub_ReqRes_Message]);
	ss.initClass($Pather_Common_Models_GameWorld_GameSegment_TellUserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message, $asm, {}, $Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_ReqRes_Message, [$Pather_Common_Models_Common_IPubSub_Message, $Pather_Common_Models_Common_IPubSub_ReqRes_Message]);
	ss.initClass($Pather_Common_Models_GameWorld_GameSegment_TellUserLeft_Response_GameSegment_GameWorld_PubSub_ReqRes_Message, $asm, {}, $Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_ReqRes_Message, [$Pather_Common_Models_Common_IPubSub_Message, $Pather_Common_Models_Common_IPubSub_ReqRes_Message]);
	ss.initClass($Pather_Common_Models_GameWorld_GameSegment_UserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message, $asm, {}, $Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_ReqRes_Message, [$Pather_Common_Models_Common_IPubSub_Message, $Pather_Common_Models_Common_IPubSub_ReqRes_Message]);
	ss.initClass($Pather_Common_Models_GameWorld_GameSegment_UserLeft_Response_GameSegment_GameWorld_PubSub_ReqRes_Message, $asm, {}, $Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_ReqRes_Message, [$Pather_Common_Models_Common_IPubSub_Message, $Pather_Common_Models_Common_IPubSub_ReqRes_Message]);
	ss.initClass($Pather_Common_Models_GameWorld_Gateway_TellUserMoved_GameSegment_GameWorld_PubSub_Message, $asm, {}, $Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_Message, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initClass($Pather_Common_Models_GameWorld_Gateway_UserJoined_Gateway_GameWorld_PubSub_Message, $asm, {}, $Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_Message, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initClass($Pather_Common_Models_GameWorld_Gateway_UserLeft_Gateway_GameWorld_PubSub_Message, $asm, {}, $Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_Message, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initClass($Pather_Common_Models_GameWorld_ServerManager_CreateGameSegment_Response_ServerManager_GameWorld_PubSub_ReqRes_Message, $asm, {}, $Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_ReqRes_Message, [$Pather_Common_Models_Common_IPubSub_Message, $Pather_Common_Models_Common_IPubSub_ReqRes_Message]);
	ss.initClass($Pather_Common_Models_GameWorld_Tick_Pong_Tick_GameWorld_PubSub_Message, $asm, {}, $Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_Message, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initClass($Pather_Common_Models_GameWorld_Tick_TickSync_Tick_GameWorld_PubSub_Message, $asm, {}, $Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_Message, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initClass($Pather_Common_Models_Gateway_PubSub_Base_Gateway_PubSub_AllMessage, $asm, {}, null, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initClass($Pather_Common_Models_Gateway_PubSub_Ping_Head_Gateway_PubSub_AllMessage, $asm, {}, $Pather_Common_Models_Gateway_PubSub_Base_Gateway_PubSub_AllMessage, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initClass($Pather_Common_Models_Gateway_PubSub_Base_Gateway_PubSub_Message, $asm, {}, null, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initClass($Pather_Common_Models_Gateway_PubSub_Pong_Tick_Gateway_PubSub_Message, $asm, {}, $Pather_Common_Models_Gateway_PubSub_Base_Gateway_PubSub_Message, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initClass($Pather_Common_Models_Gateway_PubSub_TickSync_Tick_Gateway_PubSub_AllMessage, $asm, {}, $Pather_Common_Models_Gateway_PubSub_Base_Gateway_PubSub_AllMessage, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initClass($Pather_Common_Models_Gateway_PubSub_UpdateNeighbors_GameSegment_Gateway_PubSub_Message, $asm, {}, $Pather_Common_Models_Gateway_PubSub_Base_Gateway_PubSub_Message, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initClass($Pather_Common_Models_Gateway_PubSub_UserJoined_GameWorld_Gateway_PubSub_Message, $asm, {}, $Pather_Common_Models_Gateway_PubSub_Base_Gateway_PubSub_Message, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initClass($Pather_Common_Models_Gateway_PubSub_UserMovedCollection_GameSegment_Gateway_PubSub_Message, $asm, {}, $Pather_Common_Models_Gateway_PubSub_Base_Gateway_PubSub_Message, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initEnum($Pather_Common_Models_Gateway_PubSub_Base_Gateway_PubSub_AllMessageType, $asm, { tickSync: 'tickSync', ping: 'ping' }, true);
	ss.initEnum($Pather_Common_Models_Gateway_PubSub_Base_Gateway_PubSub_MessageType, $asm, { userJoined: 'userJoined', pong: 'pong', userMovedCollection: 'userMovedCollection', updateNeighbors: 'updateNeighbors' }, true);
	ss.initClass($Pather_Common_Models_Gateway_Socket_Base_Socket_Message, $asm, {});
	ss.initClass($Pather_Common_Models_Gateway_Socket_Base_Gateway_Socket_Message, $asm, {}, $Pather_Common_Models_Gateway_Socket_Base_Socket_Message);
	ss.initClass($Pather_Common_Models_Gateway_Socket_Base_User_Socket_Message, $asm, {}, $Pather_Common_Models_Gateway_Socket_Base_Socket_Message);
	ss.initClass($Pather_Common_Models_Gateway_Socket_Base_Gateway_User_Socket_Message, $asm, {}, $Pather_Common_Models_Gateway_Socket_Base_User_Socket_Message);
	ss.initEnum($Pather_Common_Models_Gateway_Socket_Base_Gateway_User_Socket_MessageType, $asm, { move: 'move', userJoined: 'userJoined', tickSync: 'tickSync', pong: 'pong', updateNeighbors: 'updateNeighbors' }, true);
	ss.initClass($Pather_Common_Models_Gateway_Socket_Base_MoveToLocation_Gateway_User_Socket_Message, $asm, {}, $Pather_Common_Models_Gateway_Socket_Base_Gateway_User_Socket_Message);
	ss.initClass($Pather_Common_Models_Gateway_Socket_Base_User_Gateway_Socket_Message, $asm, {}, $Pather_Common_Models_Gateway_Socket_Base_Gateway_Socket_Message);
	ss.initClass($Pather_Common_Models_Gateway_Socket_Base_MoveToLocation_User_Gateway_Socket_Message, $asm, {}, $Pather_Common_Models_Gateway_Socket_Base_User_Gateway_Socket_Message);
	ss.initClass($Pather_Common_Models_Gateway_Socket_Base_Ping_User_Gateway_Socket_Message, $asm, {}, $Pather_Common_Models_Gateway_Socket_Base_User_Gateway_Socket_Message);
	ss.initClass($Pather_Common_Models_Gateway_Socket_Base_Pong_Gateway_User_PubSub_Message, $asm, {}, $Pather_Common_Models_Gateway_Socket_Base_Gateway_User_Socket_Message);
	ss.initClass($Pather_Common_Models_Gateway_Socket_Base_TickSync_Gateway_User_Socket_Message, $asm, {}, $Pather_Common_Models_Gateway_Socket_Base_Gateway_User_Socket_Message);
	ss.initClass($Pather_Common_Models_Gateway_Socket_Base_UpdateNeighbors_Gateway_User_Socket_Message, $asm, {}, $Pather_Common_Models_Gateway_Socket_Base_Gateway_User_Socket_Message);
	ss.initEnum($Pather_Common_Models_Gateway_Socket_Base_User_Gateway_Socket_MessageType, $asm, { move: 'move', join: 'join', ping: 'ping' }, true);
	ss.initClass($Pather_Common_Models_Gateway_Socket_Base_UserJoined_Gateway_User_Socket_Message, $asm, {}, $Pather_Common_Models_Gateway_Socket_Base_Gateway_User_Socket_Message);
	ss.initClass($Pather_Common_Models_Gateway_Socket_Base_UserJoined_User_Gateway_Socket_Message, $asm, {}, $Pather_Common_Models_Gateway_Socket_Base_User_Gateway_Socket_Message);
	ss.initClass($Pather_Common_Models_Head_Base_Head_PubSub_Message, $asm, {}, null, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initClass($Pather_Common_Models_Head_Base_Head_PubSub_ReqRes_Message, $asm, {}, $Pather_Common_Models_Head_Base_Head_PubSub_Message, [$Pather_Common_Models_Common_IPubSub_Message, $Pather_Common_Models_Common_IPubSub_ReqRes_Message]);
	ss.initClass($Pather_Common_Models_Head_CreateGateway_Response_ServerManager_Head_PubSub_ReqRes_Message, $asm, {}, $Pather_Common_Models_Head_Base_Head_PubSub_ReqRes_Message, [$Pather_Common_Models_Common_IPubSub_Message, $Pather_Common_Models_Common_IPubSub_ReqRes_Message]);
	ss.initClass($Pather_Common_Models_Head_Ping_Response_Gateway_Head_PubSub_Message, $asm, {}, $Pather_Common_Models_Head_Base_Head_PubSub_Message, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initEnum($Pather_Common_Models_Head_Base_Head_PubSub_MessageType, $asm, { ping: 'ping' }, true);
	ss.initClass($Pather_Common_Models_ServerManager_Base_ServerManager_PubSub_Message, $asm, {}, null, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initClass($Pather_Common_Models_ServerManager_Base_ServerManager_PubSub_ReqRes_Message, $asm, {}, $Pather_Common_Models_ServerManager_Base_ServerManager_PubSub_Message, [$Pather_Common_Models_Common_IPubSub_Message, $Pather_Common_Models_Common_IPubSub_ReqRes_Message]);
	ss.initClass($Pather_Common_Models_ServerManager_CreateGameSegment_Response_ClusterManager_ServerManager_PubSub_ReqRes_Message, $asm, {}, $Pather_Common_Models_ServerManager_Base_ServerManager_PubSub_ReqRes_Message, [$Pather_Common_Models_Common_IPubSub_Message, $Pather_Common_Models_Common_IPubSub_ReqRes_Message]);
	ss.initClass($Pather_Common_Models_ServerManager_CreateGateway_Response_ClusterManager_ServerManager_PubSub_ReqRes_Message, $asm, {}, $Pather_Common_Models_ServerManager_Base_ServerManager_PubSub_ReqRes_Message, [$Pather_Common_Models_Common_IPubSub_Message, $Pather_Common_Models_Common_IPubSub_ReqRes_Message]);
	ss.initClass($Pather_Common_Models_ServerManager_Base_CreateGameSegment_GameWorld_ServerManager_PubSub_ReqRes_Message, $asm, {}, $Pather_Common_Models_ServerManager_Base_ServerManager_PubSub_ReqRes_Message, [$Pather_Common_Models_Common_IPubSub_Message, $Pather_Common_Models_Common_IPubSub_ReqRes_Message]);
	ss.initClass($Pather_Common_Models_ServerManager_Base_CreateGateway_Head_ServerManager_PubSub_ReqRes_Message, $asm, {}, $Pather_Common_Models_ServerManager_Base_ServerManager_PubSub_ReqRes_Message, [$Pather_Common_Models_Common_IPubSub_Message, $Pather_Common_Models_Common_IPubSub_ReqRes_Message]);
	ss.initEnum($Pather_Common_Models_ServerManager_Base_ServerManager_PubSub_MessageType, $asm, { createGameSegment: 'createGameSegment', createGateway: 'createGateway' }, true);
	ss.initClass($Pather_Common_Models_Tick_Base_Tick_PubSub_Message, $asm, {}, null, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initClass($Pather_Common_Models_Tick_Ping_Tick_PubSub_Message, $asm, {}, $Pather_Common_Models_Tick_Base_Tick_PubSub_Message, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initEnum($Pather_Common_Models_Tick_Ping_Tick_PubSub_Message_OriginType, $asm, { gameSegment: 0, gameWorld: 1, gateway: 2 });
	ss.initEnum($Pather_Common_Models_Tick_Base_Tick_PubSub_MessageType, $asm, { ping: 'ping' }, true);
	ss.initEnum($Pather_Common_old_ActionType, $asm, { move: 0, noop: 1 });
	ss.initClass($Pather_Common_old_Entity, $asm, {
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
				this.x = $Pather_Common_Utils_Lerper.moveTowards(this.x, projectedX, this.speed / $Pather_Common_Constants.animationSteps);
				this.y = $Pather_Common_Utils_Lerper.moveTowards(this.y, projectedY, this.speed / $Pather_Common_Constants.animationSteps);
				this.animations.push(new $Pather_Common_Utils_AnimationPoint(fromX, fromY, this.x, this.y));
			}
		}
	});
	ss.initClass($Pather_Common_old_Game, $asm, {
		createPlayer: function(playerId) {
			return new $Pather_Common_old_Entity(this, playerId);
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
	ss.initInterface($Pather_Common_old_IAction, $asm, { get_data: null, get_lockstepTickNumber: null, get_type: null, process: null });
	ss.initClass($Pather_Common_old_MoveAction, $asm, {
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
	}, null, [$Pather_Common_old_IAction]);
	ss.initClass($Pather_Common_old_NoopAction, $asm, {
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
	}, null, [$Pather_Common_old_IAction]);
	ss.initClass($Pather_Common_old_SerializableAction, $asm, {});
	ss.initClass($Pather_Common_old_StepManager, $asm, {
		receiveAction: function(serAction) {
			var action;
			switch (serAction.type) {
				case 0: {
					action = new $Pather_Common_old_MoveAction(serAction.data, serAction.lockstepTickNumber);
					break;
				}
				case 1: {
					action = new $Pather_Common_old_NoopAction(serAction.lockstepTickNumber);
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
	ss.initEnum($Pather_Common_old_TickResult, $asm, { none: 0, game: 1, lockstep: 2, both: 3 });
	ss.initClass($Pather_Common_TestFramework_Assert, $asm, {});
	ss.initClass($Pather_Common_TestFramework_AssertException, $asm, {
		get_failedAssertion: function() {
			return this.$2$FailedAssertionField;
		},
		set_failedAssertion: function(value) {
			this.$2$FailedAssertionField = value;
		}
	}, ss.Exception);
	ss.initClass($Pather_Common_TestFramework_DeferredAssert, $asm, {});
	ss.initClass($Pather_Common_TestFramework_Mocker, $asm, {});
	ss.initClass($Pather_Common_TestFramework_RightObject, $asm, {
		true$1: function() {
			if (!ss.unbox(ss.cast(this.$that.$that, Boolean))) {
				this.$fail(ss.formatString('{0} is not true', this.$that.$that));
			}
		},
		equal: function(right) {
			if (!ss.referenceEquals(this.$that.$that, right)) {
				this.$fail(ss.formatString('{0} does not equal {1}', this.$that.$that, right));
			}
		},
		ofType: function(type) {
			if (!ss.referenceEquals(ss.getInstanceType(this.$that.$that), type)) {
				this.$fail(ss.formatString('{0} type is not {1}', ss.getTypeFullName(ss.getInstanceType(this.$that.$that)), ss.getTypeFullName(type)));
			}
		},
		$fail: function(error) {
			throw new $Pather_Common_TestFramework_AssertException(error);
		}
	});
	ss.initClass($Pather_Common_TestFramework_TestClassAttribute, $asm, {
		get_disable: function() {
			return this.$2$DisableField;
		},
		set_disable: function(value) {
			this.$2$DisableField = value;
		}
	});
	ss.initClass($Pather_Common_TestFramework_TestConstructorAttribute, $asm, {});
	ss.initClass($Pather_Common_TestFramework_TestFramework, $asm, {});
	ss.initClass($Pather_Common_TestFramework_TestMethodAttribute, $asm, {
		get_disable: function() {
			return this.$2$DisableField;
		},
		set_disable: function(value) {
			this.$2$DisableField = value;
		}
	});
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
	ss.initClass($Pather_Common_Utils_EnumerableExtensions, $asm, {});
	ss.initClass($Pather_Common_Utils_Lerper, $asm, {});
	ss.initClass($Pather_Common_Utils_Logger, $asm, {});
	ss.initEnum($Pather_Common_Utils_LogLevel, $asm, { error: 'error', debugInformation: 'debugInformation', information: 'information', transportInfo: 'transportInfo', dataInfo: 'dataInfo', keepAlive: 'keepAlive' }, true);
	ss.initClass($Pather_Common_Utils_TickManager, $asm, {
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
			while (l > $Pather_Common_Constants.lockstepTicks) {
				l -= $Pather_Common_Constants.lockstepTicks;
				this.$currentLockstepTime += $Pather_Common_Constants.lockstepTicks;
				this.lockstepTickNumber++;
				this.processLockstep(this.lockstepTickNumber);
			}
		},
		processLockstep: function(lockstepTickNumber) {
			//            Global.Console.Log("Lockstep", LockstepTickNumber, new DateTime().GetTime());
			//            ServerLogger.LogInformation("Lockstep", LockstepTickNumber, new DateTime().GetTime());
		}
	});
	ss.initClass($Pather_Common_Utils_Utilities, $asm, {});
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
		}
	});
	ss.initClass($Pather_Common_Utils_Promises_Promise, $asm, {
		resolve: function() {
			if (this.isResolved || this.isRejected) {
				throw new ss.Exception('Can only resolve promise once.');
			}
			this.isResolved = true;
			for (var $t1 = 0; $t1 < this.$resolves.length; $t1++) {
				var resolve = this.$resolves[$t1];
				resolve();
			}
			for (var $t2 = 0; $t2 < this.$finallys.length; $t2++) {
				var finally1 = this.$finallys[$t2];
				finally1();
			}
		},
		reject: function() {
			if (this.isResolved || this.isRejected) {
				throw new ss.Exception('Can only resolve promise once.');
			}
			this.isRejected = true;
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
			if (this.isRejected) {
				error();
			}
			else {
				this.$rejects.push(error);
			}
			return this;
		},
		finally$1: function(finally1) {
			if (this.isRejected || this.isResolved) {
				finally1();
			}
			else {
				this.$finallys.push(finally1);
			}
			return this;
		},
		then: function(resolve) {
			if (this.isResolved) {
				resolve();
			}
			else {
				this.$resolves.push(resolve);
			}
			return this;
		},
		passThrough: function(passThrough) {
			this.then(ss.mkdel(passThrough, passThrough.resolve)).error(ss.mkdel(passThrough, passThrough.reject));
			return passThrough;
		}
	});
	ss.initClass($Pather_Common_Utils_Promises_Q, $asm, {});
	ss.initClass($Pather_Common_Utils_Promises_UndefinedPromiseError, $asm, {});
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
		$Pather_Common_Constants.gameSegmentCreationWait = 0;
		$Pather_Common_Constants.gatewayCreationWait = 0;
		$Pather_Common_Constants.latencyPingInterval = 0;
		$Pather_Common_Constants.usersPerGameSegment = 0;
		$Pather_Common_Constants.maxConnectionsPerGateway = 0;
		$Pather_Common_Constants.gatewayConnectionSpawnThreshold = 0;
		$Pather_Common_Constants.maxGatewaysPerCluster = 0;
		$Pather_Common_Constants.maxGameSegmentsPerCluster = 0;
		$Pather_Common_Constants.spinUpNewGatewayCheck = 0;
		$Pather_Common_Constants.pingGatewayFromHeadTimeout = 0;
		//CLIENT
		$Pather_Common_Constants.squareSize = 16;
		$Pather_Common_Constants.drawFps = 60;
		$Pather_Common_Constants.numberOfSquares = 150;
		$Pather_Common_Constants.drawTicks = ss.Int32.div(1000, $Pather_Common_Constants.drawFps);
		$Pather_Common_Constants.animationSteps = 5;
		$Pather_Common_Constants.gameFps = 10;
		$Pather_Common_Constants.gameTicks = ss.Int32.div(1000, $Pather_Common_Constants.gameFps);
		$Pather_Common_Constants.lockstepFps = 2;
		$Pather_Common_Constants.lockstepTicks = ss.Int32.div(1000, $Pather_Common_Constants.lockstepFps);
		$Pather_Common_Constants.latencyPingInterval = 6000;
		$Pather_Common_Constants.neighborDistance = 20;
		$Pather_Common_Constants.usersPerGameSegment = 20;
		$Pather_Common_Constants.gameSegmentCreationWait = 60;
		$Pather_Common_Constants.gatewayCreationWait = 60;
		$Pather_Common_Constants.maxConnectionsPerGateway = 100;
		$Pather_Common_Constants.gatewayConnectionSpawnThreshold = 40;
		$Pather_Common_Constants.maxGatewaysPerCluster = 10;
		$Pather_Common_Constants.maxGameSegmentsPerCluster = 10;
		$Pather_Common_Constants.pingGatewayFromHeadTimeout = 1000;
		$Pather_Common_Constants.spinUpNewGatewayCheck = 4000;
	})();
	(function() {
		eval('\r\nglobal.$overwiteMethodCallForMocker$=function ($call$,$overwrite$) {\r\n    var $targets$=$call$._targets[0];\r\n    for(var m in $targets$) {\r\n        if($targets$[m]==$call$._targets[1]) {\r\n            $targets$[m]=$overwrite$;\r\n        }\r\n    }\r\n}');
		eval("\r\nglobal.$instantiateInterface$=function ($type$) {\r\n    var obj={};\r\n    for(var m in $type$.prototype) {\r\n        obj[m]=function(){throw new Error('Mock interface method '+m+' not overridden');};\r\n    }\r\n    return obj;\r\n}");
	})();
})();
