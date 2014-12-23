/**
 * master canne program api - application
 *
 * @package    mcp
 * @subpackage schemas - competitions
 * @author     Philippe Breucker
 * @version    0.1 - 2014
 */
 var restful = require('node-restful');
 var mongoose = require('mongoose');

 var competition = mongoose.Schema({
  
  });

var Competition = restful.model("competitions",competition).methods(['get', 'delete', 'put', 'post']);
console.log("model competition defined");
exports = module.exports = Competition;