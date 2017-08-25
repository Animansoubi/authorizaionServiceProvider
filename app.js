var router = require('./common/router');
var config = require('./common/const');

var path = require('path');
var express = require('express');
var app = express();

//set view engine
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "jade");

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
app.get('/register', function(req, res){
    res.render('registerForm');
});
app.get('/login', function(req, res){
    res.render('serviceLogin');
});
app.get("/complete/:serviceKey" , function (req, res) {
    console.log("YEP" + req.params["serviceKey"]);
    res.render('complete', { serviceKey: req.params["serviceKey"] })
});

var port = process.env.PORT || 3001;
var server = app.listen(port, function () {
    console.log('Server is up and running..');
});

