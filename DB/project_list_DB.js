var mongoose = require('mongoose');
var dbURL = 'mongodb://127.0.0.1:27017/qilu_PM';
var db = null;

// 建立数据库连接
function connect() {
    //连接
    mongoose.connect(dbURL,{ useNewUrlParser: true });
    // 获取连接对象
    db = mongoose.connection;
    //注册事件回调
    db.on('open', function (err) {
        if(err) throw err;
        console.log('opened');
    });
    db.on('error', function (err) {
        if (err) throw err;
    })
}
exports.connect = connect;

//断开数据库连接
function disconnect() {
    //断开连接
    mongoose.disconnect();
    db = null;
}
exports.disconnect = disconnect;

var Schema = mongoose.Schema;
var itemSchema = new Schema({
    number: String, // 项目编号
    category: String, // 项目类别
    name: String, // 项目名称
    totalInvestment: String, // 计划投资总额
    backGround: String, // 项目背景
    target: String, // 项目目标
    createTime: Number, // 立项时间
    deadline: Number, // 项目期限
    manager:String, //项目经理
    expectedReturn: String, // 预期收益
    corePersonnel: Array, //核心人员
    keyPersonnel: Array, //主要人员
    progress: Object, // 项目进度
    nextWeekPlan: String, //下一步计划
    leaderHelp: String, // 领导帮助
    department: Number, // 立项部门
    proposer:  String, // 申请人
});
//返回值 document的模板
var ItemDoc = mongoose.model('item',itemSchema,'projectList');

//向数据库插入数据
exports.add = function (list, cb) {
    var item = new ItemDoc({
        number:  list.number, // 项目编号
        name:  list.name, // 项目名称
        category: list.category,// 项目类别
        backGround: list.backGround, // 项目背景
        target:  list.target, // 项目目标
        deadline: list.deadline, // 完成期限
        totalInvestment: list.totalInvestment, // 计划投资总额
        expectedReturn:  list.expectedReturn, // 预期收益
        manager:  list.manager, //项目经理
        corePersonnel:  list.corePersonnel, //核心人员
        keyPersonnel:  list.keyPersonnel, // 主要人员
        proposer:  list.proposer, // 申请人
        department: list.department, // 立项部门
        progress: list.progress, // 项目进度
        nextWeekPlan: list.nextWeekPlan, //下一步计划
        leaderHelp: list.leaderHelp, // 领导帮助
    });
    item.save(function (err) {
        if (err){
            return cb(err);
        } else {
            return cb(null);
        }
    });
};

// 数据库查询数据

// 数据库删除数据
exports.remove = function (item, cb) {
    // console.log(item, "删除条件");
    findById(item.id, function (err, doc) {
        if (err){
            cb(err);
        } else {
            // console.log(doc,"doc");
            doc.remove(function (err) {
                if(err) {
                    cb(err);
                }else{
                    cb(null);
                }
            })
        }
    })
}
// 数据库修改数据
var editList = function (id, list, cb) {
    // ItemDoc.findOne({_id: id}, function (err, doc) {
    //     if(err){
    //         cb(err);
    //     }else{
    //         cb(null,doc);
    //     }
    // })
    findById(id, function (err, result) {
        if(err){
            cb(err);
        }else{
            // console.log(result,"result"); //原数据
            // console.log(list,"list"); // 更改后的数据
            result.number = list.number;
            result.category = list.category;
            result.target = list.target;
            result.deadline = list.deadline;
            result.manager = list.manager;
            result.expectedReturn = list.expectedReturn;
            result.save(function (err) {
                if(err){
                    cb(err);
                }else{
                    console.log("saved");
                    cb(null,null);
                }
            })
        }
    })
};
exports.edit = editList;
// 根据id寻找document
var findById = function (id, cb) {
  ItemDoc.findOne({_id: id}, function (err, doc) {
      if(err){
          cb(err);
      }else{
          cb(null,doc);
      }
  })
};
exports.findById = findById;

//搜索出所有数据
exports.findAll = function(data, cb){
    ItemDoc.find(data, function(err, result){
        if(err){
            cb(null, err);
        }
        else{
            cb(null, result);
        }
    });
};
