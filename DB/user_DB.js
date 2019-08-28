/*
* 用户列表
*
* */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var userSchema = new Schema({
    username: String,
   password: String
});

//返回document模板
var ItemDoc = mongoose.model('userList',userSchema,'userList');
exports.add_user = function (list, cb) {
    var userItem = new ItemDoc ({
        username: list.username,
        password: list.password
    });
    userItem.save(function (err) {
        if (err) {
            return cb(err)
        } else {
            return cb(null)
        }
    })
};