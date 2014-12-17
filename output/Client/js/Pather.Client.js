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
		Pather.Common.Game.call(this);
		var stepManager = new $Pather_Client_StepManagerClient(this, new $Pather_Client_NetworkManager());
		var $t1 = document.getElementById('canvas');
		this.set_canvas(ss.cast($t1, ss.isValue($t1) && (ss.isInstanceOfType($t1, Element) && $t1.tagName === 'CANVAS')));
		this.set_context(ss.cast(this.get_canvas().getContext('2d'), CanvasRenderingContext2D));
		this.get_canvas().onmousedown = ss.mkdel(this, function(ev) {
			var event = ev;
			var squareX = ss.Int32.div(ss.unbox(ss.cast(event.offsetX, ss.Int32)), Pather.Common.Constants.get_squareSize());
			var squareY = ss.Int32.div(ss.unbox(ss.cast(event.offsetY, ss.Int32)), Pather.Common.Constants.get_squareSize());
			var $t2 = Pather.Common.Models.MoveModel.$ctor();
			$t2.x = squareX;
			$t2.y = squareY;
			$t2.playerId = this.get_me().get_playerId();
			stepManager.sendActionClient(new Pather.Common.StepManager.MoveAction($t2, this.get_lockstepTickNumber() + 1));
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
		this.set_socket(io.connect('127.0.0.1:8998'));
		this.get_socket().on('connect', ss.mkdel(this, this.connect));
	};
	$Pather_Client_Communicator.__typeName = 'Pather.Client.Communicator';
	global.Pather.Client.Communicator = $Pather_Client_Communicator;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Client.NetworkManager
	var $Pather_Client_NetworkManager = function() {
		this.$1$CommunicatorField = null;
		this.$1$NetworkPlayersField = null;
		this.$1$OnReceiveActionField = null;
		this.set_communicator(new $Pather_Client_Communicator());
		this.set_networkPlayers([]);
		this.get_communicator().connect();
	};
	$Pather_Client_NetworkManager.__typeName = 'Pather.Client.NetworkManager';
	global.Pather.Client.NetworkManager = $Pather_Client_NetworkManager;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Client.StepManagerClient
	var $Pather_Client_StepManagerClient = function(game, networkManager) {
		this.$2$NetworkManagerField = null;
		Pather.Common.StepManager.StepManager.call(this, game);
		this.set_networkManager(networkManager);
		this.get_networkManager().set_onReceiveAction(ss.mkdel(this, this.receiveAction));
	};
	$Pather_Client_StepManagerClient.__typeName = 'Pather.Client.StepManagerClient';
	global.Pather.Client.StepManagerClient = $Pather_Client_StepManagerClient;
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
			//
			//
			//            communicator.OnConnected += (connectedModel) =>
			//
			//
			//            {
			//
			//
			//            TickNumber = connectedModel.TickNumber;
			//
			//
			//            Grid = connectedModel.Grid;
			//
			//
			//            };
			//
			//
			//            communicator.OnNewPlayer += (newPlayerModel) =>
			//
			//
			//            {
			//
			//
			//            Global.Console.Log("New Player", newPlayerModel);
			//
			//
			//            var person = CreatePerson(newPlayerModel.PlayerId);
			//
			//
			//            person.Init(0, 0);
			//
			//
			//            People.Add(person);
			//
			//
			//            };
			//
			//
			//            communicator.OnPlayerLeft += (playerLeftModel) =>
			//
			//
			//            {
			//
			//
			//            Global.Console.Log("playerLeft", playerLeftModel);
			//
			//
			//            foreach (var person in People)
			//
			//
			//            {
			//
			//
			//            if (person.PlayerId == playerLeftModel.PlayerId)
			//
			//
			//            {
			//
			//
			//            People.Remove(person);
			//
			//
			//            break;
			//
			//
			//            }
			//
			//
			//            }
			//
			//
			//            };
			//
			//
			//            communicator.OnPlayerList += (playerListModel) =>
			//
			//
			//            {
			//
			//
			//            Global.Console.Log("playerList", playerListModel);
			//
			//
			//            
			//
			//
			//            
			//
			//
			//            foreach (var playerModel in playerListModel.Players)
			//
			//
			//            {
			//
			//
			//            var person = CreatePerson(playerModel.PlayerId);
			//
			//
			//            person.Init(playerModel.X, playerModel.Y);
			//
			//
			//            People.Add(person);
			//
			//
			//            }
			//
			//
			//            };
			//
			//
			//            communicator.OnMove += (moveModel) =>
			//
			//
			//            {
			//
			//
			//            foreach (var person in People)
			//
			//
			//            {
			//
			//
			//            if (person.PlayerId == moveModel.PlayerId)
			//
			//
			//            {
			//
			//
			//            Global.Console.Log("move found", moveModel);
			//
			//
			//            person.RePathFind(moveModel.X, moveModel.Y, moveModel.LockstepTick);
			//
			//
			//            return;
			//
			//
			//            }
			//
			//
			//            }
			//
			//
			//            };
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
		connect: function() {
			//            Socket.On<DataObject<ConnectedModel>>(SocketChannels.ServerChannel(SocketChannels.Server.Connect), OnConnectedCallback); 
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
	ss.initClass($Pather_Client_NetworkManager, $asm, {
		get_communicator: function() {
			return this.$1$CommunicatorField;
		},
		set_communicator: function(value) {
			this.$1$CommunicatorField = value;
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
		sendAction: function(serAction) {
			this.get_communicator().sendMessage(Pather.Common.SocketChannels.clientChannel('postAction'), serAction);
		},
		receiveAction: function(serAction) {
			this.get_onReceiveAction()(serAction);
		}
	});
	ss.initClass($Pather_Client_StepManagerClient, $asm, {
		get_networkManager: function() {
			return this.$2$NetworkManagerField;
		},
		set_networkManager: function(value) {
			this.$2$NetworkManagerField = value;
		},
		get_networkPlayers: function() {
			return this.get_networkManager().get_networkPlayers();
		},
		sendActionClient: function(action) {
			var $t1 = Pather.Common.StepManager.SerializableAction.$ctor();
			$t1.data = action.get_data();
			$t1.lockstepTickNumber = action.get_lockstepTickNumber();
			$t1.type = action.get_type();
			var serAction = $t1;
			this.get_networkManager().sendAction(serAction);
		}
	}, Pather.Common.StepManager.StepManager);
	$Pather_Client_$Program.$main();
})();
