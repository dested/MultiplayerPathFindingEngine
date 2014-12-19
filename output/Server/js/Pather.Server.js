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
		//                Global.Console.Log("new connection");
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
	this.stepManager = new $Pather_Server_ServerStepManager(this, new $Pather_Server_ServerNetworkManager(this));
	this.constructGrid();
	this.ready = true;
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
			this.syncLockstep(this.lockstepTickNumber);
		}
		return tickResult;
	}
}, Pather.Common.Game);
ss.initClass($Pather_Server_ServerNetworkManager, $asm, {
	$onSyncLockstep: function(lockStepTick) {
		if (lockStepTick % 15 === 0 || this.$forceSyncNextLockstep.length > 0) {
			for (var $t1 = 0; $t1 < this.$forceSyncNextLockstep.length; $t1++) {
				var socketIoConnection = this.$forceSyncNextLockstep[$t1];
				var $t3 = this.serverCommunicator;
				var $t4 = Pather.Common.SocketChannels.serverChannel('syncLockstep');
				var $t2 = Pather.Common.Models.SyncLockstepModel.$ctor();
				$t2.lockstepTickNumber = lockStepTick;
				$t3.sendMessage(socketIoConnection, $t4, $t2);
			}
			for (var $t5 = 0; $t5 < this.game.players.length; $t5++) {
				var player = this.game.players[$t5];
				if (ss.indexOf(this.$forceSyncNextLockstep, player.socket) === -1) {
					var $t7 = this.serverCommunicator;
					var $t8 = player.socket;
					var $t9 = Pather.Common.SocketChannels.serverChannel('syncLockstep');
					var $t6 = Pather.Common.Models.SyncLockstepModel.$ctor();
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
		var $t1 = Pather.Common.Models.ConnectedModel.$ctor();
		$t1.grid = this.game.grid;
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
		for (var $t1 = 0; $t1 < this.game.players.length; $t1++) {
			var entity = this.game.players[$t1];
			if (ss.referenceEquals(entity.socket, socketIoConnection)) {
				player = entity;
			}
		}
		if (ss.isNullOrUndefined(player)) {
			return;
		}
		var $t2 = Pather.Common.Models.PlayerSyncModel.$ctor();
		var $t3 = [];
		var $t4 = Pather.Common.Models.PlayerModel.$ctor();
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
		console.log('new player ' + model.playerId);
		var player = ss.cast(this.game.createPlayer$1(model.playerId), $Pather_Server_ServerEntity);
		player.socket = socket;
		player.init(0, 0);
		this.game.players.push(player);
		for (var $t1 = 0; $t1 < this.game.players.length; $t1++) {
			var entity = this.game.players[$t1];
			if (!ss.referenceEquals(entity.playerId, player.playerId)) {
				var $t5 = this.serverCommunicator;
				var $t6 = entity.socket;
				var $t7 = Pather.Common.SocketChannels.serverChannel('playerSync');
				var $t2 = Pather.Common.Models.PlayerSyncModel.$ctor();
				var $t3 = [];
				var $t4 = Pather.Common.Models.PlayerModel.$ctor();
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
				var $t8 = Pather.Common.Models.PlayerSyncModel.$ctor();
				$t8.joinedPlayers = this.game.players.map(function(p) {
					var $t9 = Pather.Common.Models.PlayerModel.$ctor();
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
		return this.game.players.length;
	}
}, Pather.Common.StepManager);
$Pather_Server_Server.main();
