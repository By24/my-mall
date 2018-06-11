var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    title: String,
    type: String,
    showId: String,
    sort: Number,
    ifs: Boolean,
    imgUrl:String,
    time: String,
    updateTime: String
})
