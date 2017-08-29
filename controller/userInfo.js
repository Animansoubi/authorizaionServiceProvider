var userModel = require('../model/userModel');
var response = require('../common/const');

function provide(router) {
    try {
        router.get('/user/info/:token', mainHandler);
    } catch (err) {
        console.log(err);
    }
}

function mainHandler(req, res) {
    var token = req.params["token"];
    console.log("User-Info-Log : " + token);
    if (typeof token !== 'undefined') {
        userModel.findOne({userToken: token}, function (err, doc) {
            if (err) {
                res.send(response.DB_ERROR);
            } else if (doc == null) {
                res.send(response.DB_ERROR_EMPTY);
            }
            else {
                res.send(doc);
            }
        });
    }
}

exports.provide = provide;