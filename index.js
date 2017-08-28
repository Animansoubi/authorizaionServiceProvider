var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/authorizationServiceProvider', {useMongoClient: true});

var userModel = require('./model/userModel');
var serviceModel = require('./model/serviceModel');
var config = require('./common/configBotTooken');

const Telegraf = require('telegraf');
const app = new Telegraf(config.BOT_TOKEN);

var randomString = require('randomstring');

app.command('start', (ctx) => {
    app.telegram.getUserProfilePhotos(ctx.from.id, 0, 10)
        .then(function (data) {
            var file_id = data.photos[0][2].file_id;
            app.telegram.getFileLink(file_id).then(function (url) {
                var profileImgUrl = url;
                var firstName = ctx.from.first_name;
                var lastName = ctx.from.last_name;
                var userName = ctx.from.username;
                var serviceToken = ctx.message.text.split(" ")[1];
                // Check user existence

                userModel.findOne({userName: userName}, function (err, doc) {
                    if (err) {
                        ctx.reply("Data base error , please try again later!")
                    } else if (doc != null) {
                        sendResponseToUser(ctx, firstName, lastName);
                    } else {
                        var newUser = userModel({
                            firstName: firstName,
                            lastName: lastName,
                            userName: userName,
                            avatar: profileImgUrl,
                            userToken: generateRandomToken(),
                            serviceId: serviceToken
                        });
                        newUser.save(function (err) {
                            if (err) {
                                ctx.reply("Data base error , please try again later!")
                            } else {
                                sendResponseToUser(ctx, firstName, lastName);
                            }
                        });
                    }
                });
            });
        }, function (data) {
            console.log(data)
        });
});

function generateRandomToken() {
    userToken = randomString.generate({
        length: 12,
        charset: 'alphabetic'
    });
    return userToken;
}

function sendResponseToUser(ctx, firstName, lastName) {
    ctx.reply("Welcome " + firstName + lastName + "\n Do You Want Share Your Info For Login With Telegram?\n If Yes Type y Else Type n");
}

app.hears('y', ({from, reply}) => {
    console.log(from);
    userModel.findOne({userName: from.username}, function (err, userDoc) {
        if (err) {
            reply("DB Error , please try again later!")
        } else if (userDoc == null) {
            reply("User does not exist !!")
        } else {
            serviceModel.findOne({_id: userDoc.serviceId}, function (err, serviceDoc) {
                if (err) {
                    reply("DB Error , please try again later!")
                } else if (serviceDoc == null) {
                    reply("Service provider does not exist!!")
                } else {
                    var callBackUrl = serviceDoc.serviceUrl + "/" + userDoc.userToken;
                    reply("Please click this link to login for your service provider : " + callBackUrl);
                }
            });
        }
    });
});

app.hears('n', ({from, reply}) => {
    return reply('Tanx Dear' + from.first_name + 'Good By');
});

app.catch((err) => {
    console.log('Ooops', err);
});

function logger(tag, log) {
    console.log("Logger -> Tag : " + tag + "\nLog Text :" + JSON.stringify(log) + "\n")
}

app.startPolling(3, 100);

