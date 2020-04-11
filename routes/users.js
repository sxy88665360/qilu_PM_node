let express = require('express');
let router = express.Router();
let user_list_module = require('../module/user_list_module');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
/*
*用户列表操作
* */
// 登录
// router.post('/login', user_list_module.login);
router.get('/userList/paginate', user_list_module.findUser);
router.post('/userList/add', user_list_module.newUser);
router.post('/userList/delete', user_list_module.delUser);

module.exports = router;
