let dbs = require('../dbModel/index');
let User = dbs.User
/*
* 用户列表
*
* */
exports.add_user = function (list, cb) {
    var userItem = new User ({
        realName: list.realName,
        loginName: list.loginName,
        passWord: list.passWord,
        department:list.department,
        roleId:list.roleId,
        encPassword:list.encPassword
    });
    userItem.save(function (err) {
        if (err) {
            return cb(err)
        } else {
            return cb(null)
        }
    })
};
// 查找用户
exports.searchList = function (data, cb) {
    User.find(data, function(err, result){
        if(err) {
            cb(null, err);
        }
        else {
            cb(null, result);
        }
    })
}
exports.remove = function (data, cb) {
    User.findById(data,function(err, doc){
        if(err){
            cb(err)
        }else{
            doc.remove((err)=>{
                if(err) {
                    cb(err);
                }else{
                    cb(null);
                }
            })
        }
    })
}
// 用户登录
exports.loginCheck = function (list, cb) {
    
}
