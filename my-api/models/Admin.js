var mongoose = require('mongoose');
var mallTitleSchema = require('../schemas/admin');

module.exports = mongoose.model('Admin',mallTitleSchema)