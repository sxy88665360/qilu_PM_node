var impMatter_DB = require('../DB/impMatter_DB/impMatter_DB');

//添加新的事项
var newItem = function (req, res, next) {
    /*
    *向数据库添加数据形式。
    [
     name: String, // 事项描述
     progress: [
         {
             item: String,
             plan_progress: String,
             plan_time: Number,
             real_progress:String,
             real_time: Number,
         }
     ],*/

     // 获取接口数据
    console.log(req.body,"req.body...");
    let require = req.body
    let progressArr = []
    require.progress.forEach((item,index) => {
        let obj = {
            item: item.item,
            plan_progress: item.plan_progress,
            plan_time: item.plan_time,
            real_progress:item.real_progress,
            real_time:item.real_time,
            status: item.status
        }
        progressArr.push(obj);
    });

    let list = {
        name: require.name,
        progress: progressArr
    }

}
exports.new = newItem;