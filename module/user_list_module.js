var user_dao = require('../DB/user_DB/user_DB');

// 添加新的用户
var newItem = function (req, res, next) {
    //1.向数据库写入数据
    
    var data = {
        realName: req.body.realName,
        loginName: req.body.loginName,
        passWord: req.body.password,
        department:req.body.department[0],
        roleId:req.body.roleId,
        encPassword:req.body.encPassword
    };
    console.log(data,"add userList");
    user_dao.add_user(data, function (err) {
        if (err){
            next(err);
        } else{
            var response = {
                code: 1,
                message: 'OK',
                timestamp: Date.now(),
            } ;
            res.send(response);
        }
    })
};
exports.newUser = newItem;
// 查找用户
let findUser = function (req, res, next) {
    // let data = {
    //     realName: req.query.realName,
    //     loginName:req.query.loginName,
    //     passWord:req.query.passWord,
    //     department:req.query.department,
    //     roleId:req.query.roleId
    // }
    let data = req.query
    console.log(data,"data");
    if(data.department==='null') 
        data.department=''
    var objList = {};
    var arr = Object.keys(data);
    arr.forEach((item, index)=>{
        if(data[item]) {
            if(item === "department"&& data[item]){
                objList[item] = {'$in': data[item]}
            }else{
                objList[item] = data[item];
            }
        }
    });
    console.log(objList,"objList")
    user_dao.searchList(objList, function(err, doc){
        if(err){
            next(err)
        }else{
            let response = {
                code: 1,
                data:doc,
                total:doc.length,
                message: 'OK',
                timestamp: Date.now(),
            } ;
            res.send(response);
        }
    })
}
exports.findUser = findUser;
let delUser = function(req, res, next){
    
    user_dao.deleteUser(req.query.id, function(err){
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
}

exports.delUser = delUser;
// 用户登录
var login = function (req, res, next) {
  var list = {
      username: req.query.username,
      password: req.query.password,
  }
    user_dao.loginCheck()
};
exports.login = login;
