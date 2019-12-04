var mongoose = require('mongoose');
var dbURL = 'mongodb://127.0.0.1:27017/qilu_PM';
var db = null;
// 建立数据库连接
function connect() {
    // 连接
    mongoose.connect(dbURL, { useNewUrlParser: true});
    // 获取连接对象
    db = mongoose.connection;
    // 注册事件回调
    db.on('open', function (err) {
        if(err) throw err;
        console.log('opened');
    });
    db.on('error', function (err) {
        if(err) throw err;
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

/*
* 重点事项数据库操作
**/
var Schema = mongoose.Schema;
var itemSchema = new Schema({
    description: String, // 事项描述
    // real_progress: Object, // 实时进度
    plan_progress: [
        {
            data: '',
            time:Number
        }
    ], // 计划进度
    real_time: Number,
    category: String,
    // log:[
    //     {
    //         data:'',
    //     }
    // ]
})
