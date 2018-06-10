var express = require('express')
var MallManage = require('../models/MallManage')
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
// 模块列表
router.post('/findModule', function (req, res, next) {
    var page = Number(req.body.page || 1);
    var limit = Number(req.body.limit || 10);
    var pages = 0
    MallManage.count().then(function (total) {//获取总条数
        //计算总页数
        pages = Math.ceil(total / limit)
        //取值不能超过page
        page = Math.min(page, pages)
        //取值不能小于1
        page = Math.max(page, 1)
        var skip = (page - 1) * limit;
        MallManage.find().sort({ _id: -1 }).limit(limit).skip(skip).then(function (resCategory) {//获取页数
          if(resCategory){
            responseData.code = 200;
            responseData.msg = 'ok';
            responseData.data = resCategory;
            responseData.total = total;
            responseData.pages = pages;
            responseData.limit = limit;
            responseData.page = page;
            res.json(responseData);
            return
          }else{
            responseData.code = 100;
            responseData.msg = '获取失败';
            return
          }
        });
    })
})
// 添加模块
router.post('/addModule', function (req, res, next) {
    var { title, type, sort, dataNum, disabled, addr } = req.body;
    if(!title){
        responseData.msg = "板块名称不能为空";
        res.json(responseData)
        return
    }
    MallManage.findOne({
        title: title
    }).then(function (info) {
        if (info) {
            responseData.code = 100;
            responseData.msg = '板块已存在';
            res.json(responseData);
            return;
        }
        var MallManages = new MallManage({
            title:title,
            type:type,
            sort:sort,
            dataNum:dataNum,
            disabled:disabled,
            addr:addr,
            addDate: new Date()
        })
        return MallManages.save()
    }).then(function (newTitleInfo) {
        responseData.code = 200;
        responseData.msg = '添加成功';
        res.json(responseData);
    })
})
// 修改分类
router.post("/editModule", function (req, res, next) {
    var { title, type, sort, dataNum, disabled, addr, id} = req.body;
    MallManage.findOne({
        _id: id
    }).then(function (category) {
        if (!category) {
            responseData.code = 100;
            responseData.msg = '板块信息不存在';
            res.json(responseData);
            return Promise.reject()
        } else {
            // 当用户没有做任何修改提交的时候
            if (title == category.title && sort == title.sort) {
                responseData.code = 200;
                responseData.msg = '修改成功';
                res.json(responseData);
                return Promise.reject()
            } else {
                return MallManage.findOne({
                    _id: { $ne: id },
                    title: title,
                    type:type,
                    sort:sort,
                    dataNum:dataNum,
                    disabled:disabled,
                    addr:addr,
                    updateDate: new Date()
                })
            }
        }
    }).then(function (sameCategory) {
        if (sameCategory) {
            responseData.code = 100;
            responseData.msg = '数据库中已经存在同名板块';
            res.json(responseData);
            return Promise.reject()
        } else {
            // 第一个参数是修改的id 第二个是修改的参数
            MallManage.update({
                _id: id
            }, {
                title:title,
                type:type,
                sort:sort,
                dataNum:dataNum,
                disabled:disabled,
                addr:addr,
                updateDate: new Date()
            }).then(function () {
                responseData.code = 200;
                responseData.msg = '修改成功';
                res.json(responseData);
                return Promise.reject()
            })
        }
    })
})
//删除板块
router.post('/delete', function (req, res, next) {
    var str = req.body.id
        id = str.split(",")
    for(var i = 0; i < id.length; i++){
        MallManage.remove({
            _id: id[i]
        }).then(function(){
            if(i == id.length){
                responseData.code = 200;
                responseData.msg = '删除成功';
                res.json(responseData);
            }
        })
    }
})
// 禁用、启用
router.post('/ifs', function (req, res, next) {
  var { id, disabled } = req.body;
  MallManage.update({
        _id: id
    }, {
        disabled:disabled,
    }).then(function (re) {
        if(!disabled){
            responseData.msg = '已禁用';
        }else{
            responseData.msg = '已启用';
        }
        responseData.code = 200;
        res.json(responseData);
        return Promise.reject()
    })
})
module.exports = router;