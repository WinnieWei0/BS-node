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
// 留言数据
module.exports.getMessageData = (req, res) => {
  modules.getMsgData((err, data) => {
    if (err) {
      res.end('留言数据获取失败')
    } else {
      res.end(JSON.stringify(data))
    }
  })
}
// 粉丝数据
module.exports.getFunsData=(req,res)=>{
modules.FunsData((err,data)=>{
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
  modules.updateFunsStatus(req.query.id,(err,data)=>{
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
module.exports.getFollowData = (req, res) => {
  modules.followData((err, data) => {
    if (err) {
      res.end('关注数据获取失败')
    } else {
      res.end(JSON.stringify(data))
    }
  })
}
// 取消关注
module.exports.updateFollow = (req, res) => {
  // console.log(req.query)
  modules.noFollow(req.query.id, (err, data) => {
    if (err) {
      res.end('取消关注失败')
    } else {
      res.end(JSON.stringify({
        code: 200,
        msg: '取消关注成功'
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

// module.exports.getIndexPage = function (req, res) {
//   myModules.getAllData((err, data) => {
//     if (err) return res.end('数据获取失败');
//     res.render(__dirname + '/views/index.html', { 'heros': data }, (err, result) => {
//       if (err) {
//         res.end('服务器异常');
//       } else {
//         res.writeHeader(200, { 'Content-Type': 'text/html;chartset=utf-8' });
//         res.end(result);
//       }
//     });
//     // 只能返回字符串，本来输出为buffer
//     // res.end(data.toString());
//   });
// }
// module.exports.getAddPage = function (req, res) {
//   fs.readFile(__dirname + '/views/add.html', (err, data) => {
//     if (err) return res.end('服务器异常');
//     res.writeHeader(200, { 'Content-Type': 'text/html;chartset=utf-8' });
//     res.end(data);
//   });
// }
// module.exports.getEditPage = function (req, res) {
//   var url = req.url;
//   var id = myurl.parse(url, true).query.id;
//   myModules.getDataId(id, (err, data) => {
//     if (err) return res.end('err0');
//     // console.log(data);
//     res.render(__dirname + "/views/edit.html", data[0], (err, result) => {
//       if (err) { return res.end('err1'); }
//       res.writeHeader(200, { "Content-Type": "text/html;charset=utf-8" });
//       res.end(result);
//     });
//   });
// }
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
// module.exports.doAdd = function (req, res) {
//   var str = '';
//   req.on('data', (chunk) => {
//     str += chunk;
//   });
//   req.on('end', () => {
//     // 使用地址栏参数解析成对象，必须要？,true表示输出为对象
//     var obj = myurl.parse('?' + str, true).query;
//     myModules.insertData(obj, (err, data) => {
//       // console.log(data);
//       if (err) {
//         var o = {
//           'code': 0,
//           'msg': '添加失败'
//         };
//         res.end(JSON.stringify(o));
//       } else if (data.affectedRows) {
//         var o = {
//           'code': 1,
//           'msg': '添加成功'
//         };
//         res.end(JSON.stringify(o));
//       }
//     });
//   });
// }
// module.exports.doEdit = function (req, res) {
//   var str = '';
//   req.on('data', (chunk) => {
//     str += chunk;
//   });
//   req.on('end', () => {
//     var obj = queryString.parse(str.toString());
//     console.log(obj);
//     myModules.updateData(obj, (err, data) => {
//       if (err) {
//         console.log(err);
//         var o = {
//           'code': 0,
//           'msg': '修改失败'
//         }
//         return res.end(JSON.stringify(o));
//       } else {
//         var o = {
//           'code': 1,
//           'msg': '修改成功'
//         };
//         return res.end(JSON.stringify(o));
//       }
//     });
//   });
// }
// module.exports.doDel = function (req, res) {
//   var url = req.url;
//   console.log(url);
//   var id = myurl.parse(url, true).query.id;
//   myModules.delData(id, (err, result) => {
//     // console.log(result);
//     if (err) {
//       var obj = {
//         'code': 0,
//         'msg': '删除失败'
//       }
//       return res.end(JSON.stringify(obj));
//     } else {
//       var obj = {
//         'code': 1,
//         'msg': '删除成功'
//       };
//       return res.end(JSON.stringify(obj));
//     }
//   });
// }

// module.exports.getStatic = function (req, res) {
//   var url = req.url;
//   fs.readFile(__dirname + url, (err, data) => {
//     if (err) {
//       res.end('err');
//     } else {
//       res.end(data);
//     }
//   });
// }