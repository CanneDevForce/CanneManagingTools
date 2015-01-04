MASTER CANNE PROGRAM - "MCP"
============================

#Overview

Welcome to Master Canne Program (MCP) : the center API of the canne managing tools  !

This will implement the (almost-)RESTful API described in [our wiki](https://github.com/CanneDevForce/CanneManagingTools/wiki).

It's goal is to synchronize all client programs that are running in a competition and on the www.
It manages gatherings, competitions, groups, assaults, fighters and scores.

#Requirements

MCP is based on [nodejs server](http://nodejs.org) with [expressjs web framework](http://expressjs.com/) (see above for installation). It also uses [mongoDB](http://www.mongodb.org) for storage. The restful part is impletented using the [node-restful](https://github.com/baugarten/node-restful) module, and the data base object relations are using the [mongoose](http://mongoosejs.com/index.html) module. 
On top of that, we use [formage](https://github.com/TheNodeILs/formage) to create an admin panel with a web frontend, allowing CRUD operations on the defined models.

Please install the folowing if you don't already have it (instructions are for ubuntu based systems): 

##nodejs

```
$ sudo apt-add-repository ppa:chris-lea/node.js
$ sudo apt-get update
$ sudo apt-get install nodejs
```

##mongoDB

The prefered installation is the mongo-10gen repository (see http://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/ for details)

```
$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
$ echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
$ sudo apt-get update
$ sudo apt-get install mongodb-10gen
```

#Install the app

After cloning the repo, you should install the modules via npm (node package manager, witch comes with nodejs package):

Example for ubuntu :

``` 
$ git clone git@github.com:CanneDevForce/CanneManagingTools.git
$ cd mcp
$ sudo npm install 

```

Npm should download and install all the modules and their dependencies automaticaly (do not forget the sudo...). For some reason, you may have to do it again in the mongo directory created by npm during install (this will install the mongo dependencies) : 

```
 $ cd mcp/node_modules/mongodb
 $ sudo npm install
``` 

Then you should copy the default parameters file and create one with your own with the ports and host of your choice (leave it as they are if you don't know what to put in):

```
$ cp env/env.js.default  env/env.js
```

#Start

```
$ cd mcp
$ node app
```

#Vagrant virtual machine
If you want all in one installation via a virtual machine, we have made a Vagrant configuration file (see https://www.vagrantup.com for details about vagrant). To install it that way, you must first install [Virtual Box](https://www.virtualbox.org/wiki/Downloads). Then install the VM with the script ```vagrant-create-vm.sh```. This will install the mcp.box pre-installed VM in your system, and connect you to it. To finish the install you must then run ```vagrant-install.sh``` from inside the box. Once all is installed, just run the app by running ```. start.sh``` in the VM in the /vagrant directory (whitch is connected to your git cloned directory on the host machine). That's it ! The app should be running on http://localhost:8080/admin on your host machine.
The database directory is set by default to write on /var/lib/mongodb, inside the VM. So if you wish to backup the datas, just backup the virutal hard drive and all will be saved, including the changes in your virtual machine !
This even runs on Windows machines, because the Virtual Box and Vagrant packages come for windows, linux and OSX. Although of course the vagrant install script is for ubuntu only.

#Usage
## API
The app listens by default at localhost:8080. The models directory holds all the database objects. For each object the API is providing standard HTTP methods : POST, GET, PUT, DELETE (create, retrieve, update, delete or CRUD). The API forms are RESTful-ish standard, so you can do the following standard requests an all objects: 

```
GET /objects[?<queryString>]
```
retrieve all objects with optional filters (i.e. ```/objects?&name=foo&mail=foo@bar```)

```
GET /objects/:id
```
retrieve one object with id ":id"

```
POST /objects
```
create a new object with body as parameters

```
PUT /objects/:id
```
updates existing object with id :id with request-body as parameters

```
DELETE /objects/:id
```
Delete object with id :id


For now, existing objects are Fighters, ScoreEvent, Assaults, Group, Competition and Gathering

## Admin interface
Formage sets up a web-interface so you can easilly access the database and manage the different objects. Go to http://localhost:8080/admin and log in with the credentials user : admin, pass : admin to start using the interface.
You can then create, update or delete any of the objects currently in database. You can view the objects with external references as dropdown lists, whitch is very helpful to maintain references troughout the database.