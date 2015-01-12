#!/bin/bash

curl https://raw.githubusercontent.com/creationix/nvm/v0.22.1/install.sh | bash
apt-get update
apt-get -y upgrade 

nvm install v0.10
nvm alias default 0.10

npm config set user 0
npm config set unsafe-perm true

apt-get -y install git

cd /usr/local/src/
git clone https://github.com/dested/MultiplayerPathFindingEngine
cd MultiplayerPathFindingEngine
git pull
cd output/Server
npm install
cd ../Client
npm install
cd ../Server

node app sm &

