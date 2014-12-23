require('./libs/mscorlib');
var astar = require('./libs/astar');
global.Graph = astar.Graph;
global.astar = astar.astar;

require('./js/Pather.Common');
require('./js/Pather.Servers');
