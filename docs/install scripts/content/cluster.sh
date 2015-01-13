
cd /usr/local/src/
git clone https://github.com/dested/MultiplayerPathFindingEngine
cd /usr/local/src/MultiplayerPathFindingEngine
git pull
cd /usr/local/src/MultiplayerPathFindingEngine/gulp
npm install
cd /usr/local/src/MultiplayerPathFindingEngine/output/Server
npm install

cd /usr/local/src/MultiplayerPathFindingEngine/output/Server
pkill node
 
node prod-app sm &

