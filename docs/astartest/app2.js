var EasyStar = require('easystarjs')
var easystar = new EasyStar.js();





var size = 500;


var grid = [];
for (var x = 0; x < size; x++) {
    grid.push([])
    for (var y = 0; y < size; y++) {
        grid[x][y] = (Math.random() * 100 < 15) ? 1 : 0
    }
}




easystar.setGrid(grid);

easystar.setAcceptableTiles([0]);




var maxSway=20;


for (var j = 0; j < 5; j++) {
    console.log(j);
    var time = process.hrtime();
    for (var i = 0; i < 100; i++) {
        if (i % 100 == 0) {
            console.log(" " + i);
        }

        var startX = (Math.random() * size) | 0;
        var startY = (Math.random() * size) | 0;

        var x = (startX + (maxSway) - maxSway / 2) | 0;
        var y = (startY + (maxSway) - maxSway / 2) | 0;

        x = Math.max(x, 0);
        y = Math.max(y, 0);

        x = Math.min(x, size - 1);
        y = Math.min(y, size - 1);

        easystar.findPath(startX, startY, x, y, function(path) {
            if (path === null) {
            //    console.log("Path was not found.");
            } else {
            //    console.log("Path was found. The first Point is " + path[0].x + " " + path[0].y);
            }
        });

        easystar.calculate();


    }
    var diff = (process.hrtime(time));
    var dif = diff[0] * 1e9 + diff[1];
    console.log(dif / 1000000);
};
 

return;
