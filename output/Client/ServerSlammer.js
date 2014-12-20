'use strict';
require('./libs/mscorlib') 
var $asm = {};
global.Pather = global.Pather || {};
global.Pather.Client = global.Pather.Client || {}; 
ss.initAssembly($asm, 'Pather.Server');
////////////////////////////////////////////////////////////////////////////////
// Pather.Client.ServerSlammer
var $Pather_Client_ServerSlammer = function() {
	this.$exec = null;
	this.$util = null;
	this.$fs = null;
	this.$ind = 0;
	this.$fs = require('fs');
	this.$util = require('util');
	this.$exec = require('child_process').exec;
	for (var i = 0; i < 200; i++) {
		setTimeout(ss.mkdel(this, function() {
			this.$runProcess('node app.js');
		}), i * 500);
	}
};
$Pather_Client_ServerSlammer.__typeName = 'Pather.Client.ServerSlammer';
global.Pather.Client.ServerSlammer = $Pather_Client_ServerSlammer; 
ss.initClass($Pather_Client_ServerSlammer, $asm, {
	$runProcess: function(process) {
		var al;
		var name = '';
		var dummy = this.$exec(process);
		var file = 'abcdefg' + this.$ind++;
		dummy.stdout.on('data', ss.mkdel(this, function(data) {
			if (data.indexOf('debug: ') === -1) {
			//	this.$util.print(ss.formatString('--{0}: {1}   {2}', name, 0, data));
			}
		}));
		dummy.stderr.on('data', ss.mkdel(this, function(data1) {
			// this.$util.print(ss.formatString('--{0}: {1}   {2}', name, 0, data1));
		}));
		return dummy;
	}
}); 
(function() {
	new $Pather_Client_ServerSlammer();
})();
//$Pather_Server_Server.main();
