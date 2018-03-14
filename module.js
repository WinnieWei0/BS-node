// 连接数据库
var sql = require('mysql');
var con = sql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'itcast'
});
con.connect();

// 获取heros数据
module.exports.getAllData = function (callback) {
  // console.log('获取数据');
  var sql = 'select * from heros where isDel=0';
  con.query(sql, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
}
module.exports.insertData = function (obj, callback) {
  var sql = `insert into heros(name,gender,img) values(?,?,?)`;
  con.query(sql, [obj.name, obj.gender, obj.img], (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}
module.exports.delData = function (id, callback) {
  var sql = 'update heros set isDel=1 where id=' + id;
  con.query(sql, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}
module.exports.updateData = function (obj, callback) {
  var sql = `update heros set name=?,gender=?,img=? where id=` + obj.id;
  con.query(sql, [obj.name, obj.gender, obj.img], (err, result) => {
    console.log(sql);
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
}
module.exports.getDataId = function (id, callback) {
  // console.log('获取数据');
  var sql = 'select * from heros where isDel=0 and id=' + id;
  con.query(sql, (err, data) => {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
}
