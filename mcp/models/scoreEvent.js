/**
 * master canne program api - application
 *
 * @package    mcp
 * @subpackage schemas - scoreEvents
 * @author     Philippe Breucker
 * @version    0.1 - 2014
 */

/**
 /////schema description (see wiki for details) //////

 parameters

assault: the assault identifier
judge : the judge/referee identifier
fighter : the fighter identifier
Body

** type - Required string : the type of score event. 
Examples:
default: for non detailed score
touch: the given fighter has regularily touched her oponenent (+1 point?)
cancellation: the judge cancels the last point (-1 point?)
observation : the given fighter has made a small mistake (-1 point?)
penalty : the given fighter has made a mistake (-1 point?)
warning : the given fighter has made an unfair mistake (-3 point?)
carton rouge : the given fighter has an inapropriate behaviour
carton jaune : the given fighter has an unbearable behaviour

** details - Optional string : parameters/reason of the event. 
Examples:
Touch by Left handed Lateral exterieur on rear leg : the touche was made with the left hand with a lateral exeterieur on the rear leg.
Penalty for leaving the area : The penalty was given for steping outside the area.
Warning for "coup non armé" : The penalty was asked for non armed strike
Default : 265 points
...

**/

var restful = require('node-restful');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var scoreEvent = mongoose.Schema({
assault_judge_order: Number,
type: String,
created_at: { type: Date, default: Date.now },
details : String,
fighter : { type: Schema.Types.ObjectId, ref: 'Fighter' },
assault : { type: Schema.Types.ObjectId, ref: 'Assault' }
//@todo
});

var ScoreEvent = restful.model("scoreEvents",scoreEvent).methods(['get', 'delete', 'put', 'post']);
console.log("model scoreEvent defined");
exports = module.exports = ScoreEvent;