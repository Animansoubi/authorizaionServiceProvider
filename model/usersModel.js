/**
 * Created by Anahid on 26/05/2017.
 */

var mongoose = require('mongoose');

var schema = mongoose.Schema;

userInfoSchema = new schema({
    firstName: String,
    lastName: String,
    phone: String,
    active: Boolean,
    pic: file
});

var userInfo = mongoose.model('users', userInfoSchema);
module.exports = userInfo;