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
      startTime: list.startTime,
      endTime: list.endTime,
      realStartTime: list.realStartTime,
      realEndTime: list.realEndTime,
      isEnd:list.isEnd,
      isStart:list.isStart,// 是否开始
      isCompletedOnTime: list.isCompletedOnTime,// 是否按期完成
      unDoneReason:list.unDoneReason,
      process:list.process
  });
    ProItem.save((error)=>{
        if(error){
            return cb(error)
        } else{
            return cb(null)
        }
    })
};
