var express = require("express");
var router = express.Router();

var login = require("../controller/serviceRegister");
login.provide(router);

var login = require("../controller/login");
login.provide(router);

module.exports = router;
