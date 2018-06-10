var mongoose = require('mongoose');
var mallTitleSchema = require('../schemas/malltitle');

module.exports = mongoose.model('Title',mallTitleSchema)