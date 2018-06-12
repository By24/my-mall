var express = require("express");
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var Cookies = require('cookies')
var Admin = require('./models/Admin')
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

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// 设置cookie
app.use(function (req, res, next) {
    req.cookies = new Cookies(req, res);
    // 解析用户登录cookies信息
    req.userInfo = {};
    if (req.cookies.get('userInfo')) {
        try {
            req.userInfo = JSON.parse(req.cookies.get('userInfo'))
            Admin.findById(req.userInfo._id).then(function (userInfo) {
                req.userInfo.isAdmin = Boolean(!userInfo.isAdmin)
                console.log(req.userInfo.isAdmin,"33333333333333333")
                next();
            })
        } catch (e) { }
    } else {
        next();
    }
})


app.use('/api', require("./routers/login"))
// app.use('/', require("./routers/main"))
app.use('/sysList', require("./routers/sysList"))
//商城管理
app.use('/mall', require("./routers/mallManage"))
app.use('/mall', require("./routers/mallCarousel"))
// 用户管理
app.use('/users', require("./routers/users"))

mongoose.connect('mongodb://127.0.0.1:27017/adminData', function (err) {
    if (err) {
        console.log('数据库连接失败')
    } else {
        console.log('连接成功')
        app.listen(8000);
    }
})
