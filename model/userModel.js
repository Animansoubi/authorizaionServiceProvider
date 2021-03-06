var mongoose = require('mongoose');

var schema = mongoose.Schema;

userInfoSchema = new schema({
    firstName: String,
    lastName: String,
    userName: String,
    avatar: String,
    userToken: String,
    serviceId: String
});

var userInfo = mongoose.model('users', userInfoSchema);
module.exports = userInfo;