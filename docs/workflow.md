user authorizes using regular auth means
user hits gateway with player token 
'/gateway registers user to gameworld 
'/gameworld determines which player is closest to our new user, adds him to that game server, so as not to reorg on every new join

'/gameworld tells gateway which game server to send user to 

gateway publishes user join to users game server
	gameserver adds user to his active watch list
	gameserver runs update neighbors	
gateway publishes user join knowledge to all other game servers
	gameserver adds user to his inactive watch list
	gameserver runs update neighbors



'/gateway publishes user join to gameworld
	'/gameworld publishes user join to users game server
		gameserver adds user to his active watch list
		gameserver runs update neighbors	
	gameworld publishes user join knowledge to all other game servers
		gameserver adds user to his inactive watch list
		gameserver runs update neighbors





game server sends ready to gateway
gateway sends ready to user



user moves towards xy
user sends message to gateway

gateway sends message to game server
game server verifies move
game server sends move action to player neighboring game servers 
game server sends move result to gameworld
game server sends move result to all other game servers
	move result has x,y,tick 
		tick is the lockstep tick that the user will be at that xy

game server sends all neighbor players the moveaction




game server triggers update neighbors occurs every 10 seconds
game server notifies client of his new neighbors




'/tick server
	keeps all '/gt's '/gs's, the '/gw, and clients in sync
	'/does nothing but ticktock

	'/ts plays pingpong with each gs, each gateway, and the gw
	'/	each gs/gateway determines latency 
	player determines latecny with gateway, adds it to its ticktock latency



==reorg==
every 
    25 minutes  gameworld reorganizes game server (when the ads are running)
	reorg occurs
	gw determines all actions that have not yet been completed
	gw tells each game server their new list of active 	
	gs runs neighbor determination
	gw sends all gs the yet completed actions
	gs determines which actions need to be ran
	gs primes actions to get to their appropriate tick
	users continue running as nermal

	or

	60 seconds gameworld reorganizes game server or when there are more than X cross server calls per tick
	reorg occurs
	gw determines all players who have moved gs
		groups them by reorg gs
		moves Y at a time to new gs
			gw tells player gs to send in progress actions to reorg gs
			reorg gs executes actions appropriately
			all new actions from player goto reorg gs



'/gameserverclusters
	one on each gameserver box
	monitors how many game servers there are
	monitors healthcheck for game servers
	'/can spin up a new game server instnace at the gw request

gw can spin up a new game server box
	calls api to provision a new box
	runs gameserver cluster
	regular gsc procedure takes place