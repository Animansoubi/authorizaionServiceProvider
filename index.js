var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/authorizationServiceProvider', {useMongoClient: true});

var userModel = require('./model/userModel');
var serviceModel = require('./model/serviceModel');
var config = require('./common/configBotTooken');

const Telegraf = require('telegraf');
const app = new Telegraf(config.BOT_TOKEN);

var firstName = null;
var lastName = null;
var userName = null;
var token = null;
var profileImgUrl = null;

app.command('start', (ctx) => {

    firstName = ctx.from.first_name;
    logger("firstName", firstName);
    lastName = ctx.from.last_name;
    logger("lastName", lastName);
    userName = ctx.from.username;
    logger("userName", userName);
    token = ctx.message.text.split(' ')[1];
    logger("token", token);

    app.telegram.getUserProfilePhotos(ctx.from.id, 0, 10)
    //fulfill
        .then(function (data) {
            var file_id = data.photos[0][2].file_id;
            logger("FileId", file_id);
            app.telegram.getFileLink(file_id).then(function (url) {
                profileImgUrl = url;
                logger("Image", profileImgUrl);
            });
            //reject
        }, function (data) {
            console.log(data)
        });


    ctx.reply("Welcome " + firstName + lastName + "\n do you want share your info for login with telegram?\n if yes type y else type n");
});

app.hears('y', ({reply}) => {

    serviceModel.find({token:token}, function (err, doc) {
        if (err) {
            console.log(err);
        } else {
            console.log(doc);
            var newUser = userModel({
                firstName: firstName,
                lastName: lastName,
                userName: userName,
                avatar: profileImgUrl
            });
            newUser.save(function (err, doc) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(doc);
                }
            });
        }
    });
    return reply('click to this link for login\n');
});

app.hears('n', ({reply}) => {
    return reply('tanx goodby');
});

app.catch((err) => {
    console.log('Ooops', err);
});

function logger(tag, log) {
    console.log("Logger -> Tag : " + tag + "\nLog Text :" + JSON.stringify(log) + "\n")
}

app.startPolling(3, 100);


