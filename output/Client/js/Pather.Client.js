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
		var gameClient = new $Pather_Client_GameClient();
		//            var game = new ClientGame();
		//            game.Init();
	};
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Client.ClientGame
	var $Pather_Client_ClientGame = function(allUsers, tickManager) {
		this.tickManager = null;
		this.board = null;
		this.$allUsers = null;
		this.stepManager = null;
		this.tickManager = tickManager;
		this.$allUsers = allUsers;
		this.stepManager = new $Pather_Client_StepManager(this);
		tickManager.onProcessLockstep = ss.delegateCombine(tickManager.onProcessLockstep, ss.mkdel(this.stepManager, this.stepManager.processAction));
	};
	$Pather_Client_ClientGame.__typeName = 'Pather.Client.ClientGame';
	global.Pather.Client.ClientGame = $Pather_Client_ClientGame;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Client.ClientUser
	var $Pather_Client_ClientUser = function(game) {
		this.$game = null;
		this.userId = null;
		this.squareX = 0;
		this.squareY = 0;
		this.x = 0;
		this.y = 0;
		this.speed = 0;
		this.playerId = null;
		this.path = null;
		this.animations = null;
		this.$game = game;
		this.animations = [];
		this.path = [];
		this.speed = 20;
	};
	$Pather_Client_ClientUser.__typeName = 'Pather.Client.ClientUser';
	global.Pather.Client.ClientUser = $Pather_Client_ClientUser;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Client.FrontEndTickManager
	var $Pather_Client_FrontEndTickManager = function() {
		this.$lastPing = 0;
		this.$pingSent = null;
		this.$sendPing = null;
		this.$onTickManagerReady = null;
		this.$hasLockstep = false;
		this.$hasLatency = false;
		this.$tickManagerInitialized = false;
		Pather.Common.Utils.TickManager.call(this);
	};
	$Pather_Client_FrontEndTickManager.__typeName = 'Pather.Client.FrontEndTickManager';
	global.Pather.Client.FrontEndTickManager = $Pather_Client_FrontEndTickManager;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Client.GameBoard
	var $Pather_Client_GameBoard = function() {
		this.grid = null;
		this.aStarGraph = null;
	};
	$Pather_Client_GameBoard.__typeName = 'Pather.Client.GameBoard';
	global.Pather.Client.GameBoard = $Pather_Client_GameBoard;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Client.GameClient
	var $Pather_Client_GameClient = function() {
		this.$canvas = null;
		this.$context = null;
		this.$gameManager = null;
		this.curTickTime = 0;
		this.tickNumber = 0;
		this.curGameTime = 0;
		this.nextGameTime = 0;
		this.serverLatency = 0;
		this.trackTickNumber = 0;
		this.trackLockstepTickNumber = 0;
		this.$gameManager = new $Pather_Client_GameManager();
		this.$gameManager.onReady = ss.delegateCombine(this.$gameManager.onReady, ss.mkdel(this, this.$readyToPlay));
		this.nextGameTime = (new Date()).getTime();
		this.curGameTime = (new Date()).getTime();
		this.curTickTime = (new Date()).getTime();
		setTimeout(ss.mkdel(this, function() {
			this.tick();
		}), 1);
	};
	$Pather_Client_GameClient.__typeName = 'Pather.Client.GameClient';
	global.Pather.Client.GameClient = $Pather_Client_GameClient;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Client.GameManager
	var $Pather_Client_GameManager = function() {
		this.networkManager = null;
		this.frontEndTickManager = null;
		this.activeUsers = new (ss.makeGenericType(Pather.Common.Utils.DictionaryList$2, [String, $Pather_Client_ClientUser]))(function(a) {
			return a.userId;
		});
		this.myUser = null;
		this.onReady = null;
		this.clientGame = null;
		this.networkManager = new $Pather_Client_NetworkManager();
		this.frontEndTickManager = new $Pather_Client_FrontEndTickManager();
		this.networkManager.onMessage = ss.delegateCombine(this.networkManager.onMessage, ss.mkdel(this, this.$onGatewayMessage));
		this.frontEndTickManager.init$1(ss.mkdel(this, this.$sendPing), function() {
			console.log('Connected To Tick Server');
		});
		this.clientGame = new $Pather_Client_ClientGame(this.activeUsers, this.frontEndTickManager);
		this.clientGame.init();
		this.frontEndTickManager.startPing();
	};
	$Pather_Client_GameManager.__typeName = 'Pather.Client.GameManager';
	global.Pather.Client.GameManager = $Pather_Client_GameManager;
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
			var $t2 = this.$clientCommunicator;
			var $t1 = Pather.Common.Models.Gateway.Socket.Base.UserJoined_User_Gateway_Socket_Message.$ctor();
			$t1.userToken = 'salvatore' + Pather.Common.Utils.Utilities.uniqueId();
			$t2.sendMessage($t1);
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
	// Pather.Client.StepManager
	var $Pather_Client_StepManager = function(serverGame) {
		this.$serverGame = null;
		this.lastTickProcessed = 0;
		this.stepActionsTicks = null;
		this.$misprocess = 0;
		this.$serverGame = serverGame;
		this.stepActionsTicks = new (ss.makeGenericType(ss.Dictionary$2, [ss.Int32, Array]))();
		this.lastTickProcessed = 0;
	};
	$Pather_Client_StepManager.__typeName = 'Pather.Client.StepManager';
	global.Pather.Client.StepManager = $Pather_Client_StepManager;
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
	$Pather_Client_Tests_LoginE2ETest.getRequest = function(url, port, callback) {
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
	$Pather_Client_Tests_LoginE2ETest.$joinUser = function(userToken, onUserAction) {
		var deferred = Pather.Common.Utils.Promises.Q.defer$2($Pather_Client_Utils_ClientCommunicator, Pather.Common.Utils.Promises.UndefinedPromiseError).call(null);
		$Pather_Client_Tests_LoginE2ETest.getRequest('http://localhost:2222/api/', 2222, function(url) {
			console.log(url);
			var clientCommunicator = new $Pather_Client_Utils_ClientCommunicator(url);
			clientCommunicator.listenForGatewayMessage(function(message) {
				switch (message.gatewayUserMessageType) {
					case 'userAction': {
						onUserAction(clientCommunicator, message);
						break;
					}
					case 'userJoined': {
						deferred.resolve(clientCommunicator);
						break;
					}
					case 'tickSync': {
						break;
					}
					case 'pong': {
						break;
					}
					case 'updateNeighbors': {
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
	ss.initClass($Pather_Client_ClientGame, $asm, {
		init: function() {
			this.board = new $Pather_Client_GameBoard();
			this.board.constructGrid();
		},
		queueUserAction: function(action) {
			this.stepManager.queueUserAction(action);
		},
		processUserAction: function(action) {
			switch (action.userActionType) {
				case 0: {
					var moveAction = action;
					var user = this.$allUsers.get_item(moveAction.userId);
					user.rePathFind(moveAction.x, moveAction.y);
					break;
				}
				default: {
					throw new ss.ArgumentOutOfRangeException();
				}
			}
		},
		tellUserAction: function(action) {
			switch (action.userActionType) {
				case 0: {
					break;
				}
				default: {
					throw new ss.ArgumentOutOfRangeException();
				}
			}
		},
		processUserActionFromNeighbor: function(action) {
			switch (action.userActionType) {
				case 0: {
					break;
				}
				default: {
					throw new ss.ArgumentOutOfRangeException();
				}
			}
		}
	});
	ss.initClass($Pather_Client_ClientUser, $asm, {
		tick: function() {
			var result = this.path[0];
			this.animations = [];
			var projectedX;
			var projectedY;
			var projectedSquareX;
			var projectedSquareY;
			projectedSquareX = (ss.isNullOrUndefined(result) ? this.squareX : result.x);
			projectedSquareY = (ss.isNullOrUndefined(result) ? this.squareY : result.y);
			for (var i = 0; i < Pather.Common.Constants.animationSteps; i++) {
				this.squareX = ss.Int32.trunc(this.x / Pather.Common.Constants.squareSize);
				this.squareY = ss.Int32.trunc(this.y / Pather.Common.Constants.squareSize);
				var fromX = this.x;
				var fromY = this.y;
				if (ss.isValue(result) && (this.squareX === result.x && this.squareY === result.y)) {
					ss.removeAt(this.path, 0);
					result = this.path[0];
					projectedSquareX = (ss.isNullOrUndefined(result) ? this.squareX : result.x);
					projectedSquareY = (ss.isNullOrUndefined(result) ? this.squareY : result.y);
				}
				projectedX = projectedSquareX * Pather.Common.Constants.squareSize + ss.Int32.div(Pather.Common.Constants.squareSize, 2);
				projectedY = projectedSquareY * Pather.Common.Constants.squareSize + ss.Int32.div(Pather.Common.Constants.squareSize, 2);
				if (projectedX === ss.Int32.trunc(this.x) && projectedY === ss.Int32.trunc(this.y)) {
					return;
				}
				this.x = Pather.Common.Utils.Lerper.moveTowards(this.x, projectedX, this.speed / Pather.Common.Constants.animationSteps);
				this.y = Pather.Common.Utils.Lerper.moveTowards(this.y, projectedY, this.speed / Pather.Common.Constants.animationSteps);
				this.animations.push(new Pather.Common.Utils.AnimationPoint(fromX, fromY, this.x, this.y));
			}
		},
		rePathFind: function(squareX, squareY) {
			var graph = this.$game.board.aStarGraph;
			var start = graph.grid[this.squareX][this.squareY];
			var end = graph.grid[squareX][squareY];
			this.path = ss.arrayClone(astar.search(graph, start, end));
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
	});
	ss.initClass($Pather_Client_FrontEndTickManager, $asm, {
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
	ss.initClass($Pather_Client_GameBoard, $asm, {
		constructGrid: function() {
			this.grid = new Array(Pather.Common.Constants.numberOfSquares);
			for (var x = 0; x < Pather.Common.Constants.numberOfSquares; x++) {
				this.grid[x] = new Array(Pather.Common.Constants.numberOfSquares);
				for (var y = 0; y < Pather.Common.Constants.numberOfSquares; y++) {
					this.grid[x][y] = ((Math.random() * 100 < 15) ? 0 : 1);
				}
			}
			this.aStarGraph = new Graph(this.grid);
		}
	});
	ss.initClass($Pather_Client_GameClient, $asm, {
		$readyToPlay: function() {
			if (!Pather.Common.Constants.get_testServer()) {
				var $t1 = document.getElementById('canvas');
				this.$canvas = ss.cast($t1, ss.isValue($t1) && (ss.isInstanceOfType($t1, Element) && $t1.tagName === 'CANVAS'));
				this.$context = ss.cast(this.$canvas.getContext('2d'), CanvasRenderingContext2D);
				this.$canvas.onmousedown = ss.mkdel(this, function(ev) {
					var event = ev;
					var squareX = ss.Int32.div(ss.unbox(ss.cast(event.offsetX, ss.Int32)), Pather.Common.Constants.squareSize);
					var squareY = ss.Int32.div(ss.unbox(ss.cast(event.offsetY, ss.Int32)), Pather.Common.Constants.squareSize);
					this.$gameManager.moveToLocation(squareX, squareY);
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
			this.$context.clearRect(0, 0, 1200, 1200);
			var interpolatedTime = ((new Date()).getTime() - this.nextGameTime) / Pather.Common.Constants.gameTicks;
			for (var $t1 = 0; $t1 < this.$gameManager.activeUsers.list.length; $t1++) {
				var activeUser = this.$gameManager.activeUsers.list[$t1];
				this.$context.save();
				activeUser.draw(this.$context, interpolatedTime);
				this.$context.restore();
			}
		},
		get_percentCompletedWithLockStep: function() {
			var vc = (new Date()).getTime();
			var l = vc - this.$gameManager.frontEndTickManager.currentLockstepTime;
			return l / Pather.Common.Constants.lockstepTicks;
		},
		tick: function() {
			setTimeout(ss.mkdel(this, function() {
				this.tick();
			}), 1);
			var vc = (new Date()).getTime();
			var l2 = vc - this.curTickTime;
			var nextTickTime = ss.Int32.div(l2, Pather.Common.Constants.gameTicks);
			while (nextTickTime > this.trackTickNumber) {
				this.trackTickNumber++;
				this.tickNumber++;
				for (var $t1 = 0; $t1 < this.$gameManager.activeUsers.list.length; $t1++) {
					var person = this.$gameManager.activeUsers.list[$t1];
					person.tick();
				}
				//todo probably should only happen once? and not in the loop
				var v = (new Date()).getTime();
				this.nextGameTime += v - this.curGameTime;
				this.curGameTime = v;
			}
		}
	});
	ss.initClass($Pather_Client_GameManager, $asm, {
		$sendPing: function() {
			this.networkManager.sendPing();
		},
		moveToLocation: function(x, y) {
			var $t2 = this.networkManager;
			var $t1 = Pather.Common.Models.Common.UserActions.MoveUserAction.$ctor();
			$t1.x = x;
			$t1.y = y;
			$t1.lockstepTick = this.frontEndTickManager.lockstepTickNumber + 1;
			$t2.sendAction($t1);
		},
		$onGatewayMessage: function(message) {
			console.log(message);
			switch (message.gatewayUserMessageType) {
				case 'pong': {
					var pongMessage = message;
					this.frontEndTickManager.onPongReceived(pongMessage);
					break;
				}
				case 'userAction': {
					this.$userAction(message);
					break;
				}
				case 'userJoined': {
					this.$userJoined(message);
					break;
				}
				case 'tickSync': {
					this.$onTickSyncMessage(message);
					break;
				}
				case 'updateNeighbors': {
					this.$onUpdateNeighbors(message);
					break;
				}
				default: {
					throw new ss.ArgumentOutOfRangeException();
				}
			}
		},
		$userAction: function(userActionMessage) {
			this.clientGame.queueUserAction(userActionMessage.action);
		},
		$userJoined: function(userJoinedMessage) {
			var $t1 = new $Pather_Client_ClientUser(this.clientGame);
			$t1.x = userJoinedMessage.x;
			$t1.y = userJoinedMessage.y;
			$t1.userId = userJoinedMessage.userId;
			var clientUser = $t1;
			this.activeUsers.add(clientUser);
			this.myUser = clientUser;
			this.onReady();
		},
		$onUpdateNeighbors: function(message) {
			for (var $t1 = 0; $t1 < message.removed.length; $t1++) {
				var userId = message.removed[$t1];
				var user = this.activeUsers.get_item(userId);
				this.activeUsers.remove(user);
			}
			for (var $t2 = 0; $t2 < message.added.length; $t2++) {
				var updatedNeighbor = message.added[$t2];
				var user1 = new $Pather_Client_ClientUser(this.clientGame);
				user1.userId = updatedNeighbor.userId;
				user1.x = updatedNeighbor.x;
				user1.y = updatedNeighbor.y;
				this.activeUsers.add(user1);
			}
		},
		$onTickSyncMessage: function(message) {
			this.frontEndTickManager.setLockStepTick(message.lockstepTickNumber);
		}
	});
	ss.initClass($Pather_Client_NetworkManager, $asm, {
		sendPing: function() {
			if (ss.isValue(this.$clientCommunicator)) {
				this.$clientCommunicator.sendMessage(Pather.Common.Models.Gateway.Socket.Base.Ping_User_Gateway_Socket_Message.$ctor());
			}
		},
		sendAction: function(action) {
			var $t2 = this.$clientCommunicator;
			var $t1 = Pather.Common.Models.Gateway.Socket.Base.UserAction_User_Gateway_Socket_Message.$ctor();
			$t1.action = action;
			$t2.sendMessage($t1);
		}
	});
	ss.initClass($Pather_Client_StepManager, $asm, {
		queueUserAction: function(action) {
			if (!this.stepActionsTicks.containsKey(action.lockstepTick)) {
				if (action.lockstepTick <= this.$serverGame.tickManager.lockstepTickNumber) {
					this.$serverGame.processUserAction(action);
					console.log('Misprocess of action count', ++this.$misprocess, this.$serverGame.tickManager.lockstepTickNumber - action.lockstepTick);
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
				this.$serverGame.processUserAction(stepAction);
			}
			this.lastTickProcessed = lockstepTickNumber;
			this.stepActionsTicks.remove(lockstepTickNumber);
		}
	});
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
			var totalHits = 50;
			for (var i = 0; i < totalHits; i++) {
				var i1 = { $: i };
				setTimeout(ss.mkdel({ i1: i1 }, function() {
					var startTime = (new Date()).getTime();
					var $t1 = Pather.Common.Models.Common.UserActions.MoveUserAction.$ctor();
					$t1.x = ss.Int32.trunc(Math.random() * 50);
					$t1.y = ss.Int32.trunc(Math.random() * 50);
					var moveUserAction = $t1;
					var $t2 = Pather.Common.Models.Gateway.Socket.Base.UserAction_User_Gateway_Socket_Message.$ctor();
					$t2.action = moveUserAction;
					var moveToLocation = $t2;
					var receivedCount = 0;
					var userToken = id + '-' + this.i1.$;
					$Pather_Client_Tests_LoginE2ETest.$joinUser(userToken, function(communicator, message) {
						if (message.action.userActionType !== 0) {
							return;
						}
						var action = message.action;
						if (ss.referenceEquals(action.userId, userToken) && action.x === moveUserAction.x && action.y === moveUserAction.y) {
							window.setTimeout(function() {
								if (++receivedCount === 200) {
									communicator.disconnect();
									done++;
									if (done === totalHits) {
										var average = Pather.Common.Utils.EnumerableExtensions.average(averageTimes, function(a) {
											return a;
										});
										console.log('Average join time:', average, 'ms');
										deferred.resolve();
									}
									;
								}
								else {
									moveUserAction.x = (moveUserAction.x + ss.Int32.trunc(Math.random() * 4) - 2 + 50) % 50;
									moveUserAction.y = (moveUserAction.y + ss.Int32.trunc(Math.random() * 4) - 2 + 50) % 50;
									var $t3 = Pather.Common.Models.Gateway.Socket.Base.UserAction_User_Gateway_Socket_Message.$ctor();
									$t3.action = moveUserAction;
									communicator.sendMessage($t3);
									console.log('Moving User again ' + receivedCount, moveUserAction);
								}
							}, ss.Int32.trunc(Math.random() * 1000));
						}
					}).then(function(communicator1) {
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
				if (message.action.userActionType !== 0) {
					return;
				}
				var action = message.action;
				if (action.x === proposedX && action.y === proposedY) {
					defer.resolve();
				}
				else {
					defer.reject();
				}
			}).then(function(communicator1) {
				var $t1 = Pather.Common.Models.Gateway.Socket.Base.UserAction_User_Gateway_Socket_Message.$ctor();
				var $t2 = Pather.Common.Models.Common.UserActions.MoveUserAction.$ctor();
				$t2.x = proposedX;
				$t2.y = proposedY;
				$t1.action = $t2;
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
						var $t1 = Pather.Common.Models.Gateway.Socket.Base.UserAction_User_Gateway_Socket_Message.$ctor();
						var $t2 = Pather.Common.Models.Common.UserActions.MoveUserAction.$ctor();
						$t2.x = proposedX + move;
						$t2.y = proposedY;
						$t1.action = $t2;
						communicator.sendMessage($t1);
					}, 500);
				}
			}).then(function(communicator1) {
				var $t3 = Pather.Common.Models.Gateway.Socket.Base.UserAction_User_Gateway_Socket_Message.$ctor();
				var $t4 = Pather.Common.Models.Common.UserActions.MoveUserAction.$ctor();
				$t4.x = proposedX;
				$t4.y = proposedY;
				$t3.action = $t4;
				communicator1.sendMessage($t3);
			});
			$Pather_Client_Tests_LoginE2ETest.$joinUser(id + 2, function(communicator2, message1) {
				console.log('2', message1);
			}).then(function(communicator3) {
				var $t5 = Pather.Common.Models.Gateway.Socket.Base.UserAction_User_Gateway_Socket_Message.$ctor();
				var $t6 = Pather.Common.Models.Common.UserActions.MoveUserAction.$ctor();
				$t6.x = proposedX + 1;
				$t6.y = proposedY;
				$t5.action = $t6;
				communicator3.sendMessage($t5);
			});
			var once = true;
			$Pather_Client_Tests_LoginE2ETest.$joinUser(id + 3, function(communicator4, message2) {
				console.log('3', message2);
				if (ss.referenceEquals(message2.userId, id + 3) && once) {
					once = false;
					var $t7 = Pather.Common.Models.Gateway.Socket.Base.UserAction_User_Gateway_Socket_Message.$ctor();
					var $t8 = Pather.Common.Models.Common.UserActions.MoveUserAction.$ctor();
					$t8.x = proposedX + 20;
					$t8.y = proposedY;
					$t7.action = $t8;
					communicator4.sendMessage($t7);
				}
			}).then(function(communicator5) {
				var $t9 = Pather.Common.Models.Gateway.Socket.Base.UserAction_User_Gateway_Socket_Message.$ctor();
				var $t10 = Pather.Common.Models.Common.UserActions.MoveUserAction.$ctor();
				$t10.x = proposedX + 1;
				$t10.y = proposedY;
				$t9.action = $t10;
				communicator5.sendMessage($t9);
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
	ss.setMetadata($Pather_Client_Tests_LoginE2ETest, { attr: [new Pather.Common.TestFramework.TestClassAttribute(false)], members: [{ attr: [new Pather.Common.TestFramework.TestMethodAttribute(true)], name: 'Login3AndMove', type: 8, sname: 'login3AndMove', returnType: Object, params: [Pather.Common.Utils.Promises.Deferred] }, { attr: [new Pather.Common.TestFramework.TestMethodAttribute(true)], name: 'LoginAndMove', type: 8, sname: 'loginAndMove', returnType: Object, params: [Pather.Common.Utils.Promises.Deferred] }, { attr: [new Pather.Common.TestFramework.TestMethodAttribute(false)], name: 'SlamWWithUsers', type: 8, sname: 'slamWWithUsers', returnType: Object, params: [Pather.Common.Utils.Promises.Deferred] }] });
	$Pather_Client_$Program.$main();
})();
