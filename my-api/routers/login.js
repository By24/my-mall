var express = require('express')
var Title = require('../models/Title')
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

// 登陆
router.post('/login', function (req, res, next) {
    responseData.code = 200;
    responseData.msg = req.body.user;
    responseData.data = [];
    res.json(responseData)
})

module.exports = router;