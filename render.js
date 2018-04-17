// 处理
var formidable = require('formidable');
var path = require('path');
var myurl = require('url');
var queryString = require('querystring');
var modules = require('./module.js');
// var fs = require('fs');
// 登录
module.exports.login = (req, res) => {
  modules.getUserData(req.body.userName, (err, data) => {
    if (err) {
      res.end('登录失败')
    } else {
      res.end(JSON.stringify(data))
    }
  })
}
// 注册
module.exports.register = (req, res) => {
  modules.getUserData(req.body.userName, (err, data) => {
    if (err) {
      res.end('注册失败1')
    } else {
      return res.end(JSON.stringify({
        code: 500,
        msg: '账号已存在'
      }))
    }
    modules.insertUserData(req.body, (err, data) => {
      if (err) {
        return res.end('注册失败2')
      } else {
        return res.end(JSON.stringify({
          code: 200,
          msg: '注册成功'
        }))
      }
    })
  })
}
// 发布作品
module.exports.addWork=(req,res)=>{
  modules.insertWork(req.query,(err,data)=>{
    if(err){
      res.end('发布失败')
    }else{
      res.end(JSON.stringify({
        code: 200,
        msg: '发布成功'
      }))
    }
  })
}
// 首页数据
module.exports.getHomeData=(req,res)=>{
  let homeData={}
  modules.getNewWork((err,data)=>{
    if(err){
      res.end('最新作品数据获取失败')
    }else{
      homeData.newWork = data
    }
  })
  modules.getGoodWork((err, data) => {
    if (err) {
      res.end('推荐作品数据获取失败')
    } else {
      homeData.goodWork = data
    }
  })
  modules.getGoodAuther((err, data) => {
    if (err) {
      res.end('推荐作者数据获取失败')
    } else {
      homeData.goodAuther = data
  res.end(JSON.stringify(homeData))
    }
  })
}
//评论数据
module.exports.getComment=(req,res)=>{
  modules.getCommentData((err,data)=>{
    if(err){
      res.end('评论数据获取失败')
    }else{
      res.end(JSON.stringify(data))
    }
  })
}
//文章评论数据
module.exports.getOneComment = (req, res) => {
  modules.getOneCommentData(req.query.id,(err, data) => {
    if (err) {
      res.end('评论数据获取失败')
    } else {
      res.end(JSON.stringify(data))
    }
  })
}
// 回复评论
module.exports.replyComment = (req, res) => {
  req.query.isShow=Number(req.query.isShow)
  modules.insertCommentData(req.query,(err, data) => {
    if (err) {
      res.end('评论回复失败')
    } else {
      res.end(JSON.stringify({
        code:200,
        msg:'回复成功'
      }))
    }
  })
}
// 留言数据
module.exports.getMessageData = (req, res) => {
  modules.getMsgData(req.query.id,(err, data) => {
    if (err) {
      res.end('留言数据获取失败')
    } else {
      res.end(JSON.stringify(data))
    }
  })
}
// 回复留言
module.exports.replyMessage=(req,res)=>{
  modules.replyMsg(req.query,(err,data)=>{
    if (err) {
      res.end('留言回复失败')
    } else {
      res.end(JSON.stringify({
        code:200,
        msg:'回复留言成功'
      }))
    }
  })
}
// 粉丝数据
module.exports.getFunsData=(req,res)=>{
modules.FunsData(req.query.id,(err,data)=>{
  if (err) {
    res.end('粉丝数据获取失败')
  } else {
    res.end(JSON.stringify(data))
  }
})
}
// 关注粉丝
module.exports.updateFuns=(req,res)=>{
  modules.updateFunsStatus(req.query,(err,data)=>{
    if (err) {
      res.end('关注该粉丝失败')
    } else {
      res.end(JSON.stringify({
        code:200,
        msg:'关注成功'
      }))
    }
  })
}
// 添加好友
module.exports.addFuns=(req,res)=>{
  modules.selectOne(req.query.user_id,(err,data)=>{
    if(data.length){
      res.end('已关注')
    }else{
      modules.addFunsData(req.query,(err,data)=>{
    if (err) {
      res.end('添加好友失败')
    } else {
      res.end(JSON.stringify({
        code:200,
        msg:'添加好友成功'
      }))
    }
  })
    }
  })
}
// 添加留言
module.exports.addMessage = (req, res) => {
  modules.addMessageData(req.query, (err, data) => {
    if (err) {
      res.end('添加失败')
    } else {
      res.end(JSON.stringify({
        code: 200,
        msg: '添加成功'
      }))
    }
  })
}
//修改密码
module.exports.changepwd=(req,res)=>{
  console.log(req)
  modules.modify(req.body,(err,data)=>{
    if (err) {
      res.end('修改密码失败')
    } else {
      res.end(JSON.stringify({
        code: 200,
        msg: '修改密码成功'
      }))
    }
  })
}
// 删除作品
module.exports.delWork=(req,res)=>{
  modules.delWorkData(req.query.id,(err,data)=>{
    if(err){
      res.end('作品删除失败')
    }else{
      res.end(JSON.stringify({
        code:200,
        msg:'删除成功'
      }))
    }
  })
}
// 个人中心
module.exports.getUserList = (req, res) => {
  modules.userListData(req.query.id, (err, data) => {
    if (err) {
      res.end('个人中心数据获取失败')
    } else {
      res.end(JSON.stringify(data))
    }
  })
}
// 作品详情
module.exports.workDetail=(req,res)=>{
  modules.workDetailData(req.query.id, (err, data) => {
    if (err) {
      res.end('作品详情数据获取失败')
    } else {
      res.end(JSON.stringify(data))
    }
  })
}
// 点赞
module.exports.thumbs=(req,res)=>{
  modules.thumbsData(req.query.id,req.query.count, (err, data) => {
    if (err) {
      res.end('点赞失败')
    } else {
      res.end(JSON.stringify({
        code:200,
        msg:'点赞成功'
      }))
    }
  })
}
// 上传图片
module.exports.uploadImg = function (req, res) {
  if (req.url == '/uploadimg' && req.method.toLowerCase() == 'post') {
    var form = new formidable.IncomingForm();
    // console.log(form)
  form.keepExtensions = true;
  // 上传到文件夹
  form.uploadDir = './images/img';
    form.parse(req, function (err, fields, files) {
      res.end(JSON.stringify(files))
    });
}
}
// 上传文件
module.exports.uploadFile = function (req, res) {
  if (req.url == '/uploadfile' && req.method.toLowerCase() == 'post') {
    var form = new formidable.IncomingForm();
    form.keepExtensions = true;
    // 上传到文件夹
    form.uploadDir = './images/file';
    form.parse(req, function (err, fields, files) {
      res.end(JSON.stringify(files))
    });
  }
}
