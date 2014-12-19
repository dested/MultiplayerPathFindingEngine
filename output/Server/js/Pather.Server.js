'use strict';

var socketio = require('socket.io');
var $asm = {};
global.Pather = global.Pather || {};
global.Pather.Server = global.Pather.Server || {};
ss.initAssembly($asm, 'Pather.Server');
////////////////////////////////////////////////////////////////////////////////
// Pather.Server.Server
var $Pather_Server_Server = function() {
	//            Global.SetInterval(() => { Global.Console.Log("keep alive " + new DateTime().ToString().Substring(17, 24)); }, 10 * 1000);
	var game = new $Pather_Server_ServerGame();
	game.init();
};
$Pather_Server_Server.__typeName = 'Pather.Server.Server';
$Pather_Server_Server.main = function() {
	new $Pather_Server_Server();
};
global.Pather.Server.Server = $Pather_Server_Server;
////////////////////////////////////////////////////////////////////////////////
// Pather.Server.ServerCommunicator
var $Pather_Server_ServerCommunicator = function() {
	this.onNewConnection = null;
	this.onDisconnectConnection = null;
	var http = require('http');
	var app = http.createServer(function(req, res) {
		res.end();
	});
	var io = socketio.listen(app);
	app.listen(8991);
	io.sockets.on('connection', ss.mkdel(this, function(socket) {
		console.log('new connection');
		this.onNewConnection(socket);
		socket.on('disconnect', ss.mkdel(this, function() {
			this.onDisconnectConnection(socket);
		}));
	}));
};
$Pather_Server_ServerCommunicator.__typeName = 'Pather.Server.ServerCommunicator';
global.Pather.Server.ServerCommunicator = $Pather_Server_ServerCommunicator;
////////////////////////////////////////////////////////////////////////////////
// Pather.Server.ServerEntity
var $Pather_Server_ServerEntity = function(game, playerId) {
	this.socket = null;
	Pather.Common.Entity.call(this, game, playerId);
};
$Pather_Server_ServerEntity.__typeName = 'Pather.Server.ServerEntity';
global.Pather.Server.ServerEntity = $Pather_Server_ServerEntity;
////////////////////////////////////////////////////////////////////////////////
// Pather.Server.ServerGame
var $Pather_Server_ServerGame = function() {
	this.syncLockstep = null;
	Pather.Common.Game.call(this);
	this.set_stepManager(new $Pather_Server_ServerStepManager(this, new $Pather_Server_ServerNetworkManager(this)));
	this.constructGrid();
	this.set_ready(true);
};
$Pather_Server_ServerGame.__typeName = 'Pather.Server.ServerGame';
global.Pather.Server.ServerGame = $Pather_Server_ServerGame;
////////////////////////////////////////////////////////////////////////////////
// Pather.Server.ServerNetworkManager
var $Pather_Server_ServerNetworkManager = function(game) {
	this.game = null;
	this.serverCommunicator = null;
	this.onRecieveAction = null;
	this.$forceSyncNextLockstep = [];
	this.game = game;
	this.game.syncLockstep = ss.delegateCombine(this.game.syncLockstep, ss.mkdel(this, this.$onSyncLockstep));
	this.serverCommunicator = new $Pather_Server_ServerCommunicator();
	this.serverCommunicator.onNewConnection = ss.delegateCombine(this.serverCommunicator.onNewConnection, ss.mkdel(this, this.$onNewConnection));
	this.serverCommunicator.onDisconnectConnection = ss.delegateCombine(this.serverCommunicator.onDisconnectConnection, ss.mkdel(this, this.$onDisconnectConnection));
};
$Pather_Server_ServerNetworkManager.__typeName = 'Pather.Server.ServerNetworkManager';
global.Pather.Server.ServerNetworkManager = $Pather_Server_ServerNetworkManager;
////////////////////////////////////////////////////////////////////////////////
// Pather.Server.ServerStepManager
var $Pather_Server_ServerStepManager = function(game, serverNetworkManager) {
	this.serverNetworkManager = null;
	Pather.Common.StepManager.call(this, game);
	this.serverNetworkManager = serverNetworkManager;
	this.serverNetworkManager.onRecieveAction = ss.delegateCombine(this.serverNetworkManager.onRecieveAction, ss.mkdel(this, this.receiveAction));
};
$Pather_Server_ServerStepManager.__typeName = 'Pather.Server.ServerStepManager';
global.Pather.Server.ServerStepManager = $Pather_Server_ServerStepManager;
ss.initClass($Pather_Server_Server, $asm, {});
ss.initClass($Pather_Server_ServerCommunicator, $asm, {
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
ss.initClass($Pather_Server_ServerEntity, $asm, {}, Pather.Common.Entity);
ss.initClass($Pather_Server_ServerGame, $asm, {
	createPlayer$1: function(playerId) {
		return new $Pather_Server_ServerEntity(this, playerId);
	},
	tick: function() {
		var tickResult = Pather.Common.Game.prototype.tick.call(this);
		if (tickResult === 2 || tickResult === 3) {
			this.syncLockstep(this.get_lockstepTickNumber());
		}
		return tickResult;
	}
}, Pather.Common.Game);
ss.initClass($Pather_Server_ServerNetworkManager, $asm, {
	$onSyncLockstep: function(lockStepTick) {
		if (lockStepTick % 30 === 0 || this.$forceSyncNextLockstep.length > 0) {
			for (var $t1 = 0; $t1 < this.$forceSyncNextLockstep.length; $t1++) {
				var socketIoConnection = this.$forceSyncNextLockstep[$t1];
				var $t3 = this.serverCommunicator;
				var $t4 = Pather.Common.SocketChannels.serverChannel('syncLockstep');
				var $t2 = Pather.Common.Models.SyncLockstepModel.$ctor();
				$t2.lockstepTickNumber = lockStepTick;
				$t3.sendMessage(socketIoConnection, $t4, $t2);
			}
			var $t5 = this.game.get_players();
			for (var $t6 = 0; $t6 < $t5.length; $t6++) {
				var player = $t5[$t6];
				if (ss.indexOf(this.$forceSyncNextLockstep, player.socket) === -1) {
					var $t8 = this.serverCommunicator;
					var $t9 = player.socket;
					var $t10 = Pather.Common.SocketChannels.serverChannel('syncLockstep');
					var $t7 = Pather.Common.Models.SyncLockstepModel.$ctor();
					$t7.lockstepTickNumber = lockStepTick;
					$t8.sendMessage($t9, $t10, $t7);
				}
			}
			ss.clear(this.$forceSyncNextLockstep);
		}
	},
	$onNewConnection: function(socketIoConnection) {
		var $t2 = this.serverCommunicator;
		var $t3 = Pather.Common.SocketChannels.serverChannel('connect');
		var $t1 = Pather.Common.Models.ConnectedModel.$ctor();
		$t1.grid = this.game.get_grid();
		$t2.sendMessage(socketIoConnection, $t3, $t1);
		this.$forceSyncNextLockstep.push(socketIoConnection);
		this.serverCommunicator.listenOnChannel(Pather.Common.Models.PlayerJoinModel).call(this.serverCommunicator, socketIoConnection, Pather.Common.SocketChannels.clientChannel('joinPlayer'), ss.mkdel(this, this.$joinPlayer));
		this.serverCommunicator.listenOnChannel(Pather.Common.SerializableAction).call(this.serverCommunicator, socketIoConnection, Pather.Common.SocketChannels.clientChannel('postAction'), ss.mkdel(this, this.$postAction));
		this.serverCommunicator.listenOnChannel(Pather.Common.Models.PingPongModel).call(this.serverCommunicator, socketIoConnection, Pather.Common.SocketChannels.clientChannel('ping'), ss.mkdel(this, this.$pong));
	},
	$pong: function(socket, pingPongModel) {
		this.serverCommunicator.sendMessage(socket, Pather.Common.SocketChannels.serverChannel('pong'), pingPongModel);
	},
	$onDisconnectConnection: function(socketIoConnection) {
		var player = null;
		var $t1 = this.game.get_players();
		for (var $t2 = 0; $t2 < $t1.length; $t2++) {
			var entity = $t1[$t2];
			if (ss.referenceEquals(entity.socket, socketIoConnection)) {
				player = entity;
			}
		}
		if (ss.isNullOrUndefined(player)) {
			return;
		}
		var $t3 = Pather.Common.Models.PlayerSyncModel.$ctor();
		var $t4 = [];
		var $t5 = Pather.Common.Models.PlayerModel.$ctor();
		$t5.playerId = player.playerId;
		$t4.push($t5);
		$t3.leftPlayers = $t4;
		var playerSyncModel = $t3;
		ss.remove(this.game.get_players(), player);
		var $t6 = this.game.get_players();
		for (var $t7 = 0; $t7 < $t6.length; $t7++) {
			var entity1 = $t6[$t7];
			this.serverCommunicator.sendMessage(entity1.socket, Pather.Common.SocketChannels.serverChannel('playerSync'), playerSyncModel);
		}
	},
	$postAction: function(socket, action) {
		console.log('player action ', action);
		this.onRecieveAction(action);
	},
	sendAction: function(action) {
		var $t1 = this.game.get_players();
		for (var $t2 = 0; $t2 < $t1.length; $t2++) {
			var player = $t1[$t2];
			this.serverCommunicator.sendMessage(player.socket, Pather.Common.SocketChannels.serverChannel('postAction'), action);
		}
	},
	$joinPlayer: function(socket, model) {
		console.log('new player ' + model.playerId);
		var player = ss.cast(this.game.createPlayer$1(model.playerId), $Pather_Server_ServerEntity);
		player.socket = socket;
		player.init(0, 0);
		this.game.get_players().push(player);
		var $t1 = this.game.get_players();
		for (var $t2 = 0; $t2 < $t1.length; $t2++) {
			var entity = $t1[$t2];
			if (!ss.referenceEquals(entity.playerId, player.playerId)) {
				var $t6 = this.serverCommunicator;
				var $t7 = entity.socket;
				var $t8 = Pather.Common.SocketChannels.serverChannel('playerSync');
				var $t3 = Pather.Common.Models.PlayerSyncModel.$ctor();
				var $t4 = [];
				var $t5 = Pather.Common.Models.PlayerModel.$ctor();
				$t5.playerId = player.playerId;
				$t5.x = player.x;
				$t5.y = player.y;
				$t4.push($t5);
				$t3.joinedPlayers = $t4;
				$t6.sendMessage($t7, $t8, $t3);
			}
			else {
				var $t11 = this.serverCommunicator;
				var $t12 = Pather.Common.SocketChannels.serverChannel('playerSync');
				var $t9 = Pather.Common.Models.PlayerSyncModel.$ctor();
				$t9.joinedPlayers = this.game.get_players().map(function(p) {
					var $t10 = Pather.Common.Models.PlayerModel.$ctor();
					$t10.playerId = p.playerId;
					$t10.x = p.x;
					$t10.y = p.y;
					return $t10;
				});
				$t11.sendMessage(socket, $t12, $t9);
			}
		}
	}
});
ss.initClass($Pather_Server_ServerStepManager, $asm, {
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
		return this.game.get_players().length;
	}
}, Pather.Common.StepManager);
$Pather_Server_Server.main();
