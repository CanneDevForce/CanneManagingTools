/**
 * master canne program api - application
 *
 * @package    mcp
 * @subpackage schemas - scoreEvents
 * @author     Philippe Breucker
 * @version    0.1 - 2014
 */
 var restful = require('node-restful');
 var mongoose = require('mongoose');

 var scoreEvent = mongoose.Schema({
  name: String
  //@todo
 });

var ScoreEvent = restful.model("scoreEvents",scoreEvent).methods(['get', 'delete', 'put', 'post']);
console.log("model scoreEvent defined");
exports = module.exports = ScoreEvent;