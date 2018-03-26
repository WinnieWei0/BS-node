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
module.exports.getUserData = function (userName,callback) {
  var sql = `select * from user where userName='${userName}'`;
  con.query(sql,(err, result) => {
    if (err) {
      callback(err);
    } else {
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
module.exports.modify = function (obj, callback) {
  var sql = `UPDATE user set userPwd='${obj.password}' where user_id=${obj.id}`;
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
  var sql = 'insert into work(user_id,workName,workDetail,workCode,createTime) values(?,?,?,?,?)';
  con.query(sql, [obj.user_id,obj.workName, obj.workDetail, obj.workCode,obj.createTime], (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}
// 删除作品
module.exports.delWorkData= function (id, callback) {
  var sql = 'update work set isDel=1 where w_id=' + id;
  con.query(sql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}
// 最新作品
module.exports.getNewWork = function (callback) {
  var sql = `select w_id,userName,workName,createTime from work left join user on work.user_id=user.user_id where isDel=0 order by createTime desc limit 0,10`;
  con.query(sql, (err, result) => {
    if (err) {
      console.log(err)
      callback(err);
    } else {
      callback(null, result);
    }
  });
}
// 推荐作品
module.exports.getGoodWork = function (callback) {
  var sql = `select w_id,userName,workName,workDetail,createTime,count from work left join user on work.user_id=user.user_id where isDel=0 order by count desc limit 0,10`;
  con.query(sql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}
// 优秀作者
module.exports.getGoodAuther = function (callback) {
  var sql = `select work.user_id,userName,sum(count) from work left join user on work.user_id=user.user_id group by user_id order by sum(count) desc`;
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
  var sql = 'SELECT m_id,userName,mDetail from `message` left join user on `message`.user_id=`user`.user_id';
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
// 我的评论--查看
module.exports.getCommentData = function (callback) {
  var sql = 'SELECT c_id,userName,`comment`.w_id,workName,cmDetail from `comment` left join user on `comment`.user_id=`user`.user_id left join work on `work`.w_id=`comment`.user_id';
  con.query(sql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}
// 我的评论--回复
module.exports.insertCommentData = function (obj, callback) {
  var sql = `insert into comment(user_id,w_id,cmDetail) values(?,?,?)`;
  con.query(sql, [obj.user_id,obj.w_id,obj.cmDetail], (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}
// 我的粉丝--查看
module.exports.FunsData = function (callback) {
  var sql = 'SELECT funs_id,userName,status from `funs` left join user on `funs`.user_id=`user`.user_id';
  con.query(sql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}
// 我的粉丝--关注他
module.exports.updateFunsStatus = function (id, callback) {
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
module.exports.followData = function (callback) {
  var sql = 'SELECT follow_id,userName,status from `follow` left join user on `follow`.user_id=`user`.user_id';
  con.query(sql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}
// 我的关注--取消关注
module.exports.noFollow = function (id, callback) {
  var sql = 'update follow set status=0 where follow_id=' + id;
  con.query(sql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}
// 个人中心数据
module.exports.userListData = function (id,callback) {
  var sql = 'select `work`.w_id,workName,workDetail,count,createTime,count(c_id) as commentCount from work left join comment on `work`.w_id=`comment`.w_id where `work`.user_id='+id+' and isDel=0 group by `work`.w_id,`comment`.user_id';
  con.query(sql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}
// 作品详情
module.exports.workDetailData=function (id,callback) {
  var sql = 'select w_id,userName,workName,workDetail,workCode,count from `work` left join user on `work`.user_id=`user`.user_id where isDel=0 and w_id='+id;
  con.query(sql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}