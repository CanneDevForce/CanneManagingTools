/**
 * master canne program api - application
 *
 * @package    mcp
 * @subpackage api
 * @author     Philippe Breucker
 * @version    0.1 - 2013
 */


/******** initialization *********/

//environement
var env = require('./env/env.js');

//express initialization - handle http request/response
var express = require('express');

//mongoose for the schema & models
var mongoose = require('mongoose');

//restful for api/routes
var restful = require('node-restful');

//create node app
var app = module.exports = express(); //not sure exactly why module.exports... (see https://github.com/baugarten/node-restful/blob/master/examples/notes/index.js)

//connect mongoose to mongoDB
mongoose.connect(env.mongodb.url);



/****** app config ***********/
app.use(express.bodyParser());
app.use(express.methodOverride());

/********Routes**************/
//expose a list of models to register
var models = require('./models/index');
models.forEach(function(model) {
   console.log("Register " , model.modelName);
   model.register(app, '/' + model.modelName);
});

/******** app start ***********/

app.listen(env.api.port);
console.log('mcp api server - listening on port '+env.api.port);