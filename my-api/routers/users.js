var express = require('express')
// var Title = require('../models/Title')
var router = express.Router();

//同一返回格式
var responseData;
router.use(function (req, res, next) {
    responseData = {
        code: 0,
        msg: '',
        data: []
    }
    next()
})

// 商品列表
router.post('/userList', function (req, res, next) {
    responseData.code = 200;
    responseData.msg = "ok";
    responseData.data = [{
        name: '喻波',
        sex: 1,
        phone: 13008146219,
        address: '成达佳园',
        logoDate: new Date()
    },{
        name: '喻波',
        sex: 1,
        phone: 13008146219,
        address: '成达佳园',
        logoDate: new Date()
    },{
        name: '喻波',
        sex: 0,
        phone: 13008146219,
        address: '成达佳园',
        logoDate: new Date()
    }];

    res.json(responseData)
    // if(!title){
    //     responseData.code = 100;
    //     responseData.message = "名字不能为空"
    //     res.json(responseData)
    //     return
    // }
    // Title.findOne({
    //     title: title
    // }).then(function (info) {
    //     if (info) {
    //         responseData.code = 300;
    //         responseData.message = '名字已存在';
    //         res.json(responseData);
    //         return;
    //     }
    //     var titles = new Title({
    //         title: title,
    //         date: new Date()
    //     })
    //     return titles.save()
    // }).then(function (newTitleInfo) {
    //     responseData.code = 200;
    //     responseData.message = '添加成功';
    //     res.json(responseData);
    // })
})

module.exports = router;