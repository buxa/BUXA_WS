var mongoose = require('mongoose');
var TestData = require('../model/testData');
var uuid = require('uuid');


exports.createTestData =function(sessioID, screenCaptureURL,
                                 subjectVideoURL, subjectAudioURL,
                                 subjectPulseURL ){

    var TestDataObject = {
        testDataID:uuid(),
        sessionRelatedID:sessioID,
        screenCaptureURL:screenCaptureURL,
        subjectVideoURL:subjectVideoURL,
        subjectAudioURL:subjectAudioURL,
        subjectPulseURL:subjectPulseURL
    }

    TestData.create(TestDataObject, function(err,data){

        if(err){
            console.log("Unable to create TestData");
            res.json({success:false, message:err});
            return;
        }
        //add to session
        console.log("success create new TestData");
        res.json({success:true, message:data});
        return;

    });
}