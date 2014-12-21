var players = [];

var numberOfPlayers = 5000;
var gridSize = 500;
var goodDistance = 40;


for (var i = 0; i < numberOfPlayers; i++) {
    players.push({
        id: i,
        x: (Math.random() * gridSize) | 0,
        y: (Math.random() * gridSize) | 0,
        neighbors: []
    });
};

var tot = 0;
var count = 0;


for (var i = 0; i < 100; i++) {

    for (var c = 0; c < numberOfPlayers; c++) {
        players[c].neighbors.length = 0;
    };

    var time = process.hrtime();
    determineNeighbors(players);

    var diff = (process.hrtime(time));
    var dif = diff[0] * 1e9 + diff[1];

    var g = dif / 1000000;

    tot += g;
    count++;


 /*   for (var c = 0; c < numberOfPlayers; c++) {
        console.log(players[c].id, players[c].x, players[c].y)
        for (var j = 0; j < players[c].neighbors.length; j++) {

            console.log('',
                players[c].neighbors[j].id,
                players[c].neighbors[j].x,
                players[c].neighbors[j].y,
                pointDistance(players[c].x, players[c].y,
                    players[c].neighbors[j].x,
                    players[c].neighbors[j].y)
            );
        };
    };*/


    console.log(tot / count);
}


function determineNeighbors(players) {
    var pl = players.length;
    var count=0
    for (var i = 0; i < pl; i++) {
        var p = players[i];
        for (var c = i + 1; c < pl; c++) {
            count++;
            var cp = players[c];

            var mx = p.x;
            var my = p.y;

            var cx = cp.x;
            var cy = cp.y;

            var _x = (cx - mx);
            var _y = (cy - my)

            var dis = Math.sqrt((_x * _x) + (_y * _y));
            if (dis <= goodDistance) {
                p.neighbors.push(cp);
                cp.neighbors.push(p);
            }

        }
    }
    console.log(count);
}

function pointDistance(mx, my, cx, cy) {


    var _x = (cx - mx);
    var _y = (cy - my)

    var dis = Math.sqrt((_x * _x) + (_y * _y));
    return dis;
}
