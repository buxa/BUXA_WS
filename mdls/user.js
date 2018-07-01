var mongoose = require('mongoose');
var User = require('../model/user');
var uuid = require('uuid');


exports.createUser =function(req, res){

    var UserObject = {
        userID:uuid(),
        username:req.body.username,
        password:req.body.password,
        type:req.body.password,
        status:req.body.password,
        permissions:req.body.permissions,
        relatedSessionIDList:[]
    }

    User.create(UserObject, function(err,data){

        if(err){
            console.log("Unable to create User");
            res.json({success:false, message:err});
            return;
        }

        console.log("success create new User");
        res.json({success:true, message:data});
        return;

    });
}


exports.findUserByID =function(req, res){

    var userID = req.body.userID;   
    console.log(userID);

    User.findOne({userID:userID},{_id:0,__v:0}).
        exec(function(err, doc){
            if(err){
                console.log("error: " + err);
                return 0;
            }
            console.log("User:" + JSON.stringify(doc));
            res.json(doc);
            return;                               
    });
}

exports.findUserByType =function(req, res){

    var type = req.body.type;   
    console.log(type);

    User.find({type:type},{_id:0,__v:0}).
        exec(function(err, doc){
            if(err){
                console.log("error: " + err);
                return 0;
            }
            console.log("User:" + JSON.stringify(doc));
            res.json(doc);
            return;                               
    });
}


exports.getAllUsers =function(req, res){

    User.find({},{_id:0,__v:0}).
        exec(function(err, doc){
            if(err){
                console.log("error: " + err);
                return 0;
            }
            console.log("User:" + JSON.stringify(doc));
            res.json(doc);
            return;                               
    });
}


exports.changeUserStatus =function(req, res){

	var userID = req.body.userID,
		status = req.body.status;

    User.update({userID:userID},
                               {
                                  $set:{
                                          status:"status"
                                       } 
                                
        }).exec(function(err, result){
            if(err){
                console.log("error: " + err);
                return 0;
            }                 
            else{
               console.log("Status has been changed");
               return;
            }
        });
}


exports.login =function(req, res){

    var username = req.body.username;
        pass = req.body.pass;

       User.findOne({username: username},{_id:0,__v:0})
        .exec(function(err,user){
            if(err){
                console.log("error: " + err);
                return 0;
            }            
            if(!user){
                res.json({ success: false, message: 'Login failed. User not found.' });
                return 0;
            }
            else if(user.password != pass){
                console.log("pass: " + pass);
                res.json({ success: false, message: 'Login failed. User password incorrect.' });
                return 0;
            }
            else{
                res.json({ success: true, message: 'User is logged in.', type: user.type });
                return;
            }
    });
}

//=======================================================

exports.addRelatedSession =function(userID, sessionID){

	//var userID = req.body.userID,
		//sessionID = req.body.sessionID;

    User.update({userID:userID},
                               {
                                  $push:{
                                          relatedSessionIDList:sessionID
                                       } 
                                
        }).exec(function(err, result){
            if(err){
                console.log("error: " + err);
                return 0;
            }                 
            else{
               console.log("Session has been added");
               return;
            }
        });
}


/*exports.changeUserPermmisions =function(req, res){

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
}*/