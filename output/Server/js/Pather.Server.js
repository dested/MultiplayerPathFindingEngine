'use strict';

var socketio = require('socket.io');
var $asm = {};
global.Pather = global.Pather || {};
global.Pather.Server = global.Pather.Server || {};
ss.initAssembly($asm, 'Pather.Server');
////////////////////////////////////////////////////////////////////////////////
// Pather.Server.Server
var $Pather_Server_Server = function() {
	setInterval(function() {
		console.log('keep alive ' + (new Date()).toString().substr(17, 24));
	}, 10000);
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
	this.$1$OnNewConnectionField = null;
	this.$1$OnDisconnectConnectionField = null;
	var http = require('http');
	var app = http.createServer(function(req, res) {
		res.end();
	});
	var io = socketio.listen(app);
	app.listen(8998);
	io.sockets.on('connection', ss.mkdel(this, function(socket) {
		console.log('new connection');
		this.get_onNewConnection()(socket);
		socket.on('disconnect', ss.mkdel(this, function() {
			this.get_onDisconnectConnection()(socket);
		}));
	}));
};
$Pather_Server_ServerCommunicator.__typeName = 'Pather.Server.ServerCommunicator';
global.Pather.Server.ServerCommunicator = $Pather_Server_ServerCommunicator;
////////////////////////////////////////////////////////////////////////////////
// Pather.Server.ServerEntity
var $Pather_Server_ServerEntity = function(game, playerId) {
	this.$2$SocketField = null;
	Pather.Common.Entity.call(this, game, playerId);
};
$Pather_Server_ServerEntity.__typeName = 'Pather.Server.ServerEntity';
global.Pather.Server.ServerEntity = $Pather_Server_ServerEntity;
////////////////////////////////////////////////////////////////////////////////
// Pather.Server.ServerGame
var $Pather_Server_ServerGame = function() {
	Pather.Common.Game.call(this);
	this.set_stepManager(new $Pather_Server_ServerStepManager(this, new $Pather_Server_ServerNetworkManager(this)));
	this.set_ready(true);
};
$Pather_Server_ServerGame.__typeName = 'Pather.Server.ServerGame';
global.Pather.Server.ServerGame = $Pather_Server_ServerGame;
////////////////////////////////////////////////////////////////////////////////
// Pather.Server.ServerNetworkManager
var $Pather_Server_ServerNetworkManager = function(game) {
	this.$1$GameField = null;
	this.$1$ServerCommunicatorField = null;
	this.$1$OnRecieveActionField = null;
	this.set_game(game);
	this.set_serverCommunicator(new $Pather_Server_ServerCommunicator());
	var $t1 = this.get_serverCommunicator();
	$t1.set_onNewConnection(ss.delegateCombine($t1.get_onNewConnection(), ss.mkdel(this, this.$onNewConnection)));
	var $t2 = this.get_serverCommunicator();
	$t2.set_onDisconnectConnection(ss.delegateCombine($t2.get_onDisconnectConnection(), ss.mkdel(this, this.$onDisconnectConnection)));
};
$Pather_Server_ServerNetworkManager.__typeName = 'Pather.Server.ServerNetworkManager';
global.Pather.Server.ServerNetworkManager = $Pather_Server_ServerNetworkManager;
////////////////////////////////////////////////////////////////////////////////
// Pather.Server.ServerStepManager
var $Pather_Server_ServerStepManager = function(game, serverNetworkManager) {
	this.$2$ServerNetworkManagerField = null;
	Pather.Common.StepManager.call(this, game);
	this.set_serverNetworkManager(serverNetworkManager);
	var $t1 = this.get_serverNetworkManager();
	$t1.set_onRecieveAction(ss.delegateCombine($t1.get_onRecieveAction(), ss.mkdel(this, this.receiveAction)));
};
$Pather_Server_ServerStepManager.__typeName = 'Pather.Server.ServerStepManager';
global.Pather.Server.ServerStepManager = $Pather_Server_ServerStepManager;
ss.initClass($Pather_Server_Server, $asm, {});
ss.initClass($Pather_Server_ServerCommunicator, $asm, {
	get_onNewConnection: function() {
		return this.$1$OnNewConnectionField;
	},
	set_onNewConnection: function(value) {
		this.$1$OnNewConnectionField = value;
	},
	get_onDisconnectConnection: function() {
		return this.$1$OnDisconnectConnectionField;
	},
	set_onDisconnectConnection: function(value) {
		this.$1$OnDisconnectConnectionField = value;
	},
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
ss.initClass($Pather_Server_ServerEntity, $asm, {
	get_socket: function() {
		return this.$2$SocketField;
	},
	set_socket: function(value) {
		this.$2$SocketField = value;
	}
}, Pather.Common.Entity);
ss.initClass($Pather_Server_ServerGame, $asm, {
	createPlayer$1: function(playerId) {
		return new $Pather_Server_ServerEntity(this, playerId);
	}
}, Pather.Common.Game);
ss.initClass($Pather_Server_ServerNetworkManager, $asm, {
	get_game: function() {
		return this.$1$GameField;
	},
	set_game: function(value) {
		this.$1$GameField = value;
	},
	get_serverCommunicator: function() {
		return this.$1$ServerCommunicatorField;
	},
	set_serverCommunicator: function(value) {
		this.$1$ServerCommunicatorField = value;
	},
	get_onRecieveAction: function() {
		return this.$1$OnRecieveActionField;
	},
	set_onRecieveAction: function(value) {
		this.$1$OnRecieveActionField = value;
	},
	$onNewConnection: function(socketIoConnection) {
		var $t2 = this.get_serverCommunicator();
		var $t3 = Pather.Common.SocketChannels.serverChannel('connect');
		var $t1 = Pather.Common.Models.ConnectedModel.$ctor();
		$t1.lockstepTickNumber = this.get_game().get_lockstepTickNumber();
		$t1.grid = this.get_game().get_grid();
		$t2.sendMessage(socketIoConnection, $t3, $t1);
		var $t4 = this.get_serverCommunicator();
		$t4.listenOnChannel(Pather.Common.Models.PlayerJoinModel).call($t4, socketIoConnection, Pather.Common.SocketChannels.clientChannel('joinPlayer'), ss.mkdel(this, this.$joinPlayer));
		var $t5 = this.get_serverCommunicator();
		$t5.listenOnChannel(Pather.Common.SerializableAction).call($t5, socketIoConnection, Pather.Common.SocketChannels.clientChannel('postAction'), ss.mkdel(this, this.$postAction));
	},
	$onDisconnectConnection: function(socketIoConnection) {
		var player = null;
		var $t1 = this.get_game().get_players();
		for (var $t2 = 0; $t2 < $t1.length; $t2++) {
			var entity = $t1[$t2];
			if (ss.referenceEquals(entity.get_socket(), socketIoConnection)) {
				player = entity;
			}
		}
		if (ss.isNullOrUndefined(player)) {
			return;
		}
		var $t3 = Pather.Common.Models.PlayerSyncModel.$ctor();
		var $t4 = [];
		var $t5 = Pather.Common.Models.PlayerModel.$ctor();
		$t5.playerId = player.get_playerId();
		$t4.push($t5);
		$t3.leftPlayers = $t4;
		var playerSyncModel = $t3;
		ss.remove(this.get_game().get_players(), player);
		socketIoConnection.broadcast.emit(Pather.Common.SocketChannels.serverChannel('playerSync'), playerSyncModel);
	},
	$postAction: function(socket, action) {
		console.log('player action ', action);
		this.get_onRecieveAction()(action);
	},
	sendAction: function(action) {
		var $t1 = this.get_game().get_players();
		for (var $t2 = 0; $t2 < $t1.length; $t2++) {
			var player = $t1[$t2];
			this.get_serverCommunicator().sendMessage(player.get_socket(), Pather.Common.SocketChannels.clientChannel('postAction'), action);
		}
	},
	$joinPlayer: function(socket, model) {
		console.log('new player ' + model.playerId);
		var player = ss.cast(this.get_game().createPlayer$1(model.playerId), $Pather_Server_ServerEntity);
		player.set_socket(socket);
		player.init(0, 0);
		this.get_game().get_players().push(player);
		var $t1 = this.get_game().get_players();
		for (var $t2 = 0; $t2 < $t1.length; $t2++) {
			var entity = $t1[$t2];
			if (!ss.referenceEquals(entity.get_playerId(), player.get_playerId())) {
				var $t7 = entity.get_socket();
				var $t8 = Pather.Common.SocketChannels.serverChannel('playerSync');
				var $t6 = ss.makeGenericType(Pather.Common.Utils.DataObject$1, [Pather.Common.Models.PlayerSyncModel]);
				var $t3 = Pather.Common.Models.PlayerSyncModel.$ctor();
				var $t4 = [];
				var $t5 = Pather.Common.Models.PlayerModel.$ctor();
				$t5.playerId = player.get_playerId();
				$t5.x = player.get_x();
				$t5.y = player.get_y();
				$t4.push($t5);
				$t3.joinedPlayers = $t4;
				$t7.emit($t8, $t6.$ctor($t3));
			}
			else {
				var $t12 = Pather.Common.SocketChannels.serverChannel('playerSync');
				var $t11 = ss.makeGenericType(Pather.Common.Utils.DataObject$1, [Pather.Common.Models.PlayerSyncModel]);
				var $t9 = Pather.Common.Models.PlayerSyncModel.$ctor();
				$t9.joinedPlayers = this.get_game().get_players().map(function(p) {
					var $t10 = Pather.Common.Models.PlayerModel.$ctor();
					$t10.playerId = p.get_playerId();
					$t10.x = p.get_x();
					$t10.y = p.get_y();
					return $t10;
				});
				socket.emit($t12, $t11.$ctor($t9));
			}
		}
	}
});
ss.initClass($Pather_Server_ServerStepManager, $asm, {
	get_serverNetworkManager: function() {
		return this.$2$ServerNetworkManagerField;
	},
	set_serverNetworkManager: function(value) {
		this.$2$ServerNetworkManagerField = value;
	},
	sendActionServer: function(action) {
		var serAction = Pather.Common.SerializableAction.$ctor();
		serAction.data = action.get_data();
		serAction.lockstepTickNumber = action.get_lockstepTickNumber();
		serAction.type = action.get_type();
	},
	receiveAction: function(serAction) {
		Pather.Common.StepManager.prototype.receiveAction.call(this, serAction);
		this.get_serverNetworkManager().sendAction(serAction);
	},
	get_networkPlayers: function() {
		return this.get_game().get_players().length;
	}
}, Pather.Common.StepManager);
$Pather_Server_Server.main();
