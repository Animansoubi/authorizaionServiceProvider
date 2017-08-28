var userModel = require('../model/userModel');

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
                res.send("Error");
            } else if (doc == null) {
                res.send("Error1");
            }
            else {
                res.send(doc);
            }

        });
    }
}

exports.provide = provide;