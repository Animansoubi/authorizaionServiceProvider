var serviceModel = require('../model/serviceModel');
var config = require('../common/config');

var jwt = require('jsonwebtoken');

var client = null;
var body = null;
var serviceKey = null;
var token = null;

function provide(router) {
    try {
        router.get('/verify', mainHandler);
    } catch (e) {
        console.log(e);
    }
}

function mainHandler(req, res) {
    client = res;
    body = req;
    serviceKey = body.headers["servicekey"];
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
        console.log(serviceModel.token);
        client.send(token);
    }


}

exports.provide = provide;