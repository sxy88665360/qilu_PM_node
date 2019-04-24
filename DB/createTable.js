// 引入
const mongoose = require('mongoose');
// 连接
mongoose.connect('mongodb://127.0.0.1:27017/qilu_PM', { useNewUrlParser: true });
// 管理连接
var connection = mongoose.connection;
//错误处理
connection.on('error',function (err) {
    console.log('err',err);
});
//open事件
connection.on('open',function () {
    console.log("连接成功");
});
// 建立Schema
var projectListSchema = mongoose.Schema({
    number: String, // 项目编号
    category: String, // 项目类别
    name: String, // 项目名称
    target: String, // 项目目标
    deadline: Number, // 项目期限
});
// 创建模型model
var ItemDoc = mongoose.model('item',projectListSchema,'projectList');
// var projectModel = mongoose.model('porjectList',projectListSchema,'projectList');
ItemDoc.create({
    number: 'XM-09-001',
    category: '天和乐陵重点工作项目', // 项目类别
    name: 'JP哌拉西林注册', // 项目名称
    target: '完成注册', // 项目目标
    deadline: 1556721114, // 项目期限`12`
},function (error,doc) {
    if(error) {
        console.log(error);
    } else {
        console.log(doc);
    }
});