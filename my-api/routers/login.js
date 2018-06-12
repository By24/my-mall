var express = require('express')
var Admin = require('../models/Admin')
var router = express.Router();

//同一返回格式
var responseData;
router.use(function (req, res, next) {
    responseData = {
        code: 0,
        msg: ''
    }
    next()
})
// 注册
router.post('/register', function (req, res, next) {
    console.log(req.body)
    var username = req.body.username;
    var password = req.body.password;
    var repassword = req.body.repassword;

    if (username == '') {
        responseData.code = 1;
        responseData.msg = '用户名不能为空';
        res.json(responseData);
        return;
    }
    if (password == '') {
        responseData.code = 100;
        responseData.msg = '密码不能为空';
        res.json(responseData);
        return;
    }

    Admin.findOne({
        username: username
    }).then(function (userInfo) {
        console.log(userInfo)
        if (userInfo) {
            responseData.code = 100;
            responseData.msg = '用户名已被注册';
            res.json(responseData);
            return;
        }
        var user = new Admin({
            username: username,
            password: password,
            date: new Date()
        })
        return user.save()
    }).then(function (newUserInfo) {
        console.log(newUserInfo)
        responseData.msg = '注册成功';
        res.json(responseData);
    })
})
// 登录
router.post('/login', function (req, res, next) {
    let username = req.body.username || "";
    let password = req.body.password || "";
    if (username == '' || password == '') {
        console.log('用户名或密码不能为空')
        responseData.code = 100;
        responseData.msg = '用户名或密码不能为空';
        res.json(responseData);
        return;
    }
    Admin.findOne({
        username: username,
        password: password
    }).then(function (userInfo) {
        if (!userInfo) {
            responseData.code = 100;
            responseData.msg = '用户名或密码错误';
            res.json(responseData);
            return;
        } else {
            responseData.msg = '登录成功';
            responseData.code = 200;
            responseData.data = {
                token: userInfo._id,
                username: userInfo.username,
                password: userInfo.password
            }
            console.log(username,userInfo)
            // req.cookies.set('userInfo', JSON.stringify({
            //     token: userInfo._id,
            //     username: userInfo.username
            // }))
            res.json(responseData);
        }

    })
})


module.exports = router;