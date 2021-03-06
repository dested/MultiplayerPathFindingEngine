#!/bin/bash

apt-get update
apt-get -y upgrade 

curl https://raw.githubusercontent.com/creationix/nvm/v0.22.1/install.sh | bash
nvm install v0.10
nvm alias default 0.10

npm config set user 0
npm config set unsafe-perm true

npm install -g gulp

apt-get -y install git

cd /usr/local/src/
git clone https://github.com/dested/MultiplayerPathFindingEngine
cd /usr/local/src/MultiplayerPathFindingEngine
git pull
cd /usr/local/src/MultiplayerPathFindingEngine/gulp
npm install
cd /usr/local/src/MultiplayerPathFindingEngine/output/Server
npm install
cd /usr/local/src/MultiplayerPathFindingEngine/output/Client
npm install


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
