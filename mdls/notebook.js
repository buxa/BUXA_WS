var mongoose = require('mongoose');
var Notebook = require('../model/notebook');
var Remark = require('../model/remark');
var uuid = require('uuid');


exports.createNotebook =function(req, res){

    var NotebookObject = {
        notebookID:uuid(),
        sessionID:req.body.sessionID,
        lastEditing:new Date(),
        conclusion:"",
        remarkIDList:[]
    }

    Notebook.create(NotebookObject, function(err,data){

        if(err){
            console.log("Unable to create Notebook");
            res.json({success:false, message:err});
            return;
        }

        console.log("success create new Notebook");
        res.json({success:true, message:data});
        return;

    });
}


exports.findNotebookByID =function(req, res){

    var notebookID = req.body.notebookID;   
    console.log(notebookID);

    Notebook.findOne({notebookID:notebookID},{_id:0,__v:0}).
        exec(function(err, doc){
            if(err){
                console.log("error: " + err);
                return 0;
            }
            console.log("Notebook:" + JSON.stringify(doc));
            res.json(doc);
            return;                               
    });
}


exports.getNotebookConclusion =function(req, res){

    var notebookID = req.body.notebookID;   
    console.log(notebookID);

    Notebook.findOne({notebookID:notebookID},{conclusion:1,_id:0,__v:0}).
        exec(function(err, doc){
            if(err){
                console.log("error: " + err);
                return 0;
            }
            console.log("Notebook's conclusion:" + JSON.stringify(doc));
            res.json(doc);
            return;                               
    });
}


exports.addConclusion =function(req, res){

    var notebookID = req.body.notebookID,
        conclusion = req.body.conclusion;

    Notebook.update({notebookID:notebookID},
                               {
                                  $set:{
                                          conclusion:conclusion
                                       } 
                                
        }).exec(function(err, result){
            if(err){
                console.log("error: " + err);
                return 0;
            }                 
            else{
               console.log("Conclusion has been added");
               return;
            }
        });
}

exports.removeRemarkFromNotebook =function(req, res){

    var notebookID = req.body.notebookID,
        remarkID = req.body.remarkID;

    Notebook.update({notebookID:notebookID},
                               {
                                  $pull:{
                                          remarkIDList:remarkID
                                       } 
                                
        }).exec(function(err, result){
            if(err){
                console.log("error: " + err);
                return 0;
            }                 
            else{

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

               console.log("Remark has been deleted");
               return;
            }
        });
}