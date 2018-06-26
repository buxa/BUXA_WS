var mongoose = require('mongoose');
var CollectionMeasure = require('../model/collectionMeasure');


exports.findCollectionMeasureByID =function(req, res){
    var id = req.body.id;   
    console.log(id);

	CollectionMeasure.findOne({collectionMeasureID:id},{}).
        exec(function(err, docs){
            if(err){
                console.log("error: " + err);
                return 0;
            }                      
            console.log("Collection Measure: " + docs);
            res.json(docs);
            return;            
        });
}
