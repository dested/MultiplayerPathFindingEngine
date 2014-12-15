(function() {
	'use strict';
	var $asm = {};
	global.Pather = global.Pather || {};
	global.Pather.Client = global.Pather.Client || {};
	ss.initAssembly($asm, 'Pather.Client');
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Client.Program
	var $Pather_Client_$Program = function() {
	};
	$Pather_Client_$Program.__typeName = 'Pather.Client.$Program';
	$Pather_Client_$Program.$main = function() {
		var game = new $Pather_Client_ClientGame();
		game.init();
	};
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Client.ClientGame
	var $Pather_Client_ClientGame = function() {
		this.$2$CanvasField = null;
		this.$2$ContextField = null;
		this.$communicator = null;
		Pather.Common.Game.call(this);
		var $t1 = document.getElementById('canvas');
		this.set_canvas(ss.cast($t1, ss.isValue($t1) && (ss.isInstanceOfType($t1, Element) && $t1.tagName === 'CANVAS')));
		this.set_context(ss.cast(this.get_canvas().getContext('2d'), CanvasRenderingContext2D));
		this.get_canvas().onmousedown = ss.mkdel(this, function(ev) {
			var person = this.get_people()[0];
			var event = ev;
			var squareX = ss.Int32.div(ss.unbox(ss.cast(event.offsetX, ss.Int32)), Pather.Common.Constants.get_squareSize());
			var squareY = ss.Int32.div(ss.unbox(ss.cast(event.offsetY, ss.Int32)), Pather.Common.Constants.get_squareSize());
			var $t3 = this.$communicator;
			var $t2 = Pather.Common.Models.MoveModel.$ctor();
			$t2.tick = this.get_tickNumber();
			$t2.x = squareX;
			$t2.y = squareY;
			$t3.sendMove($t2);
			person.rePathFind(squareX, squareY, 0);
		});
	};
	$Pather_Client_ClientGame.__typeName = 'Pather.Client.ClientGame';
	global.Pather.Client.ClientGame = $Pather_Client_ClientGame;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Client.ClientPerson
	var $Pather_Client_ClientPerson = function(game, playerId) {
		this.$2$ClientGameField = null;
		Pather.Common.Person.call(this, game, playerId);
		this.set_$clientGame(game);
	};
	$Pather_Client_ClientPerson.__typeName = 'Pather.Client.ClientPerson';
	global.Pather.Client.ClientPerson = $Pather_Client_ClientPerson;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Client.Communicator
	var $Pather_Client_Communicator = function() {
		this.$1$SocketField = null;
		this.$1$PlayerIdField = null;
		this.$1$OnNewPlayerField = null;
		this.$1$OnMoveField = null;
		this.$1$OnConnectedField = null;
		this.$1$OnPlayerLeftField = null;
		this.$1$OnPlayerListField = null;
		this.set_socket(io.connect('127.0.0.1:8998'));
	};
	$Pather_Client_Communicator.__typeName = 'Pather.Client.Communicator';
	global.Pather.Client.Communicator = $Pather_Client_Communicator;
	ss.initClass($Pather_Client_$Program, $asm, {});
	ss.initClass($Pather_Client_ClientGame, $asm, {
		get_canvas: function() {
			return this.$2$CanvasField;
		},
		set_canvas: function(value) {
			this.$2$CanvasField = value;
		},
		get_context: function() {
			return this.$2$ContextField;
		},
		set_context: function(value) {
			this.$2$ContextField = value;
		},
		init: function() {
			Pather.Common.Game.prototype.init.call(this);
			this.set_me(this.createPerson(ss.Guid.newGuid().toString()));
			this.get_me().init(0, 0);
			this.get_people().push(this.get_me());
			this.$communicator = new $Pather_Client_Communicator();
			this.$communicator.connect(this.get_me().get_playerId());
			this.$communicator.set_onConnected(ss.delegateCombine(this.$communicator.get_onConnected(), ss.mkdel(this, function(connectedModel) {
				this.set_tickNumber(connectedModel.tickNumber);
				this.set_grid(connectedModel.grid);
			})));
			this.$communicator.set_onNewPlayer(ss.delegateCombine(this.$communicator.get_onNewPlayer(), ss.mkdel(this, function(newPlayerModel) {
				console.log('New Player', newPlayerModel);
				var person = this.createPerson(newPlayerModel.playerId);
				person.init(0, 0);
				this.get_people().push(person);
			})));
			this.$communicator.set_onPlayerLeft(ss.delegateCombine(this.$communicator.get_onPlayerLeft(), ss.mkdel(this, function(playerLeftModel) {
				console.log('playerLeft', playerLeftModel);
				var $t1 = this.get_people();
				for (var $t2 = 0; $t2 < $t1.length; $t2++) {
					var person1 = $t1[$t2];
					if (ss.referenceEquals(person1.get_playerId(), playerLeftModel.playerId)) {
						ss.remove(this.get_people(), person1);
						break;
					}
				}
			})));
			this.$communicator.set_onPlayerList(ss.delegateCombine(this.$communicator.get_onPlayerList(), ss.mkdel(this, function(playerListModel) {
				console.log('playerList', playerListModel);
				for (var $t3 = 0; $t3 < playerListModel.players.length; $t3++) {
					var playerModel = playerListModel.players[$t3];
					var person2 = this.createPerson(playerModel.playerId);
					person2.init(playerModel.x, playerModel.y);
					this.get_people().push(person2);
				}
			})));
			this.$communicator.set_onMove(ss.delegateCombine(this.$communicator.get_onMove(), ss.mkdel(this, function(moveModel) {
				var $t4 = this.get_people();
				for (var $t5 = 0; $t5 < $t4.length; $t5++) {
					var person3 = $t4[$t5];
					if (ss.referenceEquals(person3.get_playerId(), moveModel.playerId)) {
						console.log('move found', moveModel);
						person3.rePathFind(moveModel.x, moveModel.y, moveModel.tick);
						return;
					}
				}
			})));
			window.requestAnimationFrame(ss.mkdel(this, function(a) {
				this.draw();
			}));
		},
		createPerson: function(playerId) {
			return new $Pather_Client_ClientPerson(this, playerId);
		},
		draw: function() {
			window.requestAnimationFrame(ss.mkdel(this, function(a) {
				this.draw();
			}));
			this.get_context().save();
			this.get_context().fillStyle = 'black';
			this.get_context().fillRect(0, 0, 1200, 1200);
			this.get_context().restore();
			this.get_context().save();
			//                        Context.LineWidth = 5;
			this.get_context().fillStyle = 'blue';
			for (var y = 0; y < Pather.Common.Constants.get_numberOfSquares(); y++) {
				for (var x = 0; x < Pather.Common.Constants.get_numberOfSquares(); x++) {
					if (this.get_grid()[x][y] === 0) {
						this.get_context().fillRect(x * Pather.Common.Constants.get_squareSize(), y * Pather.Common.Constants.get_squareSize(), Pather.Common.Constants.get_squareSize(), Pather.Common.Constants.get_squareSize());
					}
				}
			}
			this.get_context().restore();
			var interpolatedTime = ((new Date()).getTime() - this.get_nextGameTime()) / Pather.Common.Constants.get_gameTicks();
			var $t1 = this.get_people();
			for (var $t2 = 0; $t2 < $t1.length; $t2++) {
				var person = $t1[$t2];
				person.draw(this.get_context(), interpolatedTime);
			}
		}
	}, Pather.Common.Game);
	ss.initClass($Pather_Client_ClientPerson, $asm, {
		get_$clientGame: function() {
			return this.$2$ClientGameField;
		},
		set_$clientGame: function(value) {
			this.$2$ClientGameField = value;
		},
		draw: function(context, interpolatedTime) {
			context.save();
			if (interpolatedTime < 0) {
				interpolatedTime = 0;
			}
			if (interpolatedTime > 1) {
				interpolatedTime = 1;
			}
			var _x = ss.Int32.trunc(this.get_x());
			var _y = ss.Int32.trunc(this.get_y());
			if (this.get_animations().length > 0) {
				var animationIndex = ss.Int32.trunc(interpolatedTime * Pather.Common.Constants.get_animationSteps());
				var animation = this.get_animations()[animationIndex];
				if (ss.isValue(animation)) {
					var interpolateStep = interpolatedTime % (1 / Pather.Common.Constants.get_animationSteps()) * Pather.Common.Constants.get_animationSteps();
					_x = ss.Int32.trunc(animation.get_fromX() + (animation.get_x() - animation.get_fromX()) * interpolateStep);
					_y = ss.Int32.trunc(animation.get_fromY() + (animation.get_y() - animation.get_fromY()) * interpolateStep);
				}
			}
			var result = this.get_path()[0];
			if (ss.isValue(result)) {
				context.lineWidth = 5;
				context.strokeStyle = 'yellow';
				//                context.StrokeRect(result.X * Constants.SquareSize, result.Y * Constants.SquareSize, Constants.SquareSize, Constants.SquareSize);
			}
			context.strokeStyle = 'green';
			//            context.StrokeRect(SquareX * Constants.SquareSize, SquareY * Constants.SquareSize, Constants.SquareSize, Constants.SquareSize);
			//            Console.WriteLine(_x + " " + _y);
			context.lineWidth = 5;
			context.strokeStyle = 'yellow';
			context.fillStyle = 'red';
			context.fillRect(_x - ss.Int32.div(Pather.Common.Constants.get_squareSize(), 2), _y - ss.Int32.div(Pather.Common.Constants.get_squareSize(), 2), Pather.Common.Constants.get_squareSize(), Pather.Common.Constants.get_squareSize());
			context.strokeRect(_x - ss.Int32.div(Pather.Common.Constants.get_squareSize(), 2), _y - ss.Int32.div(Pather.Common.Constants.get_squareSize(), 2), Pather.Common.Constants.get_squareSize(), Pather.Common.Constants.get_squareSize());
			context.restore();
		}
	}, Pather.Common.Person);
	ss.initClass($Pather_Client_Communicator, $asm, {
		get_socket: function() {
			return this.$1$SocketField;
		},
		set_socket: function(value) {
			this.$1$SocketField = value;
		},
		get_playerId: function() {
			return this.$1$PlayerIdField;
		},
		set_playerId: function(value) {
			this.$1$PlayerIdField = value;
		},
		get_onNewPlayer: function() {
			return this.$1$OnNewPlayerField;
		},
		set_onNewPlayer: function(value) {
			this.$1$OnNewPlayerField = value;
		},
		get_onMove: function() {
			return this.$1$OnMoveField;
		},
		set_onMove: function(value) {
			this.$1$OnMoveField = value;
		},
		get_onConnected: function() {
			return this.$1$OnConnectedField;
		},
		set_onConnected: function(value) {
			this.$1$OnConnectedField = value;
		},
		get_onPlayerLeft: function() {
			return this.$1$OnPlayerLeftField;
		},
		set_onPlayerLeft: function(value) {
			this.$1$OnPlayerLeftField = value;
		},
		get_onPlayerList: function() {
			return this.$1$OnPlayerListField;
		},
		set_onPlayerList: function(value) {
			this.$1$OnPlayerListField = value;
		},
		connect: function(playerId) {
			this.set_playerId(playerId);
			this.get_socket().on(Pather.Common.SocketChannels.serverChannel('connect'), ss.mkdel(this, this.$onConnectedCallback));
			this.get_socket().on(Pather.Common.SocketChannels.serverChannel('newPlayer'), ss.mkdel(this, this.$onNewPlayerCallback));
			this.get_socket().on(Pather.Common.SocketChannels.serverChannel('move'), ss.mkdel(this, this.$onMoveCallback));
			this.get_socket().on(Pather.Common.SocketChannels.serverChannel('playerLeft'), ss.mkdel(this, this.$onPlayerLeftCallback));
			this.get_socket().on(Pather.Common.SocketChannels.serverChannel('playerList'), ss.mkdel(this, this.$onPlayerListCallback));
			this.get_socket().emit(Pather.Common.SocketChannels.clientChannel('connect'), ss.makeGenericType(Pather.Common.Utils.DataObject$1, [String]).$ctor(playerId));
		},
		$onPlayerListCallback: function(obj) {
			if (!ss.staticEquals(this.get_onPlayerList(), null)) {
				this.get_onPlayerList()(obj.data);
			}
		},
		$onPlayerLeftCallback: function(obj) {
			if (!ss.staticEquals(this.get_onPlayerLeft(), null)) {
				this.get_onPlayerLeft()(obj.data);
			}
		},
		$onMoveCallback: function(obj) {
			if (!ss.staticEquals(this.get_onMove(), null)) {
				this.get_onMove()(obj.data);
			}
		},
		$onNewPlayerCallback: function(obj) {
			if (ss.referenceEquals(obj.data.playerId, this.get_playerId())) {
				return;
			}
			if (!ss.staticEquals(this.get_onNewPlayer(), null)) {
				this.get_onNewPlayer()(obj.data);
			}
		},
		$onConnectedCallback: function(obj) {
			if (!ss.staticEquals(this.get_onConnected(), null)) {
				this.get_onConnected()(obj.data);
			}
		},
		sendMove: function(moveModel) {
			moveModel.playerId = this.get_playerId();
			this.get_socket().emit(Pather.Common.SocketChannels.clientChannel('move'), ss.makeGenericType(Pather.Common.Utils.DataObject$1, [Pather.Common.Models.MoveModel]).$ctor(moveModel));
		}
	});
	$Pather_Client_$Program.$main();
})();
