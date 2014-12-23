#Todo#

figure out auth
    also any client can send a command for any playerid
'/figure out fast neighbor
data base
verify move

logout of gameworld server
    spin down game segment

figure out action priming (player is halfway between X and Y, deterministically determine where he is and continue moving there)
    send out primed actions to new players
        you dont finish moving twoards point when a new person joins

todo test if its faster for redis to have one "tick" subscription for all relevent clients or not


look into rabbitMQ

unref child in gsc

ignore ping/lockstep/keepalive in pubsub

'/ add teh webpage logger from shuffly

decide how to spin up gateways
decide how to spin up gsc

change gamesegmentcluster to new pubsub model


TypeError: Cannot call method 'push' of null
    at ss.initClass.onPongReceived (C:\code\github\dested\MultiplayerPathFindingEngine\output\Server\js\Pather.Serve
rs.js:642:18)