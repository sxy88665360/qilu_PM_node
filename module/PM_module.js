const dao = require('../DB/project_DB/project_list_DB');
let dbs = require('../DB/dbModel/index');
let Project = dbs.Project;

// 检索所有的列表
var findList = function (req, res, next) {
    var pageSize = null;
    var pageNum = null;
    var list = null;
    var data = req.body;
    // console.log(req.query,"query");
    // console.log(data,"data");
    var flag = 0;
    var arrList = {};
    var arr = Object.keys(data);
    // console.log(arr,"arr");
    arr.forEach((item, index)=>{
        if(data[item]) {
            if((item === "department" && data[item].length) || item === "time"){
                arrList[item] = {'$in': data[item]}
            }else{
                arrList[item] = data[item];
            }
        }
     });
    //  {'number':'XM-19-00','department': {$in:['5','7']}}
    // console.log(arrList,"arrList");
    dao.findItem(arrList, function (err,doc) {
        if (err){
            next(err);
        }else{
            let total = doc.length;
            // console.log(pageSize,"pageSize");
            let response = {
                code: 1,
                data:doc,
                total:total,
                message: 'OK',
                timestamp: Date.now(),
            } ;
            res.send(response);
        }
    });
     // console.log(data,"data");

};

exports.findList = findList;
// 添加新的item
var newItem = function (req, res, next) {
  //1.向数据库写入数据
  //2.列表需要更新
  //1.写入数据
    var list = {
        // category: req.body.category,
        number:  req.body.number, // 项目编号
        name:  req.body.name, // 项目名称
        category: req.body.category,// 项目类别
        backGround: req.body.backGround, // 项目背景
        target:  req.body.target, // 项目目标
        deadline: req.body.deadline, // 完成期限
        totalInvestment: req.body.totalInvestment, // 计划投资总额
        expectedReturn:  req.body.expectedReturn, // 预期收益
        manager:  req.body.manager, //项目经理
        corePersonnel:  req.body.corePersonnel, //核心人员
        keyPersonnel:  req.body.keyPersonnel, // 主要人员
        proposer:  req.body.proposer, //项目经理
        department: req.body.department, // 立项部门
        progress: req.body.progress, // 项目进度
        projectStatus:req.body.projectStatus, // 项目状态
        planTime: req.body.planTime, // 计划完成时间
        subTime: req.body.subTime, // 修改时间
        // subLog: req.body.subLog, // 提交记录
        prize:req.body.prize, // 奖励金额
        eventType: req.body.eventType, // 事项类型  "1" 项目立项  "2"  督办事项
        matterType:req.body.matterType, //督办类型  "1" 攻关课题  "2"  会议督办  "3" 管理提升
        creatTime:req.body.creatTime, // 创建时间、督办会议时间
    };
    console.log(list,"list")
    dao.add(list, function (err) {
        if (err){
            next(err);
        }else{
            var response = {
                code: 1,
                message: 'OK',
                timestamp: Date.now(),
            };
            res.send(response);
           // res.send(list);
        }
    })
};
exports.new = newItem;

// 删除item
var deleteItem = function (req, res, next) {
    var data = req.body;
    var deleteList = {
        id: req.body.id
    };
    console.log(deleteList,"data");
    dao.remove(deleteList, function (err) {
        if(err){
            next(err)
        }else{
            let response = {
                code:200,
                data:{
                    message:"删除成功"
                }
            };
            res.send(response);
        }
        
    })
   // res.send(deleteList);
};
exports.delete = deleteItem;

// 修改立项
var editItem = function (req, res, next) {
    //console.log(JSON.parse(req.body) ,"req.body");
    //let reqDate = req.body
    dao.edit(req.body._id, req.body, function (err, doc) {
        if (err){
            next(err);
        } else{
            var response = {
                code: 1,
                message: 'OK',
                timestamp: Date.now(),
            };
            res.send(response);
        }
    })
    // dao.findById(req.query.id, function (err, doc) {
    //     if (err){
    //         next(err);
    //     } else{
    //         var data = doc;
    //         res.status(200).send((data).toString());
    //
    //     }
    // })
};
exports.edit = editItem;

// 查找临期项
let reminder = function(req, res, next) {
    let query = req.query;
    console.log(query);
    Project.find({}, function(err, result){
        if(err){
            next(err);
        }
        else{
        // console.log(JSON.parse(JSON.stringify(result)));
          let data = JSON.parse(JSON.stringify(result));
          console.log(data,"data")
          let resultArr = [];
          data.forEach((dataItem, dataIndex) => {
            dataItem.progress.forEach((proItem, proIndex) => {
                if(Math.abs(proItem.startTime - query.time) <= 2000*60*60*24 || Math.abs(proItem.endTime - query.time) <= 2000*60*60*24){
                    // console.log("抓到了！");
                    // console.log(proItem, dataItem, "抓到了！");
                    resultArr.push(dataItem);
                }
              })
          })
          let response = {
            code: 1,
            data:resultArr,
            message: 'OK',
            timestamp: Date.now(),
          } ;
            res.send(response);
        }
    });

};
exports.reminder = reminder;
