// 连接数据库
var sql = require('mysql');
var con = sql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'bs'
});
con.connect();
// 登录
module.exports.getUserData = function (callback) {
  var sql = 'select * from user';
  con.query(sql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      // console.log(result)
      callback(null, result);
    }
  });
}
// 注册
module.exports.insertUserData = function (obj, callback) {
  var sql = `insert into user(userName,userPwd) values(?,?)`;
  con.query(sql, [obj.userName, obj.userPwd], (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}
// 修改密码
module.exports.delWork = function (obj, callback) {
  var sql = 'update user set userPwd=' + obj.password + ' where user_id=' + obj.id;
  con.query(sql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}
// 发布作品
module.exports.insertWork = function (obj, callback) {
  var sql = 'insert into work(workName,workDetail,workCode) values(?,?,?)';
  con.query(sql, [obj.workName, obj.workDetail, obj.workCode], (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}
// 删除作品
module.exports.delWork = function (id, callback) {
  var sql = 'update work set isDel=1 where w_id=' + id;
  con.query(sql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}
//查看留言
module.exports.getMsgData = function (callback) {
  var sql = 'select * from message';
  con.query(sql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}
// 回复留言
module.exports.insertMsgData = function (obj, callback) {
  var sql = `insert into message(user_id,mDetail) values(?,?)`;
  con.query(sql, [obj.user_id, obj.mDetail], (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}
// 给我的评论--查看
module.exports.getCTMData = function (callback) {
  var sql = 'select * from message';
  con.query(sql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}
// 给我的评论--回复
module.exports.insertCTMData = function (obj, callback) {
  var sql = `insert into commenttome(user_id,w_id,cmDetail) values(?,?,?)`;
  con.query(sql, [obj.user_id,obj.w_id,obj.cmDetail], (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}
// 我的粉丝--查看
module.exports.getCTMData = function (callback) {
  var sql = 'select * from funs';
  con.query(sql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}
// 我的粉丝--关注他
module.exports.delWork = function (id, callback) {
  var sql = 'update funs set status=1 where funs_id=' + id;
  con.query(sql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}
// 我的关注--查看
module.exports.getCTMData = function (callback) {
  var sql = 'select * from follow';
  con.query(sql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}
// 我的关注--取消关注
module.exports.delWork = function (id, callback) {
  var sql = 'update funs set status=0 where follow_id=' + id;
  con.query(sql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}