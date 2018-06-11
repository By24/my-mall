var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    title: String,
    type: String,
    sort: Number,
    dataNum: Number,
    disabled: Boolean,
    addr: String,
    time: String,
    updateTime: String
})