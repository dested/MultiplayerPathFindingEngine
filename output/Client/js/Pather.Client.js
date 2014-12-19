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
	// Pather.Client.ClientCommunicator
	var $Pather_Client_ClientCommunicator = function() {
		this.$1$SocketField = null;
		this.set_socket(io.connect('127.0.0.1:8998'));
	};
	$Pather_Client_ClientCommunicator.__typeName = 'Pather.Client.ClientCommunicator';
	global.Pather.Client.ClientCommunicator = $Pather_Client_ClientCommunicator;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Client.ClientEntity
	var $Pather_Client_ClientEntity = function(game, playerId) {
		this.$2$ClientGameField = null;
		Pather.Common.Entity.call(this, game, playerId);
		this.set_$clientGame(game);
	};
	$Pather_Client_ClientEntity.__typeName = 'Pather.Client.ClientEntity';
	global.Pather.Client.ClientEntity = $Pather_Client_ClientEntity;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Client.ClientGame
	var $Pather_Client_ClientGame = function() {
		this.$2$CanvasField = null;
		this.$2$ContextField = null;
		this.$2$MyPlayerIdField = null;
		this.$2$MyPlayerField = null;
		Pather.Common.Game.call(this);
		this.set_myPlayerId(ss.Guid.newGuid().toString());
		this.set_stepManager(new $Pather_Client_ClientStepManager(this, new $Pather_Client_ClientNetworkManager()));
		var $t1 = document.getElementById('canvas');
		this.set_canvas(ss.cast($t1, ss.isValue($t1) && (ss.isInstanceOfType($t1, Element) && $t1.tagName === 'CANVAS')));
		this.set_context(ss.cast(this.get_canvas().getContext('2d'), CanvasRenderingContext2D));
		this.get_canvas().onmousedown = ss.mkdel(this, function(ev) {
			var event = ev;
			var squareX = ss.Int32.div(ss.unbox(ss.cast(event.offsetX, ss.Int32)), Pather.Common.Constants.get_squareSize());
			var squareY = ss.Int32.div(ss.unbox(ss.cast(event.offsetY, ss.Int32)), Pather.Common.Constants.get_squareSize());
			var $t3 = ss.cast(this.get_stepManager(), $Pather_Client_ClientStepManager);
			var $t2 = Pather.Common.Models.MoveModel.$ctor();
			$t2.x = squareX;
			$t2.y = squareY;
			$t2.playerId = this.get_myPlayer().get_playerId();
			$t3.sendActionClient(new Pather.Common.MoveAction($t2, this.get_lockstepTickNumber() + 1));
		});
	};
	$Pather_Client_ClientGame.__typeName = 'Pather.Client.ClientGame';
	global.Pather.Client.ClientGame = $Pather_Client_ClientGame;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Client.ClientNetworkManager
	var $Pather_Client_ClientNetworkManager = function() {
		this.$1$ClientCommunicatorField = null;
		this.$1$NetworkPlayersField = 0;
		this.$1$OnReceiveActionField = null;
		this.$1$OnConnectedField = null;
		this.$1$OnPlayerSyncField = null;
		this.set_clientCommunicator(new $Pather_Client_ClientCommunicator());
		this.set_networkPlayers(0);
		var $t1 = this.get_clientCommunicator();
		$t1.listenOnChannel(Pather.Common.Models.ConnectedModel).call($t1, Pather.Common.SocketChannels.serverChannel('connect'), ss.mkdel(this, function(model) {
			this.get_onConnected()(model);
		}));
		var $t2 = this.get_clientCommunicator();
		$t2.listenOnChannel(Pather.Common.Models.PlayerSyncModel).call($t2, Pather.Common.SocketChannels.serverChannel('playerSync'), ss.mkdel(this, function(model1) {
			if (ss.isValue(model1.joinedPlayers)) {
				this.set_networkPlayers(this.get_networkPlayers() + model1.joinedPlayers.length);
			}
			if (ss.isValue(model1.leftPlayers)) {
				this.set_networkPlayers(this.get_networkPlayers() - model1.leftPlayers.length);
			}
			this.get_onPlayerSync()(model1);
		}));
		var $t3 = this.get_clientCommunicator();
		$t3.listenOnChannel(Pather.Common.SerializableAction).call($t3, Pather.Common.SocketChannels.serverChannel('postAction'), ss.mkdel(this, function(model2) {
			this.receiveAction(model2);
		}));
	};
	$Pather_Client_ClientNetworkManager.__typeName = 'Pather.Client.ClientNetworkManager';
	global.Pather.Client.ClientNetworkManager = $Pather_Client_ClientNetworkManager;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Client.ClientStepManager
	var $Pather_Client_ClientStepManager = function(game, clientNetworkManager) {
		this.$2$ClientNetworkManagerField = null;
		Pather.Common.StepManager.call(this, game);
		this.set_clientNetworkManager(clientNetworkManager);
		this.get_clientNetworkManager().set_onReceiveAction(ss.mkdel(this, this.receiveAction));
		this.get_clientNetworkManager().set_onConnected(ss.mkdel(this, this.$connected));
		this.get_clientNetworkManager().set_onPlayerSync(ss.mkdel(this, this.$playerSync));
	};
	$Pather_Client_ClientStepManager.__typeName = 'Pather.Client.ClientStepManager';
	global.Pather.Client.ClientStepManager = $Pather_Client_ClientStepManager;
	ss.initClass($Pather_Client_$Program, $asm, {});
	ss.initClass($Pather_Client_ClientCommunicator, $asm, {
		get_socket: function() {
			return this.$1$SocketField;
		},
		set_socket: function(value) {
			this.$1$SocketField = value;
		},
		listenOnChannel: function(T) {
			return function(channel, callback) {
				this.get_socket().on(channel, function(obj) {
					callback(obj.data);
				});
			};
		},
		sendMessage: function(channel, obj) {
			this.get_socket().emit(channel, ss.makeGenericType(Pather.Common.Utils.DataObject$1, [Object]).$ctor(obj));
		}
	});
	ss.initClass($Pather_Client_ClientEntity, $asm, {
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
	}, Pather.Common.Entity);
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
		get_myPlayerId: function() {
			return this.$2$MyPlayerIdField;
		},
		set_myPlayerId: function(value) {
			this.$2$MyPlayerIdField = value;
		},
		get_myPlayer: function() {
			return this.$2$MyPlayerField;
		},
		set_myPlayer: function(value) {
			this.$2$MyPlayerField = value;
		},
		init: function() {
			Pather.Common.Game.prototype.init.call(this);
			window.requestAnimationFrame(ss.mkdel(this, function(a) {
				this.draw();
			}));
		},
		createPlayer: function(playerId) {
			return new $Pather_Client_ClientEntity(this, playerId);
		},
		draw: function() {
			window.requestAnimationFrame(ss.mkdel(this, function(a) {
				this.draw();
			}));
			this.get_context().save();
			this.get_context().fillStyle = 'black';
			this.get_context().fillRect(0, 0, 1200, 1200);
			this.get_context().restore();
			if (!this.get_ready()) {
				this.get_context().fillText('Syncing with server!', 100, 100);
				return;
			}
			this.get_context().save();
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
			var $t1 = this.get_players();
			for (var $t2 = 0; $t2 < $t1.length; $t2++) {
				var person = $t1[$t2];
				person.draw(this.get_context(), interpolatedTime);
			}
		},
		localPlayerJoined: function(player) {
			this.set_myPlayer(player);
			this.set_ready(true);
		}
	}, Pather.Common.Game);
	ss.initClass($Pather_Client_ClientNetworkManager, $asm, {
		get_clientCommunicator: function() {
			return this.$1$ClientCommunicatorField;
		},
		set_clientCommunicator: function(value) {
			this.$1$ClientCommunicatorField = value;
		},
		get_networkPlayers: function() {
			return this.$1$NetworkPlayersField;
		},
		set_networkPlayers: function(value) {
			this.$1$NetworkPlayersField = value;
		},
		get_onReceiveAction: function() {
			return this.$1$OnReceiveActionField;
		},
		set_onReceiveAction: function(value) {
			this.$1$OnReceiveActionField = value;
		},
		get_onConnected: function() {
			return this.$1$OnConnectedField;
		},
		set_onConnected: function(value) {
			this.$1$OnConnectedField = value;
		},
		get_onPlayerSync: function() {
			return this.$1$OnPlayerSyncField;
		},
		set_onPlayerSync: function(value) {
			this.$1$OnPlayerSyncField = value;
		},
		sendAction: function(serAction) {
			this.get_clientCommunicator().sendMessage(Pather.Common.SocketChannels.clientChannel('postAction'), serAction);
		},
		receiveAction: function(serAction) {
			this.get_onReceiveAction()(serAction);
		},
		joinPlayer: function(myPlayerId) {
			var $t2 = this.get_clientCommunicator();
			var $t3 = Pather.Common.SocketChannels.clientChannel('joinPlayer');
			var $t1 = Pather.Common.Models.PlayerJoinModel.$ctor();
			$t1.playerId = myPlayerId;
			$t2.sendMessage($t3, $t1);
		}
	});
	ss.initClass($Pather_Client_ClientStepManager, $asm, {
		get_clientNetworkManager: function() {
			return this.$2$ClientNetworkManagerField;
		},
		set_clientNetworkManager: function(value) {
			this.$2$ClientNetworkManagerField = value;
		},
		get_networkPlayers: function() {
			return this.get_clientNetworkManager().get_networkPlayers();
		},
		$connected: function(model) {
			this.get_game().set_lockstepTickNumber(model.lockstepTickNumber);
			this.get_game().set_players([]);
			this.get_clientNetworkManager().joinPlayer(ss.cast(this.get_game(), $Pather_Client_ClientGame).get_myPlayerId());
		},
		$playerSync: function(model) {
			if (ss.isValue(model.joinedPlayers)) {
				for (var $t1 = 0; $t1 < model.joinedPlayers.length; $t1++) {
					var playerModel = model.joinedPlayers[$t1];
					var player = this.get_game().createPlayer(playerModel.playerId);
					player.init(playerModel.x, playerModel.y);
					this.get_game().get_players().push(player);
					if (ss.referenceEquals(ss.cast(this.get_game(), $Pather_Client_ClientGame).get_myPlayerId(), playerModel.playerId)) {
						ss.cast(this.get_game(), $Pather_Client_ClientGame).localPlayerJoined(player);
					}
				}
			}
			if (ss.isValue(model.leftPlayers)) {
				for (var $t2 = 0; $t2 < model.leftPlayers.length; $t2++) {
					var playerModel1 = model.leftPlayers[$t2];
					var $t3 = this.get_game().get_players();
					for (var $t4 = 0; $t4 < $t3.length; $t4++) {
						var person = $t3[$t4];
						if (ss.referenceEquals(person.get_playerId(), playerModel1.playerId)) {
							ss.remove(this.get_game().get_players(), person);
							break;
						}
					}
				}
			}
		},
		sendActionClient: function(action) {
			var $t1 = Pather.Common.SerializableAction.$ctor();
			$t1.data = action.get_data();
			$t1.lockstepTickNumber = action.get_lockstepTickNumber();
			$t1.type = action.get_type();
			var serAction = $t1;
			this.get_clientNetworkManager().sendAction(serAction);
		}
	}, Pather.Common.StepManager);
	$Pather_Client_$Program.$main();
})();
