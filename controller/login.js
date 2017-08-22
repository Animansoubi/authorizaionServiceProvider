var response = require('../common/const');
var serviceModel = require('../model/serviceModel');
var config = require('../common/config');

var jwt = require('jsonwebtoken');

var client = null;
var body = null;
var token = null;

function provide(router) {
    try {
        router.get('/login', mainHandler);
    } catch (e) {
        console.log(e);
    }
}

function mainHandler(req, res) {
    client = res;
    body = req;
    token = body.headers["token"];
    var query = {token :token};
    console.log(query);
   serviceModel.findOne(query,findCollectionCallBack);
}
function findCollectionCallBack(err,collection) {
    if(err){
        console.log(err);
    }else{
        console.log(collection);
        client.send(collection)
    }
}

exports.provide = provide;