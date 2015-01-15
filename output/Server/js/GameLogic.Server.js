(function() {
	'use strict';
	var $asm = {};
	global.GameLogic = global.GameLogic || {};
	global.GameLogic.Server = global.GameLogic.Server || {};
	ss.initAssembly($asm, 'GameLogic.Server');
	////////////////////////////////////////////////////////////////////////////////
	// GameLogic.Server.Program
	var $GameLogic_Server_$Program = function() {
	};
	$GameLogic_Server_$Program.__typeName = 'GameLogic.Server.$Program';
	$GameLogic_Server_$Program.$main = function() {
		var serverStarter = new Pather.Servers.ServerStarter();
		serverStarter.start(new $GameLogic_Server_InstantiateLogic(), global.process.argv);
	};
	////////////////////////////////////////////////////////////////////////////////
	// GameLogic.Server.InstantiateLogic
	var $GameLogic_Server_InstantiateLogic = function() {
	};
	$GameLogic_Server_InstantiateLogic.__typeName = 'GameLogic.Server.InstantiateLogic';
	global.GameLogic.Server.InstantiateLogic = $GameLogic_Server_InstantiateLogic;
	////////////////////////////////////////////////////////////////////////////////
	// GameLogic.Server.LogicGameWorld
	var $GameLogic_Server_LogicGameWorld = function(gameWorldPubSub, backEndTickManager, instantiateLogic, serverLogger) {
		Pather.Servers.GameWorldServer.GameWorld.call(this, gameWorldPubSub, backEndTickManager, instantiateLogic, serverLogger);
		serverLogger.logInformation('Logic Server Entered', []);
	};
	$GameLogic_Server_LogicGameWorld.__typeName = 'GameLogic.Server.LogicGameWorld';
	global.GameLogic.Server.LogicGameWorld = $GameLogic_Server_LogicGameWorld;
	////////////////////////////////////////////////////////////////////////////////
	// GameLogic.Server.LogicServerGame
	var $GameLogic_Server_LogicServerGame = function(serverGameManager, backEndTickManager) {
		this.$queuedNeighborActions = {};
		this.$queuedTellActions = {};
		Pather.Servers.GameSegmentServer.ServerGame.call(this, serverGameManager, backEndTickManager);
	};
	$GameLogic_Server_LogicServerGame.__typeName = 'GameLogic.Server.LogicServerGame';
	global.GameLogic.Server.LogicServerGame = $GameLogic_Server_LogicServerGame;
	////////////////////////////////////////////////////////////////////////////////
	// GameLogic.Server.LogicServerGameUser
	var $GameLogic_Server_LogicServerGameUser = function(logicServerGame, userId) {
		Pather.Servers.GameSegmentServer.ServerGameUser.call(this, logicServerGame, userId);
	};
	$GameLogic_Server_LogicServerGameUser.__typeName = 'GameLogic.Server.LogicServerGameUser';
	global.GameLogic.Server.LogicServerGameUser = $GameLogic_Server_LogicServerGameUser;
	ss.initClass($GameLogic_Server_$Program, $asm, {});
	ss.initClass($GameLogic_Server_InstantiateLogic, $asm, {
		createGameWorld: function(gameWorldPubSub, backEndTickManager, serverLogger) {
			return new $GameLogic_Server_LogicGameWorld(gameWorldPubSub, backEndTickManager, this, serverLogger);
		},
		createServerGame: function(serverGameManager, backEndTickManager) {
			return new $GameLogic_Server_LogicServerGame(serverGameManager, backEndTickManager);
		},
		createGameBoard: function() {
			return new GameLogic.Common.LogicGameBoard();
		}
	}, null, [Pather.Servers.Utils.IInstantiateLogic]);
	ss.initClass($GameLogic_Server_LogicGameWorld, $asm, {
		processLogicAction: function(logicAction) {
			var customLogicAction = logicAction;
			var logicGameBoard = ss.cast(this.board, GameLogic.Common.LogicGameBoard);
			switch (customLogicAction.logicActionType) {
				case 0: {
					var cutTreeAction = customLogicAction;
					var item = logicGameBoard.getAtXY(cutTreeAction.treeX, cutTreeAction.treeY);
					if (item.type === 'tree') {
						if (item.value <= 10) {
							logicGameBoard.changePoint(GameLogic.Common.LogicGridItem.$ctor('empty', -2147483648), cutTreeAction.treeX, cutTreeAction.treeY);
							console.log('Removed Tree At', cutTreeAction.treeX, cutTreeAction.treeY);
						}
						else {
							item.value -= 10;
							logicGameBoard.changePoint(item, cutTreeAction.treeX, cutTreeAction.treeY);
							console.log('Cut Tree At', cutTreeAction.treeX, cutTreeAction.treeY, item.value, 'Left');
						}
					}
					break;
				}
				default: {
					throw new ss.ArgumentOutOfRangeException();
				}
			}
		}
	}, Pather.Servers.GameWorldServer.GameWorld);
	ss.initClass($GameLogic_Server_LogicServerGame, $asm, {
		processLogicAction: function(user, action) {
			var logicUser = ss.cast(user, $GameLogic_Server_LogicServerGameUser);
			var logicAction = action;
			switch (logicAction.logicActionType) {
				case 0: {
					var cutTreeLogicAction = action;
					var treeX = cutTreeLogicAction.treeX;
					var treeY = cutTreeLogicAction.treeY;
					var completedLockStep = logicUser.cutTree(treeX, treeY, cutTreeLogicAction.lockstepTick);
					if (completedLockStep === 0) {
						//bad movement
						return;
					}
					var $t2 = this.gameManager;
					var $t1 = GameLogic.Common.CutTree_CustomLogicAction_ClientAction.$ctor();
					$t1.entityId = user.entityId;
					$t1.lockstepTick = cutTreeLogicAction.lockstepTick;
					$t1.treeX = treeX;
					$t1.treeY = treeY;
					var $t3 = GameLogic.Common.CutTree_CustomLogicAction_TellGameSegmentAction.$ctor();
					$t3.entityId = user.entityId;
					$t3.lockstepTick = completedLockStep;
					$t3.treeX = treeX;
					$t3.treeY = treeY;
					var $t4 = GameLogic.Common.CutTree_CustomLogicAction_NeighborGameSegmentAction.$ctor();
					$t4.entityId = user.entityId;
					$t4.lockstepTick = cutTreeLogicAction.lockstepTick;
					$t4.treeX = treeX;
					$t4.treeY = treeY;
					var $t5 = GameLogic.Common.CutTree_CustomLogicAction_GameWorldAction.$ctor();
					$t5.entityId = user.entityId;
					$t5.lockstepTick = cutTreeLogicAction.lockstepTick;
					$t5.treeX = treeX;
					$t5.treeY = treeY;
					$t2.sendAction(user, $t1, $t3, $t4, $t5);
					break;
				}
				default: {
					throw new ss.ArgumentOutOfRangeException();
				}
			}
		},
		processTellLogicAction: function(logicAction) {
			var customLogicAction = logicAction;
			switch (customLogicAction.logicActionType) {
				case 0: {
					var cutTreeAction = customLogicAction;
					this.$queueTellAction(cutTreeAction.lockstepTick, cutTreeAction);
					break;
				}
				default: {
					throw new ss.ArgumentOutOfRangeException();
				}
			}
		},
		$queueNeighborAction: function(lockstepTick, action) {
			if (!ss.keyExists(this.$queuedNeighborActions, lockstepTick)) {
				this.$queuedNeighborActions[lockstepTick] = [];
			}
			this.$queuedNeighborActions[lockstepTick].push(action);
		},
		$queueTellAction: function(lockstepTick, action) {
			if (!ss.keyExists(this.$queuedTellActions, lockstepTick)) {
				this.$queuedTellActions[lockstepTick] = [];
			}
			this.$queuedTellActions[lockstepTick].push(action);
		},
		processNeighborLogicAction: function(logicAction) {
			var customLogicAction = logicAction;
			switch (customLogicAction.logicActionType) {
				case 0: {
					var cutTreeAction = customLogicAction;
					this.$queueNeighborAction(cutTreeAction.lockstepTick, cutTreeAction);
					break;
				}
				default: {
					throw new ss.ArgumentOutOfRangeException();
				}
			}
		},
		lockstepTick: function(lockstepTickNumber) {
			Pather.Servers.GameSegmentServer.ServerGame.prototype.lockstepTick.call(this, lockstepTickNumber);
			this.$lockstepTellActions(lockstepTickNumber);
			this.$lockstepNeighborActions(lockstepTickNumber);
		},
		$lockstepNeighborActions: function(lockstepTickNumber) {
			if (!ss.keyExists(this.$queuedNeighborActions, lockstepTickNumber)) {
				return;
			}
			var customLogicActionGameSegmentActions = this.$queuedNeighborActions[lockstepTickNumber];
			for (var $t1 = 0; $t1 < customLogicActionGameSegmentActions.length; $t1++) {
				var action = customLogicActionGameSegmentActions[$t1];
				switch (action.logicActionType) {
					case 0: {
						var cutTreeLogicNeighborAction = action;
						var treeX = cutTreeLogicNeighborAction.treeX;
						var treeY = cutTreeLogicNeighborAction.treeY;
						var logicUser = ss.cast(this.activeEntities.get_item(cutTreeLogicNeighborAction.entityId), $GameLogic_Server_LogicServerGameUser);
						var $t2 = GameLogic.Common.CutTree_CustomLogicAction_ClientAction.$ctor();
						$t2.treeX = treeX;
						$t2.treeY = treeY;
						logicUser.processAction($t2);
						break;
					}
					default: {
						throw new ss.ArgumentOutOfRangeException();
					}
				}
			}
		},
		$lockstepTellActions: function(lockstepTickNumber) {
			if (!ss.keyExists(this.$queuedTellActions, lockstepTickNumber)) {
				return;
			}
			var customLogicActionGameSegmentActions = this.$queuedTellActions[lockstepTickNumber];
			for (var $t1 = 0; $t1 < customLogicActionGameSegmentActions.length; $t1++) {
				var action = customLogicActionGameSegmentActions[$t1];
				switch (action.logicActionType) {
					case 0: {
						var cutTreeLogicNeighborAction = action;
						var treeX = cutTreeLogicNeighborAction.treeX;
						var treeY = cutTreeLogicNeighborAction.treeY;
						var logicUser = ss.cast(this.activeEntities.get_item(cutTreeLogicNeighborAction.entityId), $GameLogic_Server_LogicServerGameUser);
						var $t2 = GameLogic.Common.CutTree_CustomLogicAction_ClientAction.$ctor();
						$t2.treeX = treeX;
						$t2.treeY = treeY;
						logicUser.processAction($t2);
						break;
					}
					default: {
						throw new ss.ArgumentOutOfRangeException();
					}
				}
			}
		},
		initializeGameBoard: function(grid) {
			this.board = new GameLogic.Common.LogicGameBoard();
			this.board.init$1(grid);
		},
		createGameUser: function(userId) {
			return new $GameLogic_Server_LogicServerGameUser(this, userId);
		}
	}, Pather.Servers.GameSegmentServer.ServerGame);
	ss.initClass($GameLogic_Server_LogicServerGameUser, $asm, {
		processAction: function(action) {
			switch (action.clientActionType) {
				case 'move':
				case 'updateNeighbors':
				case 'moveEntityOnPath': {
					break;
				}
				case 'logicAction': {
					var logicAction = action;
					this.$processLogicAction(logicAction);
					break;
				}
				default: {
					throw new ss.ArgumentOutOfRangeException();
				}
			}
		},
		$processLogicAction: function(logicAction) {
			var logicGameBoard = ss.cast(this.game.board, GameLogic.Common.LogicGameBoard);
			switch (logicAction.logicActionType) {
				case 0: {
					var cutTreeAction = logicAction;
					var item = logicGameBoard.getAtXY(cutTreeAction.treeX, cutTreeAction.treeY);
					if (item.type === 'tree') {
						if (item.value <= 10) {
							logicGameBoard.changePoint(GameLogic.Common.LogicGridItem.$ctor('empty', -2147483648), cutTreeAction.treeX, cutTreeAction.treeY);
							console.log('Removed Tree At', cutTreeAction.treeX, cutTreeAction.treeY);
						}
						else {
							item.value -= 10;
							logicGameBoard.changePoint(item, cutTreeAction.treeX, cutTreeAction.treeY);
							console.log('Cut Tree At', cutTreeAction.treeX, cutTreeAction.treeY, item.value, 'Left');
						}
					}
					break;
				}
				default: {
					throw new ss.ArgumentOutOfRangeException();
				}
			}
		},
		cutTree: function(x, y, lockstepTick) {
			var item = ss.cast(this.game.board, GameLogic.Common.LogicGameBoard).logicGrid[x][y];
			var point = this.getPositionAtLockstep(lockstepTick);
			//todo project if tree is still there at lockstep:??????
			if (Pather.Common.Utils.Utilities.pointDistance(Pather.Common.Utils.Utilities.toSquare(point.x), Pather.Common.Utils.Utilities.toSquare(point.y), x, y) < 2) {
				if (item.type === 'tree') {
					var $t1 = GameLogic.Common.CutTree_CustomLogicAction_ClientAction.$ctor();
					$t1.treeX = x;
					$t1.treeY = y;
					this.addAction($t1, lockstepTick);
					return lockstepTick;
				}
			}
			return 0;
		}
	}, Pather.Servers.GameSegmentServer.ServerGameUser, [Pather.Servers.GameSegmentServer.IServerGameEntity]);
	$GameLogic_Server_$Program.$main();
})();
