var mongoose = require('mongoose');
var titleSchema = require('../schemas/title');

module.exports = mongoose.model('Title',titleSchema)