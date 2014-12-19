(function() {
	'use strict';
	var $asm = {};
	global.Pather = global.Pather || {};
	global.Pather.Client = global.Pather.Client || {};
	global.Pather.Client.Utils = global.Pather.Client.Utils || {};
	global.Pather.Common = global.Pather.Common || {};
	global.Pather.Common.Models = global.Pather.Common.Models || {};
	global.Pather.Common.Utils = global.Pather.Common.Utils || {};
	ss.initAssembly($asm, 'Pather.Common');
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Client.Utils.AnimationPoint
	var $Pather_Client_Utils_AnimationPoint = function(fromX, fromY, x, y) {
		this.fromX = 0;
		this.fromY = 0;
		$Pather_Client_Utils_Point.call(this, x, y);
		this.fromX = fromX;
		this.fromY = fromY;
	};
	$Pather_Client_Utils_AnimationPoint.__typeName = 'Pather.Client.Utils.AnimationPoint';
	global.Pather.Client.Utils.AnimationPoint = $Pather_Client_Utils_AnimationPoint;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Client.Utils.Point
	var $Pather_Client_Utils_Point = function(x, y) {
		this.x = 0;
		this.y = 0;
		this.x = x;
		this.y = y;
	};
	$Pather_Client_Utils_Point.__typeName = 'Pather.Client.Utils.Point';
	global.Pather.Client.Utils.Point = $Pather_Client_Utils_Point;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.ActionType
	var $Pather_Common_ActionType = function() {
	};
	$Pather_Common_ActionType.__typeName = 'Pather.Common.ActionType';
	global.Pather.Common.ActionType = $Pather_Common_ActionType;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Constants
	var $Pather_Common_Constants = function() {
	};
	$Pather_Common_Constants.__typeName = 'Pather.Common.Constants';
	$Pather_Common_Constants.lerp = function(start, end, duration) {
		return start + (end - start) * duration;
	};
	$Pather_Common_Constants.moveTowards = function(start, end, amount) {
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
	// Pather.Common.Models.ConnectedModel
	var $Pather_Common_Models_ConnectedModel = function() {
	};
	$Pather_Common_Models_ConnectedModel.__typeName = 'Pather.Common.Models.ConnectedModel';
	$Pather_Common_Models_ConnectedModel.createInstance = function() {
		return $Pather_Common_Models_ConnectedModel.$ctor();
	};
	$Pather_Common_Models_ConnectedModel.$ctor = function() {
		var $this = {};
		$this.grid = null;
		return $this;
	};
	global.Pather.Common.Models.ConnectedModel = $Pather_Common_Models_ConnectedModel;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.MoveModel
	var $Pather_Common_Models_MoveModel = function() {
	};
	$Pather_Common_Models_MoveModel.__typeName = 'Pather.Common.Models.MoveModel';
	$Pather_Common_Models_MoveModel.createInstance = function() {
		return $Pather_Common_Models_MoveModel.$ctor();
	};
	$Pather_Common_Models_MoveModel.$ctor = function() {
		var $this = {};
		$this.playerId = null;
		$this.x = 0;
		$this.y = 0;
		return $this;
	};
	global.Pather.Common.Models.MoveModel = $Pather_Common_Models_MoveModel;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.PingPongModel
	var $Pather_Common_Models_PingPongModel = function() {
	};
	$Pather_Common_Models_PingPongModel.__typeName = 'Pather.Common.Models.PingPongModel';
	$Pather_Common_Models_PingPongModel.createInstance = function() {
		return $Pather_Common_Models_PingPongModel.$ctor();
	};
	$Pather_Common_Models_PingPongModel.$ctor = function() {
		var $this = {};
		return $this;
	};
	global.Pather.Common.Models.PingPongModel = $Pather_Common_Models_PingPongModel;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.PlayerJoinModel
	var $Pather_Common_Models_PlayerJoinModel = function() {
	};
	$Pather_Common_Models_PlayerJoinModel.__typeName = 'Pather.Common.Models.PlayerJoinModel';
	$Pather_Common_Models_PlayerJoinModel.createInstance = function() {
		return $Pather_Common_Models_PlayerJoinModel.$ctor();
	};
	$Pather_Common_Models_PlayerJoinModel.$ctor = function() {
		var $this = {};
		$this.playerId = null;
		return $this;
	};
	global.Pather.Common.Models.PlayerJoinModel = $Pather_Common_Models_PlayerJoinModel;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.PlayerModel
	var $Pather_Common_Models_PlayerModel = function() {
	};
	$Pather_Common_Models_PlayerModel.__typeName = 'Pather.Common.Models.PlayerModel';
	$Pather_Common_Models_PlayerModel.createInstance = function() {
		return $Pather_Common_Models_PlayerModel.$ctor();
	};
	$Pather_Common_Models_PlayerModel.$ctor = function() {
		var $this = {};
		$this.playerId = null;
		$this.x = 0;
		$this.y = 0;
		return $this;
	};
	global.Pather.Common.Models.PlayerModel = $Pather_Common_Models_PlayerModel;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.PlayerSyncModel
	var $Pather_Common_Models_PlayerSyncModel = function() {
	};
	$Pather_Common_Models_PlayerSyncModel.__typeName = 'Pather.Common.Models.PlayerSyncModel';
	$Pather_Common_Models_PlayerSyncModel.createInstance = function() {
		return $Pather_Common_Models_PlayerSyncModel.$ctor();
	};
	$Pather_Common_Models_PlayerSyncModel.$ctor = function() {
		var $this = {};
		$this.joinedPlayers = null;
		$this.leftPlayers = null;
		return $this;
	};
	global.Pather.Common.Models.PlayerSyncModel = $Pather_Common_Models_PlayerSyncModel;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Models.SyncLockstepModel
	var $Pather_Common_Models_SyncLockstepModel = function() {
	};
	$Pather_Common_Models_SyncLockstepModel.__typeName = 'Pather.Common.Models.SyncLockstepModel';
	$Pather_Common_Models_SyncLockstepModel.createInstance = function() {
		return $Pather_Common_Models_SyncLockstepModel.$ctor();
	};
	$Pather_Common_Models_SyncLockstepModel.$ctor = function() {
		var $this = {};
		$this.lockstepTickNumber = 0;
		return $this;
	};
	global.Pather.Common.Models.SyncLockstepModel = $Pather_Common_Models_SyncLockstepModel;
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
	ss.initClass($Pather_Client_Utils_Point, $asm, {});
	ss.initClass($Pather_Client_Utils_AnimationPoint, $asm, {}, $Pather_Client_Utils_Point);
	ss.initEnum($Pather_Common_ActionType, $asm, { move: 0, noop: 1 });
	ss.initClass($Pather_Common_Constants, $asm, {});
	ss.initClass($Pather_Common_Entity, $asm, {
		init: function(x, y) {
			this.x = x;
			this.y = y;
			this.squareX = ss.Int32.trunc(this.x / $Pather_Common_Constants.squareSize);
			this.squareY = ss.Int32.trunc(this.y / $Pather_Common_Constants.squareSize);
		},
		rePathFind: function(squareX, squareY) {
			var graph = new Graph(this.$game.grid);
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
				this.x = $Pather_Common_Constants.moveTowards(this.x, projectedX, this.speed / $Pather_Common_Constants.animationSteps);
				this.y = $Pather_Common_Constants.moveTowards(this.y, projectedY, this.speed / $Pather_Common_Constants.animationSteps);
				this.animations.push(new $Pather_Client_Utils_AnimationPoint(fromX, fromY, this.x, this.y));
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
			var timeTillNextLockstepTick = l % $Pather_Common_Constants.lockstepTicks;
			return ss.Int32.div(timeTillNextLockstepTick, $Pather_Common_Constants.lockstepTicks);
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
				console.log('Lockstep', this.lockstepTickNumber);
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
				//todo probably should only happen once?
				var v = (new Date()).getTime();
				this.nextGameTime += v - this.curGameTime;
				this.curGameTime = v;
			}
			return tickResult;
		}
	});
	ss.initInterface($Pather_Common_IAction, $asm, { get_data: null, get_lockstepTickNumber: null, get_type: null, process: null });
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
					console.log('Misprocess of action count', ++this.$misprocess);
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
			console.log('Actions for', stepActions.length, 'Players');
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
	ss.initClass($Pather_Common_Models_ConnectedModel, $asm, {});
	ss.initClass($Pather_Common_Models_MoveModel, $asm, {});
	ss.initClass($Pather_Common_Models_PingPongModel, $asm, {});
	ss.initClass($Pather_Common_Models_PlayerJoinModel, $asm, {});
	ss.initClass($Pather_Common_Models_PlayerModel, $asm, {});
	ss.initClass($Pather_Common_Models_PlayerSyncModel, $asm, {});
	ss.initClass($Pather_Common_Models_SyncLockstepModel, $asm, {});
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
		$Pather_Common_Constants.squareSize = 16;
		$Pather_Common_Constants.numberOfSquares = 80;
		$Pather_Common_Constants.drawFps = 60;
		$Pather_Common_Constants.drawTicks = ss.Int32.div(1000, $Pather_Common_Constants.drawFps);
		$Pather_Common_Constants.gameFps = 10;
		$Pather_Common_Constants.gameTicks = ss.Int32.div(1000, $Pather_Common_Constants.gameFps);
		$Pather_Common_Constants.lockstepFps = 2;
		$Pather_Common_Constants.lockstepTicks = ss.Int32.div(1000, $Pather_Common_Constants.lockstepFps);
		$Pather_Common_Constants.animationSteps = 5;
	})();
})();
