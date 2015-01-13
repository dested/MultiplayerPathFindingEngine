#Todo#

figure out auth
    also any client can send a command for any playerid
'/figure out fast neighbor
data base
'/ verify move

'/logout of gameworld server
    spin down game segment

'/figure out action priming (player is halfway between X and Y,deterministically determine where he is and continue moving there)
    '/send out primed actions to new players
        '/you dont finish moving twoards point when a new person joins

todo test if its faster for redis to have one "tick" subscription for all relevent clients or not

remove tuples

figure out what happens when you start the servers in different orders
    figure out how to safely restart servers
        gameworld
        clustermanager
        gateway
        tick
        gamesegment
        head

'/many users join at the same time?
    '/only one user can join at a time

**FIX 2 todos a day**


look into rabbitMQ

unref child in cluster manager

ignore ping/lockstep/keepalive in pubsub

'/ add teh webpage logger from shuffly

'/decide how to spin up gateways
'/decide how to spin up gsc

'/ change gamesegmentcluster to new pubsub model


look into jump point path finding


attempt to sanatize common so not to deploy unneeded shit, like ip addresses


moveentity to gameworld when theres are 0 lockstep points




time per messagetype
time per lockstep tick






i think what im gonna work on tonight is dynamically spinning up and turning down servers using the digitialocean api
so i can dynamically scale the servers
based soley on load
...then i need to work on the reorganize game segment code, so i can move users onto the servers with players theyre closest to
then i need to add more logging
then i can buy some servers, push it up there, and provision more servers to act as clients that can move around
and see how many i can hit before the whole thing grinds to a halt
THEN, game logic 
using shabby free game art
tweak the game logic until i love it
then audition pixel artists
redo allt eh game art, continue to tweak the logic
then release it into a small beta to see hwo it plays out
then become a millionaire
there. i have my todo list 
now i ahve to goto chipotle and pick up dinner for me and the mrs's lol
thanks for letting me vent my thoughts