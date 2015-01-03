/**
 * master canne program api - application
 *
 * @package    mcp
 * @subpackage schemas - fighters
 * @author     Philippe Breucker
 * @version    0.1 - 2014
 */
 
 //*** fighter schema ***

//pommel definition
 var pommels = "blue green red white yellow".split(' ');

//model
 var fighter = mongoose.Schema({
  name: String,
  mailAddress: String,
  nickName: String,
  nationality: String,
  born: { type: Date, default: Date.now },
  gender: String,
  clubName: String,
  pommelLevel: { type: String, enum: pommels },
  refereeLevel: String,
  role: String,
  description: String,
  victories: Number
 });

//*** fighter methods ***

//find by query : takes a json-formated mongo query and return the record(s) found to callback function (cb)
fighter.statics.findByQuery = function (query, cb){
    console.log('find query ', query);
    
    this.find(query, cb);
  };

//*** fighter model ***
var Fighter = restful.model("fighters",fighter).methods(['get', 'delete', 'put', 'post']);

//routes
Fighter.route('find',function(req, res, next) {
  var query;
  if(req.body){
   console.log('try to find ', req.body.query);
   this.findByQuery(JSON.parse(req.body.query), function(err,result){
     res.send(result);
   });
  }
  else{
    res.send(400, {error: 'sorry dude ! Missing a request body...'});
  }
});

//formage definitions
Fighter.formage = {
    filters: ['pommelLevel', 'nationality'],

    // // additional actions on this model
    // actions: [
    //    {
    //       id: 'release',
    //       label: 'Release',
    //       func: function (user, ids, callback) {
    //          console.log('You just released songs ' + ids);
    //          callback();
    //       }
    //    }
    // ],

    // list of fields on which full-text search is available
    search: ['name', 'clubName', 'nickName']
};

console.log("model fighter defined ");
exports = module.exports = Fighter;