var express = require("express");
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var Cookies = require('cookies')
var app = express();

//允许所有js来进行访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");//或者 res.header("Access-Control-Allow-Origin", "http://127.0.0.1:3333"); 就只允许 127.0.0.1:3333来访问
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") res.send(200);/*让options请求快速返回*/
    else next();
});
app.use('/api', require("./routers/login"))
app.use('/', require("./routers/main"))
app.use('/sysList', require("./routers/sysList"))

mongoose.connect('mongodb://127.0.0.1:27017/adminData', function (err) {
    if (err) {
        console.log('数据库连接失败')
    } else {
        console.log('连接成功')
        app.listen(8000);
    }
})
