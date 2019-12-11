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
    name: String, // 事项描述
    progress: [
        {
            item: String,
            plan_progress: String,
            plan_time: Number,
            real_progress:String,
            real_time: Number,
            status: Boolean
        }
    ],
})

// 返回值 document 模板
var ItemDoc = mongoose.model('impMatterList', itemSchema, 'impMatter');

// 向数据库插入数据
exports.add = function (list, cb) {
    const P_progress = null;
    // list.plan_progress.forEach((item, index) => {
    //     P_progress[index] = {
    //         // item = item
    //     }
    // });

}