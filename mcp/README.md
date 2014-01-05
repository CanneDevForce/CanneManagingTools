MASTER CANNE PROGRAM - "MCP"
============================

#Overview

Welcome to master canne program : the center API of the canne managing tools  !

This will implement the (almost-)RESTful API described in our wiki : https://github.com/CanneDevForce/CanneManagingTools/wiki/_pages

It's goal is to synchronize all client programs that are running in a competition and on the www.
It manages gatherings, competitions, groups, assaults, fighters and scores.

#Requirements

MCP is based on nodejs (see http://nodejs.org) with expressjs module (http://expressjs.com/) for the web server (see above for installation). It also uses mongo for storage.

#Install

After cloning the repo (git clone ...), you should install nodejs (see nodejs.org) and then the module via npm :
Example on ubuntu :

``` 
$ cd server/api
$ sudo npm install 

```

The modules should download and install automaticaly (do not forget the sudo...). For some reason, you may have to do it again in the mongo directory created by npm during install (this will install the mongo dependencies) : 

```
 $ cd server/api/node_modules/mongodb
 $ sudo npm install
``` 

Then you should copy the default parameters file and create one with your own (leave it as they are if you don't know what to put in):

```
$ cp env/env.js.default  env/env.js
```

#Start
```
$ cd server/api
$ node index.js
```



