/**
 * master canne program api - application
 *
 * @package    mcp
 * @subpackage schemas - fighters
 * @author     Philippe Breucker
 * @version    0.1 - 2014
 */
 var restful = require('node-restful');
 var mongoose = require('mongoose');

 var fighter = mongoose.Schema({
  name: String,
  mailAddress: String,
  nickName: String,
  nationality: String,
  born: { type: Date, default: Date.now },
  gender: String,
  clubName: String,
  pommelLevel: String,
  refereeLevel: String,
  role: String,
  description: String
 });

var Fighter = restful.model("fighters",fighter).methods(['get', 'delete', 'put', 'post']);
console.log("model fighter defined ");
exports = module.exports = Fighter;