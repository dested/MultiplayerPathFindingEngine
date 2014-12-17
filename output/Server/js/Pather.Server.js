'use strict';

var socketio = require('socket.io');
var $asm = {};
global.Pather = global.Pather || {};
global.Pather.Server = global.Pather.Server || {};
ss.initAssembly($asm, 'Pather.Server');
////////////////////////////////////////////////////////////////////////////////
// Pather.Server.Server
var $Pather_Server_Server = function() {
	var http = require('http');
	setInterval(function() {
		console.log('keep alive ' + (new Date()).toString().substr(17, 24));
	}, 10000);
	var game = new Pather.Common.Game();
	game.init();
	var app = http.createServer(function(req, res) {
		res.end();
	});
	var io = socketio.listen(app);
	app.listen(8998);
	io.sockets.on('connection', function(socket) {
		console.log('new connection');
		var $t3 = Pather.Common.SocketChannels.serverChannel('connect');
		var $t2 = ss.makeGenericType(Pather.Common.Utils.DataObject$1, [Pather.Common.Models.ConnectedModel]);
		var $t1 = Pather.Common.Models.ConnectedModel.$ctor();
		$t1.tickNumber = game.get_tickNumber();
		$t1.grid = game.get_grid();
		socket.emit($t3, $t2.$ctor($t1));
		var player = null;
		socket.on('disconnect', function() {
			if (ss.isNullOrUndefined(player)) {
				return;
			}
			console.log('disc ' + player.get_playerId());
			var $t6 = socket.broadcast;
			var $t7 = Pather.Common.SocketChannels.serverChannel('playerLeft');
			var $t5 = ss.makeGenericType(Pather.Common.Utils.DataObject$1, [Pather.Common.Models.PlayerLeftModel]);
			var $t4 = Pather.Common.Models.PlayerLeftModel.$ctor();
			$t4.playerId = player.get_playerId();
			$t6.emit($t7, $t5.$ctor($t4));
			ss.remove(game.get_people(), player);
		});
		socket.on(Pather.Common.SocketChannels.clientChannel('connect'), function(obj) {
			var playerId = obj.data;
			console.log('new player ' + playerId);
			var person = game.createPerson(playerId);
			player = person;
			person.init(0, 0);
			game.get_people().push(person);
			var $t11 = Pather.Common.SocketChannels.serverChannel('playerList');
			var $t10 = ss.makeGenericType(Pather.Common.Utils.DataObject$1, [Pather.Common.Models.PlayerListModel]);
			var $t8 = Pather.Common.Models.PlayerListModel.$ctor();
			$t8.players = game.get_people().filter(function(a) {
				return !ss.referenceEquals(a.get_playerId(), playerId);
			}).map(function(p) {
				var $t9 = Pather.Common.Models.PlayerModel.$ctor();
				$t9.playerId = p.get_playerId();
				$t9.x = p.get_x();
				$t9.y = p.get_y();
				return $t9;
			});
			socket.emit($t11, $t10.$ctor($t8));
			var $t14 = socket.broadcast;
			var $t15 = Pather.Common.SocketChannels.serverChannel('newPlayer');
			var $t13 = ss.makeGenericType(Pather.Common.Utils.DataObject$1, [Pather.Common.Models.NewPlayerModel]);
			var $t12 = Pather.Common.Models.NewPlayerModel.$ctor();
			$t12.playerId = playerId;
			$t14.emit($t15, $t13.$ctor($t12));
		});
		socket.on(Pather.Common.SocketChannels.clientChannel('postAction'), function(obj1) {
			var moveModel = obj1.data;
			console.log('player moved ', moveModel);
			var $t16 = game.get_people();
			for (var $t17 = 0; $t17 < $t16.length; $t17++) {
				var person1 = $t16[$t17];
				if (ss.referenceEquals(person1.get_playerId(), moveModel.playerId)) {
					//                            person.RePathFind(moveModel.X, moveModel.Y, moveModel.LockstepTick);
					socket.broadcast.emit(Pather.Common.SocketChannels.serverChannel('move'), ss.makeGenericType(Pather.Common.Utils.DataObject$1, [Pather.Common.Models.MoveModel]).$ctor(moveModel));
					return;
				}
			}
		});
	});
};
$Pather_Server_Server.__typeName = 'Pather.Server.Server';
$Pather_Server_Server.main = function() {
	new $Pather_Server_Server();
};
global.Pather.Server.Server = $Pather_Server_Server;
////////////////////////////////////////////////////////////////////////////////
// Pather.Server.StepManagerServer
var $Pather_Server_StepManagerServer = function(game) {
	Pather.Common.StepManager.StepManager.call(this, game);
};
$Pather_Server_StepManagerServer.__typeName = 'Pather.Server.StepManagerServer';
global.Pather.Server.StepManagerServer = $Pather_Server_StepManagerServer;
ss.initClass($Pather_Server_Server, $asm, {});
ss.initClass($Pather_Server_StepManagerServer, $asm, {
	sendActionServer: function(action) {
		var serAction = Pather.Common.StepManager.SerializableAction.$ctor();
		serAction.data = action.get_data();
		serAction.lockstepTickNumber = action.get_lockstepTickNumber();
		serAction.type = action.get_type();
	},
	get_networkPlayers: function() {
		throw new ss.NotImplementedException();
	}
}, Pather.Common.StepManager.StepManager);
$Pather_Server_Server.main();
