/// <reference path="constants.ts" />
/// <reference path="Person.ts" />

module Pather {
   
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
                person.rePathFind((ev.offsetX / Constants.squareSize) | 0, (ev.offsetY / Constants.squareSize) | 0);
            };

        }

        constructGrid() {
            this.grid = [];
            for (var i = 0; i < Constants.numberOfSquares; i++) {
                var gridRow = [];
                for (var a = 0; a < Constants.numberOfSquares; a++) {
                    gridRow.push((Math.random() * 100 < 15) ? 0 : 1);
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
                       // this.context.strokeRect(x * Constants.squareSize, y * Constants.squareSize, Constants.squareSize, Constants.squareSize);
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
//                                this.context.strokeRect(x * Constants.squareSize, y * Constants.squareSize, Constants.squareSize, Constants.squareSize);
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
}
