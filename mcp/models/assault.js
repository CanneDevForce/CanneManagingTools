/**
 * master canne program api - application
 *
 * @package    mcp
 * @subpackage schemas - assaults
 * @author     Philippe Breucker
 * @version    0.1 - 2014
 */

// The assault is made of several sub-documents. We use a specific schema for the scores as
// it is quite complicated in itself. We made the choice to consider a judge as a particular type of fighter (has common properties)
// The idea is that the judges are often fighters themselves, even in the same competition/gathering, and though have a pommel level, etc.
// we start by defining some sub-documents schemas :


//scores : typically an array of 2 sides finghting in an assault (blue and yellow) 
var score = mongoose.Schema({
    side: String, //"blue" or "yellow"
    total: Number, //total score of the current side
    details: {
          touch: Number,
          penalty: Number,
          warning: Number,
          cartonjaune: String,
          cartonrouge: String
    },
    fighters: [{ type: ObjectId, ref: 'Fighter' }]
});


//assaut : main object made of scores, judges and meta data like status or url
var assault = mongoose.Schema({
    url: String,
    status: String, // "todo/ongoing/closed",
    type: String, //"single"
    regulations: String, // "France2015"
    scores: [score], //the scores is an array of 2 scores : one for each side 
    judges: [{ type: ObjectId, ref: 'Fighter' }], //judges are just another fighters :)
    created_at: { type: Date, default: Date.now },
    started_at: { type: Date, default: null },
    updated_at: { type: Date, default: null },
    closed_at: { type: Date, default: null }
});

var Assault = restful.model("assaults",assault).methods(['get', 'delete', 'put', 'post']);
console.log("model assault defined");
exports = module.exports = Assault;