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

#Use
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