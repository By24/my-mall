var express = require('express')
var Title = require('../models/Title')
var router = express.Router();

//同一返回格式
var responseData;
router.use(function (req, res, next) {
    responseData = {
        code: 0,
        message: ''
    }
    next()
})

// 导航
router.get('/navigation', function (req, res, next) {
    var title = req.query.title || ''
    console.log(title)
    if(!title){
        responseData.code = 100;
        responseData.message = "名字不能为空"
        res.json(responseData)
        return
    }
    Title.findOne({
        title: title
    }).then(function (info) {
        if (info) {
            responseData.code = 300;
            responseData.message = '名字已存在';
            res.json(responseData);
            return;
        }
        var titles = new Title({
            title: title,
            date: new Date()
        })
        return titles.save()
    }).then(function (newTitleInfo) {
        responseData.code = 200;
        responseData.message = '添加成功';
        res.json(responseData);
    })
})

module.exports = router;