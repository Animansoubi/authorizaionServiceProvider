/**
 * Created by Anahid on 26/05/2017.
 */

var mongoose = require('mongoose');

var schema = mongoose.Schema;

userInfoSchema = new schema({
    firstName: String,
    lastName: String,
    bio: String,
    phone: String,
    active: Boolean
});

userInfoSchema.pre('save', function (next) {
    if (!this.active) {
        this.active = false;
        this.firstName = '';
        this.lastName = '';
        this.phone = '';
    }
    next();
});
var userInfo = mongoose.model('users', userInfoSchema);
module.exports = userInfo;