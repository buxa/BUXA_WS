var mongoose = require('mongoose');
var CollectionMeasure = require('../model/collectionMeasure');
var uuid = require('uuid');


exports.createCollectionMeasure =function(req, res){

    var CollectionMeasureObject = {
        collectionMeasureID:uuid(),
        type:req.body.type,
        description:req.body.description
    }

    CollectionMeasure.create(CollectionMeasureObject, function(err,data){

        if(err){
            console.log("Unable to create Collection Measure");
            res.json({success:false, message:err});
            return;
        }

        console.log("success create new Collection Measure");
        res.json({success:true, message:data});
        return;

    });
}


exports.findCollectionMeasureByID =function(req, res){

    var id = req.body.id;   
    console.log(id);

	CollectionMeasure.findOne({collectionMeasureID:id},{_id:0,__v:0}).
        exec(function(err, doc){
            if(err){
                console.log("error: " + err);
                return 0;
            }
            console.log("Collection Measure:" + JSON.stringify(doc));
            res.json(doc);
            return;                               
    });
}


exports.findCollectionMeasureByType =function(req, res){

    var type = req.body.type;   
    console.log(type);

	CollectionMeasure.find({type:type},{_id:0,__v:0}).
        exec(function(err, doc){
            if(err){
                console.log("error: " + err);
                return 0;
            }
            console.log("Collection Measure:" + JSON.stringify(doc));
            res.json(doc);
            return;                               
    });
}


exports.getAllCollectionMeasures =function(req, res){

    CollectionMeasure.find({},{_id:0,description:0}).
        exec(function(err, docs){
            if(err){
                console.log("error: " + err);
                return 0;
            }                 
            else{
               console.log("Collection Measure: " + docs);
               res.json(docs);
               return;
            }
        });
}


exports.updateCollectionMeasure =function(req, res){

	var id = req.body.id,
		decription = req.body.decription;

	CollectionMeasure.update({"collectionMeasureID":id},
            				   {
            				   	  $set:{"description":decription}
            				   	
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


exports.removeCollectionMeasure =function(req, res){

	var id = req.body.id;   
    console.log(id);

    CollectionMeasure.findOne({collectionMeasureID:id}).
        exec(function(err, doc){
            doc.remove(function(err, deletedDoc){
                if(err){
	                console.log("error: " + err);
	                return 0;
                }
                else{
                	console.log("deleted collection measure:" + JSON.stringify(deletedDoc));
                	res.json(deletedDoc);
                }              
            });
         });
}
