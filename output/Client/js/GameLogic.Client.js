(function() {
	'use strict';
	var $asm = {};
	global.GameLogic = global.GameLogic || {};
	global.GameLogic.Client = global.GameLogic.Client || {};
	global.GameLogic.Client.Tests = global.GameLogic.Client.Tests || {};
	ss.initAssembly($asm, 'GameLogic.Client');
	////////////////////////////////////////////////////////////////////////////////
	// GameLogic.Client.Program
	var $GameLogic_Client_$Program = function() {
	};
	$GameLogic_Client_$Program.__typeName = 'GameLogic.Client.$Program';
	$GameLogic_Client_$Program.$main = function() {
		if (!!(window.window.RunTests || window.location.hash === '#test')) {
			Pather.Common.TestFramework.TestFramework.runTests(null);
			return;
		}
		var gameClient = new $GameLogic_Client_LogicClientGameView(new $GameLogic_Client_ClientInstantiateLogic());
		console.log('Hello client!');
	};
	////////////////////////////////////////////////////////////////////////////////
	// GameLogic.Client.ClientInstantiateLogic
	var $GameLogic_Client_ClientInstantiateLogic = function() {
	};
	$GameLogic_Client_ClientInstantiateLogic.__typeName = 'GameLogic.Client.ClientInstantiateLogic';
	global.GameLogic.Client.ClientInstantiateLogic = $GameLogic_Client_ClientInstantiateLogic;
	////////////////////////////////////////////////////////////////////////////////
	// GameLogic.Client.IClientGameEntity
	var $GameLogic_Client_IClientGameEntity = function() {
	};
	$GameLogic_Client_IClientGameEntity.__typeName = 'GameLogic.Client.IClientGameEntity';
	global.GameLogic.Client.IClientGameEntity = $GameLogic_Client_IClientGameEntity;
	////////////////////////////////////////////////////////////////////////////////
	// GameLogic.Client.LogicClientGame
	var $GameLogic_Client_LogicClientGame = function(frontEndTickManager, networkManager) {
		Pather.Client.GameFramework.ClientGame.call(this, frontEndTickManager, networkManager);
	};
	$GameLogic_Client_LogicClientGame.__typeName = 'GameLogic.Client.LogicClientGame';
	global.GameLogic.Client.LogicClientGame = $GameLogic_Client_LogicClientGame;
	////////////////////////////////////////////////////////////////////////////////
	// GameLogic.Client.LogicClientGameManager
	var $GameLogic_Client_LogicClientGameManager = function(clientInstantiateLogic) {
		Pather.Client.GameFramework.ClientGameManager.call(this, clientInstantiateLogic);
	};
	$GameLogic_Client_LogicClientGameManager.__typeName = 'GameLogic.Client.LogicClientGameManager';
	global.GameLogic.Client.LogicClientGameManager = $GameLogic_Client_LogicClientGameManager;
	////////////////////////////////////////////////////////////////////////////////
	// GameLogic.Client.LogicClientGameUser
	var $GameLogic_Client_LogicClientGameUser = function(clientGame, userId) {
		this.animations = null;
		Pather.Client.GameFramework.ClientGameUser.call(this, clientGame, userId);
		this.animations = [];
	};
	$GameLogic_Client_LogicClientGameUser.__typeName = 'GameLogic.Client.LogicClientGameUser';
	global.GameLogic.Client.LogicClientGameUser = $GameLogic_Client_LogicClientGameUser;
	////////////////////////////////////////////////////////////////////////////////
	// GameLogic.Client.LogicClientGameView
	var $GameLogic_Client_LogicClientGameView = function(clientInstantiateLogic) {
		this.$contextCollection = {};
		Pather.Client.ClientGameView.call(this, clientInstantiateLogic);
	};
	$GameLogic_Client_LogicClientGameView.__typeName = 'GameLogic.Client.LogicClientGameView';
	global.GameLogic.Client.LogicClientGameView = $GameLogic_Client_LogicClientGameView;
	////////////////////////////////////////////////////////////////////////////////
	// GameLogic.Client.Tests.E2ETest
	var $GameLogic_Client_Tests_E2ETest = function() {
	};
	$GameLogic_Client_Tests_E2ETest.__typeName = 'GameLogic.Client.Tests.E2ETest';
	$GameLogic_Client_Tests_E2ETest.$createUser = function(i) {
		setTimeout(function() {
			var receivedCount = 0;
			var gameClient = new $GameLogic_Client_LogicClientGameView(new $GameLogic_Client_ClientInstantiateLogic());
			gameClient.clientGameManager.onReady = ss.delegateCombine(gameClient.clientGameManager.onReady, function() {
				var cl = 0;
				cl = setInterval(function() {
					if (++receivedCount < 200) {
						while (true) {
							console.log('Moving User ', i, ' again ' + receivedCount);
							var logicClientGameManager = ss.cast(gameClient.clientGameManager, $GameLogic_Client_LogicClientGameManager);
							var x = logicClientGameManager.clientGame.myUser.x + (Math.random() * 20 - 10) * Pather.Common.Constants.squareSize;
							var y = logicClientGameManager.clientGame.myUser.y + (Math.random() * 20 - 10) * Pather.Common.Constants.squareSize;
							if (logicClientGameManager.clickLocation(x, y)) {
								break;
							}
						}
					}
					else {
						clearTimeout(cl);
						console.log('Done ' + receivedCount);
					}
				}, 1000 + ss.Int32.trunc(Math.random() * 5000));
			});
		}, ss.Int32.trunc(Math.random() * 15000));
	};
	global.GameLogic.Client.Tests.E2ETest = $GameLogic_Client_Tests_E2ETest;
	ss.initClass($GameLogic_Client_$Program, $asm, {});
	ss.initClass($GameLogic_Client_ClientInstantiateLogic, $asm, {
		createClientGameManager: function() {
			return new $GameLogic_Client_LogicClientGameManager(this);
		},
		createClientGame: function(frontEndTickManager, networkManager) {
			return new $GameLogic_Client_LogicClientGame(frontEndTickManager, networkManager);
		}
	}, null, [Pather.Client.Utils.IClientInstantiateLogic]);
	ss.initInterface($GameLogic_Client_IClientGameEntity, $asm, { draw: null });
	ss.initClass($GameLogic_Client_LogicClientGame, $asm, {
		initializeGameBoard: function(grid) {
			this.board = new GameLogic.Common.LogicGameBoard();
			this.board.init$1(grid);
		},
		createGameUser: function(userId) {
			return new $GameLogic_Client_LogicClientGameUser(this, userId);
		},
		drawEntities: function(context, interpolatedTime) {
			for (var $t1 = 0; $t1 < this.activeEntities.list.length; $t1++) {
				var entity = this.activeEntities.list[$t1];
				context.save();
				entity.draw(context, interpolatedTime);
				context.restore();
			}
		},
		clickLocation: function(x, y) {
			var clickSquareX = Pather.Common.Utils.Utilities.toSquare(x);
			var clickSquareY = Pather.Common.Utils.Utilities.toSquare(y);
			var squareX = Pather.Common.Utils.Utilities.toSquare(this.myUser.x);
			var squareY = Pather.Common.Utils.Utilities.toSquare(this.myUser.y);
			var distance = Pather.Common.Utils.Utilities.pointDistance(clickSquareX, clickSquareY, squareX, squareY);
			var item = ss.cast(this.board, GameLogic.Common.LogicGameBoard).getAtXY(clickSquareX, clickSquareY);
			switch (item.type) {
				case 'tree': {
					if (distance < 2) {
						var $t2 = this.networkManager;
						var $t1 = GameLogic.Common.CutTree_CustomLogicAction_GameSegmentAction.$ctor();
						$t1.treeX = Pather.Common.Utils.Utilities.toSquare(x);
						$t1.treeY = Pather.Common.Utils.Utilities.toSquare(y);
						$t1.lockstepTick = this.tickManager.lockstepTickNumber + 1;
						$t2.sendClientAction($t1);
						return true;
					}
					break;
				}
				case 'wall': {
					break;
				}
				case 'empty': {
					if (distance < 20) {
						var $t4 = this.networkManager;
						var $t3 = Pather.Common.Models.Common.Actions.GameSegmentAction.MoveEntity_GameSegmentAction.$ctor();
						$t3.x = x;
						$t3.y = y;
						$t3.lockstepTick = this.tickManager.lockstepTickNumber + 1;
						$t4.sendClientAction($t3);
					}
					return true;
					break;
				}
				default: {
					throw new ss.ArgumentOutOfRangeException();
				}
			}
			return false;
		},
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
						}
						else {
							item.value -= 10;
							logicGameBoard.changePoint(item, cutTreeAction.treeX, cutTreeAction.treeY);
						}
					}
					break;
				}
				default: {
					throw new ss.ArgumentOutOfRangeException();
				}
			}
		}
	}, Pather.Client.GameFramework.ClientGame);
	ss.initClass($GameLogic_Client_LogicClientGameManager, $asm, {
		draw: function(contextCollection, interpolatedTime) {
			contextCollection['Foreground'].clearRect(0, 0, Pather.Common.Constants.numberOfSquares * Pather.Common.Constants.squareSize, Pather.Common.Constants.numberOfSquares * Pather.Common.Constants.squareSize);
			this.$drawBackground(contextCollection['Background']);
			ss.cast(this.clientGame, $GameLogic_Client_LogicClientGame).drawEntities(contextCollection['Foreground'], interpolatedTime);
		},
		$drawBackground: function(context) {
			context.clearRect(0, 0, Pather.Common.Constants.numberOfSquares * Pather.Common.Constants.squareSize, Pather.Common.Constants.numberOfSquares * Pather.Common.Constants.squareSize);
			context.save();
			context.fillStyle = '#83EFEF';
			context.fillRect(0, 0, Pather.Common.Constants.numberOfSquares * Pather.Common.Constants.squareSize, Pather.Common.Constants.numberOfSquares * Pather.Common.Constants.squareSize);
			for (var y = 0; y < Pather.Common.Constants.numberOfSquares; y++) {
				for (var x = 0; x < Pather.Common.Constants.numberOfSquares; x++) {
					var item = ss.cast(this.clientGame.board, GameLogic.Common.LogicGameBoard).logicGrid[x][y];
					switch (item.type) {
						case 'tree': {
							context.fillStyle = this.blendColors('#45AD7B', '#83EFEF', 1 - item.value / 100);
							context.fillRect(x * Pather.Common.Constants.squareSize, y * Pather.Common.Constants.squareSize, Pather.Common.Constants.squareSize, Pather.Common.Constants.squareSize);
							break;
						}
						case 'wall': {
							context.fillStyle = '#D3D3D3';
							context.fillRect(x * Pather.Common.Constants.squareSize, y * Pather.Common.Constants.squareSize, Pather.Common.Constants.squareSize, Pather.Common.Constants.squareSize);
							break;
						}
						case 'empty': {
							break;
						}
						default: {
							throw new ss.ArgumentOutOfRangeException();
						}
					}
				}
			}
			context.restore();
		},
		clickLocation: function(x, y) {
			return ss.cast(this.clientGame, $GameLogic_Client_LogicClientGame).clickLocation(x, y);
		},
		blendColors: function(c0, c1, p) {
			var f = parseInt(c0.substr(1), 16);
			var t = parseInt(c1.substr(1), 16);
			var R1 = f >> 16;
			var G1 = f >> 8 & 255;
			var B1 = f & 255;
			var R2 = t >> 16;
			var G2 = t >> 8 & 255;
			var B2 = t & 255;
			var d = 16777216 + (ss.Int32.trunc(Math.round((R2 - R1) * p)) + R1) * 65536 + (ss.Int32.trunc(Math.round((G2 - G1) * p)) + G1) * 256 + (ss.Int32.trunc(Math.round((B2 - B1) * p)) + B1);
			return '#' + d.toString(16).substr(1);
		}
	}, Pather.Client.GameFramework.ClientGameManager);
	ss.initClass($GameLogic_Client_LogicClientGameUser, $asm, {
		tick: function() {
			Pather.Common.GameFramework.GameUser.prototype.tick.call(this);
			ss.clear(this.animations);
			var nextPathPoint = this.path[0];
			if (ss.isNullOrUndefined(nextPathPoint)) {
				return;
			}
			//            Global.Console.Log(EntityId, X, Y, game.tickManager.LockstepTickNumber);
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
			context.lineWidth = 5;
			if (this.controlled) {
				context.strokeStyle = 'green';
			}
			else {
				context.strokeStyle = 'yellow';
			}
			context.fillStyle = 'red';
			context.fillRect(_x - ss.Int32.div(Pather.Common.Constants.squareSize, 2), _y - ss.Int32.div(Pather.Common.Constants.squareSize, 2), Pather.Common.Constants.squareSize, Pather.Common.Constants.squareSize);
			context.strokeRect(_x - ss.Int32.div(Pather.Common.Constants.squareSize, 2), _y - ss.Int32.div(Pather.Common.Constants.squareSize, 2), Pather.Common.Constants.squareSize, Pather.Common.Constants.squareSize);
			context.restore();
		}
	}, Pather.Client.GameFramework.ClientGameUser, [$GameLogic_Client_IClientGameEntity]);
	ss.initClass($GameLogic_Client_LogicClientGameView, $asm, {
		readyToPlay: function() {
			if (!Pather.Common.Constants.get_noDraw()) {
				var $t1 = document.getElementById('backCanvas');
				var backCanvas = ss.cast($t1, ss.isValue($t1) && (ss.isInstanceOfType($t1, Element) && $t1.tagName === 'CANVAS'));
				backCanvas.width = Pather.Common.Constants.numberOfSquares * Pather.Common.Constants.squareSize;
				backCanvas.height = Pather.Common.Constants.numberOfSquares * Pather.Common.Constants.squareSize;
				var backContext = ss.cast(backCanvas.getContext('2d'), CanvasRenderingContext2D);
				var $t2 = document.getElementById('canvas');
				var canvas = ss.cast($t2, ss.isValue($t2) && (ss.isInstanceOfType($t2, Element) && $t2.tagName === 'CANVAS'));
				canvas.width = Pather.Common.Constants.numberOfSquares * Pather.Common.Constants.squareSize;
				canvas.height = Pather.Common.Constants.numberOfSquares * Pather.Common.Constants.squareSize;
				var context = ss.cast(canvas.getContext('2d'), CanvasRenderingContext2D);
				this.$contextCollection['Background'] = backContext;
				this.$contextCollection['Foreground'] = context;
				canvas.onmousedown = ss.mkdel(this, function(ev) {
					var event = ev;
					ss.cast(this.clientGameManager, $GameLogic_Client_LogicClientGameManager).clickLocation(ss.unbox(ss.cast(event.offsetX, Number)), ss.unbox(ss.cast(event.offsetY, Number)));
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
			ss.cast(this.clientGameManager, $GameLogic_Client_LogicClientGameManager).draw(this.$contextCollection, interpolatedTime);
		}
	}, Pather.Client.ClientGameView);
	ss.initClass($GameLogic_Client_Tests_E2ETest, $asm, {
		connect4: function(deferred) {
			window.window.NoDraw = true;
			var clients = [];
			var $t1 = [];
			$t1.push(Pather.Common.Utils.Point.$ctor(600, 600));
			$t1.push(Pather.Common.Utils.Point.$ctor(100, 100));
			$t1.push(Pather.Common.Utils.Point.$ctor(650, 650));
			$t1.push(Pather.Common.Utils.Point.$ctor(50, 50));
			var points = $t1;
			for (var i = 0; i < 4; i++) {
				var gameClient = { $: new $GameLogic_Client_LogicClientGameView(new $GameLogic_Client_ClientInstantiateLogic()) };
				var point = { $: points[i] };
				gameClient.$.clientGameManager.onReady = ss.delegateCombine(gameClient.$.clientGameManager.onReady, ss.mkdel({ gameClient: gameClient, point: point }, function() {
					setTimeout(ss.mkdel({ gameClient: this.gameClient, point: this.point }, function() {
						ss.cast(this.gameClient.$.clientGameManager, $GameLogic_Client_LogicClientGameManager).clickLocation(this.point.$.x, this.point.$.y);
					}), 1000);
					setInterval(ss.mkdel({ gameClient: this.gameClient, point: this.point }, function() {
						ss.cast(this.gameClient.$.clientGameManager, $GameLogic_Client_LogicClientGameManager).clickLocation(this.point.$.x, this.point.$.y);
					}), 10000);
				}));
				clients.push(gameClient.$);
			}
		},
		connect5: function(deferred) {
			window.window.NoDraw = true;
			var clients = [];
			var $t1 = [];
			$t1.push(Pather.Common.Utils.Point.$ctor(600, 600));
			$t1.push(Pather.Common.Utils.Point.$ctor(25, 25));
			$t1.push(Pather.Common.Utils.Point.$ctor(650, 650));
			$t1.push(Pather.Common.Utils.Point.$ctor(200, 200));
			$t1.push(Pather.Common.Utils.Point.$ctor(50, 50));
			var points = $t1;
			for (var i = 0; i < 5; i++) {
				var gameClient = { $: new $GameLogic_Client_LogicClientGameView(new $GameLogic_Client_ClientInstantiateLogic()) };
				var point = { $: points[i] };
				gameClient.$.clientGameManager.onReady = ss.delegateCombine(gameClient.$.clientGameManager.onReady, ss.mkdel({ gameClient: gameClient, point: point }, function() {
					setTimeout(ss.mkdel({ gameClient: this.gameClient, point: this.point }, function() {
						ss.cast(this.gameClient.$.clientGameManager, $GameLogic_Client_LogicClientGameManager).clickLocation(this.point.$.x, this.point.$.y);
					}), 1000 + ss.Int32.trunc(Math.random() * 500));
					setInterval(ss.mkdel({ gameClient: this.gameClient, point: this.point }, function() {
						ss.cast(this.gameClient.$.clientGameManager, $GameLogic_Client_LogicClientGameManager).clickLocation(this.point.$.x, this.point.$.y);
					}), 10000);
				}));
				clients.push(gameClient.$);
			}
		},
		slam: function(deferred) {
			window.window.NoDraw = true;
			var totalHits = 35;
			for (var i = 0; i < totalHits; i++) {
				$GameLogic_Client_Tests_E2ETest.$createUser(i);
			}
		}
	});
	ss.setMetadata($GameLogic_Client_Tests_E2ETest, { attr: [new Pather.Common.TestFramework.TestClassAttribute(false)], members: [{ attr: [new Pather.Common.TestFramework.TestMethodAttribute(true)], name: 'Connect4', type: 8, sname: 'connect4', returnType: Object, params: [Pather.Common.Utils.Promises.Deferred] }, { attr: [new Pather.Common.TestFramework.TestMethodAttribute(true)], name: 'Connect5', type: 8, sname: 'connect5', returnType: Object, params: [Pather.Common.Utils.Promises.Deferred] }, { attr: [new Pather.Common.TestFramework.TestMethodAttribute(false)], name: 'Slam', type: 8, sname: 'slam', returnType: Object, params: [Pather.Common.Utils.Promises.Deferred] }] });
	$GameLogic_Client_$Program.$main();
})();
