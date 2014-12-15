(function() {
	'use strict';
	var $asm = {};
	global.Pather = global.Pather || {};
	global.Pather.Client = global.Pather.Client || {};
	global.Pather.Client.Utils = global.Pather.Client.Utils || {};
	global.Pather.Common = global.Pather.Common || {};
	global.Pather.Common.Utils = global.Pather.Common.Utils || {};
	ss.initAssembly($asm, 'Pather.Common');
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
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Constants
	var $Pather_Common_Constants = function() {
	};
	$Pather_Common_Constants.__typeName = 'Pather.Common.Constants';
	$Pather_Common_Constants.get_animationSteps = function() {
		return $Pather_Common_Constants.$1$AnimationStepsField;
	};
	$Pather_Common_Constants.set_animationSteps = function(value) {
		$Pather_Common_Constants.$1$AnimationStepsField = value;
	};
	$Pather_Common_Constants.get_gameFps = function() {
		return $Pather_Common_Constants.$1$GameFpsField;
	};
	$Pather_Common_Constants.set_gameFps = function(value) {
		$Pather_Common_Constants.$1$GameFpsField = value;
	};
	$Pather_Common_Constants.get_drawTicks = function() {
		return $Pather_Common_Constants.$1$DrawTicksField;
	};
	$Pather_Common_Constants.set_drawTicks = function(value) {
		$Pather_Common_Constants.$1$DrawTicksField = value;
	};
	$Pather_Common_Constants.get_drawFps = function() {
		return $Pather_Common_Constants.$1$DrawFpsField;
	};
	$Pather_Common_Constants.set_drawFps = function(value) {
		$Pather_Common_Constants.$1$DrawFpsField = value;
	};
	$Pather_Common_Constants.get_squareSize = function() {
		return $Pather_Common_Constants.$1$SquareSizeField;
	};
	$Pather_Common_Constants.set_squareSize = function(value) {
		$Pather_Common_Constants.$1$SquareSizeField = value;
	};
	$Pather_Common_Constants.get_numberOfSquares = function() {
		return $Pather_Common_Constants.$1$NumberOfSquaresField;
	};
	$Pather_Common_Constants.set_numberOfSquares = function(value) {
		$Pather_Common_Constants.$1$NumberOfSquaresField = value;
	};
	$Pather_Common_Constants.get_gameTicks = function() {
		return $Pather_Common_Constants.$1$GameTicksField;
	};
	$Pather_Common_Constants.set_gameTicks = function(value) {
		$Pather_Common_Constants.$1$GameTicksField = value;
	};
	$Pather_Common_Constants.lerp = function(start, end, duration) {
		return start + (end - start) * duration;
	};
	$Pather_Common_Constants.moveTowards = function(start, end, amount) {
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
	global.Pather.Common.Constants = $Pather_Common_Constants;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Game
	var $Pather_Common_Game = function() {
		this.$1$NextGameTickField = 0;
		this.$1$GridField = null;
		this.$1$PeopleField = null;
		this.$1$CurTickField = 0;
		this.set_nextGameTick((new Date()).getTime());
		this.constructGrid();
		this.set_people([]);
		var sal = this.createPerson();
		this.get_people().push(sal);
		this.set_curTick((new Date()).getTime());
	};
	$Pather_Common_Game.__typeName = 'Pather.Common.Game';
	global.Pather.Common.Game = $Pather_Common_Game;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Person
	var $Pather_Common_Person = function(game) {
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
		this.set_speed(40);
		this.set_path([]);
		this.set_rePathFindPosition(null);
	};
	$Pather_Common_Person.__typeName = 'Pather.Common.Person';
	global.Pather.Common.Person = $Pather_Common_Person;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Common.Utils.DataObject
	var $Pather_Common_Utils_DataObject$1 = function(T) {
		var $type = function() {
		};
		$type.$ctor = function(data) {
			var $this = {};
			$this.data = ss.getDefaultValue(T);
			$this.data = data;
			return $this;
		};
		ss.registerGenericClassInstance($type, $Pather_Common_Utils_DataObject$1, [T], {}, function() {
			return null;
		}, function() {
			return [];
		});
		return $type;
	};
	$Pather_Common_Utils_DataObject$1.__typeName = 'Pather.Common.Utils.DataObject$1';
	ss.initGenericClass($Pather_Common_Utils_DataObject$1, $asm, 1);
	global.Pather.Common.Utils.DataObject$1 = $Pather_Common_Utils_DataObject$1;
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
	ss.initClass($Pather_Common_Constants, $asm, {});
	ss.initClass($Pather_Common_Game, $asm, {
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
		createPerson: function() {
			return new $Pather_Common_Person(this);
		},
		constructGrid: function() {
			this.set_grid(new Array($Pather_Common_Constants.get_numberOfSquares()));
			for (var x = 0; x < $Pather_Common_Constants.get_numberOfSquares(); x++) {
				this.get_grid()[x] = new Array($Pather_Common_Constants.get_numberOfSquares());
				for (var y = 0; y < $Pather_Common_Constants.get_numberOfSquares(); y++) {
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
			setTimeout(ss.mkdel(this, this.tick), $Pather_Common_Constants.get_gameTicks());
		},
		tick: function() {
			setTimeout(ss.mkdel(this, this.tick), $Pather_Common_Constants.get_gameTicks());
			var v = (new Date()).getTime();
			this.set_nextGameTick(this.get_nextGameTick() + (v - this.get_curTick()));
			this.set_curTick(v);
			var $t1 = this.get_people();
			for (var $t2 = 0; $t2 < $t1.length; $t2++) {
				var person = $t1[$t2];
				person.tick();
			}
		}
	});
	ss.initClass($Pather_Common_Person, $asm, {
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
			this.set_x(this.get_squareX() * $Pather_Common_Constants.get_squareSize());
			this.set_y(this.get_squareY() * $Pather_Common_Constants.get_squareSize());
			this.set_animations([]);
		},
		rePathFind: function(SquareX, SquareY) {
			this.set_rePathFindPosition(new $Pather_Client_Utils_Point(SquareX, SquareY));
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
			for (var i = 0; i < $Pather_Common_Constants.get_animationSteps(); i++) {
				this.set_squareX(ss.Int32.trunc(this.get_x() / $Pather_Common_Constants.get_squareSize()));
				this.set_squareY(ss.Int32.trunc(this.get_y() / $Pather_Common_Constants.get_squareSize()));
				var fromX = this.get_x();
				var fromY = this.get_y();
				if (ss.isValue(result) && (this.get_squareX() === result.x && this.get_squareY() === result.y)) {
					ss.removeAt(this.get_path(), 0);
					result = this.get_path()[0];
					projectedSquareX = (ss.isNullOrUndefined(result) ? this.get_squareX() : result.x);
					projectedSquareY = (ss.isNullOrUndefined(result) ? this.get_squareY() : result.y);
				}
				projectedX = projectedSquareX * $Pather_Common_Constants.get_squareSize() + ss.Int32.div($Pather_Common_Constants.get_squareSize(), 2);
				projectedY = projectedSquareY * $Pather_Common_Constants.get_squareSize() + ss.Int32.div($Pather_Common_Constants.get_squareSize(), 2);
				if (projectedX === ss.Int32.trunc(this.get_x()) && projectedY === ss.Int32.trunc(this.get_y())) {
					return;
				}
				this.set_x($Pather_Common_Constants.moveTowards(this.get_x(), projectedX, this.get_speed() / $Pather_Common_Constants.get_animationSteps()));
				this.set_y($Pather_Common_Constants.moveTowards(this.get_y(), projectedY, this.get_speed() / $Pather_Common_Constants.get_animationSteps()));
				this.get_animations().push(new $Pather_Client_Utils_AnimationPoint(fromX, fromY, this.get_x(), this.get_y()));
			}
		}
	});
	(function() {
		$Pather_Common_Constants.$1$AnimationStepsField = 0;
		$Pather_Common_Constants.$1$GameFpsField = 0;
		$Pather_Common_Constants.$1$DrawTicksField = 0;
		$Pather_Common_Constants.$1$DrawFpsField = 0;
		$Pather_Common_Constants.$1$SquareSizeField = 0;
		$Pather_Common_Constants.$1$NumberOfSquaresField = 0;
		$Pather_Common_Constants.$1$GameTicksField = 0;
		$Pather_Common_Constants.set_squareSize(16);
		$Pather_Common_Constants.set_numberOfSquares(80);
		$Pather_Common_Constants.set_drawFps(60);
		$Pather_Common_Constants.set_drawTicks(ss.Int32.div(1000, $Pather_Common_Constants.get_drawFps()));
		$Pather_Common_Constants.set_gameFps(10);
		$Pather_Common_Constants.set_gameTicks(ss.Int32.div(1000, $Pather_Common_Constants.get_gameFps()));
		$Pather_Common_Constants.set_animationSteps(5);
	})();
})();
