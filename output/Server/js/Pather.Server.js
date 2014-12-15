'use strict';

var socketio = require('socket.io');
var $asm = {};
global.Pather = global.Pather || {};
global.Pather.Server = global.Pather.Server || {};
ss.initAssembly($asm, 'Pather.Server');
////////////////////////////////////////////////////////////////////////////////
// Pather.Server.Server
var $Pather_Server_Server = function() {
	var http = require('http');
	setInterval(function() {
		console.log('keep alive ' + (new Date()).toString().substr(17, 24));
	}, 10000);
	//load();
	var app = http.createServer(function(req, res) {
		res.end();
	});
	var io = socketio.listen(app);
	app.listen(8998);
	io.sockets.on('connection', function(socket) {
		socket.on('hello', function(helloData) {
			console.log('Received' + helloData.data);
			socket.emit('hello.ack', ss.makeGenericType(Pather.Common.Utils.DataObject$1, [String]).$ctor(helloData.data));
		});
	});
};
$Pather_Server_Server.__typeName = 'Pather.Server.Server';
$Pather_Server_Server.main = function() {
	new $Pather_Server_Server();
};
global.Pather.Server.Server = $Pather_Server_Server;
ss.initClass($Pather_Server_Server, $asm, {});
$Pather_Server_Server.main();
