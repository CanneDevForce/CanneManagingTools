/**
 * master canne program api - application
 *
 * @package    mcp
 * @subpackage schemas - groups
 * @author     Philippe Breucker
 * @version    0.1 - 2014
 */

 var group = mongoose.Schema({
  name: String
  //@todo
 });

var Group = restful.model("groups",group).methods(['get', 'delete', 'put', 'post']);
console.log("model group defined");
exports = module.exports = Group;