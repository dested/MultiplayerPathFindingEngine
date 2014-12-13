module app {
    (<any>window).requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            (<any>window).webkitRequestAnimationFrame ||
            (<any>window).mozRequestAnimationFrame ||
            (callback => {
                window.setTimeout(callback, Constants.drawTicks);
            });
    })();

    export class Constants {
        static squareSize: number = 64;
        static numberOfSquares: number = 20;
        static drawFps: number = 60;
        static drawTicks: number = 1000 / Constants.drawFps;
        static gameFps: number = 10;
        static gameTicks: number = 1000 / Constants.gameFps;
        static animationSteps: number = 5;

        static lerp(start: number, end: number, duration: number): number {
            return start + (end - start) * duration;
        }

        static moveTowards(start: number, end: number, amount: number): number {

            if (Math.abs(start - end) < amount) {
                return end;
            }

            if (start < end) {
                return start + amount;
            } if (start == end) {
                return start;
            }else {
                return start - amount;
            }
        }
    }


    export class Game {
        nextGameTick: number;
        grid: boolean[][];
        people: Person[];
        curTick: number;

        canvas: HTMLCanvasElement;
        context: CanvasRenderingContext2D;



        constructor() {
            this.nextGameTick = (new Date).getTime();
            this.constructGrid();
            this.people = [];

            var sal = new Person(this);
            this.people.push(sal);

            this.curTick = (new Date).getTime();


            this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
            this.context = this.canvas.getContext("2d");

            this.canvas.onmousedown = (ev) => {
                var person = this.people[0];
                person.rePathFind((ev.x / Constants.squareSize) | 0, (ev.y / Constants.squareSize) | 0);
            };

        }

        constructGrid() {
            this.grid = [];
            for (var i = 0; i < Constants.numberOfSquares; i++) {
                var gridRow = [];
                for (var a = 0; a < Constants.numberOfSquares; a++) {
                    gridRow.push((Math.random() * 100 < 0) ? 0 : 1);
                }
                this.grid.push(gridRow);
            }
        }


        init() {
            for (var i = 0; i < this.people.length; i++) {
                this.people[i].init(0, 0);
            }

            window.setTimeout(() => this.tick(), Constants.gameTicks);
            (<any>window).requestAnimFrame(() => this.draw());

        }

        tick() {
            window.setTimeout(() => this.tick(), Constants.gameTicks);
            var v = (new Date).getTime();
            this.nextGameTick += (v - this.curTick);
            this.curTick = v;

            for (var i = 0; i < this.people.length; i++) {
                this.people[i].tick();
            }
        }


        draw() {
            (<any>window).requestAnimFrame(() => this.draw());
            this.context.save();
            this.context.fillStyle = '#000000';
            this.context.fillRect(0, 0, 1200, 1200);
            this.context.restore();

            for (var y = 0; y < Constants.numberOfSquares; y++) {
                for (var x = 0; x < Constants.numberOfSquares; x++) {
                    if (this.grid[x][y]) {
                        this.context.save();
                        this.context.lineWidth = 5;
                        this.context.strokeStyle = 'white';
                        this.context.strokeRect(x * Constants.squareSize, y * Constants.squareSize, Constants.squareSize, Constants.squareSize);
                        this.context.restore();
                    }
                }
            }
            for (var y = 0; y < Constants.numberOfSquares; y++) {
                for (var x = 0; x < Constants.numberOfSquares; x++) {
                    if (!this.grid[x][y]) {
                        this.context.save();
                        this.context.lineWidth = 5;
                        this.context.strokeStyle = 'blue';
                        this.context.strokeRect(x * Constants.squareSize, y * Constants.squareSize, Constants.squareSize, Constants.squareSize);
                        this.context.restore();
                    }

                }
            }

            for (var y = 0; y < Constants.numberOfSquares; y++) {
                for (var x = 0; x < Constants.numberOfSquares; x++) {
                    for (var i = 0; i < this.people.length; i++) {
                        for (var j = 0; j < this.people[i].path.length; j++) {

                            if (this.people[i].path[j].x == x && this.people[i].path[j].y == y) {
                                this.context.save();
                                this.context.lineWidth = 5;
                                this.context.strokeStyle = 'pink';
                                this.context.strokeRect(x * Constants.squareSize, y * Constants.squareSize, Constants.squareSize, Constants.squareSize);
                                this.context.restore();

                            }

                        }

                    }


                }
            }

            var interpolatedTime = (((new Date).getTime() - this.nextGameTick) / Constants.gameTicks);


            for (var i = 0; i < this.people.length; i++) {
                this.people[i].draw(this.context, interpolatedTime);
            }

        }

    }


    export class Person {
        x: number;
        y: number;
        squareX: number;
        squareY: number;
        speed: number;
        path: AStar.AStarPath[];
        rePathFindPosition: Point;
        animations: AnimationPoint[];
        game: Game;

        constructor(game: Game) {
            this.x = 0;
            this.y = 0;
            this.squareX = 0;
            this.squareY = 0;
            this.speed = 50;
            this.path = [];
            this.rePathFindPosition = undefined;
            this.game = game;
        }

        init(squareX: number, squareY: number) {
            this.squareX = squareX;
            this.squareY = squareY;
            this.x = this.squareX * Constants.squareSize;
            this.y = this.squareY * Constants.squareSize;
            this.animations = [];

        }

        draw(context: CanvasRenderingContext2D, interpolatedTime: number) {
            context.save();

            if (interpolatedTime < 0) interpolatedTime = 0;
            if (interpolatedTime > 1) interpolatedTime = 1;

            var _x = this.x;
            var _y = this.y;
            if (this.animations.length > 0) {
                var animationIndex = ((interpolatedTime * Constants.animationSteps) | 0);
                var animation = this.animations[animationIndex] || this.animations[this.animations.length - 1];


                var interpolateStep = (interpolatedTime % (1 / Constants.animationSteps)) * Constants.animationSteps;
                _x = animation.fromX + (animation.x - animation.fromX) * interpolateStep;
                _y = animation.fromY + (animation.y - animation.fromY) * interpolateStep;



            }

            var result = this.path[0];
            if (result) {

                context.lineWidth = 5;
                context.strokeStyle = "yellow";
                context.strokeRect(result.x * Constants.squareSize, result.y * Constants.squareSize, Constants.squareSize, Constants.squareSize);

            }
            context.strokeStyle = "green";
            context.strokeRect(this.squareX * Constants.squareSize, this.squareY * Constants.squareSize, Constants.squareSize, Constants.squareSize);



            context.fillStyle = "red";
            context.fillRect((_x) - (Constants.squareSize / 2 - 5),
                (_y) - (Constants.squareSize / 2 - 5),
                (Constants.squareSize - 10),
                (Constants.squareSize - 10));
            context.restore();
        }

        rePathFind(squareX: number, squareY: number) {
            this.rePathFindPosition = { x: squareX, y: squareY };
        }

        tick() {
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

            var projectedX: number;
            var projectedY: number;
            var projectedSquareX: number;
            var projectedSquareY: number;

            projectedSquareX = !result ? this.squareX : (result.x );
            projectedSquareY = !result ? this.squareY : (result.y );




            for (var i = 0; i < Constants.animationSteps; i++) {



                this.squareX = ((this.x) / Constants.squareSize) | 0;
                this.squareY = ((this.y) / Constants.squareSize) | 0;
                var fromX = this.x;
                var fromY = this.y;


                if (result && (this.squareX == result.x && this.squareY == result.y)) {
                    this.path.splice(0, 1);
                    result = this.path[0];

                    projectedSquareX = !result ? this.squareX : (result.x);
                    projectedSquareY = !result ? this.squareY : (result.y);
                }



                projectedX = projectedSquareX * Constants.squareSize + Constants.squareSize / 2;
                projectedY = projectedSquareY * Constants.squareSize + Constants.squareSize / 2;


                if ((projectedX | 0) == (this.x | 0) && (projectedY | 0) == (this.y | 0)) {
                    return;
                }

                this.x = Constants.moveTowards(this.x, projectedX, (this.speed / Constants.animationSteps));
                this.y = Constants.moveTowards(this.y, projectedY, (this.speed / Constants.animationSteps));


                this.animations.push({
                    fromX: fromX,
                    fromY: fromY,

                    x: this.x,
                    y: this.y
                });
            }


        }

    }


    export class Point {
        x: number;
        y: number;
    }
    export class AnimationPoint extends Point {
        fromX: number;
        fromY: number;
    }
}

var game = new app.Game();
game.init();
