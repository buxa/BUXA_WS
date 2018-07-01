var mongoose = require('mongoose');
var schema = mongoose.Schema;
var collectionMeasureSchema = new schema({
    collectionMeasureID:{type: String, unique: true, required: true},
    type: {type: String, required: true},
    description:{type: String, required: true}
}, 
{collection: 'collectionMeasures'});

//validation with DB
var CollectionMeasure = mongoose.model('CollectionMeasure', collectionMeasureSchema);

module.exports = CollectionMeasure;