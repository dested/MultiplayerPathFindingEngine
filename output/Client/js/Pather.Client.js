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
	// Pather.Client.ClientGameView
	var $Pather_Client_ClientGameView = function(clientInstantiateLogic) {
		this.$clientInstantiateLogic = null;
		this.clientGameManager = null;
		this.curTickTime = 0;
		this.tickNumber = 0;
		this.curGameTime = 0;
		this.nextGameTime = 0;
		this.serverLatency = 0;
		this.trackTickNumber = 0;
		this.trackLockstepTickNumber = 0;
		this.$clientInstantiateLogic = clientInstantiateLogic;
		if (ss.isNullOrUndefined(this.$clientInstantiateLogic)) {
			this.$clientInstantiateLogic = new $Pather_Client_DefaultClientInstantiateLogic();
		}
		this.clientGameManager = clientInstantiateLogic.createClientGameManager();
		this.clientGameManager.onReady = ss.delegateCombine(this.clientGameManager.onReady, ss.mkdel(this, this.readyToPlay));
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
	// Pather.Client.DefaultClientInstantiateLogic
	var $Pather_Client_DefaultClientInstantiateLogic = function() {
	};
	$Pather_Client_DefaultClientInstantiateLogic.__typeName = 'Pather.Client.DefaultClientInstantiateLogic';
	global.Pather.Client.DefaultClientInstantiateLogic = $Pather_Client_DefaultClientInstantiateLogic;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Client.NetworkManager
	var $Pather_Client_NetworkManager = function() {
		this.$clientCommunicator = null;
		this.onMessage = null;
		$Pather_Client_NetworkManager.getRequest(Pather.Common.ConnectionConstants.headIP, ss.mkdel(this, function(url) {
			console.log(url);
			this.$clientCommunicator = new $Pather_Client_Utils_ClientCommunicator(url);
			this.$clientCommunicator.listenForGatewayMessage(ss.mkdel(this, function(message) {
				this.onMessage(message);
			}));
			this.joinUser();
		}));
	};
	$Pather_Client_NetworkManager.__typeName = 'Pather.Client.NetworkManager';
	$Pather_Client_NetworkManager.getRequest = function(url, callback) {
		//todo stub out properly idiot
		if (Pather.Common.Constants.get_testServer()) {
			var http = require('http');
			http.request(url, function(res) {
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
	var $Pather_Client_GameFramework_ClientGame = function(tickManager, networkManager) {
		this.networkManager = null;
		this.stepManager = null;
		Pather.Common.GameFramework.Game.call(this, tickManager);
		this.networkManager = networkManager;
		this.stepManager = new $Pather_Client_GameFramework_StepManager(this);
		tickManager.onProcessLockstep = ss.delegateCombine(tickManager.onProcessLockstep, ss.mkdel(this.stepManager, this.stepManager.processAction));
		this.stepManager.processClientAction = ss.delegateCombine(this.stepManager.processClientAction, ss.mkdel(this, this.clientProcessClientAction));
	};
	$Pather_Client_GameFramework_ClientGame.__typeName = 'Pather.Client.GameFramework.ClientGame';
	global.Pather.Client.GameFramework.ClientGame = $Pather_Client_GameFramework_ClientGame;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Client.GameFramework.ClientGameManager
	var $Pather_Client_GameFramework_ClientGameManager = function(clientInstantiateLogic) {
		this.$clientInstantiateLogic = null;
		this.networkManager = null;
		this.frontEndTickManager = null;
		this.myUser = null;
		this.onReady = null;
		this.clientGame = null;
		this.$clientInstantiateLogic = clientInstantiateLogic;
		this.networkManager = new $Pather_Client_NetworkManager();
		this.frontEndTickManager = new $Pather_Client_GameFramework_FrontEndTickManager();
		this.networkManager.onMessage = ss.delegateCombine(this.networkManager.onMessage, ss.mkdel(this, this.$onGatewayMessage));
		this.frontEndTickManager.init$1(ss.mkdel(this, this.$sendPing), function() {
			//                Global.Console.Log("Connected To Tick Server");
		});
		this.clientGame = clientInstantiateLogic.createClientGame(this.frontEndTickManager, this.networkManager);
		this.frontEndTickManager.startPing();
	};
	$Pather_Client_GameFramework_ClientGameManager.__typeName = 'Pather.Client.GameFramework.ClientGameManager';
	global.Pather.Client.GameFramework.ClientGameManager = $Pather_Client_GameFramework_ClientGameManager;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Client.GameFramework.ClientGameUser
	var $Pather_Client_GameFramework_ClientGameUser = function(game, userId) {
		this.controlled = false;
		this.path = null;
		Pather.Common.GameFramework.GameUser.call(this, game, userId);
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
		if (Pather.Common.Constants.get_testServer()) {
			this.socket = require('socket.io-client')(url, { reconnection: false, forceNew: true });
			this.socket.on('connect', function() {
			});
		}
		else {
			this.socket = io.connect(url, { reconnection: false, forceNew: true });
		}
	};
	$Pather_Client_Utils_ClientCommunicator.__typeName = 'Pather.Client.Utils.ClientCommunicator';
	global.Pather.Client.Utils.ClientCommunicator = $Pather_Client_Utils_ClientCommunicator;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Client.Utils.IClientInstantiateLogic
	var $Pather_Client_Utils_IClientInstantiateLogic = function() {
	};
	$Pather_Client_Utils_IClientInstantiateLogic.__typeName = 'Pather.Client.Utils.IClientInstantiateLogic';
	global.Pather.Client.Utils.IClientInstantiateLogic = $Pather_Client_Utils_IClientInstantiateLogic;
	ss.initClass($Pather_Client_ClientGameView, $asm, {
		readyToPlay: function() {
		},
		get_percentCompletedWithLockStep: function() {
			var vc = (new Date()).getTime();
			var l = vc - this.clientGameManager.frontEndTickManager.currentLockstepTime;
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
				this.clientGameManager.tick(this.tickNumber);
				//todo probably should only happen once? and not in the loop
				var v = (new Date()).getTime();
				this.nextGameTime += v - this.curGameTime;
				this.curGameTime = v;
			}
		}
	});
	ss.initInterface($Pather_Client_Utils_IClientInstantiateLogic, $asm, { createClientGameManager: null, createClientGame: null });
	ss.initClass($Pather_Client_DefaultClientInstantiateLogic, $asm, {
		createClientGameManager: function() {
			return new $Pather_Client_GameFramework_ClientGameManager(this);
		},
		createClientGame: function(frontEndTickManager, networkManager) {
			return new $Pather_Client_GameFramework_ClientGame(frontEndTickManager, networkManager);
		}
	}, null, [$Pather_Client_Utils_IClientInstantiateLogic]);
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
			var clientUser = ss.cast(this.createGameUser(userId), $Pather_Client_GameFramework_ClientGameUser);
			clientUser.controlled = true;
			clientUser.x = x;
			clientUser.y = y;
			this.addEntity(clientUser);
			this.myUser = clientUser;
		},
		createGameUser: function(userId) {
			return new $Pather_Client_GameFramework_ClientGameUser(this, userId);
		},
		clientProcessClientAction: function(action) {
			var user;
			switch (action.clientActionType) {
				case 'move': {
					var moveAction = action;
					user = ss.cast(this.activeEntities.get_item(moveAction.entityId), $Pather_Client_GameFramework_ClientGameUser);
					if (ss.isNullOrUndefined(user)) {
						return;
					}
					user.rePathFind(moveAction);
					break;
				}
				case 'logicAction': {
					var logicAction = action;
					this.processLogicAction(logicAction);
					break;
				}
				case 'moveEntityOnPath': {
					var moveEntityOnPath = action;
					user = ss.cast(this.activeEntities.get_item(moveEntityOnPath.entityId), $Pather_Client_GameFramework_ClientGameUser);
					if (ss.isNullOrUndefined(user)) {
						return;
					}
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
		processLogicAction: function(logicAction) {
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
				this.addEntity(user1);
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
		$onGatewayMessage: function(message) {
			//            Global.Console.Log("Gateway Message", message);
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
			this.clientGame.init(userJoinedMessage.lockstepTickNumber, userJoinedMessage.serverLatency);
			this.clientGame.initializeGameBoard(userJoinedMessage.grid);
			this.clientGame.myUserJoined(userJoinedMessage.userId, userJoinedMessage.x, userJoinedMessage.y);
			this.onReady();
		},
		$onTickSyncMessage: function(message) {
			this.frontEndTickManager.setLockStepTick(message.lockstepTickNumber);
		},
		tick: function(tickNumber) {
			this.clientGame.tick(tickNumber);
		}
	});
	ss.initClass($Pather_Client_GameFramework_ClientGameUser, $asm, {
		rePathFind: function(destinationAction) {
			var graph = this.game.board.aStarGraph;
			var start = graph.grid[Pather.Common.Utils.Utilities.toSquare(this.x)][Pather.Common.Utils.Utilities.toSquare(this.y)];
			var end = graph.grid[Pather.Common.Utils.Utilities.toSquare(destinationAction.x)][Pather.Common.Utils.Utilities.toSquare(destinationAction.y)];
			ss.clear(this.path);
			ss.arrayAddRange(this.path, Pather.Common.Utils.EnumerableExtensions.select(astar.search(graph, start, end), function(a) {
				return Pather.Common.Definitions.AStar.AStarLockstepPath.$ctor(a.x, a.y);
			}));
			//            Global.Console.Log("Path", Json.Stringify(Path));
		},
		setPath: function(path) {
			ss.clear(this.path);
			ss.arrayAddRange(this.path, path);
			//            Global.Console.Log("Path", Json.Stringify(Path));
		}
	}, Pather.Common.GameFramework.GameUser);
	ss.initClass($Pather_Client_GameFramework_FrontEndTickManager, $asm, {
		lockstepForced: function(lockStepTickNumber) {
			console.log('Force Lockstep', lockStepTickNumber);
		},
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
					console.log('Misprocess of action count', ++this.$misprocess, 'Tick number offset:', this.$game.tickManager.lockstepTickNumber - action.lockstepTick);
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
})();
