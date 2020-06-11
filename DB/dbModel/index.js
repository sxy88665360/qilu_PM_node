const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const dbs = {};
/*
* 项目列表
*/
const SubLog = new Schema({
    subTime: Number, // 提交时间
    subPro: String, // 项目进展
})
const Progress = new Schema({
    number: String, // 项目编号
    name: String, // 分项名称
    principal: String, //负责人
    startTime: Number,  // 开始时间
    endTime: Number, // 完成时间
    isEnd:String, // 是否完成
    isStart:String,// 是否开始
    isCompletedOnTime: Boolean,// 是否按期完成
    realStartTime:Number,// 实际开始时间
    realEndTime:Number, //实际结束时间
    unDoneReason:String, // 未完成原因
    process:String, // 当前进展
    subLog:[SubLog],  // 提交记录
});
// subLog:[{
//     subTime: Number, // 提交时间
//     subPro: String, // 项目进展
// }],  // 提交记录

const Project = new Schema({
    number: String, // 项目编号
    category: String, // 项目类别
    name: String, // 项目名称
    totalInvestment: String, // 计划投资总额
    backGround: String, // 项目背景
    target: String, // 项目目标
    createTime: Number, // 立项时间
    planTime: Number, // 计划完成时间
    deadline: Number, // 项目期限
    manager:String, //项目经理
    expectedReturn: String, // 预期收益
    corePersonnel: String, //核心人员
    keyPersonnel: String, //主要人员
    department: String, // 立项部门
    proposer:  String, // 申请人
    projectStatus: String, // 项目状态
    subTime:Number, //提报时间
    progress: [Progress], // 项目进度表
    // subLog: [SubLog],  // 提交日志
    prize: Number
});
 dbs.Project = mongoose.model('item', Project, 'projectList'); // 正式数据路

/*
* 用户列表
*/
const userSchema = new Schema({
    realName: String,
    loginName: String,
    passWord: String,
    department:String,
    roleId:String,
    encPassword:String
});

//返回document模板
dbs.User= mongoose.model('userList',userSchema,'userList');
module.exports = dbs;
// exports.dbs = dbs;
