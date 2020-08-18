//
let router = require('express').Router();
let PM_moudel = require('../module/PM_module');
let impMatter_module = require('../module/impMatter_module');  // 督办事项
// 获取列表
// router.get('/testSSM/selectProject.do', )
/*
* 项目列表操作
* By xiaoyang.shang
* */
//增加列表
router.post('/new', PM_moudel.new);
// 修改项目
router.post('/edit', PM_moudel.edit);
// router.post('/editProject', PM_moudel.editProject);
// 删除列表
router.post('/delete', PM_moudel.delete);

// 检索所有列表
router.post('/findAll', PM_moudel.findList);
// 事项提醒
router.get('/reminder', PM_moudel.reminder);


/*
*  督办事项

*/
router.post('/impMatter', impMatter_module.new);
module.exports = router;