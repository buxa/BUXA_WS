var mongoose = require('mongoose');
var Subject = require('../model/subject');
var uuid = require('uuid');


exports.addSubject =function(req, res){

    var SubjectObject = {
        subjectID:uuid(),
        gender:req.body.gender,
        age:req.body.age,
        sessionID:req.body.sessionID
    }

    Subject.create(SubjectObject, function(err,data){

        if(err){
            console.log("Unable to create Subject");
            res.json({success:false, message:err});
            return;
        }

        console.log("success create new Subject");
        res.json({success:true, message:data});
        return;

    });
}


exports.findSubjectByID =function(req, res){

    var id = req.body.id;   
    console.log(id);

	Subject.findOne({subjectID:id},{_id:0,__v:0}).
        exec(function(err, doc){
            if(err){
                console.log("error: " + err);
                return 0;
            }
            console.log("Subject:" + JSON.stringify(doc));
            res.json(doc);
            return;                               
    });
}


exports.removeSubject =function(req, res){

	var id = req.body.id;   
    console.log(id);

    Subject.findOne({subjectID:id}).
        exec(function(err, doc){
            doc.remove(function(err, deletedDoc){
                if(err){
	                console.log("error: " + err);
	                return 0;
                }
                else{
                	console.log("deleted Subject:" + JSON.stringify(deletedDoc));
                	res.json(deletedDoc);
                }              
            });
         });
}


