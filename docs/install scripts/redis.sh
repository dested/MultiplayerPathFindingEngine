#!/bin/bash

apt-get update
apt-get -y upgrade
apt-get -y install redis-server
 

redis-server --port 6379 --bind 173.255.211.118 &
redis-server --port 6380 --bind 173.255.211.118 &
