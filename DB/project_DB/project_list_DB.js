let dbs = require('../dbModel/index');
let Project = dbs.Project;

//向数据库插入数据
exports.add = function (list, cb) {
    let newData = {
        number:  list.number, // 项目编号
        name:  list.name, // 项目名称
        category: list.category,// 项目类别
        backGround: list.backGround, // 项目背景
        target:  list.target, // 项目目标
        deadline: list.deadline, // 完成期限
        totalInvestment: list.totalInvestment, // 计划投资总额
        expectedReturn:  list.expectedReturn, // 预期收益
        planTime: list.planTime, // 
        manager:  list.manager, //项目经理
        corePersonnel:  list.corePersonnel, //核心人员
        keyPersonnel:  list.keyPersonnel, // 主要人员
        proposer:  list.proposer, // 申请人
        department: list.department, // 立项部门
        progress: list.progress, // 项目进度
        projectStatus:list.projectStatus, // 项目状态
        subTime: list.subTime,
        prize: list.prize,
        eventType: list.eventType,
        matterType: list.matterType,
        creatTime: list.creatTime,
        // nextWeekPlan: list.nextWeekPlan, //下一步计划
        // leaderHelp: list.leaderHelp, // 领导帮助
    }

    let project = new Project(newData);
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
            console.log(list, "list"); // 更改后的数据
            result.progress = list.progress;
            //console.log(JSON.stringify(result),"resultJS"); //原数据
            //console.log(JSON.stringify(list),"listJS"); //原数据
            // console.log(JSON.stringify(list)['number'])
            // if(JSON.stringify(result) == JSON.stringify(list)){
            //     console.log("提交数据相同")
            // }
            /*
            *  未做数据对比
            * */
             // console.log(result.progress,"result.progress");
             //console.log(JSON.stringify(result.progress), "对比");
             //console.log(JSON.stringify(list.progress), "对比")
             let proArr = list.progress // 更改后数据
             let subLogObj = []
             proArr.forEach((proItem,index)=>{ //遍历提交的表单
                let sameArr = result.progress.filter((item)=>{
                    return item._id == proItem._id
                })
                // console.log(sameArr,"sameArr"); // 已查找到数据库中的数据
                if(sameArr.length==1){ // 该分项存在，无需创建
                    let obj = {
                        // subTime:new Date().getTime(),
                        subTime:proItem.submitTime?proItem.submitTime:new Date().getTime(),
                        subPro:proItem.process
                    }
                     // 填充数据排序，使用场景，后期补充数据。
                     let subLogArr = result.progress[index].subLog;
                     subLogArr.push(obj);
                     // 排序
                     let ownSort =  (a,b) =>{
                         if(a.subTime <= b.subTime) return 0
                         if(a.subTime >  b.subTime) return 1
                     } 
                     subLogArr.sort(ownSort);
                     result.progress[index].subLog = subLogArr;
                    // result.progress[index].subLog.push(obj);
                    // console.log(result.progress[index].subLog ,"result.progress[index].subLog");
                }else {  // 该分项不存在，需创建
                    let obj = {
                        //subTime:new Date().getTime(),
                        subTime:proItem.submitTime?proItem.submitTime:new Date().getTime(),
                        subPro:proItem.process ? proItem.process : "新增"
                    } 
                
                    result.progress[index].subLog.push(obj); 
                    // console.log(result.progress[index].subLog,"result.progress[index].subLog");
                }
             })
             result.number = list.number; // 项目编号
             result.name = list.name; //项目名称
             result.category = list.category; // 项目类别
             result.backGround = list.backGround; // 项目背景
             result.target = list.target;// 项目目标
             result.deadline = list.deadline; // 完成期限
             result.totalInvestment = list.totalInvestment; // 计划投资总额
             result.expectedReturn =  list.expectedReturn; // 预期收益
             result.manager = list.manager; //项目经理
             result.corePersonnel =  list.corePersonnel; //核心人员
             result.keyPersonnel =  list.keyPersonnel; // 主要人员
             result.proposer =  list.proposer; // 申请人
             result.department = list.department; // 立项部门
             result.planTime = list.planTime;// 计划完成时间
             result.projectStatus = list.projectStatus;// 项目状态
             result.subTime = Number(new Date()); // 提交时间
             result.prize = list.prize; // 奖励金额
             result.eventType = list.eventType // 事项类型
             result.matterType = list.matterType // 督办类型
             result.creatTime = list.creatTime // 创建时间
             // console.log(JSON.stringify(result.progress) ,"pro")
            //  let log = {
            //      subTime: list.subTime, // 提交时间
            //      subPro: list.progress
            //  };
            //  result.subLog.push(log);
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
exports.findItem = function(data, cb){
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
