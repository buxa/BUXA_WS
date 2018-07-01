var mongoose = require('mongoose');
var TestCase = require('../model/testCase');
var uuid = require('uuid');


exports.createTestCase =function(req,res){

    var TestCaseObject = {
        caseID:uuid(),
        type:req.body.type,
        name:req.body.name,
        description:req.body.description,
        optionalInstructionIDList:[req.body.optionalInstructionIDList] //May cause an err
    }

    TestCase.create(TestCaseObject, function(err,data){

        if(err){
            console.log("Unable to create Test Case");
            res.json({success:false, message:err});
            return;
        }

        console.log("success create new Test Case");
        res.json({success:true, message:data});
        return;

    });
}


exports.findTestCaseByID =function(req, res){

    var testCaseID = req.body.testCaseID;   
    console.log(testCaseID);

	TestCase.findOne({caseID:testCaseID},{_id:0,__v:0}).
        exec(function(err, doc){
            if(err){
                console.log("error: " + err);
                return 0;
            }
            console.log("Test Case:" + JSON.stringify(doc));
            res.json(doc);
            return;                               
    });
}


exports.findTestCaseByType =function(req, res){

    var type = req.body.type;   
    console.log(type);

	TestCase.find({type:type},{_id:0,__v:0}).
        exec(function(err, doc){
            if(err){
                console.log("error: " + err);
                return 0;
            }
            console.log("Test Case:" + JSON.stringify(doc));
            res.json(doc);
            return;                               
    });
}


exports.listOfTestCaseType =function(req, res){
    TestCase.find({},{type:1,caseID:1,_id:0}).
        exec(function(err, docs){
            if(err){
                console.log("error: " + err);
                return 0;
            }
            console.log("Test Case:" + JSON.stringify(docs));
            res.json(docs);
            return;                               
    });
}


exports.removeTestCase =function(req, res){

	var testCaseID = req.body.testCaseID;   
    console.log(testCaseID);

    TestCase.findOne({caseID:testCaseID}).
        exec(function(err, doc){
            doc.remove(function(err, deletedDoc){
                if(err){
	                console.log("error: " + err);
	                return 0;
                }
                else{
                	console.log("deleted Test Case:" + JSON.stringify(deletedDoc));
                	res.json(deletedDoc);
                }              
            });
         });
}