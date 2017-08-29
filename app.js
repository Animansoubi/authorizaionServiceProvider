var router = require('./common/router');
var config = require('./common/const');
var request = require('request');
var path = require('path');
var express = require('express');
var pug = require('pug');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true}));

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/authorizationServiceProvider', {useMongoClient: true});

app.use(config.MAIN_API_URL, router);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/register', function (req, res) {
    res.render('registerForm');
});

app.get('/login', function (req, res) {
    res.render('serviceLogin');
});

app.get('/complete/:serviceKey', function (req, res) {
    console.log(req.params['serviceKey']);
    res.render('complete', {serviceKey: req.params['serviceKey']})
});

//simulate service caller
app.get('/show/:userToken', function (req, res) {
    var userToken = req.params['userToken'];
    request.get("http://127.0.0.1:3001/api-v.1/user/info/" + userToken, function (err, response, body) {
        console.log("simulated service caller : " + body);
        console.log("simulated service caller : " + err);
        if (err) {
            res.render('showUserInfo', {err: err});
        } else {
            body = JSON.parse(body);
            res.render('showUserInfo', {
                userName: body.userName,
                firstName: body.firstName,
                lastName: body.lastName,
                imageUrl: body.avatar
            });
        }
    });
});

var port = process.env.PORT || 3001;
app.listen(port, function () {
    console.log('Server is up and running..');
});

