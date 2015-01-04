#!/bin/sh

##############################################################
#### MCP canne managing tool - install vagrant on  ubuntu ####
##############################################################

echo -e "\e[1;32m=== Downloading deb vagrant package...\e[0m"

wget https://dl.bintray.com/mitchellh/vagrant/vagrant_1.7.1_x86_64.deb

echo -e "\e[1;32m=== Installing vagrant package...\e[0m"

sudo dpkg -i vagrant_1.7.1_x86_64.deb

echo -e "\e[1;32m=== Launching VM...\e[0m"

vagrant up

echo -e "\e[1;32m=== Connecting to VM : please run the script /vagrant/vagrant-install.sh when in the VM. \e[0m"

vagrant ssh