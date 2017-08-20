var response = require('../common/const');
var serviceModel = require('../model/serviceModel');
var config = require('../common/config');

var jwt = require('jsonwebtoken');

var client = null;
var body = null;

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
}

exports.provide = provide;