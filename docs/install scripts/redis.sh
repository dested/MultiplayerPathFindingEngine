#!/bin/bash

apt-get update
apt-get -y upgrade
apt-get -y install redis-server

 

redis-server --port 6379 --bind redis.whoscoding.net &
redis-server --port 6380 --bind redis.whoscoding.net &
