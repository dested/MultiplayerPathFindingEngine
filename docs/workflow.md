user authorizes using regular auth means
user hits gateway with player token 
'/gateway registers user to gameworld 
'/gameworld determines which player is closest to our new user, adds him to that game server

'/gameworld tells gateway which game server to send user to 

'/gateway publishes user join to gameworld
	'/gameworld publishes user join to users game server
		'/ gameserver adds user to his active watch list
		'/ gameserver runs update neighbors	
	'/ gameworld publishes user join knowledge to all other game servers
		'/ gameserver adds user to his inactive watch list
		'/ gameserver runs update neighbors




user sends username and password to auth endpoint in header

auth checks username pass
	checks against a table with just username passwordHash and Id
auth returns access token 






'/ game server sends ready to gateway
'/ gateway sends ready to user



'/ user moves towards xy
'/ user sends message to gateway

'/ gateway sends message to game server
'/ game server verifies move
'/ game server sends move action to player neighboring game servers 
'/ game server sends move result to gameworld
'/ game server sends move result to all other game servers
	'/ move result has x,y,tick 
		'/ tick is the lockstep tick that the user will be at that xy

'/ game server sends all neighbor players the moveaction




'/ game server triggers update neighbors occurs every X seconds
'/ game server notifies client of his new neighbors




'/tick server
	'/ keeps all '/gt's '/gs's, the '/gw, and '/clients in sync
	'/does nothing but ticktock

	'/ts plays pingpong with each gs, each gateway, and the gw
	'/	each gs/gateway determines latency 
	'/ player determines latecny with gateway, adds it to its ticktock latency



'/ ==reorg==
every 
	'/60 seconds gameworld reorganizes game server 
		or when there are more than X cross server calls per tick
	'/ reorg occurs
	'/ gw determines all players who have moved gs
		'/ groups them by reorg gs
		'/ moves Y at a time to new gs
			'/ gw tells player gs to send in progress actions to reorg gs
			'/ reorg gs executes actions appropriately
			'/ all new actions from player goto reorg gs



'/gameserverclusters
	one on each gameserver box
	monitors how many game servers there are
	monitors healthcheck for game servers
	'/can spin up a new game server instnace at the gw request
 


'/ home server is connected to gateways
'/ home server pings gateways to see how many users are currently connected
'/ home server commissions server manager to spin up new gateways if theyre slacking
'/ home server is an api endpoint that simply servers gateway IP addresses



server manager keeps tabs on all the clusters (game gateway and chat)
'/ when a new request comes in to spin up a new server it pings the clusters to see if theyre able to create a new one
	'/ if so it tells the cluster to spin up a new server
	if not it calls the API to provision a new box 
