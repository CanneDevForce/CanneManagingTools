/**
 * master canne program api - methods
 *
 * @package    mcp
 * @subpackage api
 * @author     Philippe Breucker
 * @version    0.1 - 2013
 */

/**** Servers Initialization *********/
var Db, Server, db, mongo, server, mongoClient, Client, _;
mongo = require('mongodb');

Server = mongo.Server;
Client = mongo.MongoClient;

Db = mongo.Db;
server = new Server(env.mongodb.url, env.mongodb.port, {w: 1}, {auto_reconnect: true});
mongoClient = new Client(server);

db = mongoClient.db('meteor');

db.open(function(err, dbConn){
    // if(err)
    //    throw(new Error(err));
});
//_ = require("underscore");

/***** Tools ***************************/
//returns timestamp in mseconds if in seconds (php standard)
function timestampJs(timestp)
{
    return (timestp <= 100000000000) ? timestp*1000: timestp;
}

/***** DB Management  ****************/

/****** DB methods ***********/
    

function Storage(){

    /**
     *   Finds all items of <collectionName> filter with <query> and send it as an array of <fields> to <res>
     */
    this.getAll = function(collectionName, query, fields, res){
        var collection = db.collection(collectionName, function(err, collection){
            if (err) 
                throw(new Error(err)); 

            console.log('collection '+collectionName+' loaded');
            collection.find(query, fields).toArray(function(err, items) {
                if (err) 
                   throw(new Error(err)); 
                console.log(items);
                res.send(items);
                //db.close();
            });
        });
    };

    /*
     * Find one item of <collectionName> based on query and send it as an array
     */
    this.getItem = function(collectionName, query, res){
        var collection = db.collection(collectionName, function(err, collection){
            if (err) 
                throw(new Error(err)); 
            console.log('collection '+collectionName+' loaded');
            collection.findOne(query,function(err, item) {
                    if (err) 
                        throw(new Error(err)); 
                    console.log('find item : ',query, item);
                    res.send(item);
                });
        });
    };

    /*
     * Insert object <attributes> in <collectionName>, send the new id back to <res>
     */

    this.insert = function(collectionName, attributes, res){
        var collection = db.collection(collectionName, function(err, collection){
            if (err) 
                throw(new Error(err)); 
            console.log('collection '+collectionName+' loaded');
            collection.findOne({},{id:1},{sort:{id:-1}}, function(err,item){
                if(err)
                    throw(new Error(err));
                if(item)
                    attributes.id = parseInt(item.id)+1;
                else
                    attributes.id = 1;

                console.log("new element id : ", attributes.id);
                try{
                    collection.insert(attributes, function(err, item) {
                        if (err) 
                            throw(new Error(err)); 

                        console.log('inserted item : ', item);
                        res.send(201, item);
                    });
                }
                catch(err){
                    console.log('error inserting element : ', err);
                    res.send(500,"error inserting element");
                }
            })
        });
    };

    /*
     * updates or insert (ie upsert) object with <attributes> based on <query>, returns new/existing id to <res>
     */

    this.upsert = function(collectionName, query, attributes, res){
        var collection = db.collection(collectionName, function(err, collection){
            if (err) 
                throw(new Error(err)); 
            console.log('collection '+collectionName+' loaded');
            try{
                collection.update(query,{$set: attributes}, function(err, item) {
                    if (err)
                        throw(new Error(err)); 
                    console.log('upsert item : ',query, '{$set: ',attributes,'}', item);
                    res.send('update ok : ', item);
                });    
            }
            catch(err){
                console.log('error updating element : ', err);
                res.send(500,"error updating element");
            }
            
        });
    }
};

storage = new Storage();
    



/***** Method Exports  **************/

module.exports = {

    /****** API specific **********/
    welcome : function(req, res){
        res.send('mcp api - welcome');
    },
};


