var serviceModel = require('../model/serviceModel');
var config = require('../common/config');
var response =require('../common/const');

var jwt = require('jsonwebtoken');

var client = null;
var serviceKey = null;
var token = null;

function provide(router) {
    try {
        router.get('/login/:serviceKey', mainHandler);
    } catch (e) {
        console.log(e);
    }
}

function mainHandler(req, res) {
    client = res;
    serviceKey = req.params["serviceKey"];
    console.log(serviceKey);
    var query = {_id: serviceKey};
    console.log(query);
    serviceModel.findOne(query, findServiceKeyCallBack);
}

function findServiceKeyCallBack(err, doc) {
    if (err) {
        console.log(err);
    }
    else {
        console.log(doc);
        token = jwt.sign(doc._id, config.secret, {
            expiresIn: '432000000m'
        });
        serviceModel.token = token;
        var url ="https://telegram.me/authspbot?start="+token;
        var returnResponse = response.SUCCESS_TOKEN;
        returnResponse.url = url;
        client.send(returnResponse);
    }
}

exports.provide = provide;
