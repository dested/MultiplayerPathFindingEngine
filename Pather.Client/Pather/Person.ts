/// <reference path="constants.ts" />

module Pather {
    export class Person {
        x: number;
        y: number;
        squareX: number;
        squareY: number;
        speed: number;
        path: AStar.AStarPath[];
        rePathFindPosition: utils.Point;
        animations: utils.AnimationPoint[];
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

            var _x = this.x|0;
            var _y = this.y|0;
            if (this.animations.length > 0) {
                var animationIndex = ((interpolatedTime * Constants.animationSteps) | 0);
                var animation = this.animations[animationIndex];
                if (animation) {

                    var interpolateStep = (interpolatedTime % (1 / Constants.animationSteps)) * Constants.animationSteps;
                    _x = animation.fromX + (animation.x - animation.fromX) * interpolateStep|0;
                    _y = animation.fromY + (animation.y - animation.fromY) * interpolateStep|0;
                }
            }

            var result = this.path[0];
            if (result) {

                context.lineWidth = 5;
                context.strokeStyle = "yellow";
//                context.strokeRect(result.x * Constants.squareSize, result.y * Constants.squareSize, Constants.squareSize, Constants.squareSize);

            }
            context.strokeStyle = "green";
//            context.strokeRect(this.squareX * Constants.squareSize, this.squareY * Constants.squareSize, Constants.squareSize, Constants.squareSize);



            context.lineWidth = 5;
            context.strokeStyle = "yellow";
            context.fillStyle = "red";
            context.fillRect((_x) - (Constants.squareSize / 2), (_y) - (Constants.squareSize / 2), (Constants.squareSize), (Constants.squareSize));
            context.strokeRect((_x) - (Constants.squareSize / 2), (_y) - (Constants.squareSize / 2), (Constants.squareSize ), (Constants.squareSize ));
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

            projectedSquareX = !result ? this.squareX : (result.x);
            projectedSquareY = !result ? this.squareY : (result.y);




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

}