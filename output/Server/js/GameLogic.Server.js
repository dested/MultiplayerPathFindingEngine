(function() {
	'use strict';
	var $asm = {};
	global.GameLogic = global.GameLogic || {};
	global.GameLogic.Server = global.GameLogic.Server || {};
	ss.initAssembly($asm, 'GameLogic.Server');
	////////////////////////////////////////////////////////////////////////////////
	// GameLogic.Server.Program
	var $GameLogic_Server_$Program = function() {
	};
	$GameLogic_Server_$Program.__typeName = 'GameLogic.Server.$Program';
	$GameLogic_Server_$Program.$main = function() {
		var serverStarter = new Pather.Servers.ServerStarter();
		serverStarter.start(new $GameLogic_Server_InstantiateLogic());
	};
	////////////////////////////////////////////////////////////////////////////////
	// GameLogic.Server.InstantiateLogic
	var $GameLogic_Server_InstantiateLogic = function() {
	};
	$GameLogic_Server_InstantiateLogic.__typeName = 'GameLogic.Server.InstantiateLogic';
	global.GameLogic.Server.InstantiateLogic = $GameLogic_Server_InstantiateLogic;
	////////////////////////////////////////////////////////////////////////////////
	// GameLogic.Server.LogicGameWorld
	var $GameLogic_Server_LogicGameWorld = function(gameWorldPubSub, backEndTickManager) {
		Pather.Servers.GameWorldServer.GameWorld.call(this, gameWorldPubSub, backEndTickManager);
		console.log('Hello logic!');
	};
	$GameLogic_Server_LogicGameWorld.__typeName = 'GameLogic.Server.LogicGameWorld';
	global.GameLogic.Server.LogicGameWorld = $GameLogic_Server_LogicGameWorld;
	ss.initClass($GameLogic_Server_$Program, $asm, {});
	ss.initClass($GameLogic_Server_InstantiateLogic, $asm, {
		createGameWorld: function(gameWorldPubSub, backEndTickManager) {
			return new $GameLogic_Server_LogicGameWorld(gameWorldPubSub, backEndTickManager);
		}
	}, null, [Pather.Servers.Utils.IInstantiateLogic]);
	ss.initClass($GameLogic_Server_LogicGameWorld, $asm, {}, Pather.Servers.GameWorldServer.GameWorld);
	$GameLogic_Server_$Program.$main();
})();
