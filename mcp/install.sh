#!/bin/sh

############################################################
#### MCP canne managing tool - install on debian wheezy ####
############################################################
#sudoing
sudo su

#requirements
apt-get install curl

echo '---- installing mongo....'
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | tee /etc/apt/sources.list.d/mongodb.list
apt-get update
apt-get install mongodb-org

echo '---- installing nodejs...'
curl -sL https://deb.nodesource.com/setup | bash -
apt-get install -y nodejs build-essential
npm update

# uncomment the following to start the app
# node app
