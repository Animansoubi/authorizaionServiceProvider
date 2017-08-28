var express = require("express");
var router = express.Router();

var register = require("../controller/serviceRegister");
register.provide(router);

var login = require("../controller/login");
login.provide(router);

var userInfo = require("../controller/uaerInfo");
userInfo.provide(router);

module.exports = router;
