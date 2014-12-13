module Pather {
    export class Constants {
        static squareSize: number = 16;
        static numberOfSquares: number = 80;
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
            } else {
                return start - amount;
            }
        }
    }

}