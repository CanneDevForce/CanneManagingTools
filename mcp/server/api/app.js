/**
 * master canne program api - application
 *
 * @package    mcp
 * @subpackage api
 * @author     Philippe Breucker
 * @version    0.1 - 2013
 */


/******** initialization *********/
//express initialization - handle request/response
var express = require('express');
var app = express();

//mcp api methods
var api = require('./lib/api.js');

/****** app config ***********/
app.use(express.bodyParser());

/********Routes**************/

//root endpoint
app.get('/', api.welcome);


module.exports = app;
