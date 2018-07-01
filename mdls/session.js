var mongoose = require('mongoose');
var Session = require('../model/session');
var userAction =  require('./user');
var instructionAction = require('./instruction');
var uuid = require('uuid');

//var res = userAction.addRelatedSession("121212","1121313");

exports.createSession =function(req, res){

    var SessionObject = {
        sessionID:uuid(),
        sessionDate:Date(),
        sessionDuration:2,
        testerID:"req.body.testerID",
        analystID:"",
        testCaseID:"req.body.testCaseID",
        notebookID:"",
        checked:false,
        testDataObject:{
        	screenCaptureURL: "",
		    subjectVideoURL: "",
		    subjectAudioURL: "",
		    subjectPulseURL: ""
        },
        collectionMeasurIDList:["req.body.CMList"],
        chosenInstractionIDList:["req.body.CIList"]
    }

    Session.create(SessionObject, function(err,data){

        if(err){
            console.log("Unable to create Session");
            res.json({success:false, message:err});
            return;
        }

        console.log("success create new Session");
        res.json({success:true, message:data});
        return;

    });
}