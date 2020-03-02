const mongoose = require('mongoose');
const DB_URL = require('../dbUrl/index');
let dbURL = DB_URL.dbURL;
let db = null;
// 建立数据库连接
function connect() {
    //连接
    mongoose.connect(dbURL,{ useNewUrlParser: true, useUnifiedTopology: true});
    // 获取连接对象
    db = mongoose.connection;
    //注册事件回调
    db.on('open', function (err) {
        if(err) throw err;
        console.log('opened');
    });
    db.on('error', function (err) {
        if (err) throw err;
    });
}
exports.connect = connect;

//断开数据库连接
function disconnect() {
    //断开连接
    mongoose.disconnect();
    db = null;
}
exports.disconnect = disconnect;


