var response = require('../common/const');
var serviceModel = require('../model/serviceModel');

var client = null;
var newService = null;

function provide(router) {
    try {
        router.post('/service/register', mainHandler);
    } catch (e) {
        console.log(e);
    }
}

function mainHandler(req, res) {
    client = res;
    console.log(req.body.serviceName);
    console.log(req.body.serviceUrl);
    if (req.body.serviceName == undefined || req.body.serviceUrl == undefined) {
        client.send(response.BAD_BODY_ERROR);
    } else {
        newService = serviceModel({serviceName: req.body.serviceName, serviceUrl: req.body.serviceUrl});
        console.log(newService);
        var query = {serviceName: newService.serviceName};
        serviceModel.findOne(query, findServiceNameCallBack);
    }
}

function findServiceNameCallBack(err, service) {
    if (err) {
        console.log(err);
        client.send(response.DB_ERROR);
    } else {
        if (service == null) {
            saveNewService();
        } else {
            client.send(response.SERVICE_ALREADY_EXIST);
        }
    }
}

function saveNewService() {
    newService.save(function (err , doc) {
            if (err) {
                console.log(err);
                client.send(response.DB_ERROR);
            } else {
                var returnResponse = response.SUCCESS_SERVICEKEY;
                returnResponse.serviceKey = doc._id;
                client.send(response.SUCCESS_SERVICEKEY);
            }
        }
    );
}

exports.provide = provide;