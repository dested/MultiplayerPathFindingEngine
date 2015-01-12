#!/bin/bash

apt-get update
apt-get -y upgrade
apt-get -y install redis-server

curl https://raw.githubusercontent.com/creationix/nvm/v0.22.1/install.sh | bash
nvm install v0.10
nvm alias default 0.10


apt-get -y install git

cd /usr/local/src/
git clone https://github.com/dested/MultiplayerPathFindingEngine
cd MultiplayerPathFindingEngine
cd output/Server
npm install
cd ../Client
npm install




