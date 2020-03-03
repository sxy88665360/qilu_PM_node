let dbs = require('../dbModel/index');
let Progress = dbs.Progress; // 引入model
/*
*   项目进度表
* */
exports.add = function (list, cb) {
  let ProItem = new Progress({
      number: list.number,
      name: list.name,
      principal: list.principal,
      time: list.time
  });
    ProItem.save((error)=>{
        if(error){
            return cb(error)
        } else{
            return cb(null)
        }
    })
};
