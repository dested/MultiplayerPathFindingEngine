(function() {
	'use strict';
	var $asm = {};
	global.Pather = global.Pather || {};
	global.Pather.Client = global.Pather.Client || {};
	global.Pather.Client.GameFramework = global.Pather.Client.GameFramework || {};
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
		var gameClient = new $Pather_Client_ClientGameView();
		//            var game = new ClientGame();
		//            game.Init();
	};
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Client.ClientGameView
	var $Pather_Client_ClientGameView = function() {
		this.$contextCollection = new (ss.makeGenericType(ss.Dictionary$2, [String, CanvasRenderingContext2D]))();
		this.$clientGameManager = null;
		this.curTickTime = 0;
		this.tickNumber = 0;
		this.curGameTime = 0;
		this.nextGameTime = 0;
		this.serverLatency = 0;
		this.trackTickNumber = 0;
		this.trackLockstepTickNumber = 0;
		this.$clientGameManager = new $Pather_Client_GameFramework_ClientGameManager();
		this.$clientGameManager.onReady = ss.delegateCombine(this.$clientGameManager.onReady, ss.mkdel(this, this.$readyToPlay));
		this.nextGameTime = (new Date()).getTime();
		this.curGameTime = (new Date()).getTime();
		this.curTickTime = (new Date()).getTime();
		setTimeout(ss.mkdel(this, function() {
			this.tick();
		}), 1);
	};
	$Pather_Client_ClientGameView.__typeName = 'Pather.Client.ClientGameView';
	global.Pather.Client.ClientGameView = $Pather_Client_ClientGameView;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Client.NetworkManager
	var $Pather_Client_NetworkManager = function() {
		this.$clientCommunicator = null;
		this.onMessage = null;
		$Pather_Client_NetworkManager.getRequest('http://localhost:2222/api/', 2222, ss.mkdel(this, function(url) {
			console.log(url);
			this.$clientCommunicator = new $Pather_Client_Utils_ClientCommunicator(url);
			this.$clientCommunicator.listenForGatewayMessage(ss.mkdel(this, function(message) {
				this.onMessage(message);
			}));
			this.joinUser();
		}));
	};
	$Pather_Client_NetworkManager.__typeName = 'Pather.Client.NetworkManager';
	$Pather_Client_NetworkManager.getRequest = function(url, port, callback) {
		//todo stub out properly idiot
		if (Pather.Common.Constants.get_testServer()) {
			var http = require('http');
			var options = { port: port, path: url, method: 'get' };
			http.request(options, function(res) {
				res.setEncoding('utf8');
				res.on('data', function(chunk) {
					callback(chunk);
				});
			}).end();
		}
		else {
			$.get(url, null, callback);
		}
	};
	global.Pather.Client.NetworkManager = $Pather_Client_NetworkManager;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Client.GameFramework.ClientGame
	var $Pather_Client_GameFramework_ClientGame = function(tickManager) {
		this.stepManager = null;
		Pather.Common.GameFramework.Game.call(this, tickManager);
		this.stepManager = new $Pather_Client_GameFramework_StepManager(this);
		tickManager.onProcessLockstep = ss.delegateCombine(tickManager.onProcessLockstep, ss.mkdel(this.stepManager, this.stepManager.processAction));
		this.stepManager.processClientAction = ss.delegateCombine(this.stepManager.processClientAction, ss.mkdel(this, this.clientProcessClientAction));
	};
	$Pather_Client_GameFramework_ClientGame.__typeName = 'Pather.Client.GameFramework.ClientGame';
	global.Pather.Client.GameFramework.ClientGame = $Pather_Client_GameFramework_ClientGame;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Client.GameFramework.ClientGameManager
	var $Pather_Client_GameFramework_ClientGameManager = function() {
		this.networkManager = null;
		this.frontEndTickManager = null;
		this.myUser = null;
		this.onReady = null;
		this.clientGame = null;
		this.networkManager = new $Pather_Client_NetworkManager();
		this.frontEndTickManager = new $Pather_Client_GameFramework_FrontEndTickManager();
		this.networkManager.onMessage = ss.delegateCombine(this.networkManager.onMessage, ss.mkdel(this, this.$onGatewayMessage));
		this.frontEndTickManager.init$1(ss.mkdel(this, this.$sendPing), function() {
			console.log('Connected To Tick Server');
		});
		this.clientGame = new $Pather_Client_GameFramework_ClientGame(this.frontEndTickManager);
		this.frontEndTickManager.startPing();
	};
	$Pather_Client_GameFramework_ClientGameManager.__typeName = 'Pather.Client.GameFramework.ClientGameManager';
	global.Pather.Client.GameFramework.ClientGameManager = $Pather_Client_GameFramework_ClientGameManager;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Client.GameFramework.ClientGameUser
	var $Pather_Client_GameFramework_ClientGameUser = function(game, userId) {
		this.animations = null;
		this.path = null;
		Pather.Common.GameFramework.GameUser.call(this, game, userId);
		this.animations = [];
		this.path = [];
	};
	$Pather_Client_GameFramework_ClientGameUser.__typeName = 'Pather.Client.GameFramework.ClientGameUser';
	global.Pather.Client.GameFramework.ClientGameUser = $Pather_Client_GameFramework_ClientGameUser;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Client.GameFramework.FrontEndTickManager
	var $Pather_Client_GameFramework_FrontEndTickManager = function() {
		this.$lastPing = 0;
		this.$pingSent = null;
		this.$sendPing = null;
		this.$onTickManagerReady = null;
		this.$hasLockstep = false;
		this.$hasLatency = false;
		this.$tickManagerInitialized = false;
		Pather.Common.Utils.TickManager.call(this);
	};
	$Pather_Client_GameFramework_FrontEndTickManager.__typeName = 'Pather.Client.GameFramework.FrontEndTickManager';
	global.Pather.Client.GameFramework.FrontEndTickManager = $Pather_Client_GameFramework_FrontEndTickManager;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Client.GameFramework.IClientGameEntity
	var $Pather_Client_GameFramework_IClientGameEntity = function() {
	};
	$Pather_Client_GameFramework_IClientGameEntity.__typeName = 'Pather.Client.GameFramework.IClientGameEntity';
	global.Pather.Client.GameFramework.IClientGameEntity = $Pather_Client_GameFramework_IClientGameEntity;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Client.GameFramework.StepManager
	var $Pather_Client_GameFramework_StepManager = function(game) {
		this.$game = null;
		this.lastTickProcessed = 0;
		this.stepActionsTicks = null;
		this.$misprocess = 0;
		this.processClientAction = null;
		this.$game = game;
		this.stepActionsTicks = new (ss.makeGenericType(ss.Dictionary$2, [ss.Int32, Array]))();
		this.lastTickProcessed = 0;
	};
	$Pather_Client_GameFramework_StepManager.__typeName = 'Pather.Client.GameFramework.StepManager';
	global.Pather.Client.GameFramework.StepManager = $Pather_Client_GameFramework_StepManager;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Client.Tests.LoginE2ETest
	var $Pather_Client_Tests_LoginE2ETest = function() {
	};
	$Pather_Client_Tests_LoginE2ETest.__typeName = 'Pather.Client.Tests.LoginE2ETest';
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
	ss.initClass($Pather_Client_ClientGameView, $asm, {
		$readyToPlay: function() {
			if (!Pather.Common.Constants.get_testServer()) {
				var $t1 = document.getElementById('backCanvas');
				var backCanvas = ss.cast($t1, ss.isValue($t1) && (ss.isInstanceOfType($t1, Element) && $t1.tagName === 'CANVAS'));
				var backContext = ss.cast(backCanvas.getContext('2d'), CanvasRenderingContext2D);
				var $t2 = document.getElementById('canvas');
				var canvas = ss.cast($t2, ss.isValue($t2) && (ss.isInstanceOfType($t2, Element) && $t2.tagName === 'CANVAS'));
				var context = ss.cast(canvas.getContext('2d'), CanvasRenderingContext2D);
				this.$contextCollection.add('Background', backContext);
				this.$contextCollection.add('Foreground', context);
				canvas.onmousedown = ss.mkdel(this, function(ev) {
					var event = ev;
					this.$clientGameManager.moveToLocation(ss.unbox(ss.cast(event.offsetX, ss.Int32)), ss.unbox(ss.cast(event.offsetY, ss.Int32)));
				});
				window.requestAnimationFrame(ss.mkdel(this, function(a) {
					this.$draw();
				}));
			}
		},
		$draw: function() {
			window.requestAnimationFrame(ss.mkdel(this, function(a) {
				this.$draw();
			}));
			var interpolatedTime = ((new Date()).getTime() - this.nextGameTime) / Pather.Common.Constants.gameTicks;
			this.$clientGameManager.draw(this.$contextCollection, interpolatedTime);
		},
		get_percentCompletedWithLockStep: function() {
			var vc = (new Date()).getTime();
			var l = vc - this.$clientGameManager.frontEndTickManager.currentLockstepTime;
			return l / Pather.Common.Constants.lockstepTicks;
		},
		tick: function() {
			setTimeout(ss.mkdel(this, this.tick), 1);
			var vc = (new Date()).getTime();
			var l2 = vc - this.curTickTime;
			var nextTickTime = ss.Int32.div(l2, Pather.Common.Constants.gameTicks);
			while (nextTickTime > this.trackTickNumber) {
				this.trackTickNumber++;
				this.tickNumber++;
				this.$clientGameManager.tick(this.tickNumber);
				//todo probably should only happen once? and not in the loop
				var v = (new Date()).getTime();
				this.nextGameTime += v - this.curGameTime;
				this.curGameTime = v;
			}
		}
	});
	ss.initClass($Pather_Client_NetworkManager, $asm, {
		joinUser: function() {
			var $t2 = this.$clientCommunicator;
			var $t1 = Pather.Common.Models.Gateway.Socket.Base.UserJoined_User_Gateway_Socket_Message.$ctor();
			$t1.userToken = 'salvatore' + Pather.Common.Utils.Utilities.uniqueId();
			$t2.sendMessage($t1);
		},
		sendPing: function() {
			if (ss.isValue(this.$clientCommunicator)) {
				this.$clientCommunicator.sendMessage(Pather.Common.Models.Gateway.Socket.Base.Ping_User_Gateway_Socket_Message.$ctor());
			}
		},
		sendClientAction: function(gameSegmentAction) {
			var $t2 = this.$clientCommunicator;
			var $t1 = Pather.Common.Models.Gateway.Socket.Base.GameSegmentAction_User_Gateway_Socket_Message.$ctor();
			$t1.gameSegmentAction = gameSegmentAction;
			$t2.sendMessage($t1);
		}
	});
	ss.initClass($Pather_Client_GameFramework_ClientGame, $asm, {
		queueClientAction: function(action) {
			this.stepManager.queueClientAction(action);
		},
		myUserJoined: function(userId, x, y) {
			var clientUser = this.createGameUser(userId);
			clientUser.x = x;
			clientUser.y = y;
			this.activeEntities.add(clientUser);
			this.myUser = clientUser;
		},
		createGameUser: function(userId) {
			return new $Pather_Client_GameFramework_ClientGameUser(this, userId);
		},
		drawEntities: function(context, interpolatedTime) {
			for (var $t1 = 0; $t1 < this.activeEntities.list.length; $t1++) {
				var entity = this.activeEntities.list[$t1];
				context.save();
				entity.draw(context, interpolatedTime);
				context.restore();
			}
		},
		clientProcessClientAction: function(action) {
			var user;
			switch (action.clientActionType) {
				case 'move': {
					var moveAction = action;
					user = ss.cast(this.activeEntities.get_item(moveAction.entityId), $Pather_Client_GameFramework_ClientGameUser);
					user.rePathFind(moveAction);
					break;
				}
				case 'moveEntityOnPath': {
					var moveEntityOnPath = action;
					user = ss.cast(this.activeEntities.get_item(moveEntityOnPath.entityId), $Pather_Client_GameFramework_ClientGameUser);
					var removeStart = 0;
					for (; removeStart < moveEntityOnPath.path.length; removeStart++) {
						var aStarLockstepPath = moveEntityOnPath.path[removeStart];
						if (aStarLockstepPath.removeAfterLockstep > this.tickManager.lockstepTickNumber) {
							removeStart--;
							break;
						}
					}
					ss.arrayRemoveRange(moveEntityOnPath.path, 0, removeStart);
					user.setPath(moveEntityOnPath.path);
					break;
				}
				case 'updateNeighbors': {
					var updateNeighborAction = action;
					this.updateNeighbors(updateNeighborAction.added, updateNeighborAction.removed);
					break;
				}
				default: {
					throw new ss.ArgumentOutOfRangeException();
				}
			}
		},
		updateNeighbors: function(added, removed) {
			for (var $t1 = 0; $t1 < removed.length; $t1++) {
				var userId = removed[$t1];
				var user = this.activeEntities.get_item(userId);
				this.activeEntities.remove(user);
			}
			for (var $t2 = 0; $t2 < added.length; $t2++) {
				var updatedNeighbor = added[$t2];
				var user1 = this.createGameUser(updatedNeighbor.userId);
				user1.x = updatedNeighbor.x;
				user1.y = updatedNeighbor.y;
				this.activeEntities.add(user1);
				for (var $t3 = 0; $t3 < updatedNeighbor.inProgressClientActions.length; $t3++) {
					var inProgressClientAction = updatedNeighbor.inProgressClientActions[$t3];
					this.clientProcessClientAction(inProgressClientAction.action);
				}
			}
		}
	}, Pather.Common.GameFramework.Game);
	ss.initClass($Pather_Client_GameFramework_ClientGameManager, $asm, {
		$sendPing: function() {
			this.networkManager.sendPing();
		},
		moveToLocation: function(x, y) {
			var $t2 = this.networkManager;
			var $t1 = Pather.Common.Models.Common.Actions.GameSegmentAction.MoveEntity_GameSegmentAction.$ctor();
			$t1.x = x;
			$t1.y = y;
			$t1.lockstepTick = this.frontEndTickManager.lockstepTickNumber + 1;
			$t2.sendClientAction($t1);
		},
		$onGatewayMessage: function(message) {
			console.log('Gateway Message', message);
			switch (message.gatewayUserMessageType) {
				case 'pong': {
					var pongMessage = message;
					this.frontEndTickManager.onPongReceived(pongMessage);
					break;
				}
				case 'clientAction': {
					this.$onClientAction(message);
					break;
				}
				case 'userJoined': {
					this.$onUserJoined(message);
					break;
				}
				case 'tickSync': {
					this.$onTickSyncMessage(message);
					break;
				}
				default: {
					throw new ss.ArgumentOutOfRangeException();
				}
			}
		},
		$onClientAction: function(clientActionGatewayUserSocketMessage) {
			this.clientGame.queueClientAction(clientActionGatewayUserSocketMessage.action);
		},
		$onUserJoined: function(userJoinedMessage) {
			this.clientGame.init(userJoinedMessage.grid, userJoinedMessage.lockstepTickNumber, userJoinedMessage.serverLatency);
			this.clientGame.myUserJoined(userJoinedMessage.userId, userJoinedMessage.x, userJoinedMessage.y);
			this.onReady();
		},
		$onTickSyncMessage: function(message) {
			this.frontEndTickManager.setLockStepTick(message.lockstepTickNumber);
		},
		draw: function(contextCollection, interpolatedTime) {
			contextCollection.get_item('Foreground').clearRect(0, 0, 1200, 1200);
			this.$drawBackground(contextCollection.get_item('Background'));
			this.clientGame.drawEntities(contextCollection.get_item('Foreground'), interpolatedTime);
		},
		$drawBackground: function(context) {
			context.clearRect(0, 0, 1200, 1200);
			context.save();
			context.fillStyle = 'black';
			context.fillRect(0, 0, 1200, 1200);
			context.fillStyle = 'blue';
			for (var y = 0; y < Pather.Common.Constants.numberOfSquares; y++) {
				for (var x = 0; x < Pather.Common.Constants.numberOfSquares; x++) {
					if (this.clientGame.board.grid[x][y] === 0) {
						context.fillRect(x * Pather.Common.Constants.squareSize, y * Pather.Common.Constants.squareSize, Pather.Common.Constants.squareSize, Pather.Common.Constants.squareSize);
					}
				}
			}
			context.restore();
		},
		tick: function(tickNumber) {
			this.clientGame.tick(tickNumber);
		}
	});
	ss.initInterface($Pather_Client_GameFramework_IClientGameEntity, $asm, { draw: null });
	ss.initClass($Pather_Client_GameFramework_ClientGameUser, $asm, {
		tick: function() {
			Pather.Common.GameFramework.GameUser.prototype.tick.call(this);
			ss.clear(this.animations);
			var nextPathPoint = this.path[0];
			if (ss.isNullOrUndefined(nextPathPoint)) {
				return;
			}
			console.log(this.entityId, this.x, this.y, this.game.tickManager.lockstepTickNumber);
			var halfSquareSize = ss.Int32.div(Pather.Common.Constants.squareSize, 2);
			var animationDividedSpeed = this.speed / Pather.Common.Constants.numberOfAnimationSteps;
			var projectedX = nextPathPoint.x * Pather.Common.Constants.squareSize + halfSquareSize;
			var projectedY = nextPathPoint.y * Pather.Common.Constants.squareSize + halfSquareSize;
			for (var i = 0; i < Pather.Common.Constants.numberOfAnimationSteps; i++) {
				var squareX = Pather.Common.Utils.Utilities.toSquare(this.x);
				var squareY = Pather.Common.Utils.Utilities.toSquare(this.y);
				var fromX = this.x;
				var fromY = this.y;
				if (squareX === nextPathPoint.x && squareY === nextPathPoint.y) {
					ss.removeAt(this.path, 0);
					nextPathPoint = this.path[0];
					if (ss.isNullOrUndefined(nextPathPoint)) {
						return;
					}
					projectedX = nextPathPoint.x * Pather.Common.Constants.squareSize + halfSquareSize;
					projectedY = nextPathPoint.y * Pather.Common.Constants.squareSize + halfSquareSize;
				}
				if (projectedX === ss.Int32.trunc(this.x) && projectedY === ss.Int32.trunc(this.y)) {
					return;
				}
				this.x = Pather.Common.Utils.Lerper.moveTowards(this.x, projectedX, animationDividedSpeed);
				this.y = Pather.Common.Utils.Lerper.moveTowards(this.y, projectedY, animationDividedSpeed);
				this.animations.push(new Pather.Common.Utils.AnimationStep(fromX, fromY, this.x, this.y));
			}
		},
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
				var animationIndex = ss.Int32.trunc(interpolatedTime * Pather.Common.Constants.numberOfAnimationSteps);
				var animation = this.animations[animationIndex];
				if (ss.isValue(animation)) {
					var interpolateStep = interpolatedTime % (1 / Pather.Common.Constants.numberOfAnimationSteps) * Pather.Common.Constants.numberOfAnimationSteps;
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
		},
		rePathFind: function(destinationAction) {
			var graph = this.game.board.aStarGraph;
			var start = graph.grid[Pather.Common.Utils.Utilities.toSquare(this.x)][Pather.Common.Utils.Utilities.toSquare(this.y)];
			var end = graph.grid[Pather.Common.Utils.Utilities.toSquare(destinationAction.x)][Pather.Common.Utils.Utilities.toSquare(destinationAction.y)];
			ss.clear(this.path);
			ss.arrayAddRange(this.path, Pather.Common.Utils.EnumerableExtensions.select(astar.search(graph, start, end), function(a) {
				return Pather.Common.Definitions.AStar.AStarLockstepPath.$ctor(a.x, a.y);
			}));
			console.log('Path', JSON.stringify(this.path));
		},
		setPath: function(path) {
			ss.clear(this.path);
			ss.arrayAddRange(this.path, path);
			console.log('Path', JSON.stringify(this.path));
		}
	}, Pather.Common.GameFramework.GameUser, [$Pather_Client_GameFramework_IClientGameEntity]);
	ss.initClass($Pather_Client_GameFramework_FrontEndTickManager, $asm, {
		init$1: function(sendPing, onTickManagerReady) {
			this.$sendPing = sendPing;
			this.$onTickManagerReady = onTickManagerReady;
			setInterval(ss.mkdel(this, this.startPing), Pather.Common.Constants.latencyPingInterval);
		},
		startPing: function() {
			this.$pingSent = [];
			this.$lastPing = (new Date()).getTime();
			this.$sendPing();
		},
		onPongReceived: function(pongMessage) {
			if (ss.isNullOrUndefined(this.$pingSent)) {
				console.log('Mis pong');
				return;
			}
			var cur = (new Date()).getTime();
			this.$pingSent.push(cur - this.$lastPing);
			this.$lastPing = cur;
			if (this.$pingSent.length < 2) {
				this.$sendPing();
			}
			else {
				var average = 0;
				for (var $t1 = 0; $t1 < this.$pingSent.length; $t1++) {
					var l = this.$pingSent[$t1];
					average += l;
				}
				var roundTripLatency = average / this.$pingSent.length;
				var oneWayLatency = ss.Int32.div(ss.Int32.trunc(roundTripLatency), 2);
				var latency = oneWayLatency + pongMessage.gatewayLatency;
				this.setServerLatency(latency);
				this.$pingSent = null;
			}
		},
		setLockStepTick: function(lockStepTickNumber) {
			Pather.Common.Utils.TickManager.prototype.setLockStepTick.call(this, lockStepTickNumber);
			this.$hasLockstep = true;
			if (this.$hasLatency && this.$hasLockstep && !this.$tickManagerInitialized) {
				this.$tickManagerInitialized = true;
				this.$tickManagerReady();
			}
		},
		setServerLatency: function(latency) {
			Pather.Common.Utils.TickManager.prototype.setServerLatency.call(this, latency);
			this.$hasLatency = true;
			if (this.$hasLatency && this.$hasLockstep && !this.$tickManagerInitialized) {
				this.$tickManagerInitialized = true;
				this.$tickManagerReady();
			}
		},
		$tickManagerReady: function() {
			this.init(this.lockstepTickNumber);
			this.$onTickManagerReady();
		}
	}, Pather.Common.Utils.TickManager);
	ss.initClass($Pather_Client_GameFramework_StepManager, $asm, {
		queueClientAction: function(action) {
			if (!this.stepActionsTicks.containsKey(action.lockstepTick)) {
				if (action.lockstepTick <= this.$game.tickManager.lockstepTickNumber) {
					this.processClientAction(action);
					console.log('Misprocess of action count', ++this.$misprocess, this.$game.tickManager.lockstepTickNumber - action.lockstepTick);
					return;
				}
				this.stepActionsTicks.set_item(action.lockstepTick, []);
			}
			this.stepActionsTicks.get_item(action.lockstepTick).push(action);
		},
		processAction: function(lockstepTickNumber) {
			if (!this.stepActionsTicks.containsKey(lockstepTickNumber)) {
				return;
			}
			var stepActions = this.stepActionsTicks.get_item(lockstepTickNumber);
			for (var $t1 = 0; $t1 < stepActions.length; $t1++) {
				var stepAction = stepActions[$t1];
				this.processClientAction(stepAction);
			}
			this.lastTickProcessed = lockstepTickNumber;
			this.stepActionsTicks.remove(lockstepTickNumber);
		}
	});
	ss.initClass($Pather_Client_Tests_LoginE2ETest, $asm, {});
	ss.initClass($Pather_Client_Utils_ClientCommunicator, $asm, {
		listenForGatewayMessage: function(callback) {
			this.socket.on('Gateway.Message', function(obj) {
				callback(obj.data);
			});
		},
		sendMessage: function(obj) {
			this.socket.emit('Gateway.Message', ss.makeGenericType(Pather.Common.Utils.DataObject$1, [Object]).$ctor(obj));
		},
		disconnect: function() {
			this.socket.disconnect();
		}
	});
	ss.setMetadata($Pather_Client_Tests_LoginE2ETest, { attr: [new Pather.Common.TestFramework.TestClassAttribute(false)] });
	$Pather_Client_$Program.$main();
})();
