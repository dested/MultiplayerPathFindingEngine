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
		var client = io.connect('127.0.0.1:8998');
		client.emit('hello', ss.makeGenericType(Pather.Common.Utils.DataObject$1, [String]).$ctor('Fuck you'));
		client.on('hello.ack', function(data) {
			console.log(data.data);
		});
		var game = new $Pather_Client_ClientGame();
		game.init();
	};
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Client.ClientGame
	var $Pather_Client_ClientGame = function() {
		this.$2$CanvasField = null;
		this.$2$ContextField = null;
		Pather.Common.Game.call(this);
		var $t1 = document.getElementById('canvas');
		this.set_canvas(ss.cast($t1, ss.isValue($t1) && (ss.isInstanceOfType($t1, Element) && $t1.tagName === 'CANVAS')));
		this.set_context(ss.cast(this.get_canvas().getContext('2d'), CanvasRenderingContext2D));
		this.get_canvas().onmousedown = ss.mkdel(this, function(ev) {
			var person = this.get_people()[0];
			var event = ev;
			person.rePathFind(ss.Int32.div(ss.unbox(ss.cast(event.offsetX, ss.Int32)), Pather.Common.Constants.get_squareSize()), ss.Int32.div(ss.unbox(ss.cast(event.offsetY, ss.Int32)), Pather.Common.Constants.get_squareSize()));
		});
	};
	$Pather_Client_ClientGame.__typeName = 'Pather.Client.ClientGame';
	global.Pather.Client.ClientGame = $Pather_Client_ClientGame;
	////////////////////////////////////////////////////////////////////////////////
	// Pather.Client.ClientPerson
	var $Pather_Client_ClientPerson = function(game) {
		this.$2$ClientGameField = null;
		Pather.Common.Person.call(this, game);
		this.set_$clientGame(game);
	};
	$Pather_Client_ClientPerson.__typeName = 'Pather.Client.ClientPerson';
	global.Pather.Client.ClientPerson = $Pather_Client_ClientPerson;
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
			window.requestAnimationFrame(ss.mkdel(this, function(a) {
				this.draw();
			}));
		},
		createPerson: function() {
			return new $Pather_Client_ClientPerson(this);
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
			var interpolatedTime = ((new Date()).getTime() - this.get_nextGameTick()) / Pather.Common.Constants.get_gameTicks();
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
	$Pather_Client_$Program.$main();
})();
