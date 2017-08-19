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
    newService = serviceModel({serviceName: req.body.serviceName, serviceUrl: req.body.serviceUrl});
    console.log(newService);
    var query = {serviceName: newService.serviceName};
    serviceModel.findOne(query, findServiceNameCallBack);
}

function findServiceNameCallBack(err, serviceName) {
    if (err) {
        console.log(err);
    } else {
        if (serviceName == null) {
            saveNewService();

            // console.log(serviceModel.serviceKey);

        } else {
            client.send(response.SERVICE_ALREADY_EXIST);
        }
    }
}


function saveNewService() {
    newService.save(function (err) {
            if (err) {
                console.log(err);
            } else {
                serviceModel.serviceKey = newService._id;
                var returnResponse = response.SUCCESS_INSERT;
                returnResponse.serviceKey = serviceModel.serviceKey;
                client.send(response.SUCCESS_INSERT);
            }
        }
    );
}

exports.provide = provide;