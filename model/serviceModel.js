var mongoose = require('mongoose');
var schema = mongoose.Schema;

serviceSchema = new schema({
    serviceName: String,
    serviceUrl: String
});

var service = mongoose.model('services', serviceSchema);
module.exports = service;