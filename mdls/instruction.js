var mongoose = require('mongoose');
var Instruction = require('../model/instruction');
var uuid = require('uuid');


exports.createInstruction =function(req, res){

    var InstructionObject = {
        instructionID:uuid(),
    	duration:0,
    	description:"req.body.description",
    	testCaseIDList:["033afe52-7770-11e8-a246-d07e35274f83"] //May cause an err  req.body.optionalInstructionIDList
    }

    Instruction.create(InstructionObject, function(err,data){

        if(err){
            console.log("Unable to create Instruction");
            res.json({success:false, message:err});
            return;
        }

        console.log("success create new Instruction");
        res.json({success:true, message:data});
        return;

    });
}


exports.findInstructionByID =function(req, res){

    var id = req.body.id;   
    console.log(id);

	Instruction.findOne({instructionID:id},{_id:0,__v:0}).
        exec(function(err, doc){
            if(err){
                console.log("error: " + err);
                return 0;
            }
            console.log("Instruction:" + JSON.stringify(doc));
            res.json(doc);
            return;                               
    });
}


exports.findInstructionByTastCase =function(req, res){

    var tastCaseID = req.body.tastCaseID;   
    console.log(tastCaseID);

	Instruction.find({testCaseIDList:tastCaseID},{_id:0,__v:0}).
        exec(function(err, doc){
            if(err){
                console.log("error: " + err);
                return 0;
            }
            console.log("All test case: " + tastCaseID + " instruction:" + JSON.stringify(doc));
            res.json(doc);
            return;                               
    });
}


exports.addRelatedTestCase =function(req, res){

    var instructionID = req.body.instructionID,
        teastCaseID = req.body.teastCaseID;

    Instruction.update({"instructionID":instructionID},
                               {
                                  $push:{"testCaseIDList":teastCaseID}
                                
        }).exec(function(err, result){
            if(err){
                console.log("error: " + err);
                return 0;
            }                 
            else{
               console.log("Tast case has been added");
               return;
            }
        });
}


exports.setDuration =function(req, res){

    console.log("set duration running");

    var duration = req.body.sub_duration,
        instructionIDList = req.body.instructionIDList;

    var list_size = instructionIDList.length;

    var instructionID, i =0;
    
    for(i;i<list_size;i++){
        Instruction.update({"instructionID":instructionIDList[i]},
                               {
                                  $set:{"duration":duration}
                                
        }).exec(function(err, result){
            if(err){
                console.log("error: " + err);
                return 0;
            }                 
            else{
               console.log("Duration has been set");
               return;
            }
        });
    }   
}