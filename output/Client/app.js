﻿global.window = global;

require('./libs/mscorlib');
var astar = require('./libs/astar');
global.Graph = astar.Graph;
global.astar = astar.astar;
window.TestServer = true;
window.NoDraw = true;
window.RunTests = true;
require('./js/Pather.Common');
require('./js/Pather.Client');

require('./js/GameLogic.Common');
require('./js/GameLogic.Client');
