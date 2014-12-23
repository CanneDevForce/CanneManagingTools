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
    url: String,
    status: String, // "todo/ongoing/closed",
    type: String, //"single"
    regulations: String, // "France2015"
    // "scores": [
    //     {
    //         "side"="yellow",
    //         "total"=15,
    //           "details":{
    //               "touch":15,
    //               "penalty":4,
    //               "warning":1,
    //               "cartonjaune":none,
    //               "cartonrouge":none,
    //           }
    //         "fighters": [{
    //           "name": "peter",
    //           "id": 45678,
    //           "avatar_url": "http://www.cnccb.net/IMG/jpg/1378011_10151775911988740_799691492_n.jpg",
    //         }],
    //     },
    //     {
    //         "side"="blue",
    //         "total"=15,
    //           "details":{
    //               "touch":15,
    //               "penalty":4,
    //               "warning":1,
    //               "cartonjaune":none,
    //               "cartonrouge":none,
    //           }
    //         "fighters": [{
    //           "name": "peter",
    //           "id": 45678,
    //           "avatar_url": "http://www.cnccb.net/IMG/jpg/1378011_10151775911988740_799691492_n.jpg",
    //         }],
    //     }
    // ],
    // "judges": [
    //     {
    //         "name": "julien",
    //         "id": 26,
    //         "role": "judge1",
    //     },
    //     {
    //         "name": "julien",
    //         "id": 26,
    //         "role": "judge2",
    //     },
    //     {
    //         "name": "julien",
    //         "id": 26,
    //         "role": "judge3",
    //     },
    //     {
    //         "name": "bertrand",
    //         "id": 2,
    //         "role": "referee",
    //     }
    // ],
    created_at: { type: Date, default: Date.now },
    started_at: { type: Date, default: null },
    updated_at: { type: Date, default: null },
    closed_at: { type: Date, default: null }
});

var Assault = restful.model("assaults",assault).methods(['get', 'delete', 'put', 'post']);
console.log("model assault defined");
exports = module.exports = Assault;