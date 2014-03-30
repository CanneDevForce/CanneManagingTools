/**
 * master canne program api - application
 *
 * @package    mcp
 * @subpackage schemas - assaults
 * @author     Philippe Breucker
 * @version    0.1 - 2014
 */
 var restful = require('node-restful');
 var mongoose = require('mongoose');

 var assault = mongoose.Schema({
  name: String
  //@todo
 });

var Assault = restful.model("assaults",assault).methods(['get', 'delete', 'put', 'post']);
console.log("model assault defined");
exports = module.exports = Assault;