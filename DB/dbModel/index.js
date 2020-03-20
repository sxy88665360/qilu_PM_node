const mongoose = require('mongoose');
let Schema = mongoose.Schema;
/*
* 项目列表
*/
const Progress = new Schema({
    number: String, // 项目编号
    name: String, // 分项名称
    principal: String, //负责人
    startTime: Number,  // 开始时间
    endTime: Number // 完成时间
});
const Project = new Schema({
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
    corePersonnel: String, //核心人员
    keyPersonnel: String, //主要人员
    department: String, // 立项部门
    proposer:  String, // 申请人
    progress: [Progress],
});
const dbs = {};
dbs.Project = mongoose.model('item',Project,'projectList');
// dbs.Progress = mongoose.model('Project', Progress, 'progressList');
module.exports = dbs;
// exports.dbs = dbs;
