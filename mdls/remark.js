var mongoose = require('mongoose');
var Remark = require('../model/remark');
var uuid = require('uuid');


exports.createRemark =function(req, res){

    var RemarkObject = {
        remarkID:uuid(),
        sessionID:req.body.sessionID,
        notebookID:req.body.notebookID,
        time:new Date(),
        info:req.body.info
    }

    Remark.create(RemarkObject, function(err,data){

        if(err){
            console.log("Unable to create Remark");
            res.json({success:false, message:err});
            return;
        }

        console.log("success create new Remark");
        res.json({success:true, message:data});
        return;

    });
}


exports.findRemarkByID =function(req, res){

    var remarkID = req.body.remarkID;   
    console.log(remarkID);

    Remark.findOne({remarkID:remarkID},{_id:0,__v:0}).
        exec(function(err, doc){
            if(err){
                console.log("error: " + err);
                return 0;
            }
            console.log("Remark:" + JSON.stringify(doc));
            res.json(doc);
            return;                               
    });
}


exports.findRemarkByNotebook =function(req, res){

    var notebookID = req.body.notebookID;   
    console.log(notebookID);

    Remark.find({notebookID:notebookID},{_id:0,__v:0}).
        exec(function(err, doc){
            if(err){
                console.log("error: " + err);
                return 0;
            }
            console.log("Remark:" + JSON.stringify(doc));
            res.json(doc);
            return;                               
    });
}


exports.findRemarkBySession =function(req, res){

    var sessionID = req.body.sessionID;   
    console.log(sessionID);

    Remark.find({sessionID:sessionID},{_id:0,__v:0}).
        exec(function(err, doc){
            if(err){
                console.log("error: " + err);
                return 0;
            }
            console.log("Remark:" + JSON.stringify(doc));
            res.json(doc);
            return;                               
    });
}


exports.updateRemarkInfo =function(req, res){

    var remarkID = req.body.remarkID,
        info = req.body.info;

    Remark.update({"remarkID":remarkID},
                               {
                                  $set:{
                                          info:info,
                                          time: new Date()
                                       } 
                                
        }).exec(function(err, result){
            if(err){
                console.log("error: " + err);
                return 0;
            }                 
            else{
               console.log("updated");
               return;
            }
        });
}


exports.updateRemarkNotebookID =function(req, res){

    var remarkID = req.body.remarkID,
        notebookID = req.body.notebookID;

    Remark.update({"remarkID":remarkID},
                               {
                                  $set:{
                                          "notebookID":notebookID
                                       } 
                                
        }).exec(function(err, result){
            if(err){
                console.log("error: " + err);
                return 0;
            }                 
            else{
               console.log("updated");
               return;
            }
        });
}


/*exports.removeRemark =function(req, res){

    var remarkID = req.body.remarkID;   
    console.log(remarkID);

    Remark.findOne({remarkID:remarkID}).
        exec(function(err, doc){
            doc.remove(function(err, deletedDoc){
                if(err){
                    console.log("error: " + err);
                    return 0;
                }
                else{
                    console.log("deleted remark:" + JSON.stringify(deletedDoc));
                    res.json(deletedDoc);
                }              
            });
         });
}*/