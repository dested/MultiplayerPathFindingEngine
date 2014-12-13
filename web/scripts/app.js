var Pather;
(function (Pather) {
    var Constants = (function () {
        function Constants() {
        }
        Constants.lerp = function (start, end, duration) {
            return start + (end - start) * duration;
        };
        Constants.moveTowards = function (start, end, amount) {
            if (Math.abs(start - end) < amount) {
                return end;
            }
            if (start < end) {
                return start + amount;
            }
            if (start == end) {
                return start;
            }
            else {
                return start - amount;
            }
        };
        Constants.squareSize = 16;
        Constants.numberOfSquares = 80;
        Constants.drawFps = 60;
        Constants.drawTicks = 1000 / Constants.drawFps;
        Constants.gameFps = 10;
        Constants.gameTicks = 1000 / Constants.gameFps;
        Constants.animationSteps = 5;
        return Constants;
    })();
    Pather.Constants = Constants;
})(Pather || (Pather = {}));
/// <reference path="constants.ts" />
var Pather;
(function (Pather) {
    var Person = (function () {
        function Person(game) {
            this.x = 0;
            this.y = 0;
            this.squareX = 0;
            this.squareY = 0;
            this.speed = 50;
            this.path = [];
            this.rePathFindPosition = undefined;
            this.game = game;
        }
        Person.prototype.init = function (squareX, squareY) {
            this.squareX = squareX;
            this.squareY = squareY;
            this.x = this.squareX * Pather.Constants.squareSize;
            this.y = this.squareY * Pather.Constants.squareSize;
            this.animations = [];
        };
        Person.prototype.draw = function (context, interpolatedTime) {
            context.save();
            if (interpolatedTime < 0)
                interpolatedTime = 0;
            if (interpolatedTime > 1)
                interpolatedTime = 1;
            var _x = this.x;
            var _y = this.y;
            if (this.animations.length > 0) {
                var animationIndex = ((interpolatedTime * Pather.Constants.animationSteps) | 0);
                var animation = this.animations[animationIndex];
                if (animation) {
                    var interpolateStep = (interpolatedTime % (1 / Pather.Constants.animationSteps)) * Pather.Constants.animationSteps;
                    _x = animation.fromX + (animation.x - animation.fromX) * interpolateStep;
                    _y = animation.fromY + (animation.y - animation.fromY) * interpolateStep;
                }
            }
            var result = this.path[0];
            if (result) {
                context.lineWidth = 5;
                context.strokeStyle = "yellow";
            }
            context.strokeStyle = "green";
            //            context.strokeRect(this.squareX * Constants.squareSize, this.squareY * Constants.squareSize, Constants.squareSize, Constants.squareSize);
            context.fillStyle = "red";
            context.fillRect((_x) - (Pather.Constants.squareSize / 2), (_y) - (Pather.Constants.squareSize / 2), (Pather.Constants.squareSize), (Pather.Constants.squareSize));
            context.restore();
        };
        Person.prototype.rePathFind = function (squareX, squareY) {
            this.rePathFindPosition = { x: squareX, y: squareY };
        };
        Person.prototype.tick = function () {
            //            console.log('ticked');
            if (this.rePathFindPosition) {
                var graph = new Graph(this.game.grid);
                var start = graph.grid[this.squareX][this.squareY];
                var end = graph.grid[this.rePathFindPosition.x][this.rePathFindPosition.y];
                this.path = astar.search(graph, start, end);
                this.rePathFindPosition = undefined;
            }
            var result = this.path[0];
            this.animations = [];
            var projectedX;
            var projectedY;
            var projectedSquareX;
            var projectedSquareY;
            projectedSquareX = !result ? this.squareX : (result.x);
            projectedSquareY = !result ? this.squareY : (result.y);
            for (var i = 0; i < Pather.Constants.animationSteps; i++) {
                this.squareX = ((this.x) / Pather.Constants.squareSize) | 0;
                this.squareY = ((this.y) / Pather.Constants.squareSize) | 0;
                var fromX = this.x;
                var fromY = this.y;
                if (result && (this.squareX == result.x && this.squareY == result.y)) {
                    this.path.splice(0, 1);
                    result = this.path[0];
                    projectedSquareX = !result ? this.squareX : (result.x);
                    projectedSquareY = !result ? this.squareY : (result.y);
                }
                projectedX = projectedSquareX * Pather.Constants.squareSize + Pather.Constants.squareSize / 2;
                projectedY = projectedSquareY * Pather.Constants.squareSize + Pather.Constants.squareSize / 2;
                if ((projectedX | 0) == (this.x | 0) && (projectedY | 0) == (this.y | 0)) {
                    return;
                }
                this.x = Pather.Constants.moveTowards(this.x, projectedX, (this.speed / Pather.Constants.animationSteps));
                this.y = Pather.Constants.moveTowards(this.y, projectedY, (this.speed / Pather.Constants.animationSteps));
                this.animations.push({
                    fromX: fromX,
                    fromY: fromY,
                    x: this.x,
                    y: this.y
                });
            }
        };
        return Person;
    })();
    Pather.Person = Person;
})(Pather || (Pather = {}));
/// <reference path="constants.ts" />
/// <reference path="Person.ts" />
var Pather;
(function (Pather) {
    var Game = (function () {
        function Game() {
            var _this = this;
            this.nextGameTick = (new Date).getTime();
            this.constructGrid();
            this.people = [];
            var sal = new Pather.Person(this);
            this.people.push(sal);
            this.curTick = (new Date).getTime();
            this.canvas = document.getElementById("canvas");
            this.context = this.canvas.getContext("2d");
            this.canvas.onmousedown = function (ev) {
                var person = _this.people[0];
                person.rePathFind((ev.x / Pather.Constants.squareSize) | 0, (ev.y / Pather.Constants.squareSize) | 0);
            };
        }
        Game.prototype.constructGrid = function () {
            this.grid = [];
            for (var i = 0; i < Pather.Constants.numberOfSquares; i++) {
                var gridRow = [];
                for (var a = 0; a < Pather.Constants.numberOfSquares; a++) {
                    gridRow.push((Math.random() * 100 < 15) ? 0 : 1);
                }
                this.grid.push(gridRow);
            }
        };
        Game.prototype.init = function () {
            var _this = this;
            for (var i = 0; i < this.people.length; i++) {
                this.people[i].init(0, 0);
            }
            window.setTimeout(function () { return _this.tick(); }, Pather.Constants.gameTicks);
            window.requestAnimFrame(function () { return _this.draw(); });
        };
        Game.prototype.tick = function () {
            var _this = this;
            window.setTimeout(function () { return _this.tick(); }, Pather.Constants.gameTicks);
            var v = (new Date).getTime();
            this.nextGameTick += (v - this.curTick);
            this.curTick = v;
            for (var i = 0; i < this.people.length; i++) {
                this.people[i].tick();
            }
        };
        Game.prototype.draw = function () {
            var _this = this;
            window.requestAnimFrame(function () { return _this.draw(); });
            this.context.save();
            this.context.fillStyle = '#000000';
            this.context.fillRect(0, 0, 1200, 1200);
            this.context.restore();
            for (var y = 0; y < Pather.Constants.numberOfSquares; y++) {
                for (var x = 0; x < Pather.Constants.numberOfSquares; x++) {
                    if (this.grid[x][y]) {
                        this.context.save();
                        this.context.lineWidth = 5;
                        this.context.strokeStyle = 'white';
                        // this.context.strokeRect(x * Constants.squareSize, y * Constants.squareSize, Constants.squareSize, Constants.squareSize);
                        this.context.restore();
                    }
                }
            }
            for (var y = 0; y < Pather.Constants.numberOfSquares; y++) {
                for (var x = 0; x < Pather.Constants.numberOfSquares; x++) {
                    if (!this.grid[x][y]) {
                        this.context.save();
                        this.context.lineWidth = 5;
                        this.context.strokeStyle = 'blue';
                        this.context.strokeRect(x * Pather.Constants.squareSize, y * Pather.Constants.squareSize, Pather.Constants.squareSize, Pather.Constants.squareSize);
                        this.context.restore();
                    }
                }
            }
            for (var y = 0; y < Pather.Constants.numberOfSquares; y++) {
                for (var x = 0; x < Pather.Constants.numberOfSquares; x++) {
                    for (var i = 0; i < this.people.length; i++) {
                        for (var j = 0; j < this.people[i].path.length; j++) {
                            if (this.people[i].path[j].x == x && this.people[i].path[j].y == y) {
                                this.context.save();
                                this.context.lineWidth = 5;
                                this.context.strokeStyle = 'pink';
                                //                                this.context.strokeRect(x * Constants.squareSize, y * Constants.squareSize, Constants.squareSize, Constants.squareSize);
                                this.context.restore();
                            }
                        }
                    }
                }
            }
            var interpolatedTime = (((new Date).getTime() - this.nextGameTick) / Pather.Constants.gameTicks);
            for (var i = 0; i < this.people.length; i++) {
                this.people[i].draw(this.context, interpolatedTime);
            }
        };
        return Game;
    })();
    Pather.Game = Game;
})(Pather || (Pather = {}));
window.requestAnimFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || (function (callback) {
        window.setTimeout(callback, Pather.Constants.drawTicks);
    });
})();
/// <reference path="Game.ts" />
/// <reference path="utils/animFrame.ts" />
var Pather;
(function (Pather) {
    var game = new Pather.Game();
    game.init();
})(Pather || (Pather = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Pather;
(function (Pather) {
    var utils;
    (function (utils) {
        var Point = (function () {
            function Point() {
            }
            return Point;
        })();
        utils.Point = Point;
        var AnimationPoint = (function (_super) {
            __extends(AnimationPoint, _super);
            function AnimationPoint() {
                _super.apply(this, arguments);
            }
            return AnimationPoint;
        })(Point);
        utils.AnimationPoint = AnimationPoint;
    })(utils = Pather.utils || (Pather.utils = {}));
})(Pather || (Pather = {}));
//# sourceMappingURL=app.js.map