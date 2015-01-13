
cd /usr/local/src/MultiplayerPathFindingEngine/output/Server
pkill node
pkill gulp

node prod-app t &

node prod-app m &
node prod-app h &

node prod-app gw &

cd /usr/local/src/MultiplayerPathFindingEngine/gulp

gulp client-express &

cd /usr/local/src/MultiplayerPathFindingEngine/output/Server