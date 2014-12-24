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
mongoose = require('mongoose');

//common objects definition (shortcut used in models)
ObjectId = mongoose.Schema.Types.ObjectId;

//restful for api/routes
restful = require('node-restful');

//formage for admin gui panel
formage = require('formage');

//create node app
app = module.exports = express(); //not sure exactly why module.exports... (see https://github.com/baugarten/node-restful/blob/master/examples/notes/index.js)

//connect mongoose to mongoDB
mongoose.connect(env.mongodb.url);



/****** app config ***********/
app.use(express.bodyParser());
app.use(express.methodOverride());
// creation of a false admin user cookie for formage to work...
app.use(express.cookieParser('magical secret admin'));
app.use(express.cookieSession({cookie: { maxAge: 1000 * 60 * 60 *  24 }}));

/********Routes**************/
//expose a list of models to register
models = require('./models/index');
models.forEach(function(model) {
   console.log("Register " , model.modelName);
   model.register(app, '/' + model.modelName);
});

/*** formage configuration : used for admin panel ***/
// Site-wide options, and their default values

formage.init(app, express, mongoose.models, {
    title: 'Admin',
    root: '/admin',
    username: 'admin',
    password: 'admin',
    admin_users_gui: true
});
console.log("formage :", formage);



/******** app start ***********/

app.listen(env.api.port);
console.log('mcp api server - listening on port '+env.api.port);