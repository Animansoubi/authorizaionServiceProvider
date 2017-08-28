var serviceModel = require('../model/serviceModel');
var response = require('../common/const');
var randomString = require('randomstring');

var client = null;
var serviceKey = null;

function provide(router) {
    try {
        router.get('/login/:serviceKey', mainHandler);
    } catch (err) {
        console.log(err);
    }
}

function mainHandler(req, res) {
    client = res;
    serviceKey = req.params["serviceKey"];
    serviceModel.findOne({_id: serviceKey}, findServiceKeyCallBack);
}

function findServiceKeyCallBack(err, doc) {
    if (err) {
        console.log(err);
    }
    else {
        console.log(doc);

        serviceModel.update({_id: serviceKey}, {$set: {ServiceToken: serviceKey}}, function (err) {
            if (err) {
                console.log(err);
            } else {
                var url = "https://telegram.me/authspbot?start=" + serviceKey;
                var returnResponse = response.SUCCESS_TOKEN;
                returnResponse.url = url;
                client.send(returnResponse);
            }
        });

    }
}

exports.provide = provide;
