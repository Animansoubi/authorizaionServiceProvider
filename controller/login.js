var response = require('../common/const');
var mongoose = require('mongoose');
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


    // var tokenifyService = {
    //     serviceKey: serviceModel.serviceKey
    // };
    // var token = jwt.sign(tokenifyService, config.secret, {
    //     expiresIn: '432000000m'
    // });
}

exports.provide = provide;