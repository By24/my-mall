var express = require('express')
// var Title = require('../models/Title')
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
// 登陆
router.post('/login', function (req, res, next) {
    console.log(req.body)
    responseData.code = 200;
    responseData.msg = "ok";
    responseData.data = req.body
    res.json(responseData)
})

module.exports = router;