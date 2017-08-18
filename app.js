var router = require("./common/router");
var config = require("./common/const");

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var path = require('path');
var fs = require('fs');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/authorizationServiceProvider', {useMongoClient: true,});
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}));

var port = process.env.PORT || 3001;

app.use(config.MAIN_API_URL, router);
app.use(express.static('public'));

var server = app.listen(port, function () {
    console.log("Server is up and running")
});



// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
//
// // uncomment after placing your favicon in /public
// //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));


