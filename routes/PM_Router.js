//
var router = require('express').Router();
var PM_moudel = require('../module/PM_module');
var user_list_module = require('../module/user_list_module');
// 获取列表
// router.get('/testSSM/selectProject.do', )
/*
* 项目列表操作
* By xiaoyang.shang
* */
//增加列表
router.post('/projectApi/new', PM_moudel.new);

// 删除列表
router.post('/delete', PM_moudel.delete);

// 检索所有列表
router.post('/projectApi/findAll', PM_moudel.findList);

// 修改项目
router.post('/edit', PM_moudel.edit);

/*
*用户列表操作
* */
// 登录
router.post('/login', user_list_module.login);
router.get('/userList', user_list_module.newUser);



module.exports = router;
