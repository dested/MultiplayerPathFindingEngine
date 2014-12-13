 (<any>window).requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
            (<any>window).webkitRequestAnimationFrame ||
            (<any>window).mozRequestAnimationFrame ||
            (callback => {
                window.setTimeout(callback, Pather.Constants.drawTicks);
            });
    })();
