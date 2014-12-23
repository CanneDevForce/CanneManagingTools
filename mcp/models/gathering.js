/**
 * master canne program api - application
 *
 * @package    mcp
 * @subpackage schemas - gatherings
 * @author     Philippe Breucker
 * @version    0.1 - 2014
 */

 var gathering = mongoose.Schema({
  name: String
  //@todo
 });

var Gathering = restful.model("gatherings",gathering).methods(['get', 'delete', 'put', 'post']);
console.log("model gathering defined");
exports = module.exports = Gathering;