/**
* mcp - models/index.js
* Philippe Breucker - 2014
* This file gathers all objects definition and API endpoint declaration
*/

//Object definition (1 object = 1 class in 1 file)
var Fighter = require('./fighter');
var ScoreEvent = require('./scoreEvent');
var Assault = require('./assault');
var Group = require('./group');
var Competition = require('./competition');
var Gathering = require('./gathering');

//Exporting object to make them available to the app
exports = module.exports = [Fighter, ScoreEvent, Assault, Group, Competition, Gathering];

//exports = module.exports = Fighter;
///////// @todo /////////////////
/***
module.exports = {
    //******* Objects **************
    Fighter,
    ScoreEvent,
    Assault,
    Group,
    Competition,
    Gathering,

    //****** API specific **********
    
    //welcome
    welcome : function(req, res){
        res.send('mcp api - welcome');
    },

    //*** Assaults ***
    getAllAssaults : function(req, res){
        res.send('assaults : get all');
    },

    getOneAssault : function(req, res){
        res.send('assaults : get one');
    },

    updateAssaultStatus : function(req, res){
        res.send('assaults : update status');
    },

    updateAssaultReferee : function(req, res){
        res.send('assaults : change referee');
    },

    newAssault : function(req, res){
        res.send('assaults : create');
    },

    //*** Competitions ***
    getAllCompetitions : function(req, res){
        res.send('competitions : get all');
    },

    getOneCompetition : function(req, res){
        res.send('competitions : get one');
    },

    newCompetition : function(req, res){
        res.send('competitions : create');
    },

    addGroupToCompetition : function(req, res){
        res.send('competitions : add group');
    },

    getCompetitionGroups : function(req, res){
        res.send('competitions : get groups');
    },

    //*** Fighter ***

    getAllFighters : function(req, res){
        res.send('fighters : get all');
    },

    newFighter : function(req, res){
        res.send('fighters : create');
    },

    registerFighter : function(req, res){
        res.send('fighters : register');
    },

    updateFighter : function(req, res){
        res.send('fighters : update');
    },

    deleteFighter : function(req, res){
        res.send('fighters : delete');
    },

    //*** Gathering ***

    getAllGatherings : function(req, res){
        res.send('gatherings : get all');
    },

    getOneGatherings : function(req, res){
        res.send('gatherings : get one');
    },

    newGathering : function(req, res){
        res.send('gatherings : create');
    },

    updateGathering : function(req, res){
        res.send('gatherings : update');
    },

    deleteGathering : function(req, res){
        res.send('gatherings : delete');
    },

    //*** Group ***

    getAllGroups : function(req, res){
        res.send('groups : get all');
    },

    getOneGroups : function(req, res){
        res.send('groups : get one');
    },

    getGroupAssaults : function(req, res){
        res.send('groups : get assaults');
    },

    getGroupRanking : function(req, res){
        res.send('groups : get ranking');
    },

    setGroupRanking : function(req, res){
        res.send('groups : set ranking');
    },

    newGroup : function(req, res){
        res.send('groups : create');
    },

    updateGroup : function(req, res){
        res.send('groups : update');
    },

    deleteGroup : function(req, res){
        res.send('groups : delete');
    },

    setGroupStatus : function(req, res){
        res.send('groups : set status');
    },

    //*** ScoreEvent ***

    getAllScoreEvents : function(req, res){
        res.send('ScoreEvents : get all');
    },

    getOneScoreEvents : function(req, res){
        res.send('ScoreEvents : get one');
    },

    getScoreEventAssaults : function(req, res){
        res.send('ScoreEvents : get assaults');
    },

    getScoreEventRanking : function(req, res){
        res.send('ScoreEvents : get ranking');
    },

    setScoreEventRanking : function(req, res){
        res.send('ScoreEvents : set ranking');
    },

    newScoreEvent : function(req, res){
        res.send('ScoreEvents : create');
    },

    updateScoreEvent : function(req, res){
        res.send('ScoreEvents : update');
    },

    deleteScoreEvent : function(req, res){
        res.send('ScoreEvents : delete');
    },

};
**/