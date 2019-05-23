var dao = require('../DB/project_list_DB');
// 检索所有的列表
var findAll = function (req, res, next) {
    var pageSize = null;
    var pageNum = null;
    var list = null;
    var data = req.body;
    console.log(data,"data");
    console.log(req.query,"query");
    var flag = 0;
    var arrList = {};
    var arr = Object.keys(data);
    arr.forEach((item, index)=>{
       if(data[item]) {
           arrList[item] = data[item];
       }
    });
    if(flag === 0){
        data = {};
    }
    // console.log(flag,"flag");
    console.log(arrList,"arrList");
    dao.findAll(arrList, function (err,doc) {
        if (err){
            next(err);
        }else{
            var data = doc;
            var total = data.length;
            console.log(pageSize,"pageSize");
            var response = {
                code: 1,
                data:data,
                total:total,
                message: 'OK',
                timestamp: Date.now(),
            } ;
            res.send(response);
        }
    });
    // console.log(data,"data");

};
exports.findList = findAll;
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
        nextWeekPlan: req.body.nextWeekPlan, //下一步计划
        leaderHelp: req.body.leaderHelp, // 领导帮助
    };
    // console.log(JSON.stringify(list), "list");
    console.log(list, "list");
    // if(!req.bady){
    //     var error = new error('无数据提交');
    //     next(error);
    // }
    dao.add(list, function (err) {
        if (err){
            next(err);
        }else{
            res.send(list);
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
        var response = {
            code:200,
            data:{
                message:"删除成功"
            }
        };
        res.send(response);
    })
   // res.send(deleteList);
};
exports.delete = deleteItem;

// 修改立项
var editItem = function (req, res, next) {
    // console.log(req.query.id);
    dao.edit(req.query.id, req.body, function (err, doc) {
        if (err){
                    next(err);
                } else{
                    var response = {
                        code:200,
                        message: "修改成功"
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