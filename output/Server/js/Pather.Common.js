(function() {
	'use strict';
	var $asm = {};
	global.Pather = global.Pather || {};
	global.Pather.Common = global.Pather.Common || {};
	global.Pather.Common.Definitions = global.Pather.Common.Definitions || {};
	global.Pather.Common.Definitions.AStar = global.Pather.Common.Definitions.AStar || {};
	global.Pather.Common.GameFramework = global.Pather.Common.GameFramework || {};
	global.Pather.Common.Models = global.Pather.Common.Models || {};
	global.Pather.Common.Models.ClusterManager = global.Pather.Common.Models.ClusterManager || {};
	global.Pather.Common.Models.ClusterManager.Base = global.Pather.Common.Models.ClusterManager.Base || {};
	global.Pather.Common.Models.Common = global.Pather.Common.Models.Common || {};
	global.Pather.Common.Models.Common.Actions = global.Pather.Common.Models.Common.Actions || {};
	global.Pather.Common.Models.Common.Actions.ClientActions = global.Pather.Common.Models.Common.Actions.ClientActions || {};
	global.Pather.Common.Models.Common.Actions.ClientActions.Base = global.Pather.Common.Models.Common.Actions.ClientActions.Base || {};
	global.Pather.Common.Models.Common.Actions.GameSegmentAction = global.Pather.Common.Models.Common.Actions.GameSegmentAction || {};
	global.Pather.Common.Models.Common.Actions.GameSegmentAction.Base = global.Pather.Common.Models.Common.Actions.GameSegmentAction.Base || {};
	global.Pather.Common.Models.Common.Actions.GameWorldAction = global.Pather.Common.Models.Common.Actions.GameWorldAction || {};
	global.Pather.Common.Models.Common.Actions.GameWorldAction.Base = global.Pather.Common.Models.Common.Actions.GameWorldAction.Base || {};
	global.Pather.Common.Models.Common.Actions.NeighborGameSegmentAction = global.Pather.Common.Models.Common.Actions.NeighborGameSegmentAction || {};
	global.Pather.Common.Models.Common.Actions.NeighborGameSegmentAction.Base = global.Pather.Common.Models.Common.Actions.NeighborGameSegmentAction.Base || {};
	global.Pather.Common.Models.Common.Actions.TellGameSegmentAction = global.Pather.Common.Models.Common.Actions.TellGameSegmentAction || {};
	global.Pather.Common.Models.Common.Actions.TellGameSegmentAction.Base = global.Pather.Common.Models.Common.Actions.TellGameSegmentAction.Base || {};
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
	global.Pather.Common.TestFramework = global.Pather.Common.TestFramework || {};
	global.Pather.Common.Utils = global.Pather.Common.Utils || {};
	global.Pather.Common.Utils.Histogram = global.Pather.Common.Utils.Histogram || {};
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
	// Pather.Common.ConnectionConstants
	var $Pather_Common_ConnectionConstants = function() {
	};
	$Pather_Common_ConnectionConstants.__typeName = 'Pather.Common.ConnectionConstants';
	$Pather_Common_ConnectionConstants.get_production = function() {
		var production = window.window.Production;
		return !!production;
	};
	global.Pather.Common.ConnectionConstants = $Pather_Common_ConnectionConstants;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Constants
	var $Pather_Common_Constants = function() {
	};
	$Pather_Common_Constants.__typeName = 'Pather.Common.Constants';
	$Pather_Common_Constants.get_testServer = function() {
		return !!window.window.TestServer;
	};
	$Pather_Common_Constants.get_noDraw = function() {
		return !!window.window.NoDraw;
	};
	global.Pather.Common.Constants = $Pather_Common_Constants;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Definitions.AStar.AStarLockstepPath
	var $Pather_Common_Definitions_AStar_AStarLockstepPath = function() {
	};
	$Pather_Common_Definitions_AStar_AStarLockstepPath.__typeName = 'Pather.Common.Definitions.AStar.AStarLockstepPath';
	$Pather_Common_Definitions_AStar_AStarLockstepPath.$ctor = function(x, y) {
		var $this = {};
		$this.removeAfterLockstep = 0;
		$this.x = 0;
		$this.y = 0;
		$this.x = x;
		$this.y = y;
		return $this;
	};
	global.Pather.Common.Definitions.AStar.AStarLockstepPath = $Pather_Common_Definitions_AStar_AStarLockstepPath;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.GameFramework.Game
	var $Pather_Common_GameFramework_Game = function(tickManager) {
		this.tickManager = null;
		this.board = null;
		this.activeEntities = new (ss.makeGenericType($Pather_Common_Utils_DictionaryList$2, [String, $Pather_Common_GameFramework_GameEntity]).$ctor1)(function(a) {
			return a.entityId;
		});
		this.myUser = null;
		this.tickManager = tickManager;
	};
	$Pather_Common_GameFramework_Game.__typeName = 'Pather.Common.GameFramework.Game';
	global.Pather.Common.GameFramework.Game = $Pather_Common_GameFramework_Game;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.GameFramework.GameBoard
	var $Pather_Common_GameFramework_GameBoard = function() {
		this.grid = null;
		this.aStarGraph = null;
	};
	$Pather_Common_GameFramework_GameBoard.__typeName = 'Pather.Common.GameFramework.GameBoard';
	global.Pather.Common.GameFramework.GameBoard = $Pather_Common_GameFramework_GameBoard;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.GameFramework.GameEntity
	var $Pather_Common_GameFramework_GameEntity = function(game) {
		this.game = null;
		this.neighbors = null;
		this.oldNeighbors = null;
		this.x = 0;
		this.y = 0;
		this.entityId = null;
		this.neighbors = new (ss.makeGenericType($Pather_Common_Utils_DictionaryList$2, [String, $Pather_Common_GameFramework_GameEntityNeighbor]).$ctor1)(function(a) {
			return a.entity.entityId;
		});
		this.game = game;
	};
	$Pather_Common_GameFramework_GameEntity.__typeName = 'Pather.Common.GameFramework.GameEntity';
	global.Pather.Common.GameFramework.GameEntity = $Pather_Common_GameFramework_GameEntity;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.GameFramework.GameEntityNeighbor
	var $Pather_Common_GameFramework_GameEntityNeighbor = function(cEntity, distance) {
		this.entity = null;
		this.distance = 0;
		this.distance = distance;
		this.entity = cEntity;
	};
	$Pather_Common_GameFramework_GameEntityNeighbor.__typeName = 'Pather.Common.GameFramework.GameEntityNeighbor';
	global.Pather.Common.GameFramework.GameEntityNeighbor = $Pather_Common_GameFramework_GameEntityNeighbor;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.GameFramework.GameUser
	var $Pather_Common_GameFramework_GameUser = function(game, userId) {
		this.speed = 0;
		$Pather_Common_GameFramework_GameEntity.call(this, game);
		this.entityId = userId;
		this.speed = 20;
	};
	$Pather_Common_GameFramework_GameUser.__typeName = 'Pather.Common.GameFramework.GameUser';
	global.Pather.Common.GameFramework.GameUser = $Pather_Common_GameFramework_GameUser;
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
	// Pather.Common.Models.Common.ClientActionCacheModel
	var $Pather_Common_Models_Common_ClientActionCacheModel = function() {
	};
	$Pather_Common_Models_Common_ClientActionCacheModel.__typeName = 'Pather.Common.Models.Common.ClientActionCacheModel';
	$Pather_Common_Models_Common_ClientActionCacheModel.createInstance = function() {
		return $Pather_Common_Models_Common_ClientActionCacheModel.$ctor();
	};
	$Pather_Common_Models_Common_ClientActionCacheModel.$ctor = function() {
		var $this = {};
		$this.clientAction = null;
		$this.userId = null;
		return $this;
	};
	global.Pather.Common.Models.Common.ClientActionCacheModel = $Pather_Common_Models_Common_ClientActionCacheModel;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Common.InProgressClientAction
	var $Pather_Common_Models_Common_InProgressClientAction = function() {
	};
	$Pather_Common_Models_Common_InProgressClientAction.__typeName = 'Pather.Common.Models.Common.InProgressClientAction';
	$Pather_Common_Models_Common_InProgressClientAction.$ctor = function(action, endingLockStepTicking) {
		var $this = {};
		$this.action = null;
		$this.endingLockStepTicking = 0;
		$this.action = action;
		$this.endingLockStepTicking = endingLockStepTicking;
		return $this;
	};
	global.Pather.Common.Models.Common.InProgressClientAction = $Pather_Common_Models_Common_InProgressClientAction;
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
		$this.messageCollection = null;
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
		$this.inProgressClientActions = null;
		return $this;
	};
	global.Pather.Common.Models.Common.UpdatedNeighbor = $Pather_Common_Models_Common_UpdatedNeighbor;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Common.Actions.IAction
	var $Pather_Common_Models_Common_Actions_IAction = function() {
	};
	$Pather_Common_Models_Common_Actions_IAction.__typeName = 'Pather.Common.Models.Common.Actions.IAction';
	global.Pather.Common.Models.Common.Actions.IAction = $Pather_Common_Models_Common_Actions_IAction;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Common.Actions.ClientActions.MoveEntity_ClientAction
	var $Pather_Common_Models_Common_Actions_ClientActions_MoveEntity_ClientAction = function() {
	};
	$Pather_Common_Models_Common_Actions_ClientActions_MoveEntity_ClientAction.__typeName = 'Pather.Common.Models.Common.Actions.ClientActions.MoveEntity_ClientAction';
	$Pather_Common_Models_Common_Actions_ClientActions_MoveEntity_ClientAction.createInstance = function() {
		return $Pather_Common_Models_Common_Actions_ClientActions_MoveEntity_ClientAction.$ctor();
	};
	$Pather_Common_Models_Common_Actions_ClientActions_MoveEntity_ClientAction.$ctor = function() {
		var $this = $Pather_Common_Models_Common_Actions_ClientActions_Base_ClientAction.$ctor();
		$this.x = 0;
		$this.y = 0;
		$this.clientActionType = 'move';
		return $this;
	};
	global.Pather.Common.Models.Common.Actions.ClientActions.MoveEntity_ClientAction = $Pather_Common_Models_Common_Actions_ClientActions_MoveEntity_ClientAction;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Common.Actions.ClientActions.MoveEntityOnPath_ClientAction
	var $Pather_Common_Models_Common_Actions_ClientActions_MoveEntityOnPath_ClientAction = function() {
	};
	$Pather_Common_Models_Common_Actions_ClientActions_MoveEntityOnPath_ClientAction.__typeName = 'Pather.Common.Models.Common.Actions.ClientActions.MoveEntityOnPath_ClientAction';
	$Pather_Common_Models_Common_Actions_ClientActions_MoveEntityOnPath_ClientAction.createInstance = function() {
		return $Pather_Common_Models_Common_Actions_ClientActions_MoveEntityOnPath_ClientAction.$ctor();
	};
	$Pather_Common_Models_Common_Actions_ClientActions_MoveEntityOnPath_ClientAction.$ctor = function() {
		var $this = $Pather_Common_Models_Common_Actions_ClientActions_Base_ClientAction.$ctor();
		$this.path = null;
		$this.clientActionType = 'moveEntityOnPath';
		return $this;
	};
	global.Pather.Common.Models.Common.Actions.ClientActions.MoveEntityOnPath_ClientAction = $Pather_Common_Models_Common_Actions_ClientActions_MoveEntityOnPath_ClientAction;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Common.Actions.ClientActions.UpdateNeighborsClientAction
	var $Pather_Common_Models_Common_Actions_ClientActions_UpdateNeighborsClientAction = function() {
	};
	$Pather_Common_Models_Common_Actions_ClientActions_UpdateNeighborsClientAction.__typeName = 'Pather.Common.Models.Common.Actions.ClientActions.UpdateNeighborsClientAction';
	$Pather_Common_Models_Common_Actions_ClientActions_UpdateNeighborsClientAction.createInstance = function() {
		return $Pather_Common_Models_Common_Actions_ClientActions_UpdateNeighborsClientAction.$ctor();
	};
	$Pather_Common_Models_Common_Actions_ClientActions_UpdateNeighborsClientAction.$ctor = function() {
		var $this = $Pather_Common_Models_Common_Actions_ClientActions_Base_ClientAction.$ctor();
		$this.added = null;
		$this.removed = null;
		$this.clientActionType = 'updateNeighbors';
		return $this;
	};
	global.Pather.Common.Models.Common.Actions.ClientActions.UpdateNeighborsClientAction = $Pather_Common_Models_Common_Actions_ClientActions_UpdateNeighborsClientAction;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Common.Actions.ClientActions.Base.ClientAction
	var $Pather_Common_Models_Common_Actions_ClientActions_Base_ClientAction = function() {
	};
	$Pather_Common_Models_Common_Actions_ClientActions_Base_ClientAction.__typeName = 'Pather.Common.Models.Common.Actions.ClientActions.Base.ClientAction';
	$Pather_Common_Models_Common_Actions_ClientActions_Base_ClientAction.$ctor = function() {
		var $this = {};
		$this.clientActionType = null;
		$this.lockstepTick = 0;
		$this.entityId = null;
		return $this;
	};
	global.Pather.Common.Models.Common.Actions.ClientActions.Base.ClientAction = $Pather_Common_Models_Common_Actions_ClientActions_Base_ClientAction;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Common.Actions.ClientActions.Base.ClientActionType
	var $Pather_Common_Models_Common_Actions_ClientActions_Base_ClientActionType = function() {
	};
	$Pather_Common_Models_Common_Actions_ClientActions_Base_ClientActionType.__typeName = 'Pather.Common.Models.Common.Actions.ClientActions.Base.ClientActionType';
	global.Pather.Common.Models.Common.Actions.ClientActions.Base.ClientActionType = $Pather_Common_Models_Common_Actions_ClientActions_Base_ClientActionType;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Common.Actions.GameSegmentAction.MoveEntity_GameSegmentAction
	var $Pather_Common_Models_Common_Actions_GameSegmentAction_MoveEntity_GameSegmentAction = function() {
	};
	$Pather_Common_Models_Common_Actions_GameSegmentAction_MoveEntity_GameSegmentAction.__typeName = 'Pather.Common.Models.Common.Actions.GameSegmentAction.MoveEntity_GameSegmentAction';
	$Pather_Common_Models_Common_Actions_GameSegmentAction_MoveEntity_GameSegmentAction.createInstance = function() {
		return $Pather_Common_Models_Common_Actions_GameSegmentAction_MoveEntity_GameSegmentAction.$ctor();
	};
	$Pather_Common_Models_Common_Actions_GameSegmentAction_MoveEntity_GameSegmentAction.$ctor = function() {
		var $this = $Pather_Common_Models_Common_Actions_GameSegmentAction_Base_GameSegmentAction.$ctor();
		$this.x = 0;
		$this.y = 0;
		$this.gameSegmentActionType = 'moveEntity';
		return $this;
	};
	global.Pather.Common.Models.Common.Actions.GameSegmentAction.MoveEntity_GameSegmentAction = $Pather_Common_Models_Common_Actions_GameSegmentAction_MoveEntity_GameSegmentAction;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Common.Actions.GameSegmentAction.Base.GameSegmentAction
	var $Pather_Common_Models_Common_Actions_GameSegmentAction_Base_GameSegmentAction = function() {
	};
	$Pather_Common_Models_Common_Actions_GameSegmentAction_Base_GameSegmentAction.__typeName = 'Pather.Common.Models.Common.Actions.GameSegmentAction.Base.GameSegmentAction';
	$Pather_Common_Models_Common_Actions_GameSegmentAction_Base_GameSegmentAction.$ctor = function() {
		var $this = {};
		$this.gameSegmentActionType = null;
		$this.lockstepTick = 0;
		return $this;
	};
	global.Pather.Common.Models.Common.Actions.GameSegmentAction.Base.GameSegmentAction = $Pather_Common_Models_Common_Actions_GameSegmentAction_Base_GameSegmentAction;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Common.Actions.GameSegmentAction.Base.GameSegmentActionType
	var $Pather_Common_Models_Common_Actions_GameSegmentAction_Base_GameSegmentActionType = function() {
	};
	$Pather_Common_Models_Common_Actions_GameSegmentAction_Base_GameSegmentActionType.__typeName = 'Pather.Common.Models.Common.Actions.GameSegmentAction.Base.GameSegmentActionType';
	global.Pather.Common.Models.Common.Actions.GameSegmentAction.Base.GameSegmentActionType = $Pather_Common_Models_Common_Actions_GameSegmentAction_Base_GameSegmentActionType;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Common.Actions.GameWorldAction.MoveEntity_GameWorldAction
	var $Pather_Common_Models_Common_Actions_GameWorldAction_MoveEntity_GameWorldAction = function() {
	};
	$Pather_Common_Models_Common_Actions_GameWorldAction_MoveEntity_GameWorldAction.__typeName = 'Pather.Common.Models.Common.Actions.GameWorldAction.MoveEntity_GameWorldAction';
	$Pather_Common_Models_Common_Actions_GameWorldAction_MoveEntity_GameWorldAction.createInstance = function() {
		return $Pather_Common_Models_Common_Actions_GameWorldAction_MoveEntity_GameWorldAction.$ctor();
	};
	$Pather_Common_Models_Common_Actions_GameWorldAction_MoveEntity_GameWorldAction.$ctor = function() {
		var $this = $Pather_Common_Models_Common_Actions_GameWorldAction_Base_GameWorldAction.$ctor();
		$this.lockstepMovePoints = null;
		$this.gameWorldActionType = 'moveEntity';
		return $this;
	};
	global.Pather.Common.Models.Common.Actions.GameWorldAction.MoveEntity_GameWorldAction = $Pather_Common_Models_Common_Actions_GameWorldAction_MoveEntity_GameWorldAction;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Common.Actions.GameWorldAction.Base.GameWorldAction
	var $Pather_Common_Models_Common_Actions_GameWorldAction_Base_GameWorldAction = function() {
	};
	$Pather_Common_Models_Common_Actions_GameWorldAction_Base_GameWorldAction.__typeName = 'Pather.Common.Models.Common.Actions.GameWorldAction.Base.GameWorldAction';
	$Pather_Common_Models_Common_Actions_GameWorldAction_Base_GameWorldAction.$ctor = function() {
		var $this = {};
		$this.gameWorldActionType = null;
		$this.lockstepTick = 0;
		$this.entityId = null;
		return $this;
	};
	global.Pather.Common.Models.Common.Actions.GameWorldAction.Base.GameWorldAction = $Pather_Common_Models_Common_Actions_GameWorldAction_Base_GameWorldAction;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Common.Actions.GameWorldAction.Base.GameWorldActionType
	var $Pather_Common_Models_Common_Actions_GameWorldAction_Base_GameWorldActionType = function() {
	};
	$Pather_Common_Models_Common_Actions_GameWorldAction_Base_GameWorldActionType.__typeName = 'Pather.Common.Models.Common.Actions.GameWorldAction.Base.GameWorldActionType';
	global.Pather.Common.Models.Common.Actions.GameWorldAction.Base.GameWorldActionType = $Pather_Common_Models_Common_Actions_GameWorldAction_Base_GameWorldActionType;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Common.Actions.NeighborGameSegmentAction.MoveEntity_NeighborGameSegmentAction
	var $Pather_Common_Models_Common_Actions_NeighborGameSegmentAction_MoveEntity_NeighborGameSegmentAction = function() {
	};
	$Pather_Common_Models_Common_Actions_NeighborGameSegmentAction_MoveEntity_NeighborGameSegmentAction.__typeName = 'Pather.Common.Models.Common.Actions.NeighborGameSegmentAction.MoveEntity_NeighborGameSegmentAction';
	$Pather_Common_Models_Common_Actions_NeighborGameSegmentAction_MoveEntity_NeighborGameSegmentAction.createInstance = function() {
		return $Pather_Common_Models_Common_Actions_NeighborGameSegmentAction_MoveEntity_NeighborGameSegmentAction.$ctor();
	};
	$Pather_Common_Models_Common_Actions_NeighborGameSegmentAction_MoveEntity_NeighborGameSegmentAction.$ctor = function() {
		var $this = $Pather_Common_Models_Common_Actions_NeighborGameSegmentAction_Base_NeighborGameSegmentAction.$ctor();
		$this.lockstepMovePoints = null;
		$this.neighborGameSegmentActionType = 'moveEntity';
		return $this;
	};
	global.Pather.Common.Models.Common.Actions.NeighborGameSegmentAction.MoveEntity_NeighborGameSegmentAction = $Pather_Common_Models_Common_Actions_NeighborGameSegmentAction_MoveEntity_NeighborGameSegmentAction;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Common.Actions.NeighborGameSegmentAction.Base.NeighborGameSegmentAction
	var $Pather_Common_Models_Common_Actions_NeighborGameSegmentAction_Base_NeighborGameSegmentAction = function() {
	};
	$Pather_Common_Models_Common_Actions_NeighborGameSegmentAction_Base_NeighborGameSegmentAction.__typeName = 'Pather.Common.Models.Common.Actions.NeighborGameSegmentAction.Base.NeighborGameSegmentAction';
	$Pather_Common_Models_Common_Actions_NeighborGameSegmentAction_Base_NeighborGameSegmentAction.$ctor = function() {
		var $this = {};
		$this.neighborGameSegmentActionType = null;
		$this.lockstepTick = 0;
		$this.entityId = null;
		return $this;
	};
	global.Pather.Common.Models.Common.Actions.NeighborGameSegmentAction.Base.NeighborGameSegmentAction = $Pather_Common_Models_Common_Actions_NeighborGameSegmentAction_Base_NeighborGameSegmentAction;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Common.Actions.NeighborGameSegmentAction.Base.NeighborGameSegmentActionType
	var $Pather_Common_Models_Common_Actions_NeighborGameSegmentAction_Base_NeighborGameSegmentActionType = function() {
	};
	$Pather_Common_Models_Common_Actions_NeighborGameSegmentAction_Base_NeighborGameSegmentActionType.__typeName = 'Pather.Common.Models.Common.Actions.NeighborGameSegmentAction.Base.NeighborGameSegmentActionType';
	global.Pather.Common.Models.Common.Actions.NeighborGameSegmentAction.Base.NeighborGameSegmentActionType = $Pather_Common_Models_Common_Actions_NeighborGameSegmentAction_Base_NeighborGameSegmentActionType;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Common.Actions.TellGameSegmentAction.MoveEntity_TellGameSegmentAction
	var $Pather_Common_Models_Common_Actions_TellGameSegmentAction_MoveEntity_TellGameSegmentAction = function() {
	};
	$Pather_Common_Models_Common_Actions_TellGameSegmentAction_MoveEntity_TellGameSegmentAction.__typeName = 'Pather.Common.Models.Common.Actions.TellGameSegmentAction.MoveEntity_TellGameSegmentAction';
	$Pather_Common_Models_Common_Actions_TellGameSegmentAction_MoveEntity_TellGameSegmentAction.createInstance = function() {
		return $Pather_Common_Models_Common_Actions_TellGameSegmentAction_MoveEntity_TellGameSegmentAction.$ctor();
	};
	$Pather_Common_Models_Common_Actions_TellGameSegmentAction_MoveEntity_TellGameSegmentAction.$ctor = function() {
		var $this = $Pather_Common_Models_Common_Actions_TellGameSegmentAction_Base_TellGameSegmentAction.$ctor();
		$this.x = 0;
		$this.y = 0;
		$this.tellGameSegmentActionType = 'moveEntity';
		return $this;
	};
	global.Pather.Common.Models.Common.Actions.TellGameSegmentAction.MoveEntity_TellGameSegmentAction = $Pather_Common_Models_Common_Actions_TellGameSegmentAction_MoveEntity_TellGameSegmentAction;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Common.Actions.TellGameSegmentAction.Base.TellGameSegmentAction
	var $Pather_Common_Models_Common_Actions_TellGameSegmentAction_Base_TellGameSegmentAction = function() {
	};
	$Pather_Common_Models_Common_Actions_TellGameSegmentAction_Base_TellGameSegmentAction.__typeName = 'Pather.Common.Models.Common.Actions.TellGameSegmentAction.Base.TellGameSegmentAction';
	$Pather_Common_Models_Common_Actions_TellGameSegmentAction_Base_TellGameSegmentAction.$ctor = function() {
		var $this = {};
		$this.tellGameSegmentActionType = null;
		$this.lockstepTick = 0;
		$this.entityId = null;
		return $this;
	};
	global.Pather.Common.Models.Common.Actions.TellGameSegmentAction.Base.TellGameSegmentAction = $Pather_Common_Models_Common_Actions_TellGameSegmentAction_Base_TellGameSegmentAction;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Common.Actions.TellGameSegmentAction.Base.TellGameSegmentActionType
	var $Pather_Common_Models_Common_Actions_TellGameSegmentAction_Base_TellGameSegmentActionType = function() {
	};
	$Pather_Common_Models_Common_Actions_TellGameSegmentAction_Base_TellGameSegmentActionType.__typeName = 'Pather.Common.Models.Common.Actions.TellGameSegmentAction.Base.TellGameSegmentActionType';
	global.Pather.Common.Models.Common.Actions.TellGameSegmentAction.Base.TellGameSegmentActionType = $Pather_Common_Models_Common_Actions_TellGameSegmentAction_Base_TellGameSegmentActionType;
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
		$this.grid = null;
		$this.lockstepTickNumber = 0;
		$this.serverLatency = 0;
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
	// Pather.Common.Models.GameSegment.ReorganizeUser_GameWorld_GameSegment_PubSub_Message
	var $Pather_Common_Models_GameSegment_ReorganizeUser_GameWorld_GameSegment_PubSub_Message = function() {
	};
	$Pather_Common_Models_GameSegment_ReorganizeUser_GameWorld_GameSegment_PubSub_Message.__typeName = 'Pather.Common.Models.GameSegment.ReorganizeUser_GameWorld_GameSegment_PubSub_Message';
	$Pather_Common_Models_GameSegment_ReorganizeUser_GameWorld_GameSegment_PubSub_Message.createInstance = function() {
		return $Pather_Common_Models_GameSegment_ReorganizeUser_GameWorld_GameSegment_PubSub_Message.$ctor();
	};
	$Pather_Common_Models_GameSegment_ReorganizeUser_GameWorld_GameSegment_PubSub_Message.$ctor = function() {
		var $this = $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_Message.$ctor();
		$this.newGameSegmentId = null;
		$this.userId = null;
		$this.switchAtLockstepNumber = 0;
		$this.type = 'reorganizeGameSegment';
		return $this;
	};
	global.Pather.Common.Models.GameSegment.ReorganizeUser_GameWorld_GameSegment_PubSub_Message = $Pather_Common_Models_GameSegment_ReorganizeUser_GameWorld_GameSegment_PubSub_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.GameSegment.TellTransferUser_GameSegment_GameSegment_PubSub_Message
	var $Pather_Common_Models_GameSegment_TellTransferUser_GameSegment_GameSegment_PubSub_Message = function() {
	};
	$Pather_Common_Models_GameSegment_TellTransferUser_GameSegment_GameSegment_PubSub_Message.__typeName = 'Pather.Common.Models.GameSegment.TellTransferUser_GameSegment_GameSegment_PubSub_Message';
	$Pather_Common_Models_GameSegment_TellTransferUser_GameSegment_GameSegment_PubSub_Message.createInstance = function() {
		return $Pather_Common_Models_GameSegment_TellTransferUser_GameSegment_GameSegment_PubSub_Message.$ctor();
	};
	$Pather_Common_Models_GameSegment_TellTransferUser_GameSegment_GameSegment_PubSub_Message.$ctor = function() {
		var $this = $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_Message.$ctor();
		$this.userId = null;
		$this.newGameSegmentId = null;
		$this.type = 'tellTransferUser';
		return $this;
	};
	global.Pather.Common.Models.GameSegment.TellTransferUser_GameSegment_GameSegment_PubSub_Message = $Pather_Common_Models_GameSegment_TellTransferUser_GameSegment_GameSegment_PubSub_Message;
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
	// Pather.Common.Models.GameSegment.TransferUser_GameSegment_GameSegment_PubSub_Message
	var $Pather_Common_Models_GameSegment_TransferUser_GameSegment_GameSegment_PubSub_Message = function() {
	};
	$Pather_Common_Models_GameSegment_TransferUser_GameSegment_GameSegment_PubSub_Message.__typeName = 'Pather.Common.Models.GameSegment.TransferUser_GameSegment_GameSegment_PubSub_Message';
	$Pather_Common_Models_GameSegment_TransferUser_GameSegment_GameSegment_PubSub_Message.createInstance = function() {
		return $Pather_Common_Models_GameSegment_TransferUser_GameSegment_GameSegment_PubSub_Message.$ctor();
	};
	$Pather_Common_Models_GameSegment_TransferUser_GameSegment_GameSegment_PubSub_Message.$ctor = function() {
		var $this = $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_Message.$ctor();
		$this.userId = null;
		$this.lockstepMovePoints = null;
		$this.inProgressActions = null;
		$this.switchAtLockstepNumber = 0;
		$this.type = 'transferGameUser';
		return $this;
	};
	global.Pather.Common.Models.GameSegment.TransferUser_GameSegment_GameSegment_PubSub_Message = $Pather_Common_Models_GameSegment_TransferUser_GameSegment_GameSegment_PubSub_Message;
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
	// Pather.Common.Models.GameSegment.Base.GameSegmentAction_Gateway_GameSegment_PubSub_Message
	var $Pather_Common_Models_GameSegment_Base_GameSegmentAction_Gateway_GameSegment_PubSub_Message = function() {
	};
	$Pather_Common_Models_GameSegment_Base_GameSegmentAction_Gateway_GameSegment_PubSub_Message.__typeName = 'Pather.Common.Models.GameSegment.Base.GameSegmentAction_Gateway_GameSegment_PubSub_Message';
	$Pather_Common_Models_GameSegment_Base_GameSegmentAction_Gateway_GameSegment_PubSub_Message.createInstance = function() {
		return $Pather_Common_Models_GameSegment_Base_GameSegmentAction_Gateway_GameSegment_PubSub_Message.$ctor();
	};
	$Pather_Common_Models_GameSegment_Base_GameSegmentAction_Gateway_GameSegment_PubSub_Message.$ctor = function() {
		var $this = $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_Message.$ctor();
		$this.userId = null;
		$this.action = null;
		$this.type = 'gameSegmentAction';
		return $this;
	};
	global.Pather.Common.Models.GameSegment.Base.GameSegmentAction_Gateway_GameSegment_PubSub_Message = $Pather_Common_Models_GameSegment_Base_GameSegmentAction_Gateway_GameSegment_PubSub_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.GameSegment.Base.NeighborGameSegmentAction_GameSegment_GameSegment_PubSub_Message
	var $Pather_Common_Models_GameSegment_Base_NeighborGameSegmentAction_GameSegment_GameSegment_PubSub_Message = function() {
	};
	$Pather_Common_Models_GameSegment_Base_NeighborGameSegmentAction_GameSegment_GameSegment_PubSub_Message.__typeName = 'Pather.Common.Models.GameSegment.Base.NeighborGameSegmentAction_GameSegment_GameSegment_PubSub_Message';
	$Pather_Common_Models_GameSegment_Base_NeighborGameSegmentAction_GameSegment_GameSegment_PubSub_Message.createInstance = function() {
		return $Pather_Common_Models_GameSegment_Base_NeighborGameSegmentAction_GameSegment_GameSegment_PubSub_Message.$ctor();
	};
	$Pather_Common_Models_GameSegment_Base_NeighborGameSegmentAction_GameSegment_GameSegment_PubSub_Message.$ctor = function() {
		var $this = $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_Message.$ctor();
		$this.userId = null;
		$this.action = null;
		$this.originatingGameSegmentId = null;
		$this.type = 'gameSegmentAction';
		return $this;
	};
	global.Pather.Common.Models.GameSegment.Base.NeighborGameSegmentAction_GameSegment_GameSegment_PubSub_Message = $Pather_Common_Models_GameSegment_Base_NeighborGameSegmentAction_GameSegment_GameSegment_PubSub_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.GameSegment.Base.TellGameSegmentAction_GameSegment_GameSegment_PubSub_Message
	var $Pather_Common_Models_GameSegment_Base_TellGameSegmentAction_GameSegment_GameSegment_PubSub_Message = function() {
	};
	$Pather_Common_Models_GameSegment_Base_TellGameSegmentAction_GameSegment_GameSegment_PubSub_Message.__typeName = 'Pather.Common.Models.GameSegment.Base.TellGameSegmentAction_GameSegment_GameSegment_PubSub_Message';
	$Pather_Common_Models_GameSegment_Base_TellGameSegmentAction_GameSegment_GameSegment_PubSub_Message.createInstance = function() {
		return $Pather_Common_Models_GameSegment_Base_TellGameSegmentAction_GameSegment_GameSegment_PubSub_Message.$ctor();
	};
	$Pather_Common_Models_GameSegment_Base_TellGameSegmentAction_GameSegment_GameSegment_PubSub_Message.$ctor = function() {
		var $this = $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_Message.$ctor();
		$this.userId = null;
		$this.action = null;
		$this.originatingGameSegmentId = null;
		$this.type = 'tellGameSegmentAction';
		return $this;
	};
	global.Pather.Common.Models.GameSegment.Base.TellGameSegmentAction_GameSegment_GameSegment_PubSub_Message = $Pather_Common_Models_GameSegment_Base_TellGameSegmentAction_GameSegment_GameSegment_PubSub_Message;
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
	// Pather.Common.Models.GameWorld.Gateway.GameWorldAction_GameSegment_GameWorld_PubSub_Message
	var $Pather_Common_Models_GameWorld_Gateway_GameWorldAction_GameSegment_GameWorld_PubSub_Message = function() {
	};
	$Pather_Common_Models_GameWorld_Gateway_GameWorldAction_GameSegment_GameWorld_PubSub_Message.__typeName = 'Pather.Common.Models.GameWorld.Gateway.GameWorldAction_GameSegment_GameWorld_PubSub_Message';
	$Pather_Common_Models_GameWorld_Gateway_GameWorldAction_GameSegment_GameWorld_PubSub_Message.createInstance = function() {
		return $Pather_Common_Models_GameWorld_Gateway_GameWorldAction_GameSegment_GameWorld_PubSub_Message.$ctor();
	};
	$Pather_Common_Models_GameWorld_Gateway_GameWorldAction_GameSegment_GameWorld_PubSub_Message.$ctor = function() {
		var $this = $Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_Message.$ctor();
		$this.userId = null;
		$this.action = null;
		$this.originatingGameSegmentId = null;
		$this.type = 'gameWorldAction';
		return $this;
	};
	global.Pather.Common.Models.GameWorld.Gateway.GameWorldAction_GameSegment_GameWorld_PubSub_Message = $Pather_Common_Models_GameWorld_Gateway_GameWorldAction_GameSegment_GameWorld_PubSub_Message;
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
	// Pather.Common.Models.Gateway.PubSub.ClientActionCollection_GameSegment_Gateway_PubSub_Message
	var $Pather_Common_Models_Gateway_PubSub_ClientActionCollection_GameSegment_Gateway_PubSub_Message = function() {
	};
	$Pather_Common_Models_Gateway_PubSub_ClientActionCollection_GameSegment_Gateway_PubSub_Message.__typeName = 'Pather.Common.Models.Gateway.PubSub.ClientActionCollection_GameSegment_Gateway_PubSub_Message';
	$Pather_Common_Models_Gateway_PubSub_ClientActionCollection_GameSegment_Gateway_PubSub_Message.createInstance = function() {
		return $Pather_Common_Models_Gateway_PubSub_ClientActionCollection_GameSegment_Gateway_PubSub_Message.$ctor();
	};
	$Pather_Common_Models_Gateway_PubSub_ClientActionCollection_GameSegment_Gateway_PubSub_Message.$ctor = function() {
		var $this = $Pather_Common_Models_Gateway_PubSub_Base_Gateway_PubSub_Message.$ctor();
		$this.clientAction = null;
		$this.users = null;
		$this.type = 'clientActionCollection';
		return $this;
	};
	global.Pather.Common.Models.Gateway.PubSub.ClientActionCollection_GameSegment_Gateway_PubSub_Message = $Pather_Common_Models_Gateway_PubSub_ClientActionCollection_GameSegment_Gateway_PubSub_Message;
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
	// Pather.Common.Models.Gateway.PubSub.ReorganizeUser_GameWorld_Gateway_PubSub_Message
	var $Pather_Common_Models_Gateway_PubSub_ReorganizeUser_GameWorld_Gateway_PubSub_Message = function() {
	};
	$Pather_Common_Models_Gateway_PubSub_ReorganizeUser_GameWorld_Gateway_PubSub_Message.__typeName = 'Pather.Common.Models.Gateway.PubSub.ReorganizeUser_GameWorld_Gateway_PubSub_Message';
	$Pather_Common_Models_Gateway_PubSub_ReorganizeUser_GameWorld_Gateway_PubSub_Message.createInstance = function() {
		return $Pather_Common_Models_Gateway_PubSub_ReorganizeUser_GameWorld_Gateway_PubSub_Message.$ctor();
	};
	$Pather_Common_Models_Gateway_PubSub_ReorganizeUser_GameWorld_Gateway_PubSub_Message.$ctor = function() {
		var $this = $Pather_Common_Models_Gateway_PubSub_Base_Gateway_PubSub_Message.$ctor();
		$this.userId = null;
		$this.newGameSegmentId = null;
		$this.switchAtLockstepNumber = 0;
		$this.type = 'reorganizeUser';
		return $this;
	};
	global.Pather.Common.Models.Gateway.PubSub.ReorganizeUser_GameWorld_Gateway_PubSub_Message = $Pather_Common_Models_Gateway_PubSub_ReorganizeUser_GameWorld_Gateway_PubSub_Message;
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
		$this.grid = null;
		$this.type = 'userJoined';
		return $this;
	};
	global.Pather.Common.Models.Gateway.PubSub.UserJoined_GameWorld_Gateway_PubSub_Message = $Pather_Common_Models_Gateway_PubSub_UserJoined_GameWorld_Gateway_PubSub_Message;
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
	// Pather.Common.Models.Gateway.Socket.Base.ClientAction_Gateway_User_Socket_Message
	var $Pather_Common_Models_Gateway_Socket_Base_ClientAction_Gateway_User_Socket_Message = function() {
	};
	$Pather_Common_Models_Gateway_Socket_Base_ClientAction_Gateway_User_Socket_Message.__typeName = 'Pather.Common.Models.Gateway.Socket.Base.ClientAction_Gateway_User_Socket_Message';
	$Pather_Common_Models_Gateway_Socket_Base_ClientAction_Gateway_User_Socket_Message.createInstance = function() {
		return $Pather_Common_Models_Gateway_Socket_Base_ClientAction_Gateway_User_Socket_Message.$ctor();
	};
	$Pather_Common_Models_Gateway_Socket_Base_ClientAction_Gateway_User_Socket_Message.$ctor = function() {
		var $this = $Pather_Common_Models_Gateway_Socket_Base_Gateway_User_Socket_Message.$ctor();
		$this.userId = null;
		$this.action = null;
		$this.gatewayUserMessageType = 'clientAction';
		return $this;
	};
	global.Pather.Common.Models.Gateway.Socket.Base.ClientAction_Gateway_User_Socket_Message = $Pather_Common_Models_Gateway_Socket_Base_ClientAction_Gateway_User_Socket_Message;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.Gateway.Socket.Base.GameSegmentAction_User_Gateway_Socket_Message
	var $Pather_Common_Models_Gateway_Socket_Base_GameSegmentAction_User_Gateway_Socket_Message = function() {
	};
	$Pather_Common_Models_Gateway_Socket_Base_GameSegmentAction_User_Gateway_Socket_Message.__typeName = 'Pather.Common.Models.Gateway.Socket.Base.GameSegmentAction_User_Gateway_Socket_Message';
	$Pather_Common_Models_Gateway_Socket_Base_GameSegmentAction_User_Gateway_Socket_Message.createInstance = function() {
		return $Pather_Common_Models_Gateway_Socket_Base_GameSegmentAction_User_Gateway_Socket_Message.$ctor();
	};
	$Pather_Common_Models_Gateway_Socket_Base_GameSegmentAction_User_Gateway_Socket_Message.$ctor = function() {
		var $this = $Pather_Common_Models_Gateway_Socket_Base_User_Gateway_Socket_Message.$ctor();
		$this.gameSegmentAction = null;
		$this.userGatewayMessageType = 'gameSegmentAction';
		return $this;
	};
	global.Pather.Common.Models.Gateway.Socket.Base.GameSegmentAction_User_Gateway_Socket_Message = $Pather_Common_Models_Gateway_Socket_Base_GameSegmentAction_User_Gateway_Socket_Message;
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
		$this.userId = null;
		$this.x = 0;
		$this.y = 0;
		$this.grid = null;
		$this.lockstepTickNumber = 0;
		$this.serverLatency = 0;
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
		$this.originType = null;
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
		this.disable = false;
		this.disable = disable;
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
			if (customAttributes.length > 0 && !ss.cast(customAttributes[0], $Pather_Common_TestFramework_TestMethodAttribute).disable) {
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
				if (customAttributes.length > 0 && !ss.cast(customAttributes[0], $Pather_Common_TestFramework_TestClassAttribute).disable) {
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
		this.disable = false;
		this.disable = disable;
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
	// Pather.Common.Utils.AnimationStep
	var $Pather_Common_Utils_AnimationStep = function(fromX, fromY, x, y) {
		this.fromX = 0;
		this.fromY = 0;
		ss.shallowCopy($Pather_Common_Utils_Point.$ctor(x, y), this);
		this.fromX = fromX;
		this.fromY = fromY;
	};
	$Pather_Common_Utils_AnimationStep.__typeName = 'Pather.Common.Utils.AnimationStep';
	global.Pather.Common.Utils.AnimationStep = $Pather_Common_Utils_AnimationStep;
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
		var $type = function(dl) {
			$type.$ctor1.call(this, dl.$setKeyCallback);
			for (var $t1 = 0; $t1 < dl.list.length; $t1++) {
				var t = dl.list[$t1];
				this.add(t);
			}
		};
		$type.$ctor1 = function(setKeyCallback) {
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
				var key = this.$setKeyCallback(t);
				this.list.push(t);
				this.keys.push(key);
				this.dictionary[key] = t;
			},
			remove: function(t) {
				var key = this.$setKeyCallback(t);
				ss.remove(this.list, t);
				ss.remove(this.keys, key);
				delete this.dictionary[key];
			},
			remove$1: function(tkey) {
				var t = this.dictionary[tkey];
				ss.remove(this.list, t);
				ss.remove(this.keys, tkey);
				delete this.dictionary[tkey];
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
			}
		}, function() {
			return null;
		}, function() {
			return [];
		});
		$type.$ctor1.prototype = $type.prototype;
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
	$Pather_Common_Utils_EnumerableExtensions.as$1 = function(T, T2) {
		return function(t) {
			return ss.cast(t, T2);
		};
	};
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
	$Pather_Common_Utils_EnumerableExtensions.toDictionaryList = function(T, T2) {
		return function(items, clause) {
			var items2 = new (ss.makeGenericType($Pather_Common_Utils_DictionaryList$2, [T2, T]).$ctor1)(clause);
			for (var $t1 = 0; $t1 < items.length; $t1++) {
				var item = items[$t1];
				items2.add(item);
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
	$Pather_Common_Utils_EnumerableExtensions.where$2 = function(items, clause) {
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
	$Pather_Common_Utils_EnumerableExtensions.last = function(items) {
		return items[items.length - 1];
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
	$Pather_Common_Utils_EnumerableExtensions.where$1 = function(items, clause) {
		var items2 = [];
		for (var $t1 = 0; $t1 < items.length; $t1++) {
			var item = items[$t1];
			if (clause(item)) {
				items2.push(item);
			}
		}
		return items2;
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
	// Pather.Common.Utils.IntPoint
	var $Pather_Common_Utils_IntPoint = function() {
	};
	$Pather_Common_Utils_IntPoint.__typeName = 'Pather.Common.Utils.IntPoint';
	$Pather_Common_Utils_IntPoint.$ctor = function(x, y) {
		var $this = {};
		$this.x = 0;
		$this.y = 0;
		$this.x = x;
		$this.y = y;
		return $this;
	};
	global.Pather.Common.Utils.IntPoint = $Pather_Common_Utils_IntPoint;
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
	var $Pather_Common_Utils_Point = function() {
	};
	$Pather_Common_Utils_Point.__typeName = 'Pather.Common.Utils.Point';
	$Pather_Common_Utils_Point.$ctor = function(x, y) {
		var $this = {};
		$this.x = 0;
		$this.y = 0;
		$this.x = x;
		$this.y = y;
		return $this;
	};
	global.Pather.Common.Utils.Point = $Pather_Common_Utils_Point;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Utils.TickManager
	var $Pather_Common_Utils_TickManager = function() {
		this.lockstepTickNumber = 0;
		this.onProcessLockstep = null;
		this.currentLockstepTime = 0;
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
	$Pather_Common_Utils_Utilities.toSquare = function(pos) {
		return ss.Int32.trunc(pos / $Pather_Common_Constants.squareSize);
	};
	global.Pather.Common.Utils.Utilities = $Pather_Common_Utils_Utilities;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Utils.Histogram.HistogramManager
	var $Pather_Common_Utils_Histogram_$HistogramManager = function() {
	};
	$Pather_Common_Utils_Histogram_$HistogramManager.__typeName = 'Pather.Common.Utils.Histogram.$HistogramManager';
	$Pather_Common_Utils_Histogram_$HistogramManager.$addPoint = function(name, value) {
		if (!ss.keyExists($Pather_Common_Utils_Histogram_$HistogramManager.$histograms, name)) {
			$Pather_Common_Utils_Histogram_$HistogramManager.$histograms[name] = [];
		}
		var ints = $Pather_Common_Utils_Histogram_$HistogramManager.$histograms[name];
		ints.push(value);
		if (ints.length % 20 === 0) {
			$Pather_Common_Utils_Histogram_$HistogramManager.$printDistributions($Pather_Common_Utils_Histogram_$HistogramManager.$getDistribution(name));
		}
	};
	$Pather_Common_Utils_Histogram_$HistogramManager.$getDistribution = function(name) {
		if (!ss.keyExists($Pather_Common_Utils_Histogram_$HistogramManager.$histograms, name)) {
			$Pather_Common_Utils_Histogram_$HistogramManager.$histograms[name] = [];
		}
		var l = $Pather_Common_Utils_Histogram_$HistogramManager.$histograms[name];
		l.sort(function(a, b) {
			return a - b;
		});
		var binCounter = {};
		for (var $t1 = 0; $t1 < $Pather_Common_Utils_Histogram_$HistogramManager.$bins.length; $t1++) {
			var bin = $Pather_Common_Utils_Histogram_$HistogramManager.$bins[$t1];
			binCounter[bin] = 0;
		}
		for (var index = 0; index < l.length; index++) {
			var i = l[index];
			for (var $t2 = 0; $t2 < $Pather_Common_Utils_Histogram_$HistogramManager.$bins.length; $t2++) {
				var bin1 = $Pather_Common_Utils_Histogram_$HistogramManager.$bins[$t2];
				if (i <= bin1) {
					binCounter[bin1]++;
					break;
				}
			}
		}
		var dist = new $Pather_Common_Utils_Histogram_HistogramDistribution();
		dist.name = name;
		dist.items = [];
		dist.totalItems = l.length;
		for (var index1 = 0; index1 < $Pather_Common_Utils_Histogram_$HistogramManager.$bins.length - 1; index1++) {
			var $t4 = dist.items;
			var $t3 = new $Pather_Common_Utils_Histogram_HistogramDistributionItem();
			$t3.lowerBound = $Pather_Common_Utils_Histogram_$HistogramManager.$bins[index1];
			$t3.upperBound = $Pather_Common_Utils_Histogram_$HistogramManager.$bins[index1 + 1];
			$t3.value = binCounter[$Pather_Common_Utils_Histogram_$HistogramManager.$bins[index1]];
			$t4.push($t3);
		}
		return dist;
	};
	$Pather_Common_Utils_Histogram_$HistogramManager.$printDistributions = function(dist) {
		console.log(dist.name + ' Histogram:');
		for (var $t1 = 0; $t1 < dist.items.length; $t1++) {
			var item = dist.items[$t1];
			if (item.value === 0) {
				continue;
			}
			var c = item.value / dist.totalItems * 100;
			console.log(c + '% Of the items took between ' + item.lowerBound + 'ms and ' + item.upperBound + 'ms');
		}
	};
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Utils.Histogram.HistogramDistribution
	var $Pather_Common_Utils_Histogram_HistogramDistribution = function() {
		this.name = null;
		this.totalItems = 0;
		this.items = null;
	};
	$Pather_Common_Utils_Histogram_HistogramDistribution.__typeName = 'Pather.Common.Utils.Histogram.HistogramDistribution';
	global.Pather.Common.Utils.Histogram.HistogramDistribution = $Pather_Common_Utils_Histogram_HistogramDistribution;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Utils.Histogram.HistogramDistributionItem
	var $Pather_Common_Utils_Histogram_HistogramDistributionItem = function() {
		this.lowerBound = 0;
		this.upperBound = 0;
		this.value = 0;
	};
	$Pather_Common_Utils_Histogram_HistogramDistributionItem.__typeName = 'Pather.Common.Utils.Histogram.HistogramDistributionItem';
	global.Pather.Common.Utils.Histogram.HistogramDistributionItem = $Pather_Common_Utils_Histogram_HistogramDistributionItem;
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
	ss.initClass($Pather_Common_ConnectionConstants, $asm, {});
	ss.initClass($Pather_Common_Constants, $asm, {});
	ss.initClass($Pather_Common_Definitions_AStar_AStarLockstepPath, $asm, {});
	ss.initClass($Pather_Common_GameFramework_Game, $asm, {
		init: function(grid, lockstepTickNumber, serverLatency) {
			this.board = new $Pather_Common_GameFramework_GameBoard();
			this.board.init(grid);
			this.tickManager.setServerLatency(serverLatency);
			this.tickManager.setLockStepTick(lockstepTickNumber);
		},
		addEntity: function(entity) {
			this.activeEntities.add(entity);
		},
		createGameUser: function(userId) {
			return new $Pather_Common_GameFramework_GameUser(this, userId);
		},
		tick: function(tickNumber) {
			for (var $t1 = 0; $t1 < this.activeEntities.list.length; $t1++) {
				var person = this.activeEntities.list[$t1];
				person.tick();
			}
		}
	});
	ss.initClass($Pather_Common_GameFramework_GameBoard, $asm, {
		init: function(grid) {
			this.grid = grid;
			this.aStarGraph = new Graph(this.grid);
		}
	});
	ss.initClass($Pather_Common_GameFramework_GameEntity, $asm, {
		tick: function() {
		}
	});
	ss.initClass($Pather_Common_GameFramework_GameEntityNeighbor, $asm, {});
	ss.initClass($Pather_Common_GameFramework_GameUser, $asm, {
		tick: function() {
			$Pather_Common_GameFramework_GameEntity.prototype.tick.call(this);
		}
	}, $Pather_Common_GameFramework_GameEntity);
	ss.initInterface($Pather_Common_Models_Common_IPubSub_Message, $asm, {});
	ss.initClass($Pather_Common_Models_ClusterManager_Base_ClusterManager_PubSub_Message, $asm, {}, null, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initInterface($Pather_Common_Models_Common_IPubSub_ReqRes_Message, $asm, {}, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initClass($Pather_Common_Models_ClusterManager_Base_ClusterManager_PubSub_ReqRes_Message, $asm, {}, $Pather_Common_Models_ClusterManager_Base_ClusterManager_PubSub_Message, [$Pather_Common_Models_Common_IPubSub_Message, $Pather_Common_Models_Common_IPubSub_ReqRes_Message]);
	ss.initClass($Pather_Common_Models_ClusterManager_CreateGameSegment_ServerManager_ClusterManager_PubSub_ReqRes_Message, $asm, {}, $Pather_Common_Models_ClusterManager_Base_ClusterManager_PubSub_ReqRes_Message, [$Pather_Common_Models_Common_IPubSub_Message, $Pather_Common_Models_Common_IPubSub_ReqRes_Message]);
	ss.initClass($Pather_Common_Models_ClusterManager_CreateGateway_ServerManager_ClusterManager_PubSub_ReqRes_Message, $asm, {}, $Pather_Common_Models_ClusterManager_Base_ClusterManager_PubSub_ReqRes_Message, [$Pather_Common_Models_Common_IPubSub_Message, $Pather_Common_Models_Common_IPubSub_ReqRes_Message]);
	ss.initEnum($Pather_Common_Models_ClusterManager_Base_ClusterManager_PubSub_MessageType, $asm, { createGameSegment: 'createGameSegment', createGateway: 'createGateway' }, true);
	ss.initClass($Pather_Common_Models_Common_ClientActionCacheModel, $asm, {});
	ss.initClass($Pather_Common_Models_Common_InProgressClientAction, $asm, {});
	ss.initClass($Pather_Common_Models_Common_PubSub_Message_Collection, $asm, {}, null, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initClass($Pather_Common_Models_Common_UpdatedNeighbor, $asm, {});
	ss.initInterface($Pather_Common_Models_Common_Actions_IAction, $asm, {});
	ss.initClass($Pather_Common_Models_Common_Actions_ClientActions_Base_ClientAction, $asm, {}, null, [$Pather_Common_Models_Common_Actions_IAction]);
	ss.initClass($Pather_Common_Models_Common_Actions_ClientActions_MoveEntity_ClientAction, $asm, {}, $Pather_Common_Models_Common_Actions_ClientActions_Base_ClientAction, [$Pather_Common_Models_Common_Actions_IAction]);
	ss.initClass($Pather_Common_Models_Common_Actions_ClientActions_MoveEntityOnPath_ClientAction, $asm, {}, $Pather_Common_Models_Common_Actions_ClientActions_Base_ClientAction, [$Pather_Common_Models_Common_Actions_IAction]);
	ss.initClass($Pather_Common_Models_Common_Actions_ClientActions_UpdateNeighborsClientAction, $asm, {}, $Pather_Common_Models_Common_Actions_ClientActions_Base_ClientAction, [$Pather_Common_Models_Common_Actions_IAction]);
	ss.initEnum($Pather_Common_Models_Common_Actions_ClientActions_Base_ClientActionType, $asm, { move: 'move', updateNeighbors: 'updateNeighbors', moveEntityOnPath: 'moveEntityOnPath' }, true);
	ss.initClass($Pather_Common_Models_Common_Actions_GameSegmentAction_Base_GameSegmentAction, $asm, {}, null, [$Pather_Common_Models_Common_Actions_IAction]);
	ss.initClass($Pather_Common_Models_Common_Actions_GameSegmentAction_MoveEntity_GameSegmentAction, $asm, {}, $Pather_Common_Models_Common_Actions_GameSegmentAction_Base_GameSegmentAction, [$Pather_Common_Models_Common_Actions_IAction]);
	ss.initEnum($Pather_Common_Models_Common_Actions_GameSegmentAction_Base_GameSegmentActionType, $asm, { moveEntity: 'moveEntity' }, true);
	ss.initClass($Pather_Common_Models_Common_Actions_GameWorldAction_Base_GameWorldAction, $asm, {}, null, [$Pather_Common_Models_Common_Actions_IAction]);
	ss.initClass($Pather_Common_Models_Common_Actions_GameWorldAction_MoveEntity_GameWorldAction, $asm, {}, $Pather_Common_Models_Common_Actions_GameWorldAction_Base_GameWorldAction, [$Pather_Common_Models_Common_Actions_IAction]);
	ss.initEnum($Pather_Common_Models_Common_Actions_GameWorldAction_Base_GameWorldActionType, $asm, { moveEntity: 'moveEntity' }, true);
	ss.initClass($Pather_Common_Models_Common_Actions_NeighborGameSegmentAction_Base_NeighborGameSegmentAction, $asm, {}, null, [$Pather_Common_Models_Common_Actions_IAction]);
	ss.initClass($Pather_Common_Models_Common_Actions_NeighborGameSegmentAction_MoveEntity_NeighborGameSegmentAction, $asm, {}, $Pather_Common_Models_Common_Actions_NeighborGameSegmentAction_Base_NeighborGameSegmentAction, [$Pather_Common_Models_Common_Actions_IAction]);
	ss.initEnum($Pather_Common_Models_Common_Actions_NeighborGameSegmentAction_Base_NeighborGameSegmentActionType, $asm, { moveEntity: 'moveEntity' }, true);
	ss.initClass($Pather_Common_Models_Common_Actions_TellGameSegmentAction_Base_TellGameSegmentAction, $asm, {}, null, [$Pather_Common_Models_Common_Actions_IAction]);
	ss.initClass($Pather_Common_Models_Common_Actions_TellGameSegmentAction_MoveEntity_TellGameSegmentAction, $asm, {}, $Pather_Common_Models_Common_Actions_TellGameSegmentAction_Base_TellGameSegmentAction, [$Pather_Common_Models_Common_Actions_IAction]);
	ss.initEnum($Pather_Common_Models_Common_Actions_TellGameSegmentAction_Base_TellGameSegmentActionType, $asm, { moveEntity: 'moveEntity' }, true);
	ss.initClass($Pather_Common_Models_GameSegment_InitialGameUser, $asm, {});
	ss.initClass($Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_Message, $asm, {}, null, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initClass($Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_ReqRes_Message, $asm, {}, $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_Message, [$Pather_Common_Models_Common_IPubSub_Message, $Pather_Common_Models_Common_IPubSub_ReqRes_Message]);
	ss.initClass($Pather_Common_Models_GameSegment_InitializeGameSegment_Response_GameWorld_GameSegment_PubSub_ReqRes_Message, $asm, {}, $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_ReqRes_Message, [$Pather_Common_Models_Common_IPubSub_Message, $Pather_Common_Models_Common_IPubSub_ReqRes_Message]);
	ss.initClass($Pather_Common_Models_GameSegment_NewGameSegment_GameWorld_GameSegment_PubSub_Message, $asm, {}, $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_Message, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initClass($Pather_Common_Models_GameSegment_Pong_Tick_GameSegment_PubSub_Message, $asm, {}, $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_Message, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initClass($Pather_Common_Models_GameSegment_ReorganizeUser_GameWorld_GameSegment_PubSub_Message, $asm, {}, $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_Message, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initClass($Pather_Common_Models_GameSegment_TellTransferUser_GameSegment_GameSegment_PubSub_Message, $asm, {}, $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_Message, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initClass($Pather_Common_Models_GameSegment_TellUserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message, $asm, {}, $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_ReqRes_Message, [$Pather_Common_Models_Common_IPubSub_Message, $Pather_Common_Models_Common_IPubSub_ReqRes_Message]);
	ss.initClass($Pather_Common_Models_GameSegment_TellUserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message, $asm, {}, $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_ReqRes_Message, [$Pather_Common_Models_Common_IPubSub_Message, $Pather_Common_Models_Common_IPubSub_ReqRes_Message]);
	ss.initClass($Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_AllMessage, $asm, {}, null, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initClass($Pather_Common_Models_GameSegment_TickSync_GameSegment_PubSub_AllMessage, $asm, {}, $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_AllMessage, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initClass($Pather_Common_Models_GameSegment_TransferUser_GameSegment_GameSegment_PubSub_Message, $asm, {}, $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_Message, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initClass($Pather_Common_Models_GameSegment_UserJoin_GameWorld_GameSegment_PubSub_ReqRes_Message, $asm, {}, $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_ReqRes_Message, [$Pather_Common_Models_Common_IPubSub_Message, $Pather_Common_Models_Common_IPubSub_ReqRes_Message]);
	ss.initClass($Pather_Common_Models_GameSegment_UserJoinGameUser, $asm, {});
	ss.initClass($Pather_Common_Models_GameSegment_UserLeft_GameWorld_GameSegment_PubSub_ReqRes_Message, $asm, {}, $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_ReqRes_Message, [$Pather_Common_Models_Common_IPubSub_Message, $Pather_Common_Models_Common_IPubSub_ReqRes_Message]);
	ss.initEnum($Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_AllMessageType, $asm, { tickSync: 'tickSync' }, true);
	ss.initEnum($Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_MessageType, $asm, { pong: 'pong', tellUserJoin: 'tellUserJoin', initializeGameSegmentResponse: 'initializeGameSegmentResponse', tellUserLeft: 'tellUserLeft', userJoin: 'userJoin', userLeft: 'userLeft', newGameSegment: 'newGameSegment', reorganizeGameSegment: 'reorganizeGameSegment', gameSegmentAction: 'gameSegmentAction', tellGameSegmentAction: 'tellGameSegmentAction', neighborGameSegmentAction: 'neighborGameSegmentAction', transferGameUser: 'transferGameUser', tellTransferUser: 'tellTransferUser' }, true);
	ss.initClass($Pather_Common_Models_GameSegment_Base_GameSegmentAction_Gateway_GameSegment_PubSub_Message, $asm, {}, $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_Message, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initClass($Pather_Common_Models_GameSegment_Base_NeighborGameSegmentAction_GameSegment_GameSegment_PubSub_Message, $asm, {}, $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_Message, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initClass($Pather_Common_Models_GameSegment_Base_TellGameSegmentAction_GameSegment_GameSegment_PubSub_Message, $asm, {}, $Pather_Common_Models_GameSegment_Base_GameSegment_PubSub_Message, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initClass($Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_Message, $asm, {}, null, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initEnum($Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_MessageType, $asm, { userJoined: 'userJoined', userJoinResponse: 'userJoinResponse', tellUserJoinResponse: 'tellUserJoinResponse', tellUserLeftResponse: 'tellUserLeftResponse', tickSync: 'tickSync', userLeft: 'userLeft', pong: 'pong', initializeGameSegment: 'initializeGameSegment', gameWorldAction: 'gameWorldAction', createGameSegment: 'createGameSegment' }, true);
	ss.initClass($Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_ReqRes_Message, $asm, {}, $Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_Message, [$Pather_Common_Models_Common_IPubSub_Message, $Pather_Common_Models_Common_IPubSub_ReqRes_Message]);
	ss.initClass($Pather_Common_Models_GameWorld_GameSegment_InitializeGameSegment_GameSegment_GameWorld_PubSub_ReqRes_Message, $asm, {}, $Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_ReqRes_Message, [$Pather_Common_Models_Common_IPubSub_Message, $Pather_Common_Models_Common_IPubSub_ReqRes_Message]);
	ss.initClass($Pather_Common_Models_GameWorld_GameSegment_TellUserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message, $asm, {}, $Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_ReqRes_Message, [$Pather_Common_Models_Common_IPubSub_Message, $Pather_Common_Models_Common_IPubSub_ReqRes_Message]);
	ss.initClass($Pather_Common_Models_GameWorld_GameSegment_TellUserLeft_Response_GameSegment_GameWorld_PubSub_ReqRes_Message, $asm, {}, $Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_ReqRes_Message, [$Pather_Common_Models_Common_IPubSub_Message, $Pather_Common_Models_Common_IPubSub_ReqRes_Message]);
	ss.initClass($Pather_Common_Models_GameWorld_GameSegment_UserJoin_Response_GameSegment_GameWorld_PubSub_ReqRes_Message, $asm, {}, $Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_ReqRes_Message, [$Pather_Common_Models_Common_IPubSub_Message, $Pather_Common_Models_Common_IPubSub_ReqRes_Message]);
	ss.initClass($Pather_Common_Models_GameWorld_GameSegment_UserLeft_Response_GameSegment_GameWorld_PubSub_ReqRes_Message, $asm, {}, $Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_ReqRes_Message, [$Pather_Common_Models_Common_IPubSub_Message, $Pather_Common_Models_Common_IPubSub_ReqRes_Message]);
	ss.initClass($Pather_Common_Models_GameWorld_Gateway_GameWorldAction_GameSegment_GameWorld_PubSub_Message, $asm, {}, $Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_Message, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initClass($Pather_Common_Models_GameWorld_Gateway_UserJoined_Gateway_GameWorld_PubSub_Message, $asm, {}, $Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_Message, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initClass($Pather_Common_Models_GameWorld_Gateway_UserLeft_Gateway_GameWorld_PubSub_Message, $asm, {}, $Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_Message, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initClass($Pather_Common_Models_GameWorld_ServerManager_CreateGameSegment_Response_ServerManager_GameWorld_PubSub_ReqRes_Message, $asm, {}, $Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_ReqRes_Message, [$Pather_Common_Models_Common_IPubSub_Message, $Pather_Common_Models_Common_IPubSub_ReqRes_Message]);
	ss.initClass($Pather_Common_Models_GameWorld_Tick_Pong_Tick_GameWorld_PubSub_Message, $asm, {}, $Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_Message, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initClass($Pather_Common_Models_GameWorld_Tick_TickSync_Tick_GameWorld_PubSub_Message, $asm, {}, $Pather_Common_Models_GameWorld_Base_GameWorld_PubSub_Message, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initClass($Pather_Common_Models_Gateway_PubSub_Base_Gateway_PubSub_Message, $asm, {}, null, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initClass($Pather_Common_Models_Gateway_PubSub_ClientActionCollection_GameSegment_Gateway_PubSub_Message, $asm, {}, $Pather_Common_Models_Gateway_PubSub_Base_Gateway_PubSub_Message, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initClass($Pather_Common_Models_Gateway_PubSub_Base_Gateway_PubSub_AllMessage, $asm, {}, null, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initClass($Pather_Common_Models_Gateway_PubSub_Ping_Head_Gateway_PubSub_AllMessage, $asm, {}, $Pather_Common_Models_Gateway_PubSub_Base_Gateway_PubSub_AllMessage, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initClass($Pather_Common_Models_Gateway_PubSub_Pong_Tick_Gateway_PubSub_Message, $asm, {}, $Pather_Common_Models_Gateway_PubSub_Base_Gateway_PubSub_Message, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initClass($Pather_Common_Models_Gateway_PubSub_ReorganizeUser_GameWorld_Gateway_PubSub_Message, $asm, {}, $Pather_Common_Models_Gateway_PubSub_Base_Gateway_PubSub_Message, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initClass($Pather_Common_Models_Gateway_PubSub_TickSync_Tick_Gateway_PubSub_AllMessage, $asm, {}, $Pather_Common_Models_Gateway_PubSub_Base_Gateway_PubSub_AllMessage, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initClass($Pather_Common_Models_Gateway_PubSub_UserJoined_GameWorld_Gateway_PubSub_Message, $asm, {}, $Pather_Common_Models_Gateway_PubSub_Base_Gateway_PubSub_Message, [$Pather_Common_Models_Common_IPubSub_Message]);
	ss.initEnum($Pather_Common_Models_Gateway_PubSub_Base_Gateway_PubSub_AllMessageType, $asm, { tickSync: 'tickSync', ping: 'ping' }, true);
	ss.initEnum($Pather_Common_Models_Gateway_PubSub_Base_Gateway_PubSub_MessageType, $asm, { userJoined: 'userJoined', pong: 'pong', clientActionCollection: 'clientActionCollection', reorganizeUser: 'reorganizeUser' }, true);
	ss.initClass($Pather_Common_Models_Gateway_Socket_Base_Socket_Message, $asm, {});
	ss.initClass($Pather_Common_Models_Gateway_Socket_Base_User_Socket_Message, $asm, {}, $Pather_Common_Models_Gateway_Socket_Base_Socket_Message);
	ss.initClass($Pather_Common_Models_Gateway_Socket_Base_Gateway_User_Socket_Message, $asm, {}, $Pather_Common_Models_Gateway_Socket_Base_User_Socket_Message);
	ss.initClass($Pather_Common_Models_Gateway_Socket_Base_ClientAction_Gateway_User_Socket_Message, $asm, {}, $Pather_Common_Models_Gateway_Socket_Base_Gateway_User_Socket_Message);
	ss.initClass($Pather_Common_Models_Gateway_Socket_Base_Gateway_Socket_Message, $asm, {}, $Pather_Common_Models_Gateway_Socket_Base_Socket_Message);
	ss.initClass($Pather_Common_Models_Gateway_Socket_Base_User_Gateway_Socket_Message, $asm, {}, $Pather_Common_Models_Gateway_Socket_Base_Gateway_Socket_Message);
	ss.initClass($Pather_Common_Models_Gateway_Socket_Base_GameSegmentAction_User_Gateway_Socket_Message, $asm, {}, $Pather_Common_Models_Gateway_Socket_Base_User_Gateway_Socket_Message);
	ss.initEnum($Pather_Common_Models_Gateway_Socket_Base_Gateway_User_Socket_MessageType, $asm, { clientAction: 'clientAction', userJoined: 'userJoined', tickSync: 'tickSync', pong: 'pong', updateNeighbors: 'updateNeighbors' }, true);
	ss.initClass($Pather_Common_Models_Gateway_Socket_Base_Ping_User_Gateway_Socket_Message, $asm, {}, $Pather_Common_Models_Gateway_Socket_Base_User_Gateway_Socket_Message);
	ss.initClass($Pather_Common_Models_Gateway_Socket_Base_Pong_Gateway_User_PubSub_Message, $asm, {}, $Pather_Common_Models_Gateway_Socket_Base_Gateway_User_Socket_Message);
	ss.initClass($Pather_Common_Models_Gateway_Socket_Base_TickSync_Gateway_User_Socket_Message, $asm, {}, $Pather_Common_Models_Gateway_Socket_Base_Gateway_User_Socket_Message);
	ss.initEnum($Pather_Common_Models_Gateway_Socket_Base_User_Gateway_Socket_MessageType, $asm, { gameSegmentAction: 'gameSegmentAction', join: 'join', ping: 'ping' }, true);
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
	ss.initEnum($Pather_Common_Models_Tick_Ping_Tick_PubSub_Message_OriginType, $asm, { gameSegment: 'gameSegment', gameWorld: 'gameWorld', gateway: 'gateway' }, true);
	ss.initEnum($Pather_Common_Models_Tick_Base_Tick_PubSub_MessageType, $asm, { ping: 'ping' }, true);
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
	ss.initClass($Pather_Common_Utils_AnimationStep, $asm, {}, $Pather_Common_Utils_Point);
	ss.initClass($Pather_Common_Utils_EnumerableExtensions, $asm, {});
	ss.initClass($Pather_Common_Utils_IntPoint, $asm, {});
	ss.initClass($Pather_Common_Utils_Lerper, $asm, {});
	ss.initClass($Pather_Common_Utils_Logger, $asm, {});
	ss.initEnum($Pather_Common_Utils_LogLevel, $asm, { error: 'error', debugInformation: 'debugInformation', information: 'information', transportInfo: 'transportInfo', dataInfo: 'dataInfo', keepAlive: 'keepAlive' }, true);
	ss.initClass($Pather_Common_Utils_TickManager, $asm, {
		init: function(currentLockstepTickNumber) {
			this.lockstepTickNumber = currentLockstepTickNumber;
			this.currentLockstepTime = (new Date()).getTime();
			setTimeout(ss.mkdel(this, this.$tick), 1);
		},
		setLockStepTick: function(lockStepTickNumber) {
			//todo resolve if current > or < lockstep
			if (this.lockstepTickNumber > lockStepTickNumber) {
				this.lockstepTickNumber = lockStepTickNumber;
				console.log('Force Lockstep', lockStepTickNumber);
				this.processLockstep(this.lockstepTickNumber);
			}
			if (this.lockstepTickNumber < lockStepTickNumber) {
				console.log('Force Lockstep', lockStepTickNumber);
				while (this.lockstepTickNumber < lockStepTickNumber) {
					this.lockstepTickNumber++;
					this.processLockstep(this.lockstepTickNumber);
				}
			}
			this.currentLockstepTime = (new Date()).getTime() - this.currentServerLatency;
		},
		setServerLatency: function(latency) {
			this.currentServerLatency = latency;
		},
		$tick: function() {
			setTimeout(ss.mkdel(this, this.$tick), 1);
			var vc = (new Date()).getTime();
			var l = vc - this.currentLockstepTime;
			while (l > $Pather_Common_Constants.lockstepTicks) {
				l -= $Pather_Common_Constants.lockstepTicks;
				this.currentLockstepTime += $Pather_Common_Constants.lockstepTicks;
				this.lockstepTickNumber++;
				var now = new Date();
				this.processLockstep(this.lockstepTickNumber);
				var dt = new Date() - now;
				$Pather_Common_Utils_Histogram_$HistogramManager.$addPoint('Tick', dt);
			}
		},
		processLockstep: function(lockstepTickNumber) {
			if (!ss.staticEquals(this.onProcessLockstep, null)) {
				this.onProcessLockstep(lockstepTickNumber);
			}
			//            Global.Console.Log("Lockstep", LockstepTickNumber, new DateTime().GetTime());
			//            ServerLogger.LogInformation("Lockstep", LockstepTickNumber, new DateTime().GetTime());
		}
	});
	ss.initClass($Pather_Common_Utils_Utilities, $asm, {});
	ss.initClass($Pather_Common_Utils_Histogram_$HistogramManager, $asm, {});
	ss.initClass($Pather_Common_Utils_Histogram_HistogramDistribution, $asm, {});
	ss.initClass($Pather_Common_Utils_Histogram_HistogramDistributionItem, $asm, {});
	ss.initClass($Pather_Common_Utils_Promises_Deferred, $asm, {
		resolve: function() {
			this.promise.resolve();
		},
		reject: function() {
			this.promise.reject();
		},
		resolveInATick: function() {
			//todo this is basically a testmethod
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
		$Pather_Common_ConnectionConstants.mainDomain = 'whoscoding.net';
		$Pather_Common_ConnectionConstants.redisIP = ($Pather_Common_ConnectionConstants.get_production() ? ('redis.' + $Pather_Common_ConnectionConstants.mainDomain) : '127.0.0.1');
		$Pather_Common_ConnectionConstants.headIP = ($Pather_Common_ConnectionConstants.get_production() ? ('http://head.' + $Pather_Common_ConnectionConstants.mainDomain + ':2222/api/') : 'http://127.0.0.1:2222/api/');
	})();
	(function() {
		$Pather_Common_Constants.numberOfAnimationSteps = 0;
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
		$Pather_Common_Constants.buildNeighborsTimeout = 0;
		$Pather_Common_Constants.reorganizeGameWorldInterval = 0;
		$Pather_Common_Constants.gameSegmentReorgSwitchLockstepOffset = 0;
		$Pather_Common_Constants.clusterGroupViewRadius = 0;
		$Pather_Common_Constants.testReorganizeGameWorldInterval = 0;
		$Pather_Common_Constants.numberOfReorganizedPlayersPerSession = 0;
		$Pather_Common_Constants.spinUpNewGatewayCheck = 0;
		$Pather_Common_Constants.pingGatewayFromHeadTimeout = 0;
		//CLIENT
		$Pather_Common_Constants.squareSize = 16;
		$Pather_Common_Constants.numberOfSquares = 100;
		$Pather_Common_Constants.drawFps = 60;
		$Pather_Common_Constants.drawTicks = ss.Int32.div(1000, $Pather_Common_Constants.drawFps);
		$Pather_Common_Constants.numberOfAnimationSteps = 5;
		$Pather_Common_Constants.gameFps = 10;
		$Pather_Common_Constants.gameTicks = ss.Int32.div(1000, $Pather_Common_Constants.gameFps);
		$Pather_Common_Constants.lockstepFps = 2;
		$Pather_Common_Constants.lockstepTicks = ss.Int32.div(1000, $Pather_Common_Constants.lockstepFps);
		$Pather_Common_Constants.latencyPingInterval = 6000;
		$Pather_Common_Constants.neighborDistance = 40;
		$Pather_Common_Constants.usersPerGameSegment = 40;
		$Pather_Common_Constants.gameSegmentCreationWait = 60;
		$Pather_Common_Constants.gatewayCreationWait = 60;
		$Pather_Common_Constants.maxConnectionsPerGateway = 100;
		$Pather_Common_Constants.gatewayConnectionSpawnThreshold = 40;
		$Pather_Common_Constants.maxGatewaysPerCluster = 10;
		$Pather_Common_Constants.maxGameSegmentsPerCluster = 10;
		$Pather_Common_Constants.pingGatewayFromHeadTimeout = 1000;
		$Pather_Common_Constants.spinUpNewGatewayCheck = 4000;
		$Pather_Common_Constants.buildNeighborsTimeout = 2000;
		$Pather_Common_Constants.reorganizeGameWorldInterval = 2000;
		$Pather_Common_Constants.testReorganizeGameWorldInterval = 120000;
		$Pather_Common_Constants.numberOfReorganizedPlayersPerSession = 10;
		$Pather_Common_Constants.gameSegmentReorgSwitchLockstepOffset = 2;
		$Pather_Common_Constants.clusterGroupViewRadius = $Pather_Common_Constants.neighborDistance * 5;
	})();
	(function() {
		eval('\r\nglobal.$overwiteMethodCallForMocker$=function ($call$,$overwrite$) {\r\n    var $targets$=$call$._targets[0];\r\n    for(var m in $targets$) {\r\n        if($targets$[m]==$call$._targets[1]) {\r\n            $targets$[m]=$overwrite$;\r\n        }\r\n    }\r\n}');
		eval("\r\nglobal.$instantiateInterface$=function ($type$) {\r\n    var obj={};\r\n    for(var m in $type$.prototype) {\r\n        obj[m]=function(){throw new Error('Mock interface method '+m+' not overridden');};\r\n    }\r\n    return obj;\r\n}");
	})();
	(function() {
		$Pather_Common_Utils_Histogram_$HistogramManager.$histograms = {};
		$Pather_Common_Utils_Histogram_$HistogramManager.$bins = [0, 3, 5, 10, 20, 30, 50, 75, 100, 500, 1000, 100000000];
	})();
})();
