// 处理
// var formidable = require('formidable');
// var path = require('path');
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
// 回复评论
module.exports.replyComment = (req, res) => {
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
  // console.log(req.query)
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
// 关注数据
// module.exports.getFollowData = (req, res) => {
//   modules.followData(req.query.id,(err, data) => {
//     if (err) {
//       res.end('关注数据获取失败')
//     } else {
//       res.end(JSON.stringify(data))
//     }
//   })
// }
// // 取消关注
// module.exports.updateFollow = (req, res) => {
//   // console.log(req.query)
//   modules.noFollow(req.query.id, (err, data) => {
//     if (err) {
//       res.end('取消关注失败')
//     } else {
//       res.end(JSON.stringify({
//         code: 200,
//         msg: '取消关注成功'
//       }))
//     }
//   })
// }
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

// // 上传图片
// module.exports.imgUpload = function (req, res) {
//   var form = new formidable.IncomingForm();
//   // 是否保留后缀名
//   form.keepExtensions = true;
//   // 上传到文件夹
//   form.uploadDir = './images/';
//   form.parse(req, (err, fields, files) => {
//     if (err) {
//       var obj = {
//         'code': 0,
//         'msg': '图片上传错误'
//       };
//       return res.end(JSON.stringify(obj));
//     }
//     // 获取之前的图片名称
//     var last = fields.last;
//     // 删除上次上传的图片
//     fs.unlink(__dirname + '/images/' + last, () => { });
//     // 返回获取到的文件名
//     var imgPath = path.parse(files.img.path).base;
//     var obj = {
//       'code': 1,
//       'msg': '图片上传成功',
//       'img': imgPath
//     };
//     res.end(JSON.stringify(obj));
//   });

// }