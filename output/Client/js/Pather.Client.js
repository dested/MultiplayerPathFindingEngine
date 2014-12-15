(function() {
	'use strict';
	var $asm = {};
	global.Pather = global.Pather || {};
	global.Pather.Client = global.Pather.Client || {};
	global.Pather.Client.Utils = global.Pather.Client.Utils || {};
	ss.initAssembly($asm, 'Pather.Client');
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Client.Program
	var $Pather_Client_$Program = function() {
	};
	$Pather_Client_$Program.__typeName = 'Pather.Client.$Program';
	$Pather_Client_$Program.$main = function() {
		var client = io.connect('127.0.0.1:8998');
		client.emit('hello', ss.makeGenericType(Pather.Common.Utils.DataObject$1, [String]).$ctor('Fuck you'));
		client.on('hello.ack', function(data) {
			console.log(data.data);
		});
		var game = new $Pather_Client_Game();
		game.init();
	};
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Client.Constants
	var $Pather_Client_Constants = function() {
	};
	$Pather_Client_Constants.__typeName = 'Pather.Client.Constants';
	$Pather_Client_Constants.get_animationSteps = function() {
		return $Pather_Client_Constants.$1$AnimationStepsField;
	};
	$Pather_Client_Constants.set_animationSteps = function(value) {
		$Pather_Client_Constants.$1$AnimationStepsField = value;
	};
	$Pather_Client_Constants.get_gameFps = function() {
		return $Pather_Client_Constants.$1$GameFpsField;
	};
	$Pather_Client_Constants.set_gameFps = function(value) {
		$Pather_Client_Constants.$1$GameFpsField = value;
	};
	$Pather_Client_Constants.get_drawTicks = function() {
		return $Pather_Client_Constants.$1$DrawTicksField;
	};
	$Pather_Client_Constants.set_drawTicks = function(value) {
		$Pather_Client_Constants.$1$DrawTicksField = value;
	};
	$Pather_Client_Constants.get_drawFps = function() {
		return $Pather_Client_Constants.$1$DrawFpsField;
	};
	$Pather_Client_Constants.set_drawFps = function(value) {
		$Pather_Client_Constants.$1$DrawFpsField = value;
	};
	$Pather_Client_Constants.get_squareSize = function() {
		return $Pather_Client_Constants.$1$SquareSizeField;
	};
	$Pather_Client_Constants.set_squareSize = function(value) {
		$Pather_Client_Constants.$1$SquareSizeField = value;
	};
	$Pather_Client_Constants.get_numberOfSquares = function() {
		return $Pather_Client_Constants.$1$NumberOfSquaresField;
	};
	$Pather_Client_Constants.set_numberOfSquares = function(value) {
		$Pather_Client_Constants.$1$NumberOfSquaresField = value;
	};
	$Pather_Client_Constants.get_gameTicks = function() {
		return $Pather_Client_Constants.$1$GameTicksField;
	};
	$Pather_Client_Constants.set_gameTicks = function(value) {
		$Pather_Client_Constants.$1$GameTicksField = value;
	};
	$Pather_Client_Constants.lerp = function(start, end, duration) {
		return start + (end - start) * duration;
	};
	$Pather_Client_Constants.moveTowards = function(start, end, amount) {
		if (Math.abs(start - end) < amount) {
			return end;
		}
		if (start < end) {
			return start + amount;
		}
		if (start > end) {
			return start - amount;
		}
		return start;
	};
	global.Pather.Client.Constants = $Pather_Client_Constants;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Client.Game
	var $Pather_Client_Game = function() {
		this.$1$NextGameTickField = 0;
		this.$1$GridField = null;
		this.$1$PeopleField = null;
		this.$1$CurTickField = 0;
		this.$1$CanvasField = null;
		this.$1$ContextField = null;
		this.set_nextGameTick((new Date()).getTime());
		this.constructGrid();
		this.set_people([]);
		var sal = new $Pather_Client_Person(this);
		this.get_people().push(sal);
		this.set_curTick((new Date()).getTime());
		var $t1 = document.getElementById('canvas');
		this.set_canvas(ss.cast($t1, ss.isValue($t1) && (ss.isInstanceOfType($t1, Element) && $t1.tagName === 'CANVAS')));
		this.set_context(ss.cast(this.get_canvas().getContext('2d'), CanvasRenderingContext2D));
		this.get_canvas().onmousedown = ss.mkdel(this, function(ev) {
			var person = this.get_people()[0];
			var event = ev;
			person.rePathFind(ss.Int32.div(ss.unbox(ss.cast(event.offsetX, ss.Int32)), $Pather_Client_Constants.get_squareSize()), ss.Int32.div(ss.unbox(ss.cast(event.offsetY, ss.Int32)), $Pather_Client_Constants.get_squareSize()));
		});
	};
	$Pather_Client_Game.__typeName = 'Pather.Client.Game';
	global.Pather.Client.Game = $Pather_Client_Game;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Client.Person
	var $Pather_Client_Person = function(game) {
		this.$1$XField = 0;
		this.$1$YField = 0;
		this.$1$SquareXField = 0;
		this.$1$SquareYField = 0;
		this.$1$SpeedField = 0;
		this.$1$PathField = null;
		this.$1$RePathFindPositionField = null;
		this.$1$AnimationsField = null;
		this.$1$GameField = null;
		this.set_$game(game);
		this.set_x(0);
		this.set_y(0);
		this.set_squareX(0);
		this.set_squareY(0);
		this.set_speed(50);
		this.set_path([]);
		this.set_rePathFindPosition(null);
	};
	$Pather_Client_Person.__typeName = 'Pather.Client.Person';
	global.Pather.Client.Person = $Pather_Client_Person;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Client.Utils.AnimationPoint
	var $Pather_Client_Utils_AnimationPoint = function(fromX, fromY, x, y) {
		this.$2$FromXField = 0;
		this.$2$FromYField = 0;
		$Pather_Client_Utils_Point.call(this, x, y);
		this.set_fromX(fromX);
		this.set_fromY(fromY);
	};
	$Pather_Client_Utils_AnimationPoint.__typeName = 'Pather.Client.Utils.AnimationPoint';
	global.Pather.Client.Utils.AnimationPoint = $Pather_Client_Utils_AnimationPoint;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Client.Utils.Point
	var $Pather_Client_Utils_Point = function(x, y) {
		this.$1$XField = 0;
		this.$1$YField = 0;
		this.set_x(x);
		this.set_y(y);
	};
	$Pather_Client_Utils_Point.__typeName = 'Pather.Client.Utils.Point';
	global.Pather.Client.Utils.Point = $Pather_Client_Utils_Point;
	ss.initClass($Pather_Client_$Program, $asm, {});
	ss.initClass($Pather_Client_Constants, $asm, {});
	ss.initClass($Pather_Client_Game, $asm, {
		get_nextGameTick: function() {
			return this.$1$NextGameTickField;
		},
		set_nextGameTick: function(value) {
			this.$1$NextGameTickField = value;
		},
		get_grid: function() {
			return this.$1$GridField;
		},
		set_grid: function(value) {
			this.$1$GridField = value;
		},
		get_people: function() {
			return this.$1$PeopleField;
		},
		set_people: function(value) {
			this.$1$PeopleField = value;
		},
		get_curTick: function() {
			return this.$1$CurTickField;
		},
		set_curTick: function(value) {
			this.$1$CurTickField = value;
		},
		get_canvas: function() {
			return this.$1$CanvasField;
		},
		set_canvas: function(value) {
			this.$1$CanvasField = value;
		},
		get_context: function() {
			return this.$1$ContextField;
		},
		set_context: function(value) {
			this.$1$ContextField = value;
		},
		constructGrid: function() {
			this.set_grid(new Array($Pather_Client_Constants.get_numberOfSquares()));
			for (var x = 0; x < $Pather_Client_Constants.get_numberOfSquares(); x++) {
				this.get_grid()[x] = new Array($Pather_Client_Constants.get_numberOfSquares());
				for (var y = 0; y < $Pather_Client_Constants.get_numberOfSquares(); y++) {
					this.get_grid()[x][y] = ((Math.random() * 100 < 15) ? 0 : 1);
				}
			}
		},
		init: function() {
			var $t1 = this.get_people();
			for (var $t2 = 0; $t2 < $t1.length; $t2++) {
				var person = $t1[$t2];
				person.init(0, 0);
			}
			window.setTimeout(ss.mkdel(this, this.tick), $Pather_Client_Constants.get_gameTicks());
			window.requestAnimationFrame(ss.mkdel(this, function(a) {
				this.draw();
			}));
		},
		tick: function() {
			window.setTimeout(ss.mkdel(this, this.tick), $Pather_Client_Constants.get_gameTicks());
			var v = (new Date()).getTime();
			this.set_nextGameTick(this.get_nextGameTick() + (v - this.get_curTick()));
			this.set_curTick(v);
			var $t1 = this.get_people();
			for (var $t2 = 0; $t2 < $t1.length; $t2++) {
				var person = $t1[$t2];
				person.tick();
			}
		},
		draw: function() {
			window.requestAnimationFrame(ss.mkdel(this, function(a) {
				this.draw();
			}));
			this.get_context().save();
			this.get_context().fillStyle = 'black';
			this.get_context().fillRect(0, 0, 1200, 1200);
			this.get_context().restore();
			for (var y = 0; y < $Pather_Client_Constants.get_numberOfSquares(); y++) {
				for (var x = 0; x < $Pather_Client_Constants.get_numberOfSquares(); x++) {
					if (this.get_grid()[x][y] === 1) {
						this.get_context().save();
						this.get_context().lineWidth = 5;
						this.get_context().strokeStyle = 'white';
						//                        Context.StrokeRect(x * Constants.SquareSize, y * Constants.SquareSize, Constants.SquareSize, Constants.SquareSize);
						this.get_context().restore();
					}
				}
			}
			for (var y1 = 0; y1 < $Pather_Client_Constants.get_numberOfSquares(); y1++) {
				for (var x1 = 0; x1 < $Pather_Client_Constants.get_numberOfSquares(); x1++) {
					if (this.get_grid()[x1][y1] === 0) {
						this.get_context().save();
						this.get_context().lineWidth = 5;
						this.get_context().strokeStyle = 'blue';
						this.get_context().strokeRect(x1 * $Pather_Client_Constants.get_squareSize(), y1 * $Pather_Client_Constants.get_squareSize(), $Pather_Client_Constants.get_squareSize(), $Pather_Client_Constants.get_squareSize());
						this.get_context().restore();
					}
				}
			}
			var interpolatedTime = ((new Date()).getTime() - this.get_nextGameTick()) / $Pather_Client_Constants.get_gameTicks();
			var $t1 = this.get_people();
			for (var $t2 = 0; $t2 < $t1.length; $t2++) {
				var person = $t1[$t2];
				person.draw(this.get_context(), interpolatedTime);
			}
		}
	});
	ss.initClass($Pather_Client_Person, $asm, {
		get_x: function() {
			return this.$1$XField;
		},
		set_x: function(value) {
			this.$1$XField = value;
		},
		get_y: function() {
			return this.$1$YField;
		},
		set_y: function(value) {
			this.$1$YField = value;
		},
		get_squareX: function() {
			return this.$1$SquareXField;
		},
		set_squareX: function(value) {
			this.$1$SquareXField = value;
		},
		get_squareY: function() {
			return this.$1$SquareYField;
		},
		set_squareY: function(value) {
			this.$1$SquareYField = value;
		},
		get_speed: function() {
			return this.$1$SpeedField;
		},
		set_speed: function(value) {
			this.$1$SpeedField = value;
		},
		get_path: function() {
			return this.$1$PathField;
		},
		set_path: function(value) {
			this.$1$PathField = value;
		},
		get_rePathFindPosition: function() {
			return this.$1$RePathFindPositionField;
		},
		set_rePathFindPosition: function(value) {
			this.$1$RePathFindPositionField = value;
		},
		get_animations: function() {
			return this.$1$AnimationsField;
		},
		set_animations: function(value) {
			this.$1$AnimationsField = value;
		},
		get_$game: function() {
			return this.$1$GameField;
		},
		set_$game: function(value) {
			this.$1$GameField = value;
		},
		init: function(squareX, squareY) {
			this.set_squareX(squareX);
			this.set_squareY(squareY);
			this.set_x(this.get_squareX() * $Pather_Client_Constants.get_squareSize());
			this.set_y(this.get_squareY() * $Pather_Client_Constants.get_squareSize());
			this.set_animations([]);
		},
		rePathFind: function(SquareX, SquareY) {
			this.set_rePathFindPosition(new $Pather_Client_Utils_Point(SquareX, SquareY));
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
				var animationIndex = ss.Int32.trunc(interpolatedTime * $Pather_Client_Constants.get_animationSteps());
				var animation = this.get_animations()[animationIndex];
				if (ss.isValue(animation)) {
					var interpolateStep = interpolatedTime % (1 / $Pather_Client_Constants.get_animationSteps()) * $Pather_Client_Constants.get_animationSteps();
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
			context.fillRect(_x - ss.Int32.div($Pather_Client_Constants.get_squareSize(), 2), _y - ss.Int32.div($Pather_Client_Constants.get_squareSize(), 2), $Pather_Client_Constants.get_squareSize(), $Pather_Client_Constants.get_squareSize());
			context.strokeRect(_x - ss.Int32.div($Pather_Client_Constants.get_squareSize(), 2), _y - ss.Int32.div($Pather_Client_Constants.get_squareSize(), 2), $Pather_Client_Constants.get_squareSize(), $Pather_Client_Constants.get_squareSize());
			context.restore();
		},
		tick: function() {
			//            console.log('ticked');
			if (ss.isValue(this.get_rePathFindPosition())) {
				var graph = new Graph(this.get_$game().get_grid());
				var start = graph.grid[this.get_squareX()][this.get_squareY()];
				var end = graph.grid[ss.Int32.trunc(this.get_rePathFindPosition().get_x())][ss.Int32.trunc(this.get_rePathFindPosition().get_y())];
				this.set_path(ss.arrayClone(astar.search(graph, start, end)));
				this.set_rePathFindPosition(null);
			}
			var result = this.get_path()[0];
			this.set_animations([]);
			var projectedX;
			var projectedY;
			var projectedSquareX;
			var projectedSquareY;
			projectedSquareX = (ss.isNullOrUndefined(result) ? this.get_squareX() : result.x);
			projectedSquareY = (ss.isNullOrUndefined(result) ? this.get_squareY() : result.y);
			for (var i = 0; i < $Pather_Client_Constants.get_animationSteps(); i++) {
				this.set_squareX(ss.Int32.trunc(this.get_x() / $Pather_Client_Constants.get_squareSize()));
				this.set_squareY(ss.Int32.trunc(this.get_y() / $Pather_Client_Constants.get_squareSize()));
				var fromX = this.get_x();
				var fromY = this.get_y();
				if (ss.isValue(result) && (this.get_squareX() === result.x && this.get_squareY() === result.y)) {
					ss.removeAt(this.get_path(), 0);
					result = this.get_path()[0];
					projectedSquareX = (ss.isNullOrUndefined(result) ? this.get_squareX() : result.x);
					projectedSquareY = (ss.isNullOrUndefined(result) ? this.get_squareY() : result.y);
				}
				projectedX = projectedSquareX * $Pather_Client_Constants.get_squareSize() + ss.Int32.div($Pather_Client_Constants.get_squareSize(), 2);
				projectedY = projectedSquareY * $Pather_Client_Constants.get_squareSize() + ss.Int32.div($Pather_Client_Constants.get_squareSize(), 2);
				if (projectedX === ss.Int32.trunc(this.get_x()) && projectedY === ss.Int32.trunc(this.get_y())) {
					return;
				}
				this.set_x($Pather_Client_Constants.moveTowards(this.get_x(), projectedX, this.get_speed() / $Pather_Client_Constants.get_animationSteps()));
				this.set_y($Pather_Client_Constants.moveTowards(this.get_y(), projectedY, this.get_speed() / $Pather_Client_Constants.get_animationSteps()));
				this.get_animations().push(new $Pather_Client_Utils_AnimationPoint(fromX, fromY, this.get_x(), this.get_y()));
			}
		}
	});
	ss.initClass($Pather_Client_Utils_Point, $asm, {
		get_x: function() {
			return this.$1$XField;
		},
		set_x: function(value) {
			this.$1$XField = value;
		},
		get_y: function() {
			return this.$1$YField;
		},
		set_y: function(value) {
			this.$1$YField = value;
		}
	});
	ss.initClass($Pather_Client_Utils_AnimationPoint, $asm, {
		get_fromX: function() {
			return this.$2$FromXField;
		},
		set_fromX: function(value) {
			this.$2$FromXField = value;
		},
		get_fromY: function() {
			return this.$2$FromYField;
		},
		set_fromY: function(value) {
			this.$2$FromYField = value;
		}
	}, $Pather_Client_Utils_Point);
	(function() {
		$Pather_Client_Constants.$1$AnimationStepsField = 0;
		$Pather_Client_Constants.$1$GameFpsField = 0;
		$Pather_Client_Constants.$1$DrawTicksField = 0;
		$Pather_Client_Constants.$1$DrawFpsField = 0;
		$Pather_Client_Constants.$1$SquareSizeField = 0;
		$Pather_Client_Constants.$1$NumberOfSquaresField = 0;
		$Pather_Client_Constants.$1$GameTicksField = 0;
		$Pather_Client_Constants.set_squareSize(16);
		$Pather_Client_Constants.set_numberOfSquares(80);
		$Pather_Client_Constants.set_drawFps(60);
		$Pather_Client_Constants.set_drawTicks(ss.Int32.div(1000, $Pather_Client_Constants.get_drawFps()));
		$Pather_Client_Constants.set_gameFps(10);
		$Pather_Client_Constants.set_gameTicks(ss.Int32.div(1000, $Pather_Client_Constants.get_gameFps()));
		$Pather_Client_Constants.set_animationSteps(5);
	})();
	$Pather_Client_$Program.$main();
})();
