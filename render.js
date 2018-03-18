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
  console.log(req)
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