/*
* 用户列表
*
* */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var userSchema = new Schema({
    username: String,
    password: String,
    department: String,
});

//返回document模板
var ItemDoc = mongoose.model('userList',userSchema,'userList');
exports.add_user = function (list, cb) {
    var userItem = new ItemDoc ({
        username: list.username,
        password: list.password,
        department:list.department
    });
    userItem.save(function (err) {
        if (err) {
            return cb(err)
        } else {
            return cb(null)
        }
    })
};

// 用户登录
exports.loginCheck = function (list, cb) {
    
}
