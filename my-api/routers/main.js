var express = require('express')
// var Title = require('../models/Title')
var router = express.Router();
const qn = require('qn');
var fs = require('fs');
const bucket = 'avatar-img-d';
const client = qn.create({
    accessKey: 'n83SaVzVtzNbZvGCz0gWsWPgpERKp0oK4BtvXS-Y',
    secretKey: '1Uve9T2_gQX9pDY0BFJCa1RM_isy9rNjfC4XVliW',
    bucket: bucket,
    origin: 'http://ouibvkb9c.bkt.clouddn.com'
})
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
// 上传
router.all('/upload',  (req, res, next) => {
    console.log(req.body)
    res.json(req.body)
    return
    var imgData = req.body.imgData || "10321321";
    // 构建名
    var fileName = Date.now() + '.mp3';
    // 构建路径
    var filePath = './image/' + fileName;
    // 过滤data:URL
    // var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer(imgData, 'base64' );
    try {
        fs.writeFile(filePath, dataBuffer, function (err) {
            if (err) {
                res.end(JSON.stringify({status: '102', msg: '文件写入失败'}));
            } else {
                client.uploadFile(filePath, {key: `/avatar/${fileName}`}, function (err1, result) {

                    res.json({
                        status: '0',
                        result: {
                            path: result.url
                        },
                        msg: 'suc'
                    })
                    
                    // 上传之后删除本地文件
                    fs.unlinkSync(filePath);
                });
            }
        })
    } catch (err) {
        res.json({
            status: '1',
            msg: err.message
        });
    }

})

module.exports = router;