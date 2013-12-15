/**
 * master canne program api - application
 *
 * @package    mcp
 * @subpackage api
 * @author     Philippe Breucker
 * @version    0.1 - 2013
 */
var env = require('./env/env.js');
var app = require('./app.js');

/******** app start ***********/

app.listen(env.api.port);
console.log('mcp api server - listening on port '+env.api.port);