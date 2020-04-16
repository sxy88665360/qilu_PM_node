let dbs = require('../dbModel/index');
let Project = dbs.Project;

//向数据库插入数据
exports.add = function (list, cb) {
    let project = new Project({
        number:  list.number, // 项目编号
        name:  list.name, // 项目名称
        category: list.category,// 项目类别
        backGround: list.backGround, // 项目背景
        target:  list.target, // 项目目标
        deadline: list.deadline, // 完成期限
        totalInvestment: list.totalInvestment, // 计划投资总额
        expectedReturn:  list.expectedReturn, // 预期收益
        planTime: list.planTime,
        manager:  list.manager, //项目经理
        corePersonnel:  list.corePersonnel, //核心人员
        keyPersonnel:  list.keyPersonnel, // 主要人员
        proposer:  list.proposer, // 申请人
        department: list.department, // 立项部门
        progress: list.progress, // 项目进度
        projectStatus:list.projectStatus ? '2' : '', // 项目状态
        // nextWeekPlan: list.nextWeekPlan, //下一步计划
        // leaderHelp: list.leaderHelp, // 领导帮助
    });
    project.save(function (err) {
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
};
// 数据库修改数据
var editList = function (id, list, cb) {
    // Project.findOne({_id: id}, function (err, doc) {
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
            console.log(result,"result"); //原数据
            console.log(list,"list"); // 更改后的数据
            /*
            *  未做数据对比
            * */
             result.number = list.number; // 项目编号
             result.name = list.name; //项目名称
             result.category = list.category; // 项目类别
             result.backGround = list.backGround; // 项目背景
             result.target = list.target;// 项目目标
             result.progress = list.progress; //
             result.deadline = list.deadline; // 完成期限
             result.totalInvestment = list.totalInvestment; // 计划投资总额
             result.expectedReturn =  list.expectedReturn; // 预期收益
             result.manager = list.manager; //项目经理
             result.corePersonnel =  list.corePersonnel; //核心人员
             result.keyPersonnel =  list.keyPersonnel; // 主要人员
             result.proposer =  list.proposer; // 申请人
             result.department = list.department; // 立项部门
             result.planTime = list.planTime;// 计划完成时间
             
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
  Project.findOne({_id: id}, function (err, doc) {
      if(err){
          cb(err);
      }else{
          // console.log(doc, "ww")
          cb(null,doc);
      }
  })
};
exports.findById = findById;

//搜索出所有数据
exports.findAll = function(data, cb){
    Project.find(data, function(err, result){
        if(err){
            cb(null, err);
        }
        else{
            cb(null, result);
        }
    });
};

//检索临期项
// exports.reminder = function (data,cb) {
//     let nowDate = Number(new Date());
//     let number = data + 1000*60*60*24;
//     // Project.aggregate(
//     //     //     [{$unwind: $progress},
//     //     //     {$match:{"progress.endTime":{$lte: number}}},
//     //     //     {$project:{progress:1}}],function (err,doc) {
//     //     //     if (err) {
//     //     //         cb(null, err);
//     //     //     } else {
//     //     //         cb(null,doc);
//     //     //     }
//     //     // })
//     // console.log()
// };
