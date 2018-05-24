var express = require("express");
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var swig = require("swig");
var Cookies = require('cookies')
var app = express();


app.use('/', require("./routers/main"))

mongoose.connect('mongodb://127.0.0.1:27017/adminData', function (err) {
    if (err) {
        console.log('数据库连接失败')
    } else {
        console.log('连接成功')
        app.listen(8000);
    }
})
