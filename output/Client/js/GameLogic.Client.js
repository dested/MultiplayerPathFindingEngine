(function() {
	'use strict';
	var $asm = {};
	global.GameLogic = global.GameLogic || {};
	global.GameLogic.Client = global.GameLogic.Client || {};
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
	var $GameLogic_Client_LogicClientGame = function(frontEndTickManager) {
		Pather.Client.GameFramework.ClientGame.call(this, frontEndTickManager);
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
	ss.initClass($GameLogic_Client_$Program, $asm, {});
	ss.initClass($GameLogic_Client_ClientInstantiateLogic, $asm, {
		createClientGameManager: function() {
			return new $GameLogic_Client_LogicClientGameManager(this);
		},
		createClientGame: function(frontEndTickManager) {
			return new $GameLogic_Client_LogicClientGame(frontEndTickManager);
		}
	}, null, [Pather.Client.Utils.IClientInstantiateLogic]);
	ss.initInterface($GameLogic_Client_IClientGameEntity, $asm, { draw: null });
	ss.initClass($GameLogic_Client_LogicClientGame, $asm, {
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
			context.fillStyle = 'black';
			context.fillRect(0, 0, Pather.Common.Constants.numberOfSquares * Pather.Common.Constants.squareSize, Pather.Common.Constants.numberOfSquares * Pather.Common.Constants.squareSize);
			context.fillStyle = 'blue';
			for (var y = 0; y < Pather.Common.Constants.numberOfSquares; y++) {
				for (var x = 0; x < Pather.Common.Constants.numberOfSquares; x++) {
					if (this.clientGame.board.grid[x][y] === 0) {
						context.fillRect(x * Pather.Common.Constants.squareSize, y * Pather.Common.Constants.squareSize, Pather.Common.Constants.squareSize, Pather.Common.Constants.squareSize);
					}
				}
			}
			context.restore();
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
					this.clientGameManager.moveToLocation(ss.unbox(ss.cast(event.offsetX, Number)), ss.unbox(ss.cast(event.offsetY, Number)));
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
	$GameLogic_Client_$Program.$main();
})();
