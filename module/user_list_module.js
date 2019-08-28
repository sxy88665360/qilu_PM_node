var user_dao = require('../DB/user_DB');

// 添加新的用户
var newItem = function (req, res, next) {
    //1.向数据库写入数据
    var list = {
        username: req.username,
        password: req.password,
    };
    console.log(list,"userList");
    user_dao.add_user(list, function (err) {
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