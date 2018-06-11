var mongoose = require('mongoose');
var mallCarouselSchema = require('../schemas/mallCarousel');

module.exports = mongoose.model('MallCarousel',mallCarouselSchema)