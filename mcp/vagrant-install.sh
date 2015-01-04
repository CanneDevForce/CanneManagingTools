#!/bin/sh

############################################################
#### MCP canne managing tool - install on ***debian***  ####
############################################################
#sudoing
sudo su

#requirements
apt-get install curl

echo '---- installing mongo....'
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/debian-sysvinit dist 10gen' | tee /etc/apt/sources.list.d/mongodb.list
apt-get update
apt-get install mongodb-10gen
cp /vagrant/mongodb.conf /etc/mongodb.conf
chown root:root /etc/mongodb.conf
chmod 644 /etc/mongodb.conf
service mongodb start

echo '---- installing nodejs...'
curl -sL https://deb.nodesource.com/setup | bash -
apt-get install -y nodejs build-essential

echo '---- updating app modules'
npm install -g 
