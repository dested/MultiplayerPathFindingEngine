(function() {
	'use strict';
	var $asm = {};
	global.Pather = global.Pather || {};
	global.Pather.Client = global.Pather.Client || {};
	global.Pather.Client.Old = global.Pather.Client.Old || {};
	global.Pather.Client.Tests = global.Pather.Client.Tests || {};
	global.Pather.Client.Utils = global.Pather.Client.Utils || {};
	ss.initAssembly($asm, 'Pather.Client');
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Client.Program
	var $Pather_Client_$Program = function() {
	};
	$Pather_Client_$Program.__typeName = 'Pather.Client.$Program';
	$Pather_Client_$Program.$main = function() {
		if (!!(window.window.RunTests || window.location.hash === '#test')) {
			Pather.Common.TestFramework.TestFramework.runTests(null);
			return;
		}
		var game = new $Pather_Client_Old_ClientGame();
		game.init();
	};
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Client.Old.ClientEntity
	var $Pather_Client_Old_ClientEntity = function(game, playerId) {
		this.$clientGame = null;
		Pather.Common.old.Entity.call(this, game, playerId);
		this.$clientGame = game;
	};
	$Pather_Client_Old_ClientEntity.__typeName = 'Pather.Client.Old.ClientEntity';
	global.Pather.Client.Old.ClientEntity = $Pather_Client_Old_ClientEntity;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Client.Old.ClientGame
	var $Pather_Client_Old_ClientGame = function() {
		this.canvas = null;
		this.context = null;
		this.backCanvas = null;
		this.backContext = null;
		this.myPlayerId = null;
		this.myPlayer = null;
		this.$sentMovementForThisLockstep = false;
		this.$hasGrid = false;
		Pather.Common.old.Game.call(this);
		this.myPlayerId = Pather.Common.Utils.Utilities.uniqueId();
		this.stepManager = new $Pather_Client_Old_ClientStepManager(this, new $Pather_Client_Old_ClientNetworkManager());
		this.$randomMoveMeTo();
		if (!Pather.Common.Constants.get_testServer()) {
			var $t1 = document.getElementById('backCanvas');
			this.backCanvas = ss.cast($t1, ss.isValue($t1) && (ss.isInstanceOfType($t1, Element) && $t1.tagName === 'CANVAS'));
			this.backContext = ss.cast(this.backCanvas.getContext('2d'), CanvasRenderingContext2D);
			var $t2 = document.getElementById('canvas');
			this.canvas = ss.cast($t2, ss.isValue($t2) && (ss.isInstanceOfType($t2, Element) && $t2.tagName === 'CANVAS'));
			this.context = ss.cast(this.canvas.getContext('2d'), CanvasRenderingContext2D);
			this.canvas.onmousedown = ss.mkdel(this, function(ev) {
				if (this.$sentMovementForThisLockstep) {
					return;
				}
				this.$sentMovementForThisLockstep = true;
				var event = ev;
				var squareX = ss.Int32.div(ss.unbox(ss.cast(event.offsetX, ss.Int32)), Pather.Common.Constants.squareSize);
				var squareY = ss.Int32.div(ss.unbox(ss.cast(event.offsetY, ss.Int32)), Pather.Common.Constants.squareSize);
				if (squareX < Pather.Common.Constants.numberOfSquares && squareY < Pather.Common.Constants.numberOfSquares) {
					this.$moveMeTo(squareX, squareY);
				}
			});
		}
	};
	$Pather_Client_Old_ClientGame.__typeName = 'Pather.Client.Old.ClientGame';
	global.Pather.Client.Old.ClientGame = $Pather_Client_Old_ClientGame;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Client.Old.ClientNetworkManager
	var $Pather_Client_Old_ClientNetworkManager = function() {
		this.clientCommunicator = null;
		this.networkPlayers = 0;
		this.onReceiveAction = null;
		this.onConnected = null;
		this.onPlayerSync = null;
		this.onSetLockStep = null;
		this.onSetLatency = null;
		this.$lastPing = 0;
		this.$pingSent = null;
		this.clientCommunicator = new $Pather_Client_Utils_ClientCommunicator(null);
		this.networkPlayers = 0;
		this.clientCommunicator.oldListenOnChannel(Pather.Common.Models.Game.Old.ConnectedModel).call(this.clientCommunicator, Pather.Common.SocketChannels.serverChannel('connect'), ss.mkdel(this, function(model) {
			this.onConnected(model);
			this.$triggerPingTest();
			window.setInterval(ss.mkdel(this, this.$triggerPingTest), 60000);
		}));
		this.clientCommunicator.oldListenOnChannel(Pather.Common.Models.Game.Old.PlayerSyncModel).call(this.clientCommunicator, Pather.Common.SocketChannels.serverChannel('playerSync'), ss.mkdel(this, function(model1) {
			if (ss.isValue(model1.joinedPlayers)) {
				this.networkPlayers += model1.joinedPlayers.length;
			}
			if (ss.isValue(model1.leftPlayers)) {
				this.networkPlayers -= model1.leftPlayers.length;
			}
			this.onPlayerSync(model1);
		}));
		this.clientCommunicator.oldListenOnChannel(Pather.Common.Models.Game.Old.PingPongModel).call(this.clientCommunicator, Pather.Common.SocketChannels.serverChannel('pong'), ss.mkdel(this, function(model2) {
			var cur = (new Date()).getTime();
			this.$pingSent.push(cur - this.$lastPing);
			this.$lastPing = cur;
			if (this.$pingSent.length < 6) {
				this.clientCommunicator.oldSendMessage(Pather.Common.SocketChannels.clientChannel('ping'), Pather.Common.Models.Game.Old.PingPongModel.$ctor());
			}
			else {
				var average = 0;
				for (var $t1 = 0; $t1 < this.$pingSent.length; $t1++) {
					var l = this.$pingSent[$t1];
					average += l;
				}
				this.onSetLatency(ss.Int32.div(ss.Int32.trunc(average / this.$pingSent.length), 2));
				this.$pingSent = null;
			}
		}));
		this.clientCommunicator.oldListenOnChannel(Pather.Common.Models.Game.Old.SyncLockstepModel).call(this.clientCommunicator, Pather.Common.SocketChannels.serverChannel('syncLockstep'), ss.mkdel(this, function(model3) {
			this.onSetLockStep(model3);
		}));
		this.clientCommunicator.oldListenOnChannel(Pather.Common.old.SerializableAction).call(this.clientCommunicator, Pather.Common.SocketChannels.serverChannel('postAction'), ss.mkdel(this, function(model4) {
			this.receiveAction(model4);
		}));
	};
	$Pather_Client_Old_ClientNetworkManager.__typeName = 'Pather.Client.Old.ClientNetworkManager';
	global.Pather.Client.Old.ClientNetworkManager = $Pather_Client_Old_ClientNetworkManager;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Client.Old.ClientStepManager
	var $Pather_Client_Old_ClientStepManager = function(game, clientNetworkManager) {
		this.clientNetworkManager = null;
		Pather.Common.old.StepManager.call(this, game);
		this.clientNetworkManager = clientNetworkManager;
		this.clientNetworkManager.onReceiveAction = ss.mkdel(this, this.receiveAction);
		this.clientNetworkManager.onConnected = ss.mkdel(this, this.$connected);
		this.clientNetworkManager.onPlayerSync = ss.mkdel(this, this.$playerSync);
		this.clientNetworkManager.onSetLockStep = ss.mkdel(this, this.$onSetLockstep);
		this.clientNetworkManager.onSetLatency = ss.mkdel(this, this.$onSetLatency);
	};
	$Pather_Client_Old_ClientStepManager.__typeName = 'Pather.Client.Old.ClientStepManager';
	global.Pather.Client.Old.ClientStepManager = $Pather_Client_Old_ClientStepManager;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Client.Tests.LoginE2ETest
	var $Pather_Client_Tests_LoginE2ETest = function() {
	};
	$Pather_Client_Tests_LoginE2ETest.__typeName = 'Pather.Client.Tests.LoginE2ETest';
	$Pather_Client_Tests_LoginE2ETest.$joinUser = function(userToken, onMove, overridePort) {
		var deferred = Pather.Common.Utils.Promises.Q.defer$2($Pather_Client_Utils_ClientCommunicator, Pather.Common.Utils.Promises.UndefinedPromiseError).call(null);
		var numOfGateways = 0;
		var b = ss.Int32.trunc(Math.random() * numOfGateways);
		var port = 1800 + b;
		if (overridePort !== 0) {
			port = overridePort;
		}
		$.get('http://localhost:2222/api/', null, function(url) {
			console.log(url);
			var clientCommunicator = new $Pather_Client_Utils_ClientCommunicator(url);
			clientCommunicator.listenForGatewayMessage(function(message) {
				switch (message.gatewayUserMessageType) {
					case 'move': {
						onMove(clientCommunicator, message);
						break;
					}
					case 'userJoined': {
						deferred.resolve(clientCommunicator);
						break;
					}
					default: {
						throw new ss.ArgumentOutOfRangeException();
					}
				}
			});
			var $t1 = Pather.Common.Models.Gateway.Socket.Base.UserJoined_User_Gateway_Socket_Message.$ctor();
			$t1.userToken = userToken;
			clientCommunicator.sendMessage($t1);
		});
		return deferred.promise;
	};
	global.Pather.Client.Tests.LoginE2ETest = $Pather_Client_Tests_LoginE2ETest;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Client.Utils.ClientCommunicator
	var $Pather_Client_Utils_ClientCommunicator = function(url) {
		this.socket = null;
		//            var url = "http://198.211.107.101:8991";
		url = ss.coalesce(url, 'http://127.0.0.1:8991');
		if (Pather.Common.Constants.get_testServer()) {
			this.socket = require('socket.io-client')(url, { reconnection: false, forceNew: true });
			this.socket.on('connect', function() {
				console.log('hi');
			});
		}
		else {
			this.socket = io.connect(url, { reconnection: false, forceNew: true });
		}
	};
	$Pather_Client_Utils_ClientCommunicator.__typeName = 'Pather.Client.Utils.ClientCommunicator';
	global.Pather.Client.Utils.ClientCommunicator = $Pather_Client_Utils_ClientCommunicator;
	ss.initClass($Pather_Client_$Program, $asm, {});
	ss.initClass($Pather_Client_Old_ClientEntity, $asm, {
		draw: function(context, interpolatedTime) {
			context.save();
			if (interpolatedTime < 0) {
				interpolatedTime = 0;
			}
			if (interpolatedTime > 1) {
				interpolatedTime = 1;
			}
			var _x = ss.Int32.trunc(this.x);
			var _y = ss.Int32.trunc(this.y);
			if (this.animations.length > 0) {
				var animationIndex = ss.Int32.trunc(interpolatedTime * Pather.Common.Constants.animationSteps);
				var animation = this.animations[animationIndex];
				if (ss.isValue(animation)) {
					var interpolateStep = interpolatedTime % (1 / Pather.Common.Constants.animationSteps) * Pather.Common.Constants.animationSteps;
					_x = ss.Int32.trunc(animation.fromX + (animation.x - animation.fromX) * interpolateStep);
					_y = ss.Int32.trunc(animation.fromY + (animation.y - animation.fromY) * interpolateStep);
				}
			}
			var result = this.path[0];
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
			context.fillRect(_x - ss.Int32.div(Pather.Common.Constants.squareSize, 2), _y - ss.Int32.div(Pather.Common.Constants.squareSize, 2), Pather.Common.Constants.squareSize, Pather.Common.Constants.squareSize);
			context.strokeRect(_x - ss.Int32.div(Pather.Common.Constants.squareSize, 2), _y - ss.Int32.div(Pather.Common.Constants.squareSize, 2), Pather.Common.Constants.squareSize, Pather.Common.Constants.squareSize);
			context.restore();
		}
	}, Pather.Common.old.Entity);
	ss.initClass($Pather_Client_Old_ClientGame, $asm, {
		$randomMoveMeTo: function() {
			window.setTimeout(ss.mkdel(this, function() {
				this.$randomMoveMeTo();
				var x = ss.Int32.trunc(Math.random() * Pather.Common.Constants.numberOfSquares);
				var y = ss.Int32.trunc(Math.random() * Pather.Common.Constants.numberOfSquares);
				x = Math.max(x, 0);
				y = Math.max(y, 0);
				x = Math.min(x, Pather.Common.Constants.numberOfSquares - 1);
				y = Math.min(y, Pather.Common.Constants.numberOfSquares - 1);
				this.$moveMeTo(x, y);
			}), ss.Int32.trunc(Math.random() * 2500 + 500));
		},
		$moveMeTo: function(squareX, squareY) {
			var lockstepNumber = this.lockstepTickNumber;
			if (this.get_percentCompletedWithLockStep() > 0.5) {
				lockstepNumber += 2;
			}
			else {
				lockstepNumber += 1;
			}
			var $t2 = ss.cast(this.stepManager, $Pather_Client_Old_ClientStepManager);
			var $t1 = Pather.Common.Models.Game.Old.MoveModel.$ctor();
			$t1.x = squareX;
			$t1.y = squareY;
			$t1.playerId = this.myPlayer.playerId;
			$t2.sendActionClient(new Pather.Common.old.MoveAction($t1, lockstepNumber));
		},
		init: function() {
			Pather.Common.old.Game.prototype.init.call(this);
			if (!Pather.Common.Constants.get_testServer()) {
				window.requestAnimationFrame(ss.mkdel(this, function(a) {
					this.draw();
				}));
			}
		},
		createPlayer: function(playerId) {
			return new $Pather_Client_Old_ClientEntity(this, playerId);
		},
		drawBack: function() {
			this.backContext.save();
			this.backContext.fillStyle = 'black';
			this.backContext.fillRect(0, 0, 1200, 1200);
			this.backContext.fillStyle = 'blue';
			for (var y = 0; y < Pather.Common.Constants.numberOfSquares; y++) {
				for (var x = 0; x < Pather.Common.Constants.numberOfSquares; x++) {
					if (this.grid[x][y] === 0) {
						this.backContext.fillRect(x * Pather.Common.Constants.squareSize, y * Pather.Common.Constants.squareSize, Pather.Common.Constants.squareSize, Pather.Common.Constants.squareSize);
					}
				}
			}
			this.backContext.restore();
		},
		draw: function() {
			if (!Pather.Common.Constants.get_testServer()) {
				window.requestAnimationFrame(ss.mkdel(this, function(a) {
					this.draw();
				}));
				if (!this.$hasGrid && ss.isValue(this.grid)) {
					this.$hasGrid = true;
					this.drawBack();
				}
				this.context.clearRect(0, 0, 1200, 1200);
				if (!this.ready) {
					this.context.fillText('Syncing with server!', 100, 100);
					return;
				}
				var interpolatedTime = ((new Date()).getTime() - this.nextGameTime) / Pather.Common.Constants.gameTicks;
				for (var $t1 = 0; $t1 < this.players.length; $t1++) {
					var person = this.players[$t1];
					person.draw(this.context, interpolatedTime);
				}
			}
		},
		tick: function() {
			var tickResult = Pather.Common.old.Game.prototype.tick.call(this);
			if (tickResult === 2 || tickResult === 3) {
				this.$sentMovementForThisLockstep = false;
			}
			return tickResult;
		},
		localPlayerJoined: function(player) {
			this.myPlayer = player;
		}
	}, Pather.Common.old.Game);
	ss.initClass($Pather_Client_Old_ClientNetworkManager, $asm, {
		$triggerPingTest: function() {
			this.$pingSent = [];
			this.$lastPing = (new Date()).getTime();
			this.clientCommunicator.oldSendMessage(Pather.Common.SocketChannels.clientChannel('ping'), Pather.Common.Models.Game.Old.PingPongModel.$ctor());
		},
		sendAction: function(serAction) {
			this.clientCommunicator.oldSendMessage(Pather.Common.SocketChannels.clientChannel('postAction'), serAction);
		},
		receiveAction: function(serAction) {
			this.onReceiveAction(serAction);
		},
		joinPlayer: function(myPlayerId) {
			var $t2 = this.clientCommunicator;
			var $t3 = Pather.Common.SocketChannels.clientChannel('joinPlayer');
			var $t1 = Pather.Common.Models.Game.Old.PlayerJoinModel.$ctor();
			$t1.playerId = myPlayerId;
			$t2.oldSendMessage($t3, $t1);
		}
	});
	ss.initClass($Pather_Client_Old_ClientStepManager, $asm, {
		get_networkPlayers: function() {
			return this.clientNetworkManager.networkPlayers;
		},
		$onSetLatency: function(latency) {
			this.game.serverLatency = latency;
			console.log('Latency:', latency);
		},
		$onSetLockstep: function(model) {
			//            Global.Console.Log("Tick Number ", model.LockstepTickNumber, "Happened ", Game.ServerLatency, "Ago");
			//todo this should happen at the same time as setlat3ency 
			this.game.curLockstepTime = (new Date()).getTime() - this.game.serverLatency;
			if (this.game.lockstepTickNumber === 0) {
				this.game.ready = true;
				this.game.lockstepTickNumber = model.lockstepTickNumber;
			}
			else {
				if (this.game.lockstepTickNumber > model.lockstepTickNumber) {
					this.game.lockstepTickNumber = model.lockstepTickNumber;
					console.log('Force Lockstep', this.game.lockstepTickNumber);
					this.game.stepManager.processAction(this.game.lockstepTickNumber);
				}
				if (this.game.lockstepTickNumber < model.lockstepTickNumber) {
					console.log('Force Lockstep', this.game.lockstepTickNumber);
					while (this.game.lockstepTickNumber < model.lockstepTickNumber) {
						this.game.lockstepTickNumber++;
						this.game.stepManager.processAction(this.game.lockstepTickNumber);
					}
				}
			}
		},
		$connected: function(model) {
			this.game.grid = model.grid;
			this.game.aStarGraph = new Graph(this.game.grid);
			this.game.players = [];
			this.clientNetworkManager.joinPlayer(ss.cast(this.game, $Pather_Client_Old_ClientGame).myPlayerId);
		},
		$playerSync: function(model) {
			if (ss.isValue(model.joinedPlayers)) {
				for (var $t1 = 0; $t1 < model.joinedPlayers.length; $t1++) {
					var playerModel = model.joinedPlayers[$t1];
					var player = this.game.createPlayer(playerModel.playerId);
					player.init(playerModel.x, playerModel.y);
					this.game.players.push(player);
					if (ss.referenceEquals(ss.cast(this.game, $Pather_Client_Old_ClientGame).myPlayerId, playerModel.playerId)) {
						ss.cast(this.game, $Pather_Client_Old_ClientGame).localPlayerJoined(player);
					}
				}
			}
			if (ss.isValue(model.leftPlayers)) {
				for (var $t2 = 0; $t2 < model.leftPlayers.length; $t2++) {
					var playerModel1 = model.leftPlayers[$t2];
					for (var $t3 = 0; $t3 < this.game.players.length; $t3++) {
						var person = this.game.players[$t3];
						if (ss.referenceEquals(person.playerId, playerModel1.playerId)) {
							ss.remove(this.game.players, person);
							break;
						}
					}
				}
			}
		},
		sendActionClient: function(action) {
			var $t1 = Pather.Common.old.SerializableAction.$ctor();
			$t1.data = action.get_data();
			$t1.lockstepTickNumber = action.get_lockstepTickNumber();
			$t1.type = action.get_type();
			var serAction = $t1;
			this.clientNetworkManager.sendAction(serAction);
		}
	}, Pather.Common.old.StepManager);
	ss.initClass($Pather_Client_Tests_LoginE2ETest, $asm, {
		slamWWithUsers: function(deferred) {
			var users = [];
			var averageTimes = [];
			var id = Pather.Common.Utils.Utilities.uniqueId();
			var done = 0;
			var totalHits = 300;
			for (var i = 0; i < totalHits; i++) {
				var i1 = { $: i };
				setTimeout(ss.mkdel({ i1: i1 }, function() {
					var startTime = (new Date()).getTime();
					var $t1 = Pather.Common.Models.Gateway.Socket.Base.MoveToLocation_User_Gateway_Socket_Message.$ctor();
					$t1.x = ss.Int32.trunc(Math.random() * 50);
					$t1.y = ss.Int32.trunc(Math.random() * 50);
					var moveToLocation = $t1;
					var receivedCount = 0;
					var userToken = id + '-' + this.i1.$;
					$Pather_Client_Tests_LoginE2ETest.$joinUser(userToken, function(communicator, message) {
						if (ss.referenceEquals(message.userId, userToken) && message.x === moveToLocation.x && message.y === moveToLocation.y) {
							window.setTimeout(function() {
								if (++receivedCount === 200) {
									setTimeout(function() {
										communicator.disconnect();
										done++;
										if (done === totalHits) {
											var average = Pather.Common.Utils.EnumerableExtensions.average(averageTimes, function(a) {
												return a;
											});
											console.log('Average join time:', average, 'ms');
											deferred.resolve();
										}
									}, ss.Int32.trunc(Math.random() * 4000));
								}
								else {
									moveToLocation.x = (moveToLocation.x + ss.Int32.trunc(Math.random() * 4) - 2 + 50) % 50;
									moveToLocation.y = (moveToLocation.y + ss.Int32.trunc(Math.random() * 4) - 2 + 50) % 50;
									communicator.sendMessage(moveToLocation);
									console.log('Moving User again ' + receivedCount, moveToLocation);
								}
							}, ss.Int32.trunc(Math.random() * 1000));
						}
					}, 0).then(function(communicator1) {
						var joinTime = (new Date()).getTime() - startTime;
						console.log('Join Time', joinTime);
						averageTimes.push(joinTime);
						communicator1.sendMessage(moveToLocation);
					});
				}), ss.Int32.trunc(Math.random() * 15000));
			}
		},
		loginAndMove: function(defer) {
			var id = Pather.Common.Utils.Utilities.uniqueId();
			var proposedX = 12;
			var proposedY = 25;
			$Pather_Client_Tests_LoginE2ETest.$joinUser(id, function(communicator, message) {
				if (message.x === proposedX && message.y === proposedY) {
					defer.resolve();
				}
				else {
					defer.reject();
				}
			}, 0).then(function(communicator1) {
				var $t1 = Pather.Common.Models.Gateway.Socket.Base.MoveToLocation_User_Gateway_Socket_Message.$ctor();
				$t1.x = proposedX;
				$t1.y = proposedY;
				communicator1.sendMessage($t1);
			});
		},
		login3AndMove: function(defer) {
			var id = 'salvatore';
			var proposedX = 12;
			var proposedY = 25;
			var move = 0;
			$Pather_Client_Tests_LoginE2ETest.$joinUser(id + 1, function(communicator, message) {
				console.log('1', message);
				if (ss.referenceEquals(message.userId, id + 1) && move < 40) {
					move++;
					setTimeout(function() {
						var $t1 = Pather.Common.Models.Gateway.Socket.Base.MoveToLocation_User_Gateway_Socket_Message.$ctor();
						$t1.x = proposedX + move;
						$t1.y = proposedY;
						communicator.sendMessage($t1);
					}, 500);
				}
				if (message.x === proposedX && message.y === proposedY) {
					//                    defer.Resolve();
				}
				else {
					//                    defer.Reject();
				}
			}, 1800).then(function(communicator1) {
				var $t2 = Pather.Common.Models.Gateway.Socket.Base.MoveToLocation_User_Gateway_Socket_Message.$ctor();
				$t2.x = proposedX;
				$t2.y = proposedY;
				communicator1.sendMessage($t2);
			});
			$Pather_Client_Tests_LoginE2ETest.$joinUser(id + 2, function(communicator2, message1) {
				console.log('2', message1);
			}, 1801).then(function(communicator3) {
				var $t3 = Pather.Common.Models.Gateway.Socket.Base.MoveToLocation_User_Gateway_Socket_Message.$ctor();
				$t3.x = proposedX + 1;
				$t3.y = proposedY;
				communicator3.sendMessage($t3);
			});
			var once = true;
			$Pather_Client_Tests_LoginE2ETest.$joinUser(id + 3, function(communicator4, message2) {
				console.log('3', message2);
				if (ss.referenceEquals(message2.userId, id + 3) && once) {
					once = false;
					var $t4 = Pather.Common.Models.Gateway.Socket.Base.MoveToLocation_User_Gateway_Socket_Message.$ctor();
					$t4.x = proposedX + 20;
					$t4.y = proposedY;
					communicator4.sendMessage($t4);
				}
			}, 1800).then(function(communicator5) {
				var $t5 = Pather.Common.Models.Gateway.Socket.Base.MoveToLocation_User_Gateway_Socket_Message.$ctor();
				$t5.x = proposedX + 1;
				$t5.y = proposedY;
				communicator5.sendMessage($t5);
			});
		}
	});
	ss.initClass($Pather_Client_Utils_ClientCommunicator, $asm, {
		listenForGatewayMessage: function(callback) {
			this.socket.on('Gateway.Message', function(obj) {
				callback(obj.data);
			});
		},
		oldListenOnChannel: function(T) {
			return function(channel, callback) {
				this.socket.on(channel, function(obj) {
					callback(obj.data);
				});
			};
		},
		oldSendMessage: function(channel, obj) {
			this.socket.emit(channel, ss.makeGenericType(Pather.Common.Utils.DataObject$1, [Object]).$ctor(obj));
		},
		sendMessage: function(obj) {
			this.socket.emit('Gateway.Message', ss.makeGenericType(Pather.Common.Utils.DataObject$1, [Object]).$ctor(obj));
		},
		disconnect: function() {
			this.socket.disconnect();
		}
	});
	ss.setMetadata($Pather_Client_Tests_LoginE2ETest, { attr: [new Pather.Common.TestFramework.TestClassAttribute(false)], members: [{ attr: [new Pather.Common.TestFramework.TestMethodAttribute(false)], name: 'Login3AndMove', type: 8, sname: 'login3AndMove', returnType: Object, params: [Pather.Common.Utils.Promises.Deferred] }, { attr: [new Pather.Common.TestFramework.TestMethodAttribute(true)], name: 'LoginAndMove', type: 8, sname: 'loginAndMove', returnType: Object, params: [Pather.Common.Utils.Promises.Deferred] }, { attr: [new Pather.Common.TestFramework.TestMethodAttribute(true)], name: 'SlamWWithUsers', type: 8, sname: 'slamWWithUsers', returnType: Object, params: [Pather.Common.Utils.Promises.Deferred] }] });
	$Pather_Client_$Program.$main();
})();
