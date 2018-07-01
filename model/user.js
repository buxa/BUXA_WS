var mongoose = require('mongoose');
var schema = mongoose.Schema;
var userSchema = new schema({
    userID:{type: String, unique: true, required: true},
    username: {type: String, required: true},
    password:{type: String, required: true},
    type: {type: String, required: true},
    status:{type: String, required: true},
    permissions:[String],
    relatedSessionIDList:[String]
}, 
{collection: 'users'});

//validation with DB
var User = mongoose.model('User', userSchema);

module.exports = User;